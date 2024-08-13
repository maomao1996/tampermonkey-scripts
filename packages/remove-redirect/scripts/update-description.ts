import * as path from 'node:path'

import fs from 'fs-extra'

import * as sites from 'src/sites'

const description = Object.values(sites)
  .flat()
  .map(([name]) => name)
  .filter(Boolean)
  .join('、')

const filepath = path.join(process.cwd(), 'metablock.json')
const metablock = fs.readJSONSync(filepath)
metablock.description = `提升用户体验：修复跳转链接为站外直链（移除重定向直接跳转），免去拦截页面点击步骤可直达站外；拦截页面自动跳转（无须额外操作）；已适配${description}`

fs.writeJSONSync(filepath, metablock, { spaces: 2 })
