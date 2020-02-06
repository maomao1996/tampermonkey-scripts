// ==UserScript==
// @name         跳转链接修复
// @namespace    https://github.com/maomao1996/access-link
// @version      0.2.0
// @description  为知乎、微信拦截页面增加跳转按钮（支持3秒后自动跳转）
// @author       maomao1996
// @include      *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/*
// @include      *://support.weixin.qq.com/cgi-bin/mmsupport-bin/*
// @include      *://link.zhihu.com/*
// @grant        none
// @require		 https://cdn.jsdelivr.net/npm/jquery@v3.4.1
// ==/UserScript==

interface Params {
  url?: string
  target?: string
  [key: string]: any
}

;(() => {
  'use strict'
  function getQueryStringArgs(url: string): Params {
    if (url && url.indexOf('?') > -1) {
      const arr = url.split('?')
      const qs = arr[1]
      const args: Params = {}
      const items: string[] = qs.length ? qs.split('&') : []
      for (let i = 0; i < items.length; i++) {
        const item = items[i].split('=')
        const key = decodeURIComponent(item[0])
        const value = decodeURIComponent(item[1])
        if (key.length) {
          args[key] = value
        }
      }
      return args
    }
    return {}
  }

  const params = getQueryStringArgs(location.search)
  let target: string = ''
  let url: string = ''

  function initParams(u: string, t: string): string {
    url = u
    target = t
    return "<a href='" + u + "'>继续访问 - mm (3 秒后自动跳转)<a/>"
  }

  const fns = {
    'weixin110.qq.com'() {
      return (
        "<div class='weui-msg__text-area weui-btn-area weui-btn weui-btn_plain-primary'>" +
        initParams(params.url!, '.weui-msg') +
        '</div>'
      )
    },
    'support.weixin.qq.com'() {
      return initParams(params.url!, '#url')
    },
    'link.zhihu.com'() {
      return initParams(params.target!, '.link')
    }
  }

  const fn = fns[location.hostname]
  const html: string = typeof fn === 'function' ? fn() : ''

  if (target && html && url) {
    $(target).after(html)
    setTimeout(() => {
      location.href = url
    }, 3000)
  }
})()
