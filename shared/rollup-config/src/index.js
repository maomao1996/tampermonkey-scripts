import path from 'node:path'
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import { swc } from 'rollup-plugin-swc3'
import terser from '@rollup/plugin-terser'
import metablock from 'rollup-plugin-userscript-metablock'

export function createRollupConfig({ pkg, plugins = [] }) {
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
      postcss({ minimize: true }),
      swc({
        jsc: { target: 'es5' },
      }),
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
