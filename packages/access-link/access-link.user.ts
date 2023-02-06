/*!
// ==UserScript==
// @name         跳转链接修复（外链直达）
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      1.1.0
// @description  修复跳转链接为站外直链，免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配百度、知乎、知乎专栏、掘金、码云、开源中国、简书、CSDN、力扣（Leetcode）、语雀、微信开放社区、微博
// @author       maomao1996
// @include      *
// @grant        none
// ==/UserScript==
*/

;(() => {
  'use strict'

  type Sites = {
    [key: string]: {
      /* 转换链接 */
      transform?: {
        selector: string
        separator?: string
        customTransform?(node: HTMLElement): void
      }
      /* 自动跳转 */
      autojump?: {
        validator?(): boolean
        query?: string
      }
    }
  }

  const SITES: Sites = {
    /**
     * 百度
     * https://www.baidu.com/s?wd=mmPlayer
     */
    'baidu.com': {
      transform: {
        selector: '#content_left > div',
        customTransform(node) {
          const originUrl = node.getAttribute('mu')
          originUrl && node.querySelector('a').setAttribute('href', originUrl)
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
    }
  }

  const { hostname, pathname } = location
  const { transform, autojump } = SITES[hostname.replace(/^www\./, '')]
  /* 转换链接 */
  if (transform) {
    const {
      selector,
      separator = '?target=',
      customTransform = (node: HTMLAnchorElement) => {
        const [, originUrl] = node.href.split(separator)
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
    const { validator, query = 'target' } = autojump
    if (validator && !validator()) {
      return
    }
    const originUrl = new URLSearchParams(location.search).get(query)
    originUrl && location.replace(originUrl)
  }
})()
