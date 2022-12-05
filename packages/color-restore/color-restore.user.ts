/*!
// ==UserScript==
// @name          黑白网页颜色还原
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.2.0
// @description   移除灰色滤镜，还你一个五彩斑斓的网页
// @author        maomao1996
// @include       *
// @grant         none
// ==/UserScript==
*/

;(() => {
  'use strict'

  /**
   * 工具方法 - 观察子元素变化
   */
  const observerChildList = (
    callback: (observer: MutationObserver, mutation: MutationRecord) => void,
    selector: Node
  ): MutationObserver => {
    const observer = new MutationObserver(([mutation]) => {
      mutation.type === 'childList' && callback(observer, mutation)
    })
    observer.observe(selector, { childList: true, subtree: true })
    return observer
  }

  const { style } = document.documentElement
  const filterKey = [
    'filter',
    '-webkit-filter',
    '-moz-filter',
    '-ms-filter',
    '-o-filter'
  ].find((prop) => typeof style[prop] === 'string')

  const restore = () => {
    Array.prototype.forEach.call(
      document.querySelectorAll('*'),
      (el: HTMLElement) => {
        const filterValue = document.defaultView.getComputedStyle(el)[filterKey]
        if (filterValue.match('grayscale')) {
          el.style.setProperty(filterKey, 'initial', 'important')
        }
      }
    )
  }
  observerChildList(restore, document.querySelector('body'))
  restore()
})()
