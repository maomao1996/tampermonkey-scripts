import * as path from 'node:path'
import { exec } from 'node:child_process'

import prompts from 'prompts'
import fs from 'fs-extra'
import chalk from 'chalk'

async function main() {
  const { name, url } = await prompts([
    {
      name: 'name',
      type: 'text',
      message: '请输入站点名称',
      format: (value) => value.trim(),
    },
    {
      name: 'url',
      type: 'text',
      message: '请输入站点 url',
      format: (value) => value.trim(),
      validate: (value) => value.includes('.') || '站点 url 格式不正确',
    },
  ])

  if (!url) {
    process.exit(0)
  }

  const rootPath = path.join(process.cwd(), 'src', 'sites', `${url}`)

  if (fs.existsSync(rootPath)) {
    console.log(chalk.yellow(`站点【${name}】已经存在，请重新输入`))
    return main()
  }

  fs.outputFileSync(`${rootPath}/index.css`, '\n')
  const homePath = path.join(rootPath, 'index.ts')
  fs.outputFileSync(
    homePath,
    `/*
 * ${name}
 *
 ******************************************************************************/

import style from './index.css'

const site: SiteModule = [
  '${name}',
  '${url}',
  {
    style,
    script() {},
  },
]

export default site
`,
  )

  console.log(
    chalk.green(`站点【${name}】创建成功咯！
快打开 ./packages/kill-watermark/src/sites/${url}/index.ts 写代码吧!`),
  )

  exec(`code ${homePath}`, (error) => {
    if (error) {
      console.error(chalk.red(`无法打开文件: ${error.message}`))
    }
  })
}

main()
