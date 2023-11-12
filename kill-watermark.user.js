// ==UserScript==
// @name        杀死水印（Kill Watermark）
// @description 杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频播放页 logo 和暂停时的弹窗广告、爱奇艺播放页 logo 和暂停时的广告、优酷播放页 logo、哔哩哔哩直播 logo、腾讯课堂、语雀、腾讯文档、CSDN C 知道、飞书
// @namespace   maomao1996.kill-watermark
// @version     0.6.0
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://*.gaoding.com/*
// @match       *://v.qq.com/x/cover/*
// @match       *://www.iqiyi.com/*
// @match       *://v.youku.com/*
// @match       *://live.bilibili.com/*
// @match       *://ke.qq.com/course/*
// @match       *://*.yuque.com/*
// @match       *://docs.qq.com/*
// @match       *://so.csdn.net/so/*
// @match       *://*.feishu.cn/*
// @grant       GM_addStyle
// ==/UserScript==
!function() {
  "use strict";
  var t = [ [ "docs.qq.com", ".watermark-bg-wrapper{display:none!important}" ], [ "feishu.cn", ".print-watermark[style],.ssrWaterMark[style],.suite-clear[style]{display:none!important;height:0!important;width:0!important}" ], [ "gaoding.com", ".editor-watermark{display:none!important;filter:opacity(0)!important;z-index:-1996!important}" ], [ "iqiyi.com", ".iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top,iqpdiv.flash-max{display:none!important}iqpdiv.iqp-player-videolayer{height:100%!important;left:auto!important;top:auto!important;width:100%!important}" ], [ "ke.qq.com", '#loki-player div[style*="position: absolute;"]{display:none!important}' ], [ "live.bilibili.com", ".web-player-icon-roomStatus{opacity:0!important}" ], [ "so.csdn.net", ".username_mask_cover[style]{display:none!important}" ], [ "v.qq.com", "txpdiv.txp-watermark{opacity:0!important}[data-role=creative-player-pause-layer]{display:none!important}" ], [ "v.youku.com", "watermark-layer{opacity:0!important}" ], [ "yuque.com", "#main>div.wm{display:none!important}" ] ];
  function r(t, r) {
    (null == r || r > t.length) && (r = t.length);
    for (var n = 0, o = new Array(r); n < r; n++) o[n] = t[n];
    return o;
  }
  function n(t, n) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, r) {
      var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != n) {
        var o, a, e = [], i = !0, l = !1;
        try {
          for (n = n.call(t); !(i = (o = n.next()).done) && (e.push(o.value), !r || e.length !== r); i = !0) ;
        } catch (t) {
          l = !0, a = t;
        } finally {
          try {
            i || null == n.return || n.return();
          } finally {
            if (l) throw a;
          }
        }
        return e;
      }
    }(t, n) || function(t, n) {
      if (!t) return;
      if ("string" == typeof t) return r(t, n);
      var o = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === o && t.constructor && (o = t.constructor.name);
      if ("Map" === o || "Set" === o) return Array.from(o);
      if ("Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return r(t, n);
    }(t, n) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var o = location.hostname, a = t.find((function(t) {
    var r = n(t, 1)[0];
    return o.includes(r);
  }));
  if (a) {
    var e = n(a, 2)[1];
    e && GM_addStyle(e);
  }
}();
