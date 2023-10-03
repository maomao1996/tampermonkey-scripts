# tampermonkey-scripts

油猴插件库（记录茂茂开发的油猴插件）如果觉得不错，欢迎 [**star**](https://github.com/maomao1996/tampermonkey-scripts) 和 [支持作者](#支持作者)

**使用前请确保已先安装 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**

- [GitHub 仓库](https://github.com/maomao1996/tampermonkey-scripts)
- [Greasy Fork 主页](https://greasyfork.org/zh-CN/users/440613)
- [茂茂物语](https://notes.fe-mm.com)

## 脚本列表

| 脚本                                                        | 版本                                                                      | 描述                                                                                                                                     | 安装                                                                                                                                                            |
| :---------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [删除水印（Kill Watermark）](/packages/kill-watermark)      | ![删除水印（Kill Watermark）](https://img.shields.io/greasyfork/v/459646) | 移除烦人的水印，还你一个干净清爽的页面<br />详细功能描述请点击脚本标题或查看 [更新日志 CHANGELOG](/packages/kill-watermark/CHANGELOG.md) | [GreasyFork](https://greasyfork.org/zh-CN/scripts/459646)<br />[GitHub](https://github.com/maomao1996/tampermonkey-scripts/raw/gh-pages/kill-watermark.user.js) |
| [移除重定向（外链直达）](#access-link-跳转链接修复外链直达) | ![移除重定向（外链直达）](https://img.shields.io/greasyfork/v/395970)     | 修复跳转链接为站外直链，免去拦截页面点击步骤可直达站外；拦截页面自动跳转                                                                 | [greasyfork](https://greasyfork.org/zh-CN/scripts/395970)                                                                                                       |
| [115 小助手](#115-helper-115-小助手)                        | ![115 小助手](https://img.shields.io/greasyfork/v/413142)                 | 115 网盘体验增强（还原顶部菜单栏链接任务入口、一键搜索、SHA1 快速查重/自动查重、删除空文件夹、列表显示文件 SHA1 信息）                   | [greasyfork](https://greasyfork.org/zh-CN/scripts/413142)                                                                                                       |
| [慕课网小助手](#imooc-helper-慕课小助手)                    | ![慕课网小助手](https://img.shields.io/greasyfork/v/396378)               | 问答区快速查看问答详情、自动播放下一节视频                                                                                               | [greasyfork](https://greasyfork.org/zh-CN/scripts/396378)                                                                                                       |
| [贴吧小助手](#tieba-helper-贴吧小助手)                      | ![贴吧小助手](https://img.shields.io/greasyfork/v/419001)                 | 自动顶贴回复、移除广告和碍眼模块                                                                                                         | [greasyfork](https://greasyfork.org/zh-CN/scripts/419001)                                                                                                       |
| [黑白网页颜色还原](#color-restore-黑白网页颜色还原)         | ![贴吧小助手](https://img.shields.io/greasyfork/v/455825)                 | 移除灰度滤镜，还你一个五彩斑斓的网页                                                                                                     | [greasyfork](https://greasyfork.org/zh-CN/scripts/455825)                                                                                                       |
| [ChatGPT 小助手](#chatgpt-helper-chatgpt-小助手)            | ![贴吧小助手](https://img.shields.io/greasyfork/v/462447)                 | 添加快捷指令（prompts）                                                                                                                  | [greasyfork](https://greasyfork.org/zh-CN/scripts/462447)                                                                                                       |

## 115-helper 115 小助手

![115-helper](https://img.shields.io/greasyfork/v/413142)

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

![imooc-helper](https://img.shields.io/greasyfork/v/396378)

[安装 imooc-helper](https://greasyfork.org/zh-CN/scripts/396378)

- [x] 问答区快速查看问答详情
- [x] 自动播放下一节视频

## tieba-helper 贴吧小助手

![tieba-helper](https://img.shields.io/greasyfork/v/419001)

[安装 tieba-helper](https://greasyfork.org/zh-CN/scripts/419001)

- [x] 自动顶贴回复（通过模拟点击触发）
- [x] 移除贴吧列表和帖子内部广告
- [x] 移除碍眼模块（会员、app 下载等）

当帖子没有评论时，直接回复楼主会刷新页面，需要再次开启自动顶贴回复

## access-link 跳转链接修复（外链直达）

![access-link](https://img.shields.io/greasyfork/v/395970)

[安装 access-link](https://greasyfork.org/zh-CN/scripts/395970)

- [x] 修复跳转链接为站外直链，免去拦截页面点击步骤可直达站外
- [x] 拦截页面自动跳转

> **已适配站点**

- [x] 百度搜索
- [x] 360 搜索
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
- [x] 牛客网
- [x] 豆瓣
- [x] 少数派

## color-restore 黑白网页颜色还原

![color-restore](https://img.shields.io/greasyfork/v/455825)

[安装 color-restore](https://greasyfork.org/zh-CN/scripts/455825)

移除灰度滤镜，还你一个五彩斑斓的网页

- [x] 移除使用 `CSS filter` 的所有站点
- [x] 只移除 `grayscale` （灰度）滤镜，保留其他滤镜
- [x] 支持移除动态元素的灰度滤镜（支持 SPA 应用）

## chatgpt-helper ChatGPT 小助手

![chatgpt-helper](https://img.shields.io/greasyfork/v/462447)

[安装 chatgpt-helper](https://greasyfork.org/zh-CN/scripts/462447)

> 暂时只适配了官方站点（如有其他热门站点欢迎反馈）

- 添加快捷指令（prompts）

**感谢**：

指令来源于 [ChatGPT 中文调教指南](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)

## 参与贡献

你好！我真的很高兴您有兴趣为 tampermonkey-scripts 做出贡献。在提交您的贡献之前，请务必花点时间阅读[贡献指南](/.github/CONTRIBUTING.md)

## 支持作者

如果你喜欢 `tampermonkey-scripts` 中的插件，并且它对你确实有帮助，欢迎给我打赏一杯咖啡哈~

**支付宝：**

<img src="https://cdn.jsdelivr.net/gh/maomao1996/picture/sponsor/alipay.jpg" width="200" alt="支付宝" />

**微信：**

<img src="https://cdn.jsdelivr.net/gh/maomao1996/picture/sponsor/wechat.jpg" width="200" alt="微信" />
