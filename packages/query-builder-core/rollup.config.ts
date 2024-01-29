import { RollupOptions, defineConfig } from 'rollup';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';
import ts2 from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete';
import pkg from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

const rollupOptions: RollupOptions = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: ['react', 'react-dom', /react\/jsx-runtime/, /@babel\/runtime/],
  plugins: [
    del({ targets: ['es/*', 'lib/*'] }),
    alias({
      entries: [{ find: '^@/', replacement: path.resolve(__dirname, 'src') }],
    }),
    nodeResolve({
      extensions,
    }),
    commonjs(),
    ts2({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
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
      extensions,
    }),
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
