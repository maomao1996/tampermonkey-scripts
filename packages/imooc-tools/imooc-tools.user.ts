// ==UserScript==
// @name         慕课小助手
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      0.1.0
// @description  慕课网问答区快速查看问答详情
// @author       maomao1996
// @include      *://coding.imooc.com/learn/qa/*
// @grant        none
// @require		   https://cdn.jsdelivr.net/npm/jquery@v3.4.1
// ==/UserScript==

;(() => {
  'use strict'

  function addStyle(rules: string): void {
    $('head').append(`<style>${rules}</style>`)
  }

  // 重置样式
  addStyle(`
  .mm-modal {
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
    top: 20%;
    z-index: 2;
    padding-top: 10px;
    padding-bottom: 20px;
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
`)

  // 获取按钮 html
  function getBntHtml(id: string): string {
    return (
      '<a class="mm-btn" href="javascript:void(0)" data-id="' +
      id +
      '">查看详情</a>'
    )
  }

  // 插入弹窗 dom
  function appendModal() {
    const modalHtml = `<div class="mm-modal" id="mm-modal"><div class="mm-mask"></div><div class="mm-modal-x" id="mm-content"></div></div>`
    $('body').append(modalHtml)
  }

  // 点击事件
  function handleClick() {
    const id: string = $(this).data('id')
    $.ajax({
      type: 'get',
      url: `http://coding.imooc.com/learn/questiondetail/${id}.html`,
      dataType: 'html',
      success(html: string) {
        $('#mm-modal').show()
        $('#mm-content').html(html)
      }
    })
  }

  // 初始化操作
  window.onload = () => {
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
})()
