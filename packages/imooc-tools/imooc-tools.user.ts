// ==UserScript==
// @name         慕课小助手
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      0.3.1
// @description  慕课网问答区快速查看问答详情、自动播放下一节视频
// @author       maomao1996
// @include      *://coding.imooc.com/learn/qa/*
// @include      *://coding.imooc.com/lesson/*
// @grant        none
// @require		   https://cdn.jsdelivr.net/npm/jquery@v1.11.3
// ==/UserScript==

interface StyleMap {
  'learn/qa': string
  lesson: string
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
      position: absolute;
      left: 50%;
      top: 15%;
      z-index: 2;
      margin-bottom: 15%;
      border-radius: 20px;
      padding: 25px;
      width: 800px;
      background: #fff;
      transform: translateX(-50%);
    }
    .wrap,
    #new_header .new-header,
    .wenda-top-intro-box .wenda-top-intro-wrap {
      width: 100%!important;
    }
    .layout .col-aside.wenda-col-aside,
    .mm-model .elevator,
    .mm-modal #footer {
      display: none!important;
    }
    .mm-modal .layout {
      padding: 0;
    }
    .mm-modal pre {
      white-space: pre-line;
    }`,
    lesson: `#chapter-scrollbar { overflow-y: auto; }`
  }

  function addStyle(type: string): void {
    const rules = STYLE_MAP[type]
    if (!rules) {
      return
    }
    $('head').append(`<style>${rules}</style>`)
  }

  /**
   * 问答区
   */

  // 获取按钮 html
  function getBntHtml(id: string): string {
    return (
      '<a class="mm-btn" href="javascript:void(0)" data-id="' +
      id +
      '">查看详情</a>'
    )
  }

  // 插入弹窗 dom
  function appendModal(): void {
    const modalHtml = `<div class="mm-modal" id="mm-modal"><div class="mm-mask"></div><div class="mm-modal-x" id="mm-content"></div></div>`
    $('body').append(modalHtml)
  }

  // 点击事件
  function handleClick(): void {
    const id: string = $(this).data('id')
    $.ajax({
      type: 'get',
      url: `//coding.imooc.com/learn/questiondetail/${id}.html`,
      dataType: 'html',
      success(html: string) {
        $('#mm-modal')
          .show()
          .scrollTop(0)
        $('#mm-content').html(html)
      }
    })
  }

  // 问答区初始化
  function qaInit(): void {
    $('.qa-item-title').each(function() {
      const id = $(this)
        .find('a')
        .attr('href')
        .replace(/\D/g, '')
      $(this).append(getBntHtml(id))
    })

    appendModal()
    $(document).on('click', '.mm-mask', () => {
      $('#mm-modal').hide()
    })
    $('#qa-list').on('click', '.mm-btn', handleClick)
  }

  /**
   * 视频详情
   */
  // 初始化
  function videoInit(): void {
    setTimeout(() => {
      $('video').on('ended', function() {
        console.log('当前视频播放完毕，即将播放下一节')
        $('.next-btn.js-next-media')[0]?.click()
      })
    }, 2e3)
  }

  // 初始化操作
  window.onload = () => {
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
  }
})()
