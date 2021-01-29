// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.2.0
// @description   顶部链接任务入口还原、SHA1 快速查重（新页面打开）
// @author        maomao1996
// @include       *://115.com/*
// @grant         none
// ==/UserScript==

;(() => {
  'use strict'

  // 过滤非 iframe 场景
  if (window.self === window.top) {
    return
  }

  /**
   * 在顶部菜单添加链接任务按钮
   */
  const addLinkTaskBtn = (): void => {
    $('#js_top_panel_box .button[menu="upload"]').after(
      '<a href="javascript:;" class="button btn-line btn-upload" menu="offline_task"><i class="icon-operate ifo-linktask"></i><span>链接任务</span><em style="display:none;" class="num-dot"></em></a>'
    )
  }

  /**
   * SHA1 查重
   */
  const initRepeatSha1 = (): void => {
    const addRepeatSha1Btn = () => {
      $('li[file_type="1"]').each(function () {
        if (!$(this).find('.repeat-sha1-btn').length) {
          $(this)
            .find('a[menu_btn="more"]')
            .before('<a class="repeat-sha1-btn"><span>SHA1查重</span></a>')
        }
      })
    }

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach(({ type }) => {
        type === 'childList' && addRepeatSha1Btn()
      })
    })
    observer.observe($('#js_data_list')[0], {
      childList: true
    })

    const handleRepeatSha1 = (file_id: string): void => {
      TOP.Core.MinMessage.Show({
        text: '正在查找',
        type: 'load',
        timeout: 2e4
      })
      TOP.UA$.ajax({
        url: '//webapi.115.com/files/get_repeat_sha',
        data: { file_id },
        xhrFields: { withCredentials: !0 },
        dataType: 'json',
        type: 'GET',
        success({ state, data }) {
          TOP.Core.MinMessage.Hide()
          if (state && data.length > 1) {
            window.open(
              `//115.com/?tab=sha1_repeat&select=1&file_id=${file_id}&mode=wangpan`
            )
          } else {
            TOP.Core.MinMessage.Show({
              text: '没有重复文件',
              type: 'war',
              timeout: 2e3
            })
          }
        }
      })
    }

    $(document).on('click', '.repeat-sha1-btn', function () {
      const fileId = $(this).parent().parent().attr('file_id')
      fileId && handleRepeatSha1(fileId)
    })
  }

  // 初始化
  $(() => {
    // 添加链接任务入口
    addLinkTaskBtn()

    // SHA1 查重
    initRepeatSha1()
  })
})()
