// ==UserScript==
// @name        杀死水印（Kill Watermark）
// @description 杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频播放页 logo 和暂停时的弹窗广告、爱奇艺播放页 logo 和暂停时的广告、优酷播放页 logo、哔哩哔哩直播 logo、腾讯课堂、语雀、腾讯文档、CSDN C 知道、飞书、FreeBuf 网络安全行业门户
// @namespace   maomao1996.kill-watermark
// @version     0.7.0
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
// @grant       GM_addStyle
// ==/UserScript==
!function() {
  "use strict";
  var t = location.hostname.replace(/^www\./, ""), e = [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    style: ".watermark-bg-wrapper{display:none!important}"
  } ], r = [ "\u98de\u4e66", "feishu.cn", {
    style: ".print-watermark[style],.ssrWaterMark[style],.suite-clear[style]{display:none!important;height:0!important;width:0!important}"
  } ], o = [ "FreeBuf \u7f51\u7edc\u5b89\u5168\u884c\u4e1a\u95e8\u6237", "freebuf.com", {
    script: function() {
      document.querySelectorAll("img[large]").forEach((function(t) {
        var e = t.getAttribute("large");
        e && t.src !== e && (t.src = e);
      }));
    }
  } ], i = [ "\u7a3f\u5b9a\u8bbe\u8ba1", "gaoding.com", {
    style: ".editor-watermark{display:none!important;filter:opacity(0)!important;z-index:-1996!important}"
  } ], n = [ "\u7231\u5947\u827a\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5e7f\u544a\uff09", "iqiyi.com", {
    style: ".iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top,iqpdiv.flash-max{display:none!important}iqpdiv.iqp-player-videolayer{height:100%!important;left:auto!important;top:auto!important;width:100%!important}"
  } ], a = [ "\u817e\u8baf\u8bfe\u5802\u64ad\u653e\u9875\u6f02\u6d6e\u6c34\u5370", "ke.qq.com", {
    style: '#loki-player div[style*="position: absolute;"]{display:none!important}'
  } ], l = [ "\u54d4\u54e9\u54d4\u54e9\u76f4\u64ad\u5de6\u4e0a\u89d2 logo", "live.bilibili.com", {
    style: ".web-player-icon-roomStatus{opacity:0!important}"
  } ], p = [ "CSDN C \u77e5\u9053", "so.csdn.net", {
    style: ".username_mask_cover[style]{display:none!important}"
  } ], s = [ "\u817e\u8baf\u89c6\u9891\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5f39\u7a97\u5e7f\u544a\uff09", "v.qq.com", {
    style: "txpdiv.txp-watermark{opacity:0!important}[data-role=creative-player-pause-layer]{display:none!important}"
  } ], u = [ "\u4f18\u9177\u64ad\u653e\u9875 logo", "v.youku.com", {
    style: "watermark-layer{opacity:0!important}"
  } ], m = [ "\u8bed\u96c0", "yuque.com", {
    style: "#main>div.wm{display:none!important}"
  } ], y = Object.freeze({
    __proto__: null,
    docsQqCom: e,
    feishuCn: r,
    freebufCom: o,
    gaodingCom: i,
    iqiyiCom: n,
    keQqCom: a,
    liveBilibiliCom: l,
    soCsdnNet: p,
    vQqCom: s,
    vYoukuCom: u,
    yuqueCom: m
  });
  function c(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, o = new Array(e); r < e; r++) o[r] = t[r];
    return o;
  }
  function f(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, e) {
      var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != r) {
        var o, i, n = [], a = !0, l = !1;
        try {
          for (r = r.call(t); !(a = (o = r.next()).done) && (n.push(o.value), !e || n.length !== e); a = !0) ;
        } catch (t) {
          l = !0, i = t;
        } finally {
          try {
            a || null == r.return || r.return();
          } finally {
            if (l) throw i;
          }
        }
        return n;
      }
    }(t, e) || function(t, e) {
      if (!t) return;
      if ("string" == typeof t) return c(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === r && t.constructor && (r = t.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(r);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return c(t, e);
    }(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var d = Object.values(y).find((function(e) {
    var r = f(e, 2)[1];
    return "string" == typeof r ? t.includes(r) : r.test(t);
  }));
  if (d) {
    var v = d[2], g = v.style, b = v.script;
    g && GM_addStyle(g), "function" == typeof b && b();
  }
}();
