import { RollupOptions, OutputOptions, defineConfig } from 'rollup';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { dts } from 'rollup-plugin-dts';
import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getOptions = (format: OutputOptions['format']): RollupOptions[] => {
  const outputDirMap: Record<'cjs' | 'es', string> = {
    cjs: 'lib',
    es: 'es',
  };

  const outputDir = outputDirMap[format!];

  return [
    {
      input: 'src/index.ts',
      output: [
        {
          file: `${outputDir}/index.js`,
          format,
        },
      ],
      external: ['react', 'react-dom', 'antd', '@ant-design/icons', /react\/jsx-runtime/, /@babel\/runtime/],
      plugins: [
        del({ targets: outputDir }),
        alias({
          entries: [{ find: '^@/', replacement: path.resolve(__dirname, 'src') }],
        }),
        nodeResolve(),
        commonjs(),
        // 顺序必须在babel前面
        typescript({
          tsconfig: './tsconfig.json',
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
          extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
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
        visualizer({
          projectRoot: outputDir,
          emitFile: true,
          filename: 'stats.html',
          gzipSize: true,
        }),
      ],
    },
    {
      input: `${outputDir}/index.d.ts`,
      output: [{ file: `${outputDir}/index.d.ts`, format }],
      plugins: [dts()],
    },
  ];
};

export default defineConfig([...getOptions('es'), ...getOptions('cjs')]);
