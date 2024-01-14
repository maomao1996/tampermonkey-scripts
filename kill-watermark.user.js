// ==UserScript==
// @name        杀死水印（Kill Watermark）
// @description 杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配360 智脑、腾讯文档、飞书、FreeBuf 网络安全行业门户、稿定设计、爱奇艺播放页（右上角 logo、暂停时的广告）、腾讯课堂播放页漂浮水印、哔哩哔哩直播左上角 logo、CSDN C 知道、腾讯视频播放页（右上角 logo、暂停时的弹窗广告）、优酷视频播放页（右上角 logo、暂停时的弹窗广告）、语雀
// @namespace   maomao1996.kill-watermark
// @version     0.9.2
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
// @match       *://so.csdn.net/*
// @match       *://*.feishu.cn/*
// @match       *://chat.360.com/*
// @grant       GM_addStyle
// ==/UserScript==
!function() {
  "use strict";
  var t = "undefined" != typeof window;
  var e = [ "360 \u667a\u8111", "chat.360.com", {
    style: '#nworld-app-container div>div[style*=pointer-events][style*="data:image/"]{display:none!important}'
  } ], o = [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    style: ".watermark-bg-wrapper{display:none!important}"
  } ], r = [ "\u98de\u4e66", "feishu.cn", {
    style: ".print-watermark[style],.ssrWaterMark[style],.suite-clear[style]{display:none!important;height:0!important;width:0!important}"
  } ], n = [ "FreeBuf \u7f51\u7edc\u5b89\u5168\u884c\u4e1a\u95e8\u6237", "freebuf.com", {
    script: function() {
      document.querySelectorAll("img[large]").forEach((function(t) {
        var e = t.getAttribute("large");
        e && t.src !== e && (t.src = e);
      }));
    }
  } ], i = [ "\u7a3f\u5b9a\u8bbe\u8ba1", "gaoding.com", {
    style: '.editor-canvas div[style*="pointer-events: none !important"][style*="visibility: visible !important"][style*=background]{clip-path:circle(0)!important}'
  } ], a = [ "\u7231\u5947\u827a\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5e7f\u544a\uff09", "iqiyi.com", {
    style: ".iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top,iqpdiv.flash-max{display:none!important}iqpdiv.iqp-player-videolayer{height:100%!important;left:auto!important;top:auto!important;width:100%!important}"
  } ], l = [ "\u817e\u8baf\u8bfe\u5802\u64ad\u653e\u9875\u6f02\u6d6e\u6c34\u5370", "ke.qq.com", {
    style: '#loki-player div[style*="position: absolute;"]{display:none!important}'
  } ], s = [ "\u54d4\u54e9\u54d4\u54e9\u76f4\u64ad\u5de6\u4e0a\u89d2 logo", "live.bilibili.com", {
    style: ".web-player-icon-roomStatus{opacity:0!important}"
  } ], p = [ "CSDN C \u77e5\u9053", "so.csdn.net", {
    style: ".username_mask_cover[style]{display:none!important}"
  } ], u = [ "\u817e\u8baf\u89c6\u9891\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5f39\u7a97\u5e7f\u544a\uff09", "v.qq.com", {
    style: "txpdiv.txp-watermark{opacity:0!important}[data-role=creative-player-pause-layer]{display:none!important}"
  } ], y = [ "\u4f18\u9177\u89c6\u9891\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5f39\u7a97\u5e7f\u544a\uff09", "v.youku.com", {
    style: "watermark-layer{opacity:0!important}#youku-pause-container{display:none!important}"
  } ], c = [ "\u8bed\u96c0", "yuque.com", {
    style: "#main>div.wm{display:none!important}"
  } ], m = Object.freeze({
    __proto__: null,
    chat360Com: e,
    docsQqCom: o,
    feishuCn: r,
    freebufCom: n,
    gaodingCom: i,
    iqiyiCom: a,
    keQqCom: l,
    liveBilibiliCom: s,
    soCsdnNet: p,
    vQqCom: u,
    vYoukuCom: y,
    yuqueCom: c
  });
  function d(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var o = 0, r = new Array(e); o < e; o++) r[o] = t[o];
    return r;
  }
  function f(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, e) {
      var o = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != o) {
        var r, n, i = [], a = !0, l = !1;
        try {
          for (o = o.call(t); !(a = (r = o.next()).done) && (i.push(r.value), !e || i.length !== e); a = !0) ;
        } catch (t) {
          l = !0, n = t;
        } finally {
          try {
            a || null == o.return || o.return();
          } finally {
            if (l) throw n;
          }
        }
        return i;
      }
    }(t, e) || function(t, e) {
      if (!t) return;
      if ("string" == typeof t) return d(t, e);
      var o = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === o && t.constructor && (o = t.constructor.name);
      if ("Map" === o || "Set" === o) return Array.from(o);
      if ("Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return d(t, e);
    }(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var v = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.hostname;
    return t ? e.replace(/^www\./, "") : "";
  }(), g = Object.values(m).find((function(t) {
    var e = f(t, 2)[1];
    return "string" == typeof e ? v.includes(e) : e.test(v);
  }));
  if (g) {
    var b = g[2], h = b.style, q = b.script;
    h && GM_addStyle(h), "function" == typeof q && q();
  }
}();
