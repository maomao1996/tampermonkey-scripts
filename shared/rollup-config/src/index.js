import path from 'node:path'
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3'
import terser from '@rollup/plugin-terser'
import metablock from 'rollup-plugin-userscript-metablock'

export function createRollupConfig({
  pkg,
  postcss: postcssOptions,
  terser: terserOptions,
  plugins = [],
}) {
  const isDevelopment = process.env.BUILD === 'development'
  const filename = `${pkg.name}.user.js`
  const file = path.resolve('../../', isDevelopment ? 'dist-dev' : 'dist', filename)

  const defaultPostcssOptions = { minimize: true }

  const defaultTerserOptions = isDevelopment
    ? {
        // 开发环境下仅删除注释
        mangle: false,
        compress: {
          defaults: false,
          conditionals: true,
        },
        format: {
          beautify: true,
          indent_level: 2,
        },
      }
    : {
        format: {
          ascii_only: true,
          beautify: true,
          indent_level: 2,
        },
      }

  return defineConfig({
    input: 'src/index.ts',
    output: {
      file,
      format: 'iife',
    },
    plugins: [
      ...plugins,
      nodeResolve(),
      replace({
        preventAssignment: true,
        values: {
          __DEV__: isDevelopment,
          'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
        },
      }),
      postcss(
        typeof postcssOptions === 'function'
          ? postcssOptions(defaultPostcssOptions)
          : defaultPostcssOptions,
      ),
      swc(
        defineRollupSwcOption({
          jsc: {
            target: isDevelopment ? 'es2015' : 'es5',
            baseUrl: process.cwd(),
          },
        }),
      ),
      terser(
        typeof terserOptions === 'function'
          ? terserOptions(defaultTerserOptions)
          : defaultTerserOptions,
      ),
      metablock({
        override: {
          /* https://greasyfork.org/zh-CN/help/meta-keys */
          version: pkg.version,
          author: 'maomao1996',
          homepage: 'https://github.com/maomao1996/tampermonkey-scripts',
          supportURL: 'https://github.com/maomao1996/tampermonkey-scripts/issues',
          license: 'MIT',
        },
      }),
      isDevelopment && {
        name: 'log-debug-url',
        writeBundle() {
          const debugUrl = `http://127.0.0.1:8688/${filename}`
          console.log(`请打开 ${debugUrl} 进行调试`)
        },
      },
    ],
  })
}
