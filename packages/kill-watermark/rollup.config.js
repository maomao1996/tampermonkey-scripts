import { createRollupConfig } from '@femm/shared-rollup-config'
import { readdirSync, writeFileSync } from 'node:fs'
import camelCase from 'camelcase'
import * as prettier from 'prettier'
import prettierConfig from '@femm/prettier'

import pkg from './package.json' assert { type: 'json' }

export default createRollupConfig({
  pkg,
  postcss: { minimize: true, inject: false },
  plugins: [
    {
      name: 'write-site-default-export-module',
      transform() {
        const files = readdirSync('./src/sites')
        const exportDefault = []
        const source = files.reduce((str, file) => {
          if (file.endsWith('.css')) {
            const formatFilename = file.replace('.css', '')
            const moduleName = camelCase(formatFilename)

            str += `import { default as ${moduleName} } from './${file}'\n`
            exportDefault.push(`["${formatFilename}", ${moduleName}]`)
          }
          return str
        }, '')

        const filepath = './src/sites/index.ts'
        writeFileSync(
          filepath,
          prettier.format(`${source}\nexport default [${exportDefault}]`, {
            ...prettierConfig,
            /**
             * 配置 filepath 字段，防止控制台弹出如下提示
             *  No parser and no filepath given, using 'babel' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred.
             */
            filepath,
          }),
        )
      },
    },
  ],
})
