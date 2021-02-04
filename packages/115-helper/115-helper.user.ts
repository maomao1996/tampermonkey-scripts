// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.4.0
// @description   顶部链接任务入口还原、SHA1 快速查重（新页面打开）、一键 SHA1 查重
// @icon      	  https://115.com/favicon.ico
// @author        maomao1996
// @include       *://115.com/*
// @grant         GM_openInTab
// ==/UserScript==

;(() => {
  'use strict'

  // 过滤非 iframe 场景
  if (window.self === window.top) {
    return
  }

  const { search } = location

  /**
   * 工具方法 - url 中是否存在某个字符串
   */
  const urlHasString = (str: string): boolean => search.indexOf(str) > -1

  /**
   * 在顶部菜单添加链接任务按钮
   */
  const addLinkTaskBtn = (): void => {
    $('#js_top_panel_box .button[menu="upload"]').after(
      '<a href="javascript:;" class="button btn-line btn-upload" menu="offline_task"><i class="icon-operate ifo-linktask"></i><span>链接任务</span><em style="display:none;" class="num-dot"></em></a>'
    )
  }

  /**
   * 网盘列表 SHA1 查重
   */
  const initRepeatSha1 = (): void => {
    if (!$('#repeat-all-sha1-btn').length) {
      $('#js_path_add_dir').after(
        '<a id="repeat-all-sha1-btn" href="javascript:;" class="button btn-line" style="margin-left: 10px;"><span>一键SHA1查重</span></a>'
      )
    }

    const addRepeatSha1Btn = () => {
      $('li[file_type="1"]').each(function () {
        if (!$(this).find('.repeat-sha1-btn').length) {
          $(this)
            .find('a[menu="public_share"]')
            .after('<a class="repeat-sha1-btn"><span>SHA1查重</span></a>')
        }
      })
    }

    const listObserver = new MutationObserver((mutationsList) => {
      mutationsList.forEach(({ type }) => {
        type === 'childList' && addRepeatSha1Btn()
      })
    })
    if ($('#js_data_list').length) {
      listObserver.observe($('#js_data_list')[0], { childList: true })
    }

    const handleRepeatSha1 = (
      file_id: string,
      isPrompt = true
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        isPrompt &&
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
            isPrompt && TOP.Core.MinMessage.Hide()
            if (state && data.length > 1) {
              GM_openInTab(
                `//115.com/?tab=sha1_repeat&file_id=${file_id}&mode=wangpan`
              )
              resolve(true)
            } else {
              isPrompt &&
                TOP.Core.MinMessage.Show({
                  text: '没有重复文件',
                  type: 'war',
                  timeout: 2e3
                })
              resolve(false)
            }
          }
        })
      })
    }

    $(document).on('click', '.repeat-sha1-btn', function () {
      const fileId = $(this).parent().parent().attr('file_id')
      fileId && handleRepeatSha1(fileId)
    })

    // 一键 SHA1 查重
    const SHA1_MAP = {}
    $(document).on('click', '#repeat-all-sha1-btn', () => {
      const $li = $('li[file_type="1"]')

      if (!$li.length || Object.keys(SHA1_MAP).length === $li.length) {
        TOP.Core.MinMessage.Show({
          text: '当前文件夹下没有可查重文件',
          type: 'war',
          timeout: 2e3
        })
        return
      }

      TOP.Core.MinMessage.Show({
        text: '正在查找',
        type: 'load',
        timeout: 2e4
      })

      let index = 0

      const findRepeat = () => {
        if (index >= $li.length) {
          TOP.Core.MinMessage.Show({
            text: '当前文件夹下没有可查重文件',
            type: 'war',
            timeout: 2e3
          })
          return
        }
        const $currentLi = $li.eq(index)
        const fileId = $currentLi.attr('file_id')
        const sha1 = $currentLi.attr('sha1')
        index++
        if (fileId && sha1 && !SHA1_MAP[sha1]) {
          SHA1_MAP[sha1] = 1
          return handleRepeatSha1(fileId, false).then((flag) => {
            if (!flag) {
              return findRepeat()
            }
            TOP.Core.MinMessage.Show({
              text: `已找到【${$currentLi.attr('title')}】的重复文件`,
              type: 'suc',
              timeout: 2e3
            })
          })
        }
        return findRepeat()
      }

      findRepeat()
    })
  }

  /**
   * SHA1 查重列表（支持选中第一个元素）
   */
  const initRepeatSha1List = (): void => {
    const listObserver = new MutationObserver((mutationsList) => {
      mutationsList.forEach(({ type }) => {
        if (type === 'childList') {
          const $first = $('#js-list li:first-child')
          if (!$first.attr('item')) {
            $first.attr('item', 'file')
            $first.find('i.file-type').removeProp('style')
            $first
              .children('.file-name-wrap')
              .prepend('<b class="checkbox"></b>')
          }
        }
      })
    })
    listObserver.observe($('#js-list')[0], { childList: true })
  }

  // 初始化
  $(() => {
    // 网盘列表模块
    if (urlHasString('cid=')) {
      // 添加链接任务入口
      addLinkTaskBtn()

      // SHA1 查重
      initRepeatSha1()
    }
    // SHA1 查重列表模块
    else if (urlHasString('tab=sha1_repeat')) {
      initRepeatSha1List()
    }
  })
})()
