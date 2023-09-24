import * as path from 'node:path'

import prompts from 'prompts'
import fs from 'fs-extra'
import chalk from 'chalk'

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

const { tampermonkeyName, packageName, needsCss } = await prompts([
  {
    name: 'tampermonkeyName',
    type: 'text',
    message: '请输入脚本名 (tampermonkey name):',
    onState: (state) => String(state.value).trim(),
  },
  {
    name: 'packageName',
    type: 'text',
    message: '请输入包名 (package name):',
    validate: (dir) =>
      isValidPackageName(dir)
        ? fs.existsSync(path.join(process.cwd(), 'packages', dir))
          ? `文件夹【${dir}】已存在`
          : true
        : `文件名格式不正确`,
  },
  {
    name: 'needsCss',
    type: 'toggle',
    message: '是否需要 CSS ?',
    initial: false,
    active: 'Yes',
    inactive: 'No',
  },
])

const root = path.join(process.cwd(), 'packages', packageName)

// package.json
fs.outputFileSync(
  `${root}/package.json`,
  JSON.stringify(
    {
      name: packageName,
      version: '0.0.0',
      private: true,
      type: 'module',
      scripts: {
        build: 'rollup -c',
        dev: 'rollup --environment BUILD:development -c --watch',
      },
    },
    null,
    2,
  ),
)

// rollup.config.js
fs.outputFileSync(
  `${root}/rollup.config.js`,
  `import { createRollupConfig } from '@femm/shared-rollup-config'

import pkg from './package.json' assert { type: 'json' }

export default createRollupConfig({ pkg })
`,
)

// metablock.json
fs.outputFileSync(
  `${root}/metablock.json`,
  JSON.stringify(
    {
      name: tampermonkeyName,
      namespace: '',
      version: '0.0.0',
      description: '',
      author: '',
      homepage: '',
      supportURL: '',
      updateURL: '',
      downloadURL: '',
      license: '',
      match: [],
      exclude: [],
      require: [],
      connect: [],
      grant: [],
    },
    null,
    2,
  ),
)

// README.md
fs.outputFileSync(`${root}/README.md`, `# ${tampermonkeyName}\n`)

// src
fs.outputFileSync(`${root}/src/index.ts`, needsCss ? `import './styles/index.css'\n` : '\n')

needsCss && fs.outputFileSync(`${root}/src/styles/index.css`, '\n')

console.log(chalk.green(`脚本【${packageName}】创建成功咯，快去写代码吧`))
