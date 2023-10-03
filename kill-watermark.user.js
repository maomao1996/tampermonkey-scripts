// ==UserScript==
// @name        删除水印
// @description 删除水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频、爱奇艺、优酷、哔哩哔哩直播、腾讯课堂、语雀、腾讯文档
// @namespace   maomao1996.kill-watermark
// @version     0.2.0
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
  var t = '.editor-watermark{display:none!important;filter:opacity(0)!important;z-index:-1996!important}txpdiv.txp-watermark{opacity:0!important}.iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top{display:none!important}.web-player-icon-roomStatus,watermark-layer{opacity:0!important}#loki-player div[style*="position: absolute;"],#main>div.wm,.watermark-bg-wrapper{display:none!important}';
  styleInject(t);
})();
