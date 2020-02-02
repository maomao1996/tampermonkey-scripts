// ==UserScript==
// @name         跳转链接修复
// @namespace    https://github.com/maomao1996/access-link
// @version      0.1
// @description  为知乎、微信拦截页面增加跳转按钮
// @author       maomao1996
// @include      *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/*
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
  var hostname = location.hostname
  var html = ''
  var target = ''
  switch (hostname) {
    case 'weixin110.qq.com':
      html =
        "<div class='weui-msg__text-area weui-btn-area'><a class='weui-btn weui-btn_plain-primary' href='" +
        params.url +
        "'>继续访问 - mm<a/></div>"
      target = '.weui-msg'
      break
    case 'link.zhihu.com':
      html = "<a href='" + params.target + "'>继续访问 - mm<a/>"
      target = '.link'
      break
    default:
      break
  }

  if (target) {
    $(target).after(html)
  }
})()
