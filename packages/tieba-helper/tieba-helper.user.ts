// ==UserScript==
// @name          贴吧小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.1.2
// @description   自动顶贴回复
// @author        maomao1996
// @include       *://tieba.baidu.com/p/*
// @grant         GM_notification
// ==/UserScript==

;(() => {
  'use strict'

  /**
   * 随机函数
   * https://github.com/lodash/lodash/blob/master/random.js
   */
  const random = (lower: number, upper: number, floating?: boolean): number => {
    if (floating) {
      const rand = Math.random()
      const randLength = `${rand}`.length - 1
      return Math.min(
        lower + rand * (upper - lower + parseFloat(`1e-${randLength}`)),
        upper
      )
    }
    return lower + Math.floor(Math.random() * (upper - lower + 1))
  }

  /**
   * 顶帖模块
   **/
  const DING_CONFIG = {
    // 当前顶贴状态
    STATUS: false,
    // 顶帖最小间隔（分钟）
    TIME_MIN: 1,
    // 顶帖最大间隔（分钟）
    TIME_MAX: 30,
    // 顶贴回复内容
    TEXT: ['顶', '顶', '顶'],
    // 定时器
    timer: null
  }
  const autoResponse = (): void => {
    // 插入控制按钮
    $('#quick_reply').after(
      '<a id="ding_btn" rel="noopener" class="btn-sub btn-small j_favor">开启自动顶贴回复</a>'
    )

    // 执行顶贴回复
    const runResponse = (): void => {
      const selectors = {
        // 输入框选择器
        editor: '#j_editor_for_container',
        // 提交按钮选择器
        submit: '.lzl_panel_submit.j_lzl_p_sb'
      }

      if (!$('#j_editor_for_container:visible').length) {
        const lzlPSelector = '.j_lzl_p.btn-sub.pull-right:visible'
        // 是否存在一条打开的回复
        if ($(lzlPSelector).length) {
          $(lzlPSelector).trigger('click')
        }
        // 是否打开楼中楼回复
        else if ($('a.lzl_link_unfold:visible').length) {
          $($('.lzl_link_unfold')[0]).trigger('click')
        }
        // 打开回复楼主
        else {
          $('#quick_reply').trigger('click')
          selectors.editor = '#ueditor_replace'
          selectors.submit = '.j_submit.poster_submit'
        }
      }

      const index = random(0, DING_CONFIG.TEXT.length - 1)
      $(selectors.editor).text(DING_CONFIG.TEXT[index])
      $(selectors.submit).trigger('click')

      if (DING_CONFIG.STATUS) {
        const time =
          random(DING_CONFIG.TIME_MIN, DING_CONFIG.TIME_MAX, true) * 6e4
        console.log(`${time / 1000}秒后自动顶贴回复`)
        DING_CONFIG.timer = setTimeout(() => {
          runResponse()
        }, time)
      }
    }

    $('#ding_btn').on('click', function () {
      if (DING_CONFIG.STATUS) {
        // 关闭
        DING_CONFIG.STATUS = false
        clearTimeout(DING_CONFIG.timer)
        DING_CONFIG.timer = null
        $(this).text('开启自动顶贴回复')
        GM_notification({
          text: '已关闭自动顶贴回复',
          timeout: 2000
        })
      } else {
        // 开启
        DING_CONFIG.STATUS = true
        $(this).text('关闭自动顶贴回复')
        GM_notification({
          text: '已开启自动顶贴回复',
          timeout: 2000
        })
        runResponse()
      }
    })
  }

  $(window).on('load', () => {
    const { pathname } = location

    // 自动顶贴回复
    if (/^\/p\/\d{1,}$/.test(pathname)) {
      autoResponse()
    }
  })
})()
