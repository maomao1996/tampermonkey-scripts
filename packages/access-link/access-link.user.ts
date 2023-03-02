/*!
// ==UserScript==
// @name         跳转链接修复（移除重定向外链直达）
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      1.5.0
// @description  修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配百度搜索、360 搜索、知乎、知乎专栏、掘金、码云、开源中国、简书、CSDN、力扣（Leetcode）、语雀、微信开放社区、微博、牛客网、豆瓣、YouTube、花瓣网、51CTO 博客、少数派
// @author       maomao1996
// @include      *
// @grant        none
// ==/UserScript==
*/

;(() => {
  'use strict'

  /** 工具方法 - 验证 URL 是否有效 */
  const isUrl = (string: unknown): boolean => {
    if (typeof string !== 'string') {
      return false
    }
    try {
      new URL(string)
      return true
    } catch (err) {
      return false
    }
  }

  type Sites = {
    [key: string]: {
      /** 转换链接 */
      transform?: {
        /** 链接选择器 */
        selector: string
        /** 查询 url 的键名 */
        query?: string
        /** 分隔符 */
        separator?: string | RegExp
        /** 自定义转换规则 */
        customTransform?(node: HTMLElement): void
      }
      /** 自动跳转 */
      autojump?: {
        /** 跳转前的验证器 */
        validator?(): boolean
        /** 点击跳转的选择器  */
        click?: string
        /** 查询 url 的键名 */
        query?: string
        /** 分隔符 */
        separator?: string | RegExp
      }
    }
  }

  const SITES: Sites = {
    /**
     * 百度
     * https://www.baidu.com/s?wd=mmPlayer
     * https://www.baidu.com/s?wd=es6
     * https://www.baidu.com/s?wd=武林外传
     */
    'baidu.com': {
      transform: {
        selector: '#content_left > [mu]',
        customTransform(node) {
          const originUrl = node.getAttribute('mu')
          if (isUrl(originUrl) && !originUrl.includes('nourl.ubs.baidu.com')) {
            node.querySelectorAll('a[href]').forEach((a) => a.setAttribute('href', originUrl))
          }
        }
      }
    },
    /**
     * 360 搜索
     * https://www.so.com/s?q=mmPlayer
     * https://www.so.com/s?q=es6
     * https://www.so.com/s?q=武林外传
     */
    'so.com': {
      transform: {
        selector: '.result li.res-list',
        customTransform(node) {
          const originUrl = node.querySelector('a[data-mdurl]')?.getAttribute('data-mdurl')
          if (isUrl(originUrl)) {
            const isVideo = node.querySelector('[data-mohe-type="svideo_top"]')
            node
              .querySelectorAll(isVideo ? 'h3 a' : 'a')
              .forEach((a) => a.setAttribute('href', originUrl))
          }
        }
      }
    },
    /**
     * 知乎
     * https://www.zhihu.com/question/29380608/answer/65298472
     * https://link.zhihu.com/?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     * https://link.zhihu.com/?target=https%3A%2F%2Ffe-mm.com
     * https://zhuanlan.zhihu.com/p/472361432
     */
    'zhihu.com': {
      transform: { selector: '[href*="link.zhihu.com/?target="]' }
    },
    'zhuanlan.zhihu.com': {
      transform: { selector: '[href*="link.zhihu.com/?target="]' }
    },
    'link.zhihu.com': {
      autojump: {}
    },
    /**
     * 掘金
     * https://juejin.cn/post/6844903608622956557
     * https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     */
    'juejin.cn': {
      transform: { selector: '[href*="link.juejin.cn?target="]' }
    },
    'link.juejin.cn': {
      autojump: {}
    },
    /**
     * 码云
     * https://gitee.com/mirrors/vue-mmplayer
     * https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     */
    'gitee.com': {
      transform: { selector: '[href*="gitee.com/link?target="]' },
      autojump: { validator: () => pathname === '/link' }
    },
    /**
     * 开源中国
     * https://www.oschina.net/news/226616/fish-shell-be-rewritten-rust
     * https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     * https://my.oschina.net/dingdayu/blog/867680
     */
    'oschina.net': {
      transform: {
        selector: '[href*="oschina.net/action/GoToLink?url="]',
        separator: 'GoToLink?url='
      },
      autojump: {
        validator: () => pathname === '/action/GoToLink',
        query: 'url'
      }
    },
    'my.oschina.net': {
      transform: {
        selector: '[href*="oschina.net/action/GoToLink?url="]',
        separator: 'GoToLink?url='
      }
    },
    /**
     * 简书
     * https://www.jianshu.com/p/28788506c0da
     * https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     * https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Ffe-mm.com
     */
    'jianshu.com': {
      transform: {
        selector: '[href*="links.jianshu.com/go?to="]',
        separator: 'go?to='
      },
      autojump: { validator: () => pathname === '/go-wild', query: 'url' }
    },
    /**
     * CSDN
     * https://link.csdn.net/?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     */
    'link.csdn.net': {
      autojump: {}
    },
    /**
     * 力扣（Leetcode）
     * https://leetcode.cn/problems/merge-intervals/solutions/204805/chi-jing-ran-yi-yan-miao-dong-by-sweetiee/
     */
    'leetcode.cn': {
      transform: { selector: '[href*="/link/?target="]' }
    },
    /**
     * 语雀
     * https://www.yuque.com/r/goto?url=https%3A%2F%2Ffe-mm.com
     */
    'yuque.com': {
      autojump: { validator: () => pathname === '/r/goto', query: 'url' }
    },
    /**
     * 微信开放社区
     * https://developers.weixin.qq.com/community/develop/article/doc/000ecc775a86807f7ba9b7dc956c13
     * https://developers.weixin.qq.com/community/middlepage/href?href=https%3A%2F%2Ffe-mm.com
     */
    'developers.weixin.qq.com': {
      autojump: {
        validator: () => pathname === '/community/middlepage/href',
        query: 'href'
      }
    },
    /**
     * 微博
     * https://weibo.cn/sinaurl?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     * https://weibo.cn/sinaurl?u=https%3A%2F%2Ffe-mm.com
     */
    'weibo.cn': {
      autojump: { validator: () => pathname === '/sinaurl', query: 'u' }
    },
    /**
     * 牛客网
     * https://www.nowcoder.com/interview/center
     * https://www.nowcoder.com/discuss/451073381044064256
     * https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Ffe-mm.com
     * https://hd.nowcoder.com/link.html?target=https%3A%2F%2Ffe-mm.com
     */
    'nowcoder.com': {
      transform: {
        selector: [
          // 列表描述信息
          '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]',
          // 详情和弹窗
          '[href*="hd.nowcoder.com/link.html?target="]'
        ].join(','),
        separator: /\?target|link\=/
      }
    },
    'hd.nowcoder.com': {
      autojump: {}
    },
    /**
     * 豆瓣
     * https://www.douban.com/link2/?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     * https://www.douban.com/link2/?url=https%3A%2F%2Ffe-mm.com
     */
    'douban.com': {
      autojump: { validator: () => pathname === '/link2/', query: 'url' }
    },
    /**
     * YouTube
     * https://www.youtube.com/watch?v=c5vGiaTudPc
     */
    'youtube.com': {
      transform: {
        selector: '[href*="youtube.com/redirect?event="]',
        query: 'q'
      }
    },
    /**
     * 花瓣网
     * https://huaban.com/pins/5108412769
     */
    'huaban.com': {
      autojump: {
        validator: () => pathname === '/go',
        click: '.wrapper button.ant-btn'
      }
    },
    /**
     * 51CTO 博客
     * https://blog.51cto.com/bashrc/6042107
     */
    'blog.51cto.com': {
      autojump: {
        validator: () => pathname === '/transfer',
        separator: '?'
      }
    },
    /**
     * 少数派
     * https://sspai.com/post/71216
     * https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     * https://sspai.com/link?target=https%3A%2F%2Ffe-mm.com
     */
    'sspai.com': {
      transform: { selector: '[href*="sspai.com/link?target="]' },
      autojump: { validator: () => pathname === '/link' }
    }
  }

  const { hostname, pathname } = location
  const { transform, autojump } = SITES[hostname.replace(/^www\./, '')] || {}
  /* 转换链接 */
  if (transform) {
    const {
      selector,
      query,
      separator = '?target=',
      customTransform = (node: HTMLAnchorElement) => {
        const originUrl = query
          ? new URL(node.href).searchParams.get(query)
          : node.href.split(separator)[1]

        if (originUrl) {
          node.href = decodeURIComponent(originUrl)
        }
      }
    } = transform
    const observer = new MutationObserver(() => {
      document.querySelectorAll(selector).forEach(customTransform)
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  /* 自动跳转 */
  if (autojump) {
    const { validator, click, separator, query = 'target' } = autojump
    if (validator && !validator()) {
      return
    }
    if (click && document.querySelector(click)) {
      return (document.querySelector(click) as HTMLElement).click()
    }
    const originUrl = separator
      ? location.search.split(separator)[1]
      : new URLSearchParams(location.search).get(query)
    isUrl(originUrl) && location.replace(originUrl)
  }
})()
