/*!
// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       1.7.2
// @description   顶部链接任务入口还原、SHA1 快速查重（新页面打开）、SHA1 自动查重、删除空文件夹、一键搜（快捷搜索）、SHA1 查重列表支持选中第一个元素和悬浮菜单展示、搜索列表支持悬浮菜单展示、列表显示文件 SHA1 信息、关闭侧边栏、悬浮菜单移除图标、悬浮菜单支持新标签页打开文件夹、加速转码
// @icon      	  https://115.com/favicon.ico
// @author        maomao1996
// @include       *://115.com/*
// @grant         GM_registerMenuCommand
// @grant         GM_addStyle
// @grant         GM_openInTab
// @grant         unsafeWindow
// @require       https://greasyfork.org/scripts/447340-gm-config-zh/code/GM_config_zh.js
// @run-at        document-end
// ==/UserScript==
*/

;(() => {
  'use strict'

  // 过滤非 iframe 和 iframe 套娃场景
  if (unsafeWindow.self === unsafeWindow.top || typeof TOP === 'undefined') {
    return
  }

  /**
   * 脚本内部全局变量
   */
  const { search } = top.location
  const { MinMessage } = top.Core

  /**
   * 脚本设置相关
   */
  const GMConfigOptions = {
    id: 'Helper_Cfg',
    title: '115 小助手',
    css: '#Helper_Cfg .config_var textarea{width: 310px; height: 50px;} #Helper_Cfg .inline {padding-bottom:0px;}#Helper_Cfg .config_var {margin-left: 20px;margin-right: 20px;} #Helper_Cfg input[type="checkbox"] {margin-left: 0px;vertical-align: top;} #Helper_Cfg input[type="text"] {width: 53px;} #Helper_Cfg {background-color: lightblue;} #Helper_Cfg .reset_holder {float: left; position: relative; bottom: -1.2em;}',
    frameStyle: {
      height: '560px',
      width: '520px',
      zIndex: '13145201996'
    },
    fields: {
      'delay.minCount': {
        section: ['', '延迟相关设置'],
        label: '开始延迟最小查询数量',
        labelPos: 'left',
        type: 'int',
        min: 5,
        max: 50,
        default: 15
      },
      'delay.minTime': {
        label: '最小延迟时间(毫秒)',
        type: 'int',
        min: 100,
        max: 1e3,
        default: 200
      },
      'delay.maxTime': {
        label: '最大延迟时间(毫秒)',
        type: 'int',
        min: 300,
        max: 3e3,
        default: 400,
        line: 'end'
      },
      'layout.hideSidebar': {
        section: ['', '界面布局相关设置'],
        label: '关闭存储侧边栏',
        labelPos: 'right',
        type: 'checkbox',
        default: false
      },
      'layout.addSettingBtn': {
        label: '侧边栏增加插件设置按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'layout.addTaskBtn': {
        label: '网盘顶部菜单增加链接任务按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'autoSha1.addBtn': {
        section: ['', '网盘路径栏相关设置'],
        label: '网盘路径栏增加SHA1自动查重按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true,
        line: 'start'
      },
      'autoSha1.maxCount': {
        label: '每次最多打开的标签页数量',
        type: 'int',
        min: 1,
        max: 50,
        default: 25,
        line: 'end'
      },
      addDeleteEmptyBtn: {
        label: '网盘路径栏增加删除空文件夹按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      // 单文件查重相关设置
      'folderRepeat.addBtn': {
        label: '网盘路径栏增加单文件夹查重按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true,
        line: 'start'
      },
      'folderRepeat.select': {
        label: '选中重复文件',
        labelPos: 'right',
        type: 'checkbox',
        default: false,
        line: 'end'
      },
      'transcoded.addBtn': {
        label: '网盘路径栏增加加速转码按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'list.showSha1': {
        section: ['', '网盘列表相关设置(悬浮菜单不支持缩略图模式)'],
        label: '列表显示文件SHA1信息(包含标签页)',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'floatOperation.removeIcon': {
        label: '悬浮菜单移除图标',
        labelPos: 'right',
        type: 'checkbox',
        default: false
      },
      'floatOperation.newTab.addBtn': {
        label: '悬浮菜单增加新标签页打开按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'floatOperation.sha1.addBtn': {
        label: '悬浮菜单增加SHA1查重按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      // 一键搜相关（快捷搜索）
      'quickSearch.addBtn': {
        label: '悬浮菜单增加一键搜按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true,
        line: 'start'
      },
      'quickSearch.edit': {
        label: '打开编辑弹窗再搜索',
        labelPos: 'right',
        type: 'checkbox',
        default: false
      },
      'quickSearch.isAll': {
        label: '默认搜索全部',
        labelPos: 'right',
        type: 'checkbox',
        default: false,
        line: 'end'
      },
      'sha1Repeat.addCheckbox': {
        section: ['', 'SHA1 查重列表模块(重复文件列表)'],
        label: '增加第一个文件选中按钮',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'sha1Repeat.addMenu': {
        label: '列表增加悬浮菜单',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'sha1Repeat.select': {
        label: '打开后默认选中',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'search.addMenu': {
        section: ['', '网盘搜索列表模块'],
        label: '列表增加悬浮菜单',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      'search.showSha1': {
        label: '列表显示文件SHA1信息',
        labelPos: 'right',
        type: 'checkbox',
        default: true
      },
      sponsor: {
        section: ['', '其他'],
        label: '给作者赞助',
        labelPos: 'right',
        type: 'button',
        click() {
          GM_openInTab(
            'https://gitee.com/fe-mm/picture/raw/main/sponsor/sponsor.jpg',
            { active: true }
          )
        }
      },
      joinGroup: {
        label: '加入 QQ 群',
        labelPos: 'right',
        type: 'button',
        click() {
          GM_openInTab('https://jq.qq.com/?_wv=1027&k=ToOoVmku', {
            active: true
          })
        }
      },
      reminder: {
        label: '温馨提示',
        labelPos: 'right',
        type: 'button',
        click() {
          alert(
            `1. 为保证账号安全，从 1.1.0 版本开始，所有频繁请求接口的操作都会加入随机延迟；同时 SHA1 自动查重 功能会使用缓存机制（每个页码目录下的文件只会查询一次，如需再次查询请使用具体文件的 SHA1查重 按钮或刷新页面后再使用）
2. 加速转码：（加速转码是不排队的，普通转码需要排队）
   115 是通过当前目录下第一个视频文件去查询剩余未转码的视频文件，在查询时会将当前目录下第一个视频文件自动进行转码（只会在第一个视频文件未转码时触发），所以会存在下次查询时数量不一致的问题；
  在查询时会有缓存问题，所以会存在下次查询时返回的未转码的数量和上次一样，等一两秒再点就行（提交的加速转码文件过多会被 115 限制，需要等提交的文件转码完以后再进行转码）
3. 脚本设置保存后将会自动刷新页面
4. 脚本加载有条件限制会造成设置弹窗不居中`
          )
        }
      }
    },
    events: {
      save() {
        top.location.reload()
      }
    }
  }

  type GetKey = keyof typeof GMConfigOptions['fields']
  interface MGMConfig extends GMConfig {
    get(key: GetKey): any
  }

  const G: MGMConfig = GM_config
  G.init(GMConfigOptions)
  GM_registerMenuCommand('设置', () => G.open())

  /**
   * 工具方法 - url 中是否存在某个字符串
   */
  const urlHasString = (str: string): boolean => search.indexOf(str) > -1

  /**
   * 工具方法 - 观察子元素变化
   */
  const observerChildList = (
    callback: (observer: MutationObserver, mutation: MutationRecord) => void,
    selector: JQuery | JQuery.Selector = '#js_data_list'
  ): MutationObserver => {
    const observer = new MutationObserver(([mutation]) => {
      mutation.type === 'childList' && callback(observer, mutation)
    })
    const $selector = typeof selector === 'string' ? $(selector) : selector
    if ($selector.length) {
      observer.observe($selector[0], { childList: true })
    }
    return observer
  }

  /**
   * 工具方法 - 随机函数
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
   * 工具方法 - 等待函数
   */
  const delay = (timeout?: number) => {
    if (!timeout) {
      timeout = random(G.get('delay.minTime'), G.get('delay.maxTime'))
    }
    console.log('等待 :', timeout, 'ms')
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  /**
   * 工具方法 - 获取样式
   */
  const getStyles = (styles: string, key: GetKey | GetKey[]) => {
    if (!Array.isArray(key)) {
      key = [key]
    }
    if (key.some((k) => G.get(k))) {
      return styles
    }
    return ''
  }

  /**
   * 工具方法 - 是否缩略图模式
   */
  const isThumbnail = () => !!$('.list-thumb').length

  const getAidCid = (): any => {
    try {
      var main = top.Ext.CACHE.FileMain
      return main.Setting.GetActive()
    } catch (e) {
      return { cid: 0 }
    }
  }

  // 随机索引参数
  const randomDelayIndex: [number, number] = [3, 5]

  /**
   * 样式调整
   */
  const styles = [
    /**
     * 小助手相关样式
     */
    /*css*/ `.mm-quick-operation{margin-left: 12px;padding: 0 6px}`,
    /*css*/ `.list-contents .active::before, .list-thumb .active{background: rgba(199, 237, 204, 0.7)!important;}`,
    // 列表显示文件SHA1信息
    /*css*/ `[show-sha1]{position: absolute;top:20px;color:#999;}`,
    /*css*/ `.page-center .lstc-search .list-contents [file_type="1"] .file-name.h-auto,.list-cell:not(.lstc-search) .list-contents [file_type="1"] .file-name.h-auto{flex:1;padding-bottom: 20px;height:auto;}`,
    // 悬浮菜单样式
    getStyles(
      /*css*/ `.file-opr [class|="icon"]{display:none!important;}`,
      'floatOperation.removeIcon'
    )
  ].join('')
  GM_addStyle(styles)

  /**
   * 在顶部菜单添加链接任务按钮
   */
  const addLinkTaskBtn = () => {
    $('#js_filter_btn').after(
      /*html*/ `<a href="javascript:;" class="button btn-line btn-upload" menu="offline_task"><i class="icon-operate ifo-linktask"></i><span>链接任务</span></a>`
    )
  }

  /**
   * SHA1 查重
   */
  const handleRepeatSha1 = (
    file_id: string,
    isAll = false
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      !isAll && MinMessage.Show({ text: '正在查找', type: 'load', timeout: 0 })
      top.UA$.ajax({
        url: '//webapi.115.com/files/get_repeat_sha',
        data: { file_id },
        xhrFields: { withCredentials: !0 },
        dataType: 'json',
        type: 'GET',
        success({ state, data }) {
          !isAll && MinMessage.Hide()
          if (state && data.length > 1) {
            let sha1RepeatUrl = `//115.com/?tab=sha1_repeat&file_id=${file_id}&mode=wangpan`
            if (G.get('sha1Repeat.select')) {
              sha1RepeatUrl += '&select=1'
            }
            GM_openInTab(sha1RepeatUrl, { active: !isAll })
            resolve(true)
          } else {
            !isAll &&
              MinMessage.Show({
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

  const MENU_MAP = {
    move: /*html*/ `<a href="javascript:;" menu="move"><i class="icon-operate ifo-move" menu="move"></i><span menu="move">移动</span></a>`,
    edit_name: /*html*/ `<a href="javascript:;" menu="edit_name"><i class="icon-operate ifo-rename" menu="edit_name"></i><span menu="edit_name">重命名</span></a>`,
    delete: /*html*/ `<a href="javascript:;" menu="delete" btn="del"><i class="icon-operate ifo-remove" menu="delete"></i><span menu="delete">删除</span></a>`,
    search: /*html*/ `<a href="javascript:;" class="mm-operation" type="search"><span>一键搜</span></a>`,
    sha1: /*html*/ `<a href="javascript:;" class="mm-operation" type="sha1"><span>SHA1查重</span></a>`,
    new_tab: /*html*/ `<a href="$href" target="_blank" class="mm-operation"><span>新标签页打开</span></a>`
  }
  type MenuKey = keyof typeof MENU_MAP
  const CONTROLLED_MENU: MenuKey[] = ['new_tab', 'search', 'sha1']
  /**
   * 获取悬浮菜单
   */
  const getFloatMenu = ({
    fileType,
    menuKeys = CONTROLLED_MENU,
    isAddWrap,
    cid
  }: {
    fileType: string
    menuKeys?: MenuKey[]
    isAddWrap?: boolean
    cid?: string
  }): string => {
    const menu = menuKeys.reduce((prev, key) => {
      if (key === 'search' && G.get('quickSearch.addBtn')) {
        prev += MENU_MAP.search
      } else if (
        key === 'new_tab' &&
        G.get('floatOperation.newTab.addBtn') &&
        fileType === '0'
      ) {
        prev += MENU_MAP.new_tab.replace(
          '$href',
          `/?cid=${cid}&offset=0&mode=wangpan`
        )
      } else if (
        key === 'sha1' &&
        G.get('floatOperation.sha1.addBtn') &&
        fileType === '1'
      ) {
        prev += MENU_MAP.sha1
      } else if (!CONTROLLED_MENU.includes(key)) {
        prev += MENU_MAP[key]
      }
      return prev
    }, '')
    if (isAddWrap) {
      return `<div class="file-opr" rel="menu">${menu}</div>`
    }
    return menu
  }

  /**
   * 悬浮菜单初始化
   */
  const initMenu = () => {
    /**
     * 一键搜（快捷搜索）
     */
    const handleQuickSearch = (keyword: string) => {
      const { aid, cid, name } = getAidCid()

      const openSearch = (value: string) => {
        GM_openInTab(
          `//115.com/?mode=search&submode=wangpan&url=${encodeURIComponent(
            `/?aid=${aid}&cid=${
              G.get('quickSearch.isAll') ? 0 : cid
            }&old_cid=${cid}&old_cid_name=${encodeURIComponent(
              name
            )}&search_value=${encodeURIComponent(
              value
            )}&ct=file&ac=search&is_wl_tpl=1`
          )}`,
          { active: true }
        )
      }

      if (!G.get('quickSearch.edit')) {
        openSearch(keyword)
        return
      }

      const content = $(
        /*html*/ `<div class="dialog-input"><textarea rel="txt"></textarea></div><div class="dialog-action"><a href="javascript:;" class="dgac-confirm" btn="confirm">搜索</a></div>`
      )
      const $input = content.find("[rel='txt']")

      $input.val(keyword)

      const $dialog = new top.Core.DialogBase({
        title: '115 小助手(编辑一键搜)',
        content
      })
      const confirm = () => {
        openSearch(($input.val() as string).trim())
        $dialog.Close()
      }

      $input.on('keydown', function (e) {
        switch (e.keyCode) {
          case 13:
            return confirm()
          case 27:
            return $dialog.Close()
        }
      })
      content.find('[btn="confirm"]').on('click', confirm)
      $dialog.Open()
      $input.focus()
    }

    $(document).on('click', '.mm-operation', function () {
      const type = $(this).attr('type')
      const $li = $(this).parents('li')
      if (!type) {
        return
      }
      switch (type) {
        case 'sha1':
          return handleRepeatSha1($li.attr('file_id'))
        case 'search':
          const ico = $li.attr('ico')
          const title = $li.attr('title')
          return handleQuickSearch(title.replace(`.${ico}`, ''))
      }
    })
  }

  /**
   * 列表显示文件SHA1信息
   */
  const listShowSHA1 = ($listItem: JQuery) => {
    const sha1 = $listItem.attr('sha1')
    if (sha1 && !$listItem.find('[show-sha1]').length) {
      $listItem
        .find('.file-name')
        .addClass('h-auto')
        .append(`<small show-sha1>${sha1}</small>`)
    }
  }

  /**
   * 快捷操作增强
   *  - SHA1查重
   *  - 删除空文件夹
   *  - 单文件夹查重
   *  - 加速转码
   */
  const initQuickOperation = () => {
    // 防止重复点击自动查重
    let autoCheckDisabled = false

    observerChildList(() => {
      autoCheckDisabled = false
      if (isThumbnail()) {
        return
      }
      $('li[rel="item"]').each(function () {
        G.get('list.showSha1') && listShowSHA1($(this))
        if (!$(this).find('.mm-operation').length) {
          $(this)
            .find('.file-opr')
            .prepend(
              getFloatMenu({
                fileType: $(this).attr('file_type'),
                cid: $(this).attr('cate_id')
              })
            )
        }
      })
    })

    const handleGetDetail = (aid: string, cid: string): Promise<any> =>
      new Promise((resolve) =>
        top.Core.DataAccess.Dir.GetDetail(aid, cid, (res) => resolve(res))
      )

    // SHA1 自动查重
    const SHA1_MAP = {}
    // 随机延迟索引
    let delayIndex = random(...randomDelayIndex)

    type QuicOperationKey =
      | 'auto-sha1'
      | 'delete-empty'
      | 'folder-sha1'
      | 'transcoded'
    type QuicOperationConfigs = {
      [P in QuicOperationKey]: {
        GMConfigKey: GetKey
        btnHtml: string
        func(): void
      }
    }
    const QUIC_OPERATION_CONFIGS: QuicOperationConfigs = {
      // SHA1 自动查重
      'auto-sha1': {
        GMConfigKey: 'autoSha1.addBtn',
        btnHtml: /*html*/ `<a href="javascript:;" class="button btn-line mm-quick-operation" type="auto-sha1" title="只查询当前页码目录中的文件"><span>SHA1自动查重</span></a>`,
        func() {
          if (autoCheckDisabled) {
            MinMessage.Show({
              text: '已查询过当前页码所有文件，需再次查询请刷新页面',
              type: 'war',
              timeout: 2e3
            })
            return
          }

          const $li = $('li[file_type="1"]')

          if (!$li.length) {
            MinMessage.Show({
              text: '当前文件夹下没有可查重文件',
              type: 'war',
              timeout: 2e3
            })
            return
          }

          MinMessage.Show({ text: '正在查找', type: 'load', timeout: 0 })

          let index = 0
          // 重复数统计
          let repeatCount = 0

          const findRepeat = async () => {
            const isMax = repeatCount >= G.get('autoSha1.maxCount')
            const isEnd = index >= $li.length
            if (isEnd || isMax) {
              isEnd && (autoCheckDisabled = true)
              const options = { text: '', type: '', timeout: 2e3 }
              if (repeatCount) {
                options.text = isMax
                  ? `已查询到 ${repeatCount} 个重复文件`
                  : `已查询完当前分页，共 ${repeatCount} 个重复文件`
                options.type = 'suc'
              } else {
                options.text = '当前分页下没有可查重文件'
                options.type = 'war'
              }
              MinMessage.Show(options)
              return
            }

            const $currentLi = $li.eq(index)
            const fileId = $currentLi.attr('file_id')
            const sha1 = $currentLi.attr('sha1')

            if (
              !SHA1_MAP[sha1] &&
              index > G.get('delay.minCount') &&
              index % delayIndex === 0
            ) {
              delayIndex = random(...randomDelayIndex)
              await delay()
            }

            index++

            if (fileId && sha1 && !SHA1_MAP[sha1]) {
              SHA1_MAP[sha1] = 1
              return handleRepeatSha1(fileId, true).then((flag) => {
                if (flag) {
                  $currentLi.addClass('active')
                  repeatCount++
                }
                return findRepeat()
              })
            }
            return findRepeat()
          }

          findRepeat()
        }
      },
      // 删除空文件夹
      'delete-empty': {
        GMConfigKey: 'addDeleteEmptyBtn',
        btnHtml: /*html*/ `<a href="javascript:;" class="button btn-line mm-quick-operation" type="delete-empty" title="只删除当前页码目录中的文件夹"><span>删除空文件夹</span></a>`,
        func() {
          const $li = $('li[file_type="0"]')
          if (!$li.length) {
            MinMessage.Show({
              text: '当前文件目录下没有文件夹',
              type: 'war',
              timeout: 2e3
            })
            return
          }

          MinMessage.Show({ text: '正在查找', type: 'load', timeout: 0 })

          let index = 0
          // 空文件夹统计
          let emptyFolderCount = 0

          const recursive = async () => {
            if (index >= $li.length) {
              if (emptyFolderCount === 0) {
                MinMessage.Show({
                  text: '当前文件目录下没有空文件夹',
                  type: 'war',
                  timeout: 2e3
                })
              } else {
                MinMessage.Hide()
                setTimeout(() => {
                  $('li[menu="delete"]:visible').trigger('click')
                }, 2e2)
              }
              return
            }

            if (index > G.get('delay.minCount') && index % delayIndex === 0) {
              delayIndex = random(...randomDelayIndex)
              await delay()
            }

            const $currentLi = $li.eq(index)

            handleGetDetail(
              $currentLi.attr('area_id'),
              $currentLi.attr('cate_id')
            ).then(({ size }) => {
              if (size === '0B') {
                emptyFolderCount++
                $currentLi.find('.checkbox').trigger('click')
              }
              index++
              $currentLi.find('.file-size span').text(size)
              return recursive()
            })
          }

          recursive()
        }
      },
      // 单文件夹查重
      'folder-sha1': {
        GMConfigKey: 'folderRepeat.addBtn',
        btnHtml: /*html*/ `<a href="javascript:;" class="button btn-line mm-quick-operation" type="folder-sha1" title="只查询并标记当前目录中的重复文件"><span>单文件夹查重</span></a>`,
        func() {
          const $loadAllFile = $('[menu="load_all_file"]:visible')
          const isMore = !!$loadAllFile.length
          const isSelected = G.get('folderRepeat.select')

          const checkSha1 = () => {
            const SHA1_MAP = {}

            const $li = $('li[file_type="1"]')

            if (!$li.length) {
              return $.alertTip('当前文件夹下没有可查重文件')
            }
            // 重复数统计
            let repeatCount = 0

            $li.each(function () {
              const sha1 = $(this).attr('sha1')
              if (!SHA1_MAP[sha1]) {
                SHA1_MAP[sha1] = 1
              } else {
                repeatCount++
                $(this).addClass('active')
                if (isSelected) {
                  $(this).find('.checkbox').trigger('click')
                }
              }
            })

            const options = { text: '', type: '', timeout: 2e3 }
            if (repeatCount) {
              options.text = `当前文件夹下共 ${repeatCount} 个重复文件`
              options.type = 'suc'
            } else {
              options.text = '当前文件夹下没有重复文件'
              options.type = 'war'
            }
            MinMessage.Show(options)
          }

          if (isMore) {
            observerChildList((_, { addedNodes }) => {
              addedNodes.length && checkSha1()
            }, '#js_data_list .list-contents > ul')

            // 加载全部文件
            $loadAllFile.trigger('click')
          } else {
            checkSha1()
          }
        }
      },
      // 加速转码
      transcoded: {
        GMConfigKey: 'transcoded.addBtn',
        btnHtml: /*html*/ `<a href="javascript:;" class="button btn-line mm-quick-operation" type="transcoded" title="对当前页码目录中所有未转码文件进行加速转码（115会自动将第一个文件进行转码）"><span>加速转码</span></a>`,
        func() {
          if (top.USER_INFO.IS_VIP !== 1) {
            return $.alertTip('该功能仅 115 VIP 用户可用')
          }
          const pickCode = $('li[file_type="1"][iv=1]:first').attr('pick_code')
          if (!pickCode) {
            return $.alertTip(`当前目录下没有需要转码的文件哦`)
          }

          top.UA$.ajax({
            url: '//webapi.115.com/files/is_transcoded',
            type: 'POST',
            data: {
              pick_code: pickCode
            },
            dataType: 'json',
            success({ state, data, count }) {
              if (state && data && data.length) {
                $.confirm({
                  text: `此目录下还有 ${count} 个文件未转码，${
                    data.length < count
                      ? `是否提交 VIP 加速？<br/>（单次提交最多可加速50个）`
                      : `是否全部提交 VIP 加速？`
                  }`,
                  confirm_text: '全部加速',
                  callback(e) {
                    e &&
                      top.UA$.ajax({
                        url: '//115.com/?ctl=play&ac=batch_push',
                        data: {
                          file_ids: data.join(',')
                        },
                        dataType: 'json',
                        type: 'POST',
                        xhrFields: { withCredentials: !0 },
                        success(t) {
                          t.state || $.alertTip(t.message || t.error)
                        }
                      })
                  }
                })
              } else {
                $.alertTip(`当前目录下没有需要转码的文件哦`)
              }
            }
          })
        }
      }
    }

    // 顶部添加快捷操作按钮
    if (!$('.mm-quick-operation').length) {
      let operations = ''
      Object.keys(QUIC_OPERATION_CONFIGS).forEach((key: QuicOperationKey) => {
        const data = QUIC_OPERATION_CONFIGS[key]
        if (G.get(data.GMConfigKey)) {
          operations += data.btnHtml
        }
      })
      $('#js_path_add_dir').after(operations)
    }

    // 路径栏快捷操作
    $(document).on('click', '.mm-quick-operation', function () {
      const type = $(this).attr('type') as QuicOperationKey
      if (!type || !QUIC_OPERATION_CONFIGS[type]) {
        return
      }
      QUIC_OPERATION_CONFIGS[type].func()
    })
  }

  /**
   * SHA1 查重列表（支持选中第一个元素）
   */
  const initRepeatSha1List = () => {
    const $list = $('#js-list')
    observerChildList(() => {
      // 支持选中第一个元素
      if (G.get('sha1Repeat.addCheckbox')) {
        const $first = $list.find('li:first-child')
        if (!$first.attr('item')) {
          $first.attr('item', 'file').find('i.file-type').removeProp('style')
          $first.children('.file-name-wrap').prepend('<b class="checkbox"></b>')
        }
        if (G.get('sha1Repeat.select')) {
          $first.trigger('click')
        }
      }

      // 添加悬浮菜单
      if (G.get('sha1Repeat.addMenu')) {
        $('li[rel="item"]').each(function () {
          const that = $(this)
          if (!that.attr('shared')) {
            that.attr('shared', '0')
          }
          if (!that.find('.file-opr').length) {
            that.append(
              getFloatMenu({
                fileType: that.attr('file_type'),
                menuKeys: ['move', 'edit_name', 'delete'],
                isAddWrap: true
              })
            )
          }
        })
      }
    }, $list)

    // 点击菜单调用对应 115 方法
    $list.on('click', '.file-opr a', function (event) {
      event.stopPropagation()
      top.Core.FileMenu.DoEvent(
        [$(this).parents('li')],
        $(this).attr('menu'),
        checkRepaatApi.load
      )
    })
  }

  /**
   * 布局初始化
   */
  const initMainLayout = () => {
    const SIDEBAR_SELECTOR = '[mm-layout="sidebar"]'
    const HELPER_SETTING_SELECTOR = '[mm-layout="helper-setting"]'
    const $mainSidebar = top.$('.main-sub .sub-footer ul')

    G.get('layout.hideSidebar') && top.$('.wrap-hflow .sub-hflow').toggle(0)

    const initSidebar = () => {
      if (top.$(SIDEBAR_SELECTOR).length) {
        return
      }

      $mainSidebar
        .append(
          /*html*/ `<li mm-layout="sidebar"><a href="javascript:;"><p id="mm-sidebar">${
            top.$('.wrap-hflow .sub-hflow').is(':visible') ? '关闭' : '打开'
          }</p><p>侧边栏</p></a></li>`
        )
        .find(SIDEBAR_SELECTOR)
        .on('click', function () {
          const $sidebar = top.$('.wrap-hflow .sub-hflow')
          $sidebar.toggle(200)
          setTimeout(function () {
            top.$('#mm-sidebar').text($sidebar.is(':visible') ? '关闭' : '打开')
          }, 200)
        })
    }

    const initSetting = () => {
      if (top.$(HELPER_SETTING_SELECTOR).length) {
        return
      }

      $mainSidebar
        .append(
          /*html*/ `<li mm-layout="helper-setting"><a href="javascript:;"><p>小助手</p><p>设置</p></a></li>`
        )
        .find(HELPER_SETTING_SELECTOR)
        .on('click', () => (G.isOpen ? G.close() : G.open()))
    }

    initSidebar()
    G.get('layout.addSettingBtn') && initSetting()
  }

  // 初始化
  $(() => {
    initMenu()

    /* 主界面布局初始化 */
    if (urlHasString('mode=wangpan')) {
      initMainLayout()
    }
    // 网盘列表模块
    if (urlHasString('cid=')) {
      // 添加链接任务入口
      G.get('layout.addTaskBtn') && addLinkTaskBtn()
      initQuickOperation()
    }
    // SHA1 查重列表模块
    else if (urlHasString('tab=sha1_repeat')) {
      initRepeatSha1List()
    }
    // 网盘搜索模块
    else if (urlHasString('mode=search') && G.get('search.addMenu')) {
      observerChildList(() => {
        $('li[rel="item"]').each(function () {
          G.get('search.showSha1') && listShowSHA1($(this))
          if (!$(this).find('.mm-operation').length) {
            $(this).append(
              getFloatMenu({
                fileType: $(this).attr('file_type'),
                menuKeys: [
                  'new_tab',
                  'search',
                  'sha1',
                  'move',
                  'edit_name',
                  'delete'
                ],
                isAddWrap: true,
                cid: $(this).attr('cate_id')
              })
            )
          }
        })
      })
    }
    // 标签模块
    else if (urlHasString('tab=label') && G.get('list.showSha1')) {
      observerChildList(() => {
        $('li[rel="item"]').each(function () {
          listShowSHA1($(this))
        })
      })
    }
  })
})()
