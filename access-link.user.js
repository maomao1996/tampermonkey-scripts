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

;(function() {
  'use strict'
  function getQueryStringArgs(url) {
    if (url && url.indexOf('?') > -1) {
      var arr = url.split('?')
      var qs = arr[1],
        args = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length
      for (i = 0; i < len; i++) {
        item = items[i].split('=')
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])
        if (name.length) {
          args[name] = value
        }
      }
      return args
    }
    return {}
  }

  var params = getQueryStringArgs(location.search)
  var target = ''
  var url = ''

  function initParams(u, t) {
    url = u
    target = t
    return "<a href='" + u + "'>继续访问 - mm (3 秒后自动跳转)<a/>"
  }

  var fn = {
    'weixin110.qq.com'() {
      return (
        "<div class='weui-msg__text-area weui-btn-area weui-btn weui-btn_plain-primary'>" +
        initParams(params.url, '.weui-msg') +
        '</div>'
      )
    },
    'support.weixin.qq.com'() {
      return initParams(params.url, '#url')
    },
    'link.zhihu.com'() {
      return initParams(params.target, '.link')
    }
  }[location.hostname]
  var html = typeof fn === 'function' ? fn() : ''

  if (target && html && url) {
    $(target).after(html)
    setTimeout(function() {
      location.href = url
    }, 3000)
  }
})()
