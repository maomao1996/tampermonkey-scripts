/*!
// ==UserScript==
// @name         跳转链接修复（移除重定向外链直达）
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      1.11.0
// @description  修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配百度搜索、360 搜索、知乎、知乎专栏、掘金、码云、开源中国、简书、CSDN、力扣（Leetcode）、语雀、微信开放社区、微博、牛客网、豆瓣、YouTube、花瓣网、51CTO 博客、少数派、PC 版 QQ、QQ 邮箱、微信、腾讯文档、腾讯云开发者社区、爱发电
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
        /** 获取跳转链接 */
        getOriginUrl?(): string
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
          /**
           * 特殊的链接：
           * 重定向 http://nourl.ubs.baidu.com/51270
           * 快捷搜索 http://28608.recommend_list.baidu.com
           */
          if (isUrl(originUrl) && !originUrl.includes('.baidu.com')) {
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
    },
    /**
     * QQ 邮箱
     * https://mail.qq.com/cgi-bin/readtemplate?gourl=https%3A%2F%2Fwww.jetbrains.com
     */
    'mail.qq.com': {
      autojump: {
        validator: () => pathname === '/cgi-bin/readtemplate',
        click: 'div.c-footer a.c-footer-a1',
        query: 'gourl'
      }
    },
    /**
     * PC 版 QQ
     * https://c.pc.qq.com/middlem.html?pfurl=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     */
    'c.pc.qq.com': {
      autojump: {
        validator: () => pathname === '/middlem.html',
        query: 'pfurl'
      }
    },
    /**
     * 微信
     * 无跳转按钮
     * https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi?midpagecode=e2faa0ee03e19e6efecf869b7f9ca0522c68d4854df6fbfa04376e4e5a76fb68051eaf8948fea39790a1cd7df4a64a26&bancode=89d3568371f79149d12922166481d28a6da76ea9bfcc9e3cdaf42f8eede7f10b
     * 有跳转按钮
     * https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi?midpagecode=67377a2adb44e17c1b0adb24b5cf2bd12c34d9b56e06ccd6dd4c291b423b5bd7ff6dabdc557c992f5d60d892b6870f746be01453da89926dc75a288449d95675652f50f2dd8613b8c0898d7a4ff50cd6a8a6ee035f2795d1b47d37610595ed36a216a3feb0e7c625dacf7da1ce72ca0d27ebe250ee33a4fffe70fb8109ce95d1&bancode=bd156c95934ef352f7478771d0b739c7d1d06b36a093e9591226c240bbb591b4
     */
    'weixin110.qq.com': {
      autojump: {
        validator: () => pathname === '/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi',
        getOriginUrl: () =>
          document.querySelector<HTMLElement>('.weui-msg p.weui-msg__desc').textContent,
        click: 'a.weui-btn.weui-btn_default'
      }
    },
    /**
     * 腾讯文档
     * https://docs.qq.com/doc/DTUtISURFbFN3RFVu
     * https://docs.qq.com/scenario/link.html?url=https%3A%2F%2Fnotes.fe-mm.com
     */
    'docs.qq.com': {
      autojump: {
        validator: () => pathname === '/scenario/link.html',
        // click: '.url-tips .url-click',
        query: 'url'
      }
    },
    /**
     * 腾讯云开发者社区
     * https://cloud.tencent.com/developer/article/1829900
     * https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     */
    'cloud.tencent.com': {
      autojump: {
        validator: () => pathname === '/developer/tools/blog-entry'
        // click: '.mod-external-link-btn a'
      }
    },
    /**
     * 爱发电
     * https://afdian.net/a/evanyou
     * https://afdian.net/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
     * https://afdian.net/link?target=https%3A%2F%2Ffe-mm.com
     */
    'afdian.net': {
      transform: { selector: '[href*="afdian.net/link?target="]' },
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
    const { validator, getOriginUrl, click, separator, query = 'target' } = autojump
    if (validator && !validator()) {
      return
    }
    if (typeof getOriginUrl === 'function') {
      const originUrl = getOriginUrl()
      if (isUrl(originUrl)) return location.replace(originUrl)
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
