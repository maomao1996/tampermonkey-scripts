// ==UserScript==
// @name        删除水印（Kill Watermark）
// @description 删除水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频、爱奇艺、优酷、哔哩哔哩直播、腾讯课堂
// @namespace   https://github.com/maomao1996/tampermonkey-scripts
// @version     0.1.0
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://*.gaoding.com/*
// @match       *://v.qq.com/x/cover/*
// @match       *://www.iqiyi.com/*
// @match       *://v.youku.com/*
// @match       *://live.bilibili.com/*
// @match       *://ke.qq.com/course/*
// @author      maomao1996
// @grant       none
// ==/UserScript==
(function() {
  "use strict";
  function styleInject(t, e) {
    if (e === void 0) e = {};
    var i = e.insertAt;
    if (!t || typeof document === "undefined") return;
    var o = document.head || document.getElementsByTagName("head")[0];
    var a = document.createElement("style");
    a.type = "text/css";
    if (i === "top") if (o.firstChild) o.insertBefore(a, o.firstChild); else o.appendChild(a); else o.appendChild(a);
    if (a.styleSheet) a.styleSheet.cssText = t; else a.appendChild(document.createTextNode(t));
  }
  var t = '.editor-watermark{display:none!important;filter:opacity(0)!important;z-index:-1996!important}txpdiv.txp-watermark{opacity:0!important}.iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top{display:none!important}.web-player-icon-roomStatus,watermark-layer{opacity:0!important}#loki-player div[style*="position: absolute;"]{display:none!important}';
  styleInject(t);
})();
