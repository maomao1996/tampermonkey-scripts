import { createRollupConfig } from '@femm/shared-rollup-config'
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import camelCase from 'camelcase'

import pkg from './package.json' assert { type: 'json' }

export default createRollupConfig({
  pkg,
  postcss: { minimize: true, inject: false },
  plugins: [
    {
      name: 'write-site-default-export-module',
      transform() {
        const files = readdirSync('./src/sites')
        const exportSites = []
        const source = files.reduce((str, file) => {
          if (statSync(`./src/sites/${file}`).isDirectory()) {
            let moduleName = camelCase(file)
            if (/^\d/.test(moduleName)) {
              moduleName = `m_${moduleName}`
            }

            str += `export { default as ${moduleName} } from './${file}'\n`
            exportSites.push(`${moduleName}`)
          }
          return str
        }, '')

        const filepath = './src/sites/index.ts'
        writeFileSync(filepath, source)
      },
    },
  ],
})
