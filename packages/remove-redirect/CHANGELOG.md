# remove-redirect

## 2.25.0

### Minor Changes

- ae53f4f: 适配 NodeSeek [#40](https://github.com/maomao1996/tampermonkey-scripts/issues/40)

## 2.24.1

### Patch Changes

- 4a1f034: 优化 QQ 邮箱匹配规则

## 2.24.0

### Minor Changes

- d461fc9: 适配 Instagram 链接转换

## 2.23.0

### Minor Changes

- 6a2e4c9: 适配微博短链接 [#36](https://github.com/maomao1996/tampermonkey-scripts/issues/36)

## 2.22.0

### Minor Changes

- 1190a16: 适配微信开放社区文章页

## 2.21.0

### Minor Changes

- 695a886: 适配 Steam 社区

## 2.20.0

### Minor Changes

- 1ff61bd: 适配力扣（Leetcode）重定向页

### Patch Changes

- ef5012f: 优化 PC 版 QQ 自动跳转验证规则
- 3271560: 修复 Google 搜索赞助商广告链接转换

## 2.19.1

### Patch Changes

- 32d228d: 修复 Facebook [#29](https://github.com/maomao1996/tampermonkey-scripts/issues/29)

## 2.19.0

### Minor Changes

- 92e7abb: 适配哔哩哔哩游戏 WIKI

## 2.18.0

### Minor Changes

- 261b4a3: 适配 ACG 盒子

## 2.17.2

### Patch Changes

- e1a17d0: 修复 `requestOriginalLink` 方法
- a692bb8: 简化 Google 站点配置

## 2.17.1

### Patch Changes

- bf00c61: 修复 `rewriteWindowOpen` 拦截失效
- 3c48c1d: 51CTO 博客文章页支持直接跳转

## 2.17.0

### Minor Changes

- b44fdc0: `transform` 支持 `fallbackSelector` 配置项
- 44dbb1a: 重构主流程，拆分功能函数以提升可读性和类型安全
- 02c2e48: `transform` 支持 `attribute` 配置项

### Patch Changes

- 79d3da7: 修复百度搜索链接转换不全 [#27](https://github.com/maomao1996/tampermonkey-scripts/issues/27)
- 50c6fe1: 修复爱发电站点适配
- d828c74: 更新脚本配置
- dc9fa7a: 使用 `attribute` 配置项简化站点配置

## 2.16.1

### Patch Changes

- e4b2a89: 优化 bing 搜索规则，适配更多二级域名

## 2.16.0

### Minor Changes

- 64eb872: 适配石墨文档

## 2.15.0

### Minor Changes

- 7cca702: 适配书签地球

## 2.14.2

### Patch Changes

- 77a1779: 优化腾讯兔小巢判断逻辑

## 2.14.1

### Patch Changes

- 2589eb5: 更新脚本描述
- d7b202f: 适配语雀自定义二级域名

## 2.14.0

### Minor Changes

- 2efc17b: 适配搜狗搜索

### Patch Changes

- 436b3e5: 添加 `defineSite` 辅助函数
- e97efd9: 使用 `defineSite` 优化站点配置

## 2.13.1

### Patch Changes

- 1823d87: 适配 Bing 搜索国内域名

## 2.13.0

### Minor Changes

- a4139b9: 适配 Bing 搜索

## 2.12.0

### Minor Changes

- 7fefb33: 适配酷安

## 2.11.0

### Minor Changes

- 1293eb7: 适配百度贴吧

## 2.10.2

### Patch Changes

- 300c0db: 适配推特（Twitter）新域名

## 2.10.1

### Patch Changes

- 0f89828: 修复推特（Twitter）链接转换错误

## 2.10.0

### Minor Changes

- de23c5a: 适配推特（Twitter）

## 2.9.1

### Patch Changes

- ada1471: 修复百度搜索结果中子条目链接处理错误问题 [#21](https://github.com/maomao1996/tampermonkey-scripts/issues/21)

## 2.9.0

### Minor Changes

- 16d2311: 适配 Google 重定向页

### Patch Changes

- d391402: 优化百度域名判断，修复搜索结果中百科、知道等重定向跳转

## 2.8.0

### Minor Changes

- b334bea: 适配 NT 版 QQ

## 2.7.0

### Minor Changes

- afcdee5: 适配 QQ 邮箱内容页
- 01df160: 适配腾讯兔小巢

### Patch Changes

- 4739af4: 更新脚本描述

## 2.6.0

### Minor Changes

- e045ac8: 适配链滴 [#19](https://github.com/maomao1996/tampermonkey-scripts/issues/19)

## 2.5.0

### Minor Changes

- 5c75d6c: `queryName` 支持传入数组

### Patch Changes

- d69378a: 修复 pixiv 链接转换错误 [#18](https://github.com/maomao1996/tampermonkey-scripts/issues/18)

## 2.4.1

### Patch Changes

- 4e13868: 优化 `formatHostname` 逻辑
- d4eb3a0: 更新脚本描述
- 3f651ce: 优化文件命名

## 2.4.0

### Minor Changes

- 0a4eea8: 适配 Facebook [#15](https://github.com/maomao1996/tampermonkey-scripts/issues/15)
- 6273aab: 适配 Instagram [#15](https://github.com/maomao1996/tampermonkey-scripts/issues/15)

## 2.3.2

### Patch Changes

- a81d832: 修复腾讯云开发者社区链接转换错误

## 2.3.1

### Patch Changes

- 99bc29f: 修复 YouTube 拦截页

## 2.3.0

### Minor Changes

- 06f87ea: 适配谷歌搜索 [#13](https://github.com/maomao1996/tampermonkey-scripts/issues/13)
- e624f43: 适配金山文档

## 2.2.0

### Minor Changes

- 66dcb97: 适配 NGA 玩家社区

## 2.1.0

### Minor Changes

- 462b407: 适配 CSDN 文章页
- ee6baca: 支持拦截 `window.open` 移除重定向
- f918a8d: 适配 InfoQ

### Patch Changes

- 136154c: 忽略 `localhost` 等本地服务

## 2.0.1

### Patch Changes

- 3fbd35d: 优化 validator 逻辑，移除外部参数
- d5debbc: 修复码云个人主页

## 2.0.0

### Major Changes

- 9ac0d01: 重构跳转链接修复（移除重定向外链直达）；已适配爱发电、百度、CSDN、豆瓣、码云、花瓣网、简书、掘金、力扣（Leetcode）、51CTO 博客、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、360 搜索、少数派、腾讯云开发者社区、微博、YouTube、语雀、知乎、知乎专栏

### Patch Changes

- 781526c: 修复 360 搜索
