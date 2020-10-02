// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.1.0
// @description   顶部链接任务入口还原
// @author        maomao1996
// @include       *://115.com/*
// @grant         none
// ==/UserScript==

;(() => {
  'use strict'

  // 在顶部展示链接任务入口
  function initLinkTaskEntry() {
    $('iframe[rel="wangpan"')
      .contents()
      .find('#js_top_panel_box .left-tvf:first :first')
      .after(
        '<a href="javascript:;" class="button btn-line btn-upload" menu="offline_task"><i class="icon-operate ifo-linktask"></i><span>链接任务</span><em style="display:none;" class="num-dot"></em></a>'
      )
  }

  $(window).on('load', () => {
    initLinkTaskEntry()
  })
})()
