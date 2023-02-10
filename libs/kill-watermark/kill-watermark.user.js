/*!
// ==UserScript==
// @name          杀死水印（Kill Watermark）
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.0.2
// @description   杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频
// @author        maomao1996
// @match         *://*.gaoding.com/*
// @match         *://v.qq.com/x/cover/*
// @grant         GM_addStyle
// ==/UserScript==
*/
;
(function () {
    'use strict';
    var selectors = [
        '.editor-watermark',
        'txpdiv.txp-watermark'
    ];
    var rules = [
        'display: none !important',
        'z-index: -999 !important',
        'filter: opacity(0) !important'
    ];
    GM_addStyle("".concat(selectors, " {").concat(rules.join(';'), "}"));
})();
