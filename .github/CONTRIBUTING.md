# tampermonkey-scripts 贡献指南

你好！我真的很高兴您有兴趣为 tampermonkey-scripts 做出贡献。在提交您的贡献之前，请务必花点时间阅读以下指南：

- [tampermonkey-scripts 贡献指南](#tampermonkey-scripts-贡献指南)
  - [问题反馈](#问题反馈)
  - [项目结构](#项目结构)
  - [开发环境](#开发环境)
    - [常用的 NPM 脚本](#常用的-npm-脚本)
    - [CHANGELOG 更新日志规范](#changelog-更新日志规范)
    - [commit message 规范](#commit-message-规范)

## 问题反馈

使用 <https://github.com/maomao1996/tampermonkey-scripts/issues/new/choose> 创建 issues

## 项目结构

- **srcipts**：项目脚本目录
  - `create.js`：用于创建新的油猴脚本库
- **packages**：油猴脚本目录
- **shared**：公共库目录
  - `rollup-config`：`rollup` 基础配置
  - `tsconfig`：`tsconfig.json` 基础配置
  - `types`：全局的类型注解（主要为油猴插件的全局方法）
- **greasyfork**：修改的第三方库
- **legacy**：老版本的脚本目录（可以忽略）

## 开发环境

- [Node.js 版本 v18+](https://nodejs.org/zh-cn)
- [pnpm v8+](https://pnpm.io/zh/cli/start)
- [ni](https://github.com/antfu/ni)（可选）

在 clone 本仓库后，运行

```sh
pnpm i
```

### 常用的 NPM 脚本

```sh
# 启动开发环境，构建生成 dist-dev
pnpm run dev

# 构建生成 dist
pnpm run build

# 创建新的油猴脚本
pnpm run create-package
```

### CHANGELOG 更新日志规范

在修改了 `packages` 目录下的代码后，需运行

```sh
pnpm run changeset
```

1. 选择脚本
2. `feat`：选择 `minor`；其他选 `patch`

最后在 `.changeset` 下生成的文件需提交到 `git`

### commit message 规范

> `git commit message` 的格式

```sh
<type>(<scope>): <subject>

<body>

<footer>
```

- `type`（必填）：`commit` 的类型
- `scope`（选填）：`commit` 的影响范围（）
- `subject`（必填）：`commit` 信息的简短描述（50 字以内）

> 举个 🌰

```sh
feat(kill-watermark): 适配腾讯课堂播放页
```

- `feat`：表示新功能
- `kill-watermark`：为修改的脚本目录名
- `适配腾讯课堂播放页`：为简短描述

- [参考 commit](https://github.com/maomao1996/tampermonkey-scripts/commit/dc70ff18a56a914569a479e2c8894caa955056e7)
- 具体 `type` 和说明请阅读 [Git 提交规范 | 茂茂物语](https://notes.fe-mm.com/workflow/style-guide#git-%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83)
