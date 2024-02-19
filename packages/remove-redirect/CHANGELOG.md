# remove-redirect

## 2.5.0

### Minor Changes

- 5c75d6c: `queryName` 支持传入数组

### Patch Changes

- d69378a: 修复 pixiv 链接转换错误 [#18](https://github.com/maomao1996/tampermonkey-scripts/issues/15)

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
