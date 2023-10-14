import path from 'node:path'
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3'
import terser from '@rollup/plugin-terser'
import metablock from 'rollup-plugin-userscript-metablock'

export function createRollupConfig({ pkg, postcss: postcssOptions = {}, plugins = [] }) {
  const file = path.resolve(
    '../../',
    process.env.BUILD === 'development' ? 'dist-dev' : 'dist',
    `${pkg.name}.user.js`,
  )

  return defineConfig({
    input: 'src/index.ts',
    output: {
      file,
      format: 'iife',
    },
    plugins: [
      ...plugins,
      nodeResolve(),
      postcssOptions && postcss({ minimize: true, ...postcssOptions }),
      swc(
        defineRollupSwcOption({
          jsc: {
            target: 'es5',
            baseUrl: process.cwd(),
          },
        }),
      ),
      terser({
        mangle: {
          keep_fnames: true,
        },
        compress: {
          defaults: false,
        },
        format: {
          ascii_only: true,
          beautify: true,
          indent_level: 2,
        },
      }),
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
    ],
  })
}
