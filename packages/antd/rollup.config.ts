import path from 'path';
import { fileURLToPath } from 'url';

import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import ts2 from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

import pkg from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

export default defineConfig([
  {
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
      {
        name: 'ReactFilter',
        file: pkg.unpkg,
        format: 'umd',
        plugins: [terser()],
      },
    ],
    plugins: [
      del({ targets: ['dist/*', 'es/*', 'lib/*'] }),
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
        clean: true,
        tsconfigOverride: {
          compilerOptions: {
            rootDir: './src',
            composite: true,
            declaration: true,
            declarationMap: false,
            declarationDir: 'es/dts',
          },
          include: ['src'],
          exclude: ['rollup.config.ts'],
        },
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
      postcss({
        extract: true,
        minimize: true,
        plugins: [
          postcssPresetEnv({
            stage: 3,
            features: {
              'nesting-rules': true,
            },
            autoprefixer: true,
          }),
        ],
      }),
      peerDepsExternal(),
    ],
  },
  {
    input: 'es/dts/index.d.ts',
    output: [
      {
        file: pkg.typings,
        format: 'es',
      },
    ],
    plugins: [
      dts(),
      del({
        hook: 'buildEnd',
        targets: 'es/dts',
      }),
    ],
  },
]);
