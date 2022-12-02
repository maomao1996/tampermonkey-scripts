/*!
// ==UserScript==
// @name          颜色还原
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.0.1
// @description   还你一个五彩斑斓的网页
// @author        maomao1996
// @include       *
// @grant         GM_addStyle
// @run-at        document-start
// ==/UserScript==
*/

;(() => {
  'use strict'

  const style = `html.color-restore, html.color-restore body, html.color-restore *{-webkit-filter: initial !important;-moz-filter: initial !important;-ms-filter: initial !important;-o-filter: initial !important;filter: initial !important;}`
  // 添加 class 提高样式权重
  document.documentElement.classList.add('color-restore')
  GM_addStyle(style)
})()
