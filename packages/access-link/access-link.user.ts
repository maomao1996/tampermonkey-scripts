/*!
// ==UserScript==
// @name         跳转链接修复（外链直达）
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      1.0.0
// @description  修复跳转链接为站外直链，免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配知乎、掘金、码云、简书、CSDN
// @author       maomao1996
// @include      *
// @grant        none
// ==/UserScript==
*/

;(() => {
  'use strict'

  type Sites = {
    [key: string]: {
      /* 类型: 转换 自动跳转 */
      type?: 'transform' | 'autojump'
      selector?: string
      separator?: string
      query?: string
    }
  }

  const SITES: Sites = {
    /* 知乎 */
    'www.zhihu.com': {
      selector: '[href*="link.zhihu.com/?target="]'
    },
    'link.zhihu.com': {
      type: 'autojump'
    },
    /* 掘金 */
    'juejin.cn': {
      selector: '[href*="link.juejin.cn?target="]'
    },
    'link.juejin.cn': {
      type: 'autojump'
    },
    /* 码云 */
    'gitee.com': {
      selector: '[href*="gitee.com/link?target="]'
    },
    /* 简书 */
    'www.jianshu.com': {
      selector: '[href*="links.jianshu.com/go?to="]',
      separator: 'go?to='
    },
    /* CSDN */
    'link.csdn.net': {
      type: 'autojump'
    }
  }

  const { hostname } = location
  const {
    selector,
    type = 'transform',
    separator = '?target=',
    query = 'target'
  } = SITES[hostname]

  if (type === 'autojump') {
    /* 自动跳转 */
    const originUrl = new URLSearchParams(location.search).get(query)
    originUrl && location.replace(originUrl)
  } else if (selector) {
    /* 转换链接 */
    const observer = new MutationObserver(() => {
      document.querySelectorAll(selector).forEach((node: HTMLAnchorElement) => {
        const [, originUrl] = node.href.split(separator)
        if (originUrl) {
          node.href = decodeURIComponent(originUrl)
        }
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }
})()
