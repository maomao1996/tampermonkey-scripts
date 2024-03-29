/*!
// ==UserScript==
// @name         慕课小助手
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      0.3.10
// @description  慕课网问答区快速查看问答详情、自动播放下一节视频
// @icon         https://coding.m.imooc.com/static/wap/static/favicon.ico
// @author       maomao1996
// @include      *://coding.imooc.com/learn/qa/*
// @include      *://coding.imooc.com/lesson/*
// @grant        GM_addStyle
// ==/UserScript==
*/

interface StyleMap {
  'learn/qa': string
}

;(() => {
  'use strict'

  // 问答区样式
  const STYLE_MAP: StyleMap = {
    'learn/qa': `.mm-modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1996;
      display: none;
      overflow-y: auto;
    }
    .mm-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .mm-modal-x {
      overflow: hidden;
      position: absolute;
      top: 10%;
      bottom: 5%;
      left: 50%;
      z-index: 2;
      border-radius: 20px;
      padding: 25px;
      width: 836px;
      min-height: 480px;
      background: #fff;
      transform: translateX(-50%);
    }
    .mm-modal-x::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      content: '数据加载中...';
      font-size: 24px;
      text-align: center;
      line-height: 480px;
    }`,
  }

  function addStyle(type: string): void {
    const rules = STYLE_MAP[type]
    if (!rules) {
      return
    }
    GM_addStyle(rules)
  }

  /**
   * 问答区
   */

  // 获取按钮 html
  function getBntHtml(link: string): string {
    return `<a class="mm-btn" href="javascript:void(0)" data-link="${link}">弹窗查看</a>`
  }

  // 插入弹窗 dom
  function appendModal(): void {
    const modalHtml =
      '<div class="mm-modal" id="mm-modal"><div class="mm-mask"></div><div class="mm-modal-x"><iframe id="mm-content" width="100%" height="100%" frameborder="0"></iframe></div></div>'
    $('body').append(modalHtml)
  }

  // 点击事件
  function handleClick(): void {
    const link: string = $(this).data('link')
    $('#mm-modal').show().scrollTop(0)
    const $content = $('iframe#mm-content')
    $content.attr('src', link).on('load', function () {
      const iframeCtx = $(this).contents()
      const style: string = `<style id="mm-style">
      html, body {
        overflow-x: hidden;
        width: 836px!important;
        min-width: 836px!important;
        padding-bottom: 0!important
      }
      #footer, #globalTopBanner, #new_header, #J_GotoTop,html .col-aside.wenda-col-aside, .detail-r {
        display: none!important
      }
      html .quedetail-wrap {
        margin: 2px;
      }
      html .wenda-answer .cmt-post {
        margin-bottom: 2px;
      }
      </style>`
      iframeCtx.find('head').append(style)
    })
  }

  // 问答区初始化
  function qaInit(): void {
    $('#qa-list .nwenda-box').each(function () {
      const link = $(this).attr('href')
      $(this).find('h3').append(getBntHtml(link))
    })

    appendModal()
    $(document).on('click', '.mm-mask', () => {
      $('#mm-modal').hide()
      $('#mm-content').attr({ src: '' })
    })
    $('#qa-list').on('click', '.mm-btn', handleClick)
  }

  /**
   * 视频详情
   */
  // 初始化
  function videoInit(): void {
    setTimeout(() => {
      $('#video-container-mocoplayer-hls-video_html5_api').on('ended', () => {
        console.log('当前视频播放完毕，即将播放下一节')
        $('.next-btn.js-next-media')[0]?.click()
      })
    }, 3e3)
  }

  // 初始化操作
  $(window).on('load', () => {
    const { pathname } = location
    const TYPE = pathname.substr(1, pathname.lastIndexOf('/') - 1)

    // 重置样式
    addStyle(TYPE)

    switch (TYPE) {
      // 问答区
      case 'learn/qa':
        console.log('问答区')
        qaInit()
        break
      // 视频详情
      case 'lesson':
        console.log('视频详情')
        videoInit()
        $(window).on('hashchange', videoInit)
        break
      default:
        break
    }
  })
})()
