# tampermonkey-scripts

油猴插件库

使用前请确保已先安装 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

- [tampermonkey-scripts](#tampermonkey-scripts)
  - [115-helper 115 小助手](#115-helper-115-小助手)
  - [imooc-helper 慕课小助手](#imooc-helper-慕课小助手)
  - [tieba-helper 贴吧小助手](#tieba-helper-贴吧小助手)
  - [access-link 跳转链接修复（外链直达）](#access-link-跳转链接修复外链直达)
  - [color-restore 黑白网页颜色还原](#color-restore-黑白网页颜色还原)
  - [油猴 API 文档](#油猴-api-文档)
  - [赞助](#赞助)

## 115-helper 115 小助手

[安装 115-helper](https://greasyfork.org/zh-CN/scripts/413142)

- [x] 自定义插件设置
- [x] 还原顶部菜单栏链接任务入口
- [x] SHA1 快速查重（新页面打开）
- [x] SHA1 查重列表支持选中第一个元素
- [x] SHA1 自动查重（只查询当前页码目录中的文件）
- [x] 删除空文件夹（只删除当前页码目录中的文件夹）
- [x] 一键搜索
- [x] 单文件夹查重
- [x] 列表显示文件 SHA1 信息
- [x] 侧边栏关闭
- [x] 悬浮菜单支持新标签页打开文件夹
- [x] 悬浮菜单移除图标
- [x] 加速转码

## imooc-helper 慕课小助手

[安装 imooc-helper](https://greasyfork.org/zh-CN/scripts/396378)

- [x] 问答区快速查看问答详情
- [x] 自动播放下一节视频

## tieba-helper 贴吧小助手

[安装 tieba-helper](https://greasyfork.org/zh-CN/scripts/419001)

- [x] 自动顶贴回复（通过模拟点击触发）
- [x] 移除贴吧列表和帖子内部广告
- [x] 移除碍眼模块（会员、app 下载等）

当帖子没有评论时，直接回复楼主会刷新页面，需要再次开启自动顶贴回复

## access-link 跳转链接修复（外链直达）

[安装 access-link](https://greasyfork.org/zh-CN/scripts/395970)

- [x] 修复跳转链接为站外直链，免去拦截页面点击步骤可直达站外
- [x] 拦截页面自动跳转

> **已适配站点**

- [x] 百度
- [x] 知乎
- [x] 知乎专栏
- [x] 掘金
- [x] 码云
- [x] 开源中国
- [x] 简书
- [x] CSDN
- [x] 力扣（Leetcode）
- [x] 语雀
- [x] 微信开放社区
- [x] 微博

## color-restore 黑白网页颜色还原

[安装 color-restore](https://greasyfork.org/zh-CN/scripts/455825)

移除灰度滤镜，还你一个五彩斑斓的网页

- [x] 移除使用 `CSS filter` 的所有站点
- [x] 只移除 `grayscale` （灰度）滤镜，保留其他滤镜
- [x] 支持移除动态元素的灰度滤镜（支持 SPA 应用）

## 油猴 API 文档

<https://www.tampermonkey.net/documentation.php?ext=dhdg&locale=zh>

## 赞助

如果你喜欢 `tampermonkey-scripts` 中的插件，并且它对你确实有帮助，欢迎给我打赏一杯咖啡哈~

**支付宝：**

<img src="https://cdn.jsdelivr.net/gh/maomao1996/picture/sponsor/alipay.jpg" width="200" alt="支付宝" />

**微信：**

<img src="https://cdn.jsdelivr.net/gh/maomao1996/picture/sponsor/wechat.jpg" width="200" alt="微信" />
