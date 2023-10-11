import { createRollupConfig } from '@femm/shared-rollup-config'
import { readdirSync, writeFileSync } from 'node:fs'
import camelCase from 'camelcase'

import pkg from './package.json' assert { type: 'json' }

export default createRollupConfig({
  pkg,
  postcss: { minimize: true, inject: false },
  plugins: [
    {
      name: 'write-site-module',
      transform() {
        const files = readdirSync('./src/site')
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

        writeFileSync('./src/site/index.ts', `${source}\nexport default [${exportDefault}]`)
      },
    },
  ],
})
