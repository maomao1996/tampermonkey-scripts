// ==UserScript==
// @name          贴吧小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.3.0
// @description   自动顶贴回复、移除贴吧列表和帖子内部广告
// @author        maomao1996
// @include       *://tieba.baidu.com/p/*
// @include       *://tieba.baidu.com/f*
// @grant         GM_notification
// ==/UserScript==

;(() => {
  'use strict'
  // 顶贴模式选项
  const MODE_MAP = {
    CUSTOMIZE: '自定义模式',
    SENTENCE: '网络语句模式'
  }
  /**
   * 插件配置
   **/
  const CONFIG = {
    /* 顶帖模块配置项 */
    // 当前顶贴状态（为 true 时默认执行）
    STATUS: false,
    // 顶帖最小间隔（分钟）
    TIME_MIN: 1,
    // 顶帖最大间隔（分钟）
    TIME_MAX: 30,
    // 自定义顶贴回复内容
    TEXT: ['顶', '顶~'],
    // 顶贴模式（自定义模式、网络语句模式）
    MODE: MODE_MAP.SENTENCE,
    // 定时器
    timer: null,

    /* 广告模块配置项 */
    // 广告移除刷新时间
    REMOVE_REFRESH_TIME: 1000
  }

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
   * 移除元素
   */
  const removeHtmlElement = (selector: JQuery): void => {
    selector.each(function () {
      $(this).remove()
    })
  }

  /**
   * 顶帖模块
   **/
  const autoResponse = (): void => {
    // 插入控制按钮
    $('#quick_reply').after(
      `<a id="ding_btn" rel="noopener" class="btn-sub btn-small">${
        CONFIG.STATUS ? '关闭' : '开启'
      }自动顶贴回复</a>`
    )

    // 执行顶贴回复
    const runResponse = (): void => {
      if (!CONFIG.STATUS) {
        return
      }

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
          $(lzlPSelector).eq(0).trigger('click')
        }
        // 是否打开楼中楼回复
        else if ($('a.lzl_link_unfold:visible').length) {
          $('a.lzl_link_unfold:visible').eq(0).trigger('click')
        }
        // 打开回复楼主
        else {
          $('#quick_reply').trigger('click')
          selectors.editor = '#ueditor_replace'
          selectors.submit = '.j_submit.poster_submit'
        }
      }

      // 提交回复
      const submit = (text: string): void => {
        $(selectors.editor).text(text)
        $(selectors.submit).trigger('click')

        const time = random(CONFIG.TIME_MIN, CONFIG.TIME_MAX, true) * 6e4
        console.log(`${time / 1000}秒后自动顶贴回复`)
        CONFIG.timer = setTimeout(() => {
          runResponse()
        }, time)
      }

      // 语句模式
      if (CONFIG.MODE === MODE_MAP.SENTENCE) {
        // 调用一言 API 获取随机语句
        $.ajax({
          type: 'GET',
          url: 'https://v1.hitokoto.cn',
          dataType: 'json',
          success(data) {
            submit(data.hitokoto)
          },
          error(_jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown)
          }
        })
      }
      // 自定义模式
      else {
        const index = random(0, CONFIG.TEXT.length - 1)
        submit(CONFIG.TEXT[index])
      }
    }

    // 默认是否执行
    if (CONFIG.STATUS) {
      setTimeout(() => {
        runResponse()
        GM_notification({
          text: '已开启自动顶贴回复',
          timeout: 2000
        })
      }, 1000)
    }

    // 顶贴控制函数
    $('#ding_btn').on('click', function () {
      if (CONFIG.STATUS) {
        // 关闭
        CONFIG.STATUS = false
        clearTimeout(CONFIG.timer)
        CONFIG.timer = null
        $(this).text('开启自动顶贴回复')
        GM_notification({
          text: '已关闭自动顶贴回复',
          timeout: 2000
        })
      } else {
        // 开启
        CONFIG.STATUS = true
        $(this).text('关闭自动顶贴回复')
        GM_notification({
          text: '已开启自动顶贴回复',
          timeout: 2000
        })
        runResponse()
      }
    })
  }

  /**
   * 执行插件
   **/
  $(window).on('load', () => {
    const { pathname } = location

    // 贴子详情
    if (/^\/p\/\d{1,}$/.test(pathname)) {
      console.log('进入贴子详情')
      // 自动顶贴回复
      autoResponse()

      // 移除帖子内部广告
      removeHtmlElement($('div[ad-dom-img="true"]'))
    }
    // 贴吧列表
    else if (pathname === '/f') {
      console.log('进入贴吧列表')

      // 移除贴吧列表广告
      setInterval(function () {
        removeHtmlElement($('#thread_list>li').not('.j_thread_list'))
      }, CONFIG.REMOVE_REFRESH_TIME)
    }
  })
})()
