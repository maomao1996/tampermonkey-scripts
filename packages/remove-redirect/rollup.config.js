import { createRollupConfig } from '@femm/shared-rollup-config'
import { readdirSync, writeFileSync } from 'node:fs'
import camelCase from 'camelcase'

import pkg from './package.json' assert { type: 'json' }

export default createRollupConfig({
  pkg,
  plugins: [
    {
      name: 'write-site-default-export-module',
      transform() {
        const files = readdirSync('./src/sites')
        const source = files.reduce((str, file) => {
          if (file.endsWith('.ts') && file !== 'index.ts') {
            const formatFilename = file.replace('.ts', '')

            let moduleName = camelCase(formatFilename)
            if (/^\d/.test(moduleName)) {
              moduleName = `m_${moduleName}`
            }

            str += `export { default as ${moduleName} } from './${formatFilename}'\n`
          }
          return str
        }, '')

        const filepath = './src/sites/index.ts'
        writeFileSync(filepath, source)
      },
    },
  ],
})
