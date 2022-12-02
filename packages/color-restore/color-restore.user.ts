/*!
// ==UserScript==
// @name          颜色还原
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.1.0
// @description   移除灰色滤镜，还你一个五彩斑斓的网页
// @author        maomao1996
// @include       *
// @grant         none
// ==/UserScript==
*/

;(() => {
  'use strict'

  const { style } = document.documentElement
  const filterKey = [
    'filter',
    '-webkit-filter',
    '-moz-filter',
    '-ms-filter',
    '-o-filter'
  ].find((prop) => typeof style[prop] === 'string')

  Array.prototype.forEach.call(
    document.querySelectorAll('*'),
    (el: HTMLElement) => {
      const filterValue = document.defaultView.getComputedStyle(el)[filterKey]
      if (filterValue.match('grayscale')) {
        el.style.setProperty(filterKey, 'initial', 'important')
      }
    }
  )
})()
