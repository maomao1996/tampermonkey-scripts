#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

const _log = console.log

// 脚本初始模板
const getTemplate = (name) => `// ==UserScript==
// @name          ${name}
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.0.1
// @description   脚本描述
// @author        maomao1996
// @include       *
// @grant         none
// ==/UserScript==

;(() => {
  'use strict'
  const { pathname } = location
})()
`

const promptList = [
  {
    type: 'input',
    message: '请输入脚本名:',
    name: 'name'
  },
  {
    type: 'input',
    message: '请输入脚本文件名:',
    name: 'filename'
  }
]
inquirer.prompt(promptList).then(({ name, filename }) => {
  const _path = `./packages/${filename}/`
  if (fs.existsSync(_path)) {
    _log(chalk.yellow(`文件夹 ${_path} 已存在 `))
  } else {
    fs.mkdirSync(_path)
  }
  fs.writeFile(`${_path}${filename}.user.ts`, getTemplate(name), (err) => {
    if (err) {
      return console.log(err)
    }
    _log(chalk.green(`脚本 '${filename}' 新建成功咯，快去写代码吧`))
  })
})
