/*!
// ==UserScript==
// @name          杀死水印（Kill Watermark）
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.0.1
// @description   杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配稿定设计、腾讯视频
// @author        maomao1996
// @match         *://v.qq.com/x/cover/*
// @match         *://*.gaoding.com/*
// @grant         GM_addStyle
// ==/UserScript==
*/

;(() => {
  'use strict'
  let css = ''
  const selectors = [
    /**
     * 腾讯视频右上角 logo
     * https://v.qq.com/x/cover/mzc0020027yzd9e/q0043cz9x20.html
     */
    'txpdiv.txp-watermark'
  ]

  /**
   * 稿定设计
   */
  css += `.editor-watermark {z-index: -1 !important}`

  css += `${selectors} {display: none !important}`
  GM_addStyle(css)
})()
