// ==UserScript==
// @name        杀死水印（Kill Watermark）
// @description 杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频、爱奇艺
// @namespace   https://github.com/maomao1996/tampermonkey-scripts
// @version     0.0.2
// @author      maomao1996
// @license     MIT
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @match       *://*.gaoding.com/*
// @match       *://v.qq.com/x/cover/*
// @match       *://www.iqiyi.com/*
// @match       *://v.youku.com/*
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @grant       none
// ==/UserScript==
(function() {
  "use strict";
  function styleInject(t, e) {
    if (e === void 0) e = {};
    var i = e.insertAt;
    if (!t || typeof document === "undefined") return;
    var o = document.head || document.getElementsByTagName("head")[0];
    var n = document.createElement("style");
    n.type = "text/css";
    if (i === "top") if (o.firstChild) o.insertBefore(n, o.firstChild); else o.appendChild(n); else o.appendChild(n);
    if (n.styleSheet) n.styleSheet.cssText = t; else n.appendChild(document.createTextNode(t));
  }
  var t = ".editor-watermark{display:none!important;filter:opacity(0)!important;z-index:-1996!important}txpdiv.txp-watermark{opacity:0!important}.iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top{display:none!important}watermark-layer{opacity:0!important}";
  styleInject(t);
})();
