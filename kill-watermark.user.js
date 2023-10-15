// ==UserScript==
// @name        杀死水印（Kill Watermark）
// @description 杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频、爱奇艺、优酷、哔哩哔哩直播、腾讯课堂、语雀、腾讯文档、CSDN C 知道
// @namespace   maomao1996.kill-watermark
// @version     0.4.0
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
// @grant       GM_addStyle
// ==/UserScript==
(function() {
  "use strict";
  var r = ".watermark-bg-wrapper{display:none!important}";
  var t = ".editor-watermark{display:none!important;filter:opacity(0)!important;z-index:-1996!important}";
  var a = ".iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top{display:none!important}";
  var e = '#loki-player div[style*="position: absolute;"]{display:none!important}';
  var o = ".web-player-icon-roomStatus{opacity:0!important}";
  var i = ".username_mask_cover[style]{display:none!important}";
  var n = "txpdiv.txp-watermark{opacity:0!important}txpdiv[data-role=creative-player-pause-layer]{display:none!important}";
  var l = "watermark-layer{opacity:0!important}";
  var y = "#main>div.wm{display:none!important}";
  var _ = [ [ "docs.qq.com", r ], [ "gaoding.com", t ], [ "iqiyi.com", a ], [ "ke.qq.com", e ], [ "live.bilibili.com", o ], [ "so.csdn.net", i ], [ "v.qq.com", n ], [ "v.youku.com", l ], [ "yuque.com", y ] ];
  function _array_like_to_array(r, t) {
    if (t == null || t > r.length) t = r.length;
    for (var a = 0, e = new Array(t); a < t; a++) e[a] = r[a];
    return e;
  }
  function _array_with_holes(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterable_to_array_limit(r, t) {
    var a = r == null ? null : typeof Symbol !== "undefined" && r[Symbol.iterator] || r["@@iterator"];
    if (a == null) return;
    var e = [];
    var o = true;
    var i = false;
    var n, l;
    try {
      for (a = a.call(r); !(o = (n = a.next()).done); o = true) {
        e.push(n.value);
        if (t && e.length === t) break;
      }
    } catch (r) {
      i = true;
      l = r;
    } finally {
      try {
        if (!o && a["return"] != null) a["return"]();
      } finally {
        if (i) throw l;
      }
    }
    return e;
  }
  function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array(r, t) {
    return _array_with_holes(r) || _iterable_to_array_limit(r, t) || _unsupported_iterable_to_array(r, t) || _non_iterable_rest();
  }
  function _unsupported_iterable_to_array(r, t) {
    if (!r) return;
    if (typeof r === "string") return _array_like_to_array(r, t);
    var a = Object.prototype.toString.call(r).slice(8, -1);
    if (a === "Object" && r.constructor) a = r.constructor.name;
    if (a === "Map" || a === "Set") return Array.from(a);
    if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)) return _array_like_to_array(r, t);
  }
  var u = location.hostname;
  var p = _.find((function(r) {
    var t = _sliced_to_array(r, 1), a = t[0];
    return u.includes(a);
  }));
  if (p) {
    var c = _sliced_to_array(p, 2), s = c[1];
    s && GM_addStyle(s);
  }
})();
