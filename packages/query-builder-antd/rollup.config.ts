import { RollupOptions, defineConfig } from 'rollup';
import { fileURLToPath } from 'url';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';
import ts2 from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';
import autoprefixer from 'autoprefixer';
import pkg from './package.json' assert { type: 'json' };

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

const rollupOptions: RollupOptions = {
  input: 'src/index.ts',
  output: [
    {
      name: 'AntdQueryBuilder',
      file: pkg.unpkg,
      format: 'umd',
      // UMD需要指定这些排除在package外部的依赖名
      globals: {
        react: 'React',
        antd: 'antd',
        // https://github.com/ant-design/ant-design-icons/issues/14
        '@ant-design/icons': 'AntDesignIcons',
      },
      plugins: [terser()],
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: ['react', 'antd', '@ant-design/icons'],
  plugins: [
    del({ targets: ['dist/*', 'es/*', 'lib/*'] }),
    alias({
      entries: [
        {
          find: /^@\/(.*)$/,
          replacement: `${fileURLToPath(new URL('./src', import.meta.url))}/$1`,
        },
      ],
    }),
    nodeResolve({
      extensions,
    }),
    // after node resolve
    commonjs(),
    ts2({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-react',
          {
            runtime: 'classic',
          },
        ],
      ],
      babelHelpers: 'bundled',
      extensions,
    }),
    postcss({
      extensions: ['.css', '.less'],
      minimize: true,
      autoModules: true,
      use: {
        sass: null,
        stylus: null,
        less: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
      plugins: [autoprefixer()],
    }),
    url(),
    svgr(),
  ],
};

export default defineConfig([
  rollupOptions,
  {
    input: 'es/dts/index.d.ts',
    output: [{ file: pkg.typings, format: 'es' }],
    plugins: [
      dts(),
      del({
        hook: 'buildEnd',
        targets: 'es/dts',
      }),
    ],
  },
]);
