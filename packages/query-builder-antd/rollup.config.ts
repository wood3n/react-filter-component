import { defineConfig } from 'rollup';
import path from 'path';
import { fileURLToPath } from 'url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
// import { dts } from 'rollup-plugin-dts';
import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import svgr from '@svgr/rollup';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
      },
      {
        file: 'es/index.js',
        format: 'es',
      },
    ],
    external: ['react', 'react-dom', /@babel\/runtime/],
    plugins: [
      del({ targets: ['es/*', 'lib/*'] }),
      alias({
        entries: [{ find: '^@/', replacement: path.resolve(__dirname, 'src') }],
      }),
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
        ],
        plugins: ['@babel/plugin-transform-runtime'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: { outDir: 'es' },
        },
      }),
      postcss({
        minimize: true,
        autoModules: true,
        extract: true,
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
      svgr(),
      terser(),
    ],
  },
]);
