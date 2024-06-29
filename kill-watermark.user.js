// ==UserScript==
// @name        杀死水印（Kill Watermark）
// @description 杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配360 智脑、腾讯文档、飞书、FreeBuf 网络安全行业门户、爱奇艺播放页（右上角 logo、暂停时的广告）、腾讯课堂播放页漂浮水印、哔哩哔哩直播左上角 logo、CSDN C 知道、腾讯视频播放页（右上角 logo、暂停时的弹窗广告）、优酷视频播放页（右上角 logo、暂停时的弹窗广告）、语雀
// @namespace   maomao1996.kill-watermark
// @version     0.10.1
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://v.qq.com/x/cover/*
// @match       *://*.iqiyi.com/*
// @match       *://v.youku.com/*
// @match       *://live.bilibili.com/*
// @match       *://ke.qq.com/course/*
// @match       *://*.yuque.com/*
// @match       *://docs.qq.com/*
// @match       *://so.csdn.net/*
// @match       *://*.feishu.cn/*
// @match       *://*.freebuf.com/*
// @match       *://chat.360.com/*
// @grant       GM_addStyle
// ==/UserScript==
!function() {
  "use strict";
  var t = "undefined" != typeof window;
  function e(t, e) {
    void 0 === e && (e = {});
    var r = e.insertAt;
    if (t && "undefined" != typeof document) {
      var o = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
      n.type = "text/css", "top" === r && o.firstChild ? o.insertBefore(n, o.firstChild) : o.appendChild(n), 
      n.styleSheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t));
    }
  }
  var r = '#nworld-app-container div>div[style*=pointer-events][style*="data:image/"]{display:none!important}';
  e(r);
  var o = [ "360 \u667a\u8111", "chat.360.com", {
    style: r
  } ], n = ".watermark-bg-wrapper{display:none!important}";
  e(n);
  var a = [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    style: n
  } ], i = ".print-watermark[style],.ssrWaterMark[style],.suite-clear[style]{display:none!important;height:0!important;width:0!important}";
  e(i);
  var l = [ "\u98de\u4e66", "feishu.cn", {
    style: i
  } ], s = [ "FreeBuf \u7f51\u7edc\u5b89\u5168\u884c\u4e1a\u95e8\u6237", "freebuf.com", {
    script: function() {
      document.querySelectorAll("img[large]").forEach((function(t) {
        var e = t.getAttribute("large");
        e && t.src !== e && (t.src = e);
      }));
    }
  } ], p = ".iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top,.zpc-watermark,iqpdiv.flash-max{display:none!important}iqpdiv.iqp-player-videolayer{height:100%!important;left:auto!important;top:auto!important;width:100%!important}";
  e(p);
  var u = [ "\u7231\u5947\u827a\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5e7f\u544a\uff09", /^(?:[^.]+\.)?iqiyi\.com$/, {
    style: p
  } ], c = '#loki-player div[style*="position: absolute;"]{display:none!important}';
  e(c);
  var y = [ "\u817e\u8baf\u8bfe\u5802\u64ad\u653e\u9875\u6f02\u6d6e\u6c34\u5370", "ke.qq.com", {
    style: c
  } ], m = ".web-player-icon-roomStatus{opacity:0!important}";
  e(m);
  var d = [ "\u54d4\u54e9\u54d4\u54e9\u76f4\u64ad\u5de6\u4e0a\u89d2 logo", "live.bilibili.com", {
    style: m
  } ], f = ".username_mask_cover[style]{display:none!important}";
  e(f);
  var v = [ "CSDN C \u77e5\u9053", "so.csdn.net", {
    style: f
  } ], h = "txpdiv.txp-watermark{opacity:0!important}[data-role=creative-player-pause-layer]{display:none!important}";
  e(h);
  var g = [ "\u817e\u8baf\u89c6\u9891\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5f39\u7a97\u5e7f\u544a\uff09", "v.qq.com", {
    style: h
  } ], b = "watermark-layer{opacity:0!important}#youku-pause-container{display:none!important}";
  e(b);
  var q = [ "\u4f18\u9177\u89c6\u9891\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5f39\u7a97\u5e7f\u544a\uff09", "v.youku.com", {
    style: b
  } ], w = "#main>div.wm{display:none!important}";
  e(w);
  var C = [ "\u8bed\u96c0", "yuque.com", {
    style: w
  } ], k = Object.freeze({
    __proto__: null,
    chat360Com: o,
    docsQqCom: a,
    feishuCn: l,
    freebufCom: s,
    iqiyiCom: u,
    keQqCom: y,
    liveBilibiliCom: d,
    soCsdnNet: v,
    vQqCom: g,
    vYoukuCom: q,
    yuqueCom: C
  });
  function S(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, o = new Array(e); r < e; r++) o[r] = t[r];
    return o;
  }
  function A(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, e) {
      var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != r) {
        var o, n, a = [], i = !0, l = !1;
        try {
          for (r = r.call(t); !(i = (o = r.next()).done) && (a.push(o.value), !e || a.length !== e); i = !0) ;
        } catch (t) {
          l = !0, n = t;
        } finally {
          try {
            i || null == r.return || r.return();
          } finally {
            if (l) throw n;
          }
        }
        return a;
      }
    }(t, e) || function(t, e) {
      if (!t) return;
      if ("string" == typeof t) return S(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === r && t.constructor && (r = t.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(r);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return S(t, e);
    }(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var x = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.hostname;
    return t ? e.replace(/^www\./, "") : "";
  }(), _ = Object.values(k).find((function(t) {
    var e = A(t, 2)[1];
    return "string" == typeof e ? x.includes(e) : e.test(x);
  }));
  if (_) {
    var j = _[2], B = j.style, E = j.script;
    B && GM_addStyle(B), "function" == typeof E && E();
  }
}();
