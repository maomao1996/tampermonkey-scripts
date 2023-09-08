const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs-extra')

const { log } = console

// 脚本初始模板
const getTemplate = (name) => `/*!
// ==UserScript==
// @name          ${name}
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.0.1
// @description   脚本描述
// @author        maomao1996
// @include       *
// @grant         none
// ==/UserScript==
*/

;(() => {
  'use strict'
  const { pathname } = location
})()
`

const promptList = [
  {
    type: 'input',
    message: '请输入脚本名:',
    name: 'name',
    filter(value) {
      return value.replace(/\s+/g, '')
    },
  },
  {
    type: 'input',
    message: '请输入文件名:',
    name: 'filename',
    filter(value) {
      return value.replace(/\s+/g, '')
    },
    validate(value) {
      const done = this.async()
      if (!value) {
        done(`请输入${value}名`)
        return
      }
      if (!/^[a-zA-Z0-9_-]{1,}$/.test(value)) {
        done(`文件名格式不正确`)
        return
      }
      if (fs.existsSync(`./packages/${value}/`)) {
        done(`文件夹 [${value}] 已存在`)
        return
      }
      done(null, true)
    },
  },
]
inquirer.prompt(promptList).then(({ name, filename }) => {
  fs.outputFile(`./packages/${filename}/${filename}.user.ts`, getTemplate(name), (err) => {
    if (err) {
      return log(err)
    }
    log(chalk.green(`脚本 '${name}' 创建成功咯，快去写代码吧`))
  })
})
