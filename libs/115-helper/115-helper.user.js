// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.6.0
// @description   顶部链接任务入口还原、SHA1 快速查重（新页面打开）、SHA1 查重列表支持选中第一个元素、SHA1 自动查重、删除空文件夹、一键搜
// @icon      	  https://115.com/favicon.ico
// @author        maomao1996
// @include       *://115.com/*
// @grant         GM_registerMenuCommand
// @grant         GM_openInTab
// @require       https://greasyfork.org/scripts/398240-gm-config-zh-cn/code/G_zh-CN.js
// ==/UserScript==
;
(function () {
    'use strict';
    // 过滤非 iframe 和 iframe 套娃场景 场景
    if (window.self === window.top || typeof TOP === 'undefined') {
        return;
    }
    /**
     * 脚本内部全局变量
     */
    var search = location.search;
    var MinMessage = TOP.Core.MinMessage;
    /**
     * 脚本设置相关
     */
    var GMConfigOptions = {
        id: 'Helper_Cfg',
        title: '115 小助手',
        css: '#Helper_Cfg .config_var textarea{width: 310px; height: 50px;} #Helper_Cfg .inline {padding-bottom:0px;}#Helper_Cfg .config_var {margin-left: 20px;margin-right: 20px;} #Helper_Cfg input[type="checkbox"] {margin-left: 0px;vertical-align: top;} #Helper_Cfg input[type="text"] {width: 53px;} #Helper_Cfg {background-color: lightblue;} #Helper_Cfg .reset_holder {float: left; position: relative; bottom: -1.2em;}',
        frameStyle: {
            height: '520px',
            width: '400px',
            zIndex: '1314520'
        },
        fields: {
            addTaskBtn: {
                section: ['', '网盘顶部菜单相关设置'],
                label: '网盘顶部菜单增加链接任务按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true
            },
            addAutoSha1Btn: {
                section: ['', '网盘路径栏相关设置'],
                label: '网盘路径栏增加SHA1自动查重按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true
            },
            addDeleteEmptyBtn: {
                label: '网盘路径栏增加删除空文件夹按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true
            },
            addSha1Btn: {
                section: ['', '网盘列表悬浮菜单相关设置'],
                label: '悬浮菜单增加SHA1查重按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true
            },
            addSearchBtn: {
                label: '悬浮菜单增加一键搜按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
                line: 'start'
            },
            searchMode: {
                label: '一键搜打开编辑弹窗',
                labelPos: 'right',
                type: 'checkbox',
                default: false,
                line: 'end'
            },
            reminder: {
                label: '温馨提示',
                labelPos: 'right',
                type: 'button',
                click: function () {
                    alert("1. \u4E3A\u4FDD\u8BC1\u8D26\u53F7\u5B89\u5168 SHA1 \u81EA\u52A8\u67E5\u91CD \u529F\u80FD\u4F7F\u7528\u4E86\u7F13\u5B58\u673A\u5236\uFF08\u6BCF\u4E2A\u9875\u7801\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u53EA\u4F1A\u67E5\u8BE2\u4E00\u6B21\uFF0C\u5982\u9700\u518D\u6B21\u67E5\u8BE2\u8BF7\u4F7F\u7528\u5177\u4F53\u6587\u4EF6\u7684 SHA1\u67E5\u91CD \u6309\u94AE\u6216\u5237\u65B0\u9875\u9762\u540E\u518D\u4F7F\u7528\uFF09\n2. \u811A\u672C\u8BBE\u7F6E\u4FDD\u5B58\u540E\u5C06\u4F1A\u81EA\u52A8\u5237\u65B0\u9875\u9762\n3. \u811A\u672C\u52A0\u8F7D\u6709\u6761\u4EF6\u9650\u5236\u4F1A\u9020\u6210\u8BBE\u7F6E\u5F39\u7A97\u4E0D\u5C45\u4E2D\n");
                }
            }
        },
        events: {
            save: function () {
                location.reload();
                G.close();
            }
        }
    };
    var G = GM_config;
    G.init(GMConfigOptions);
    GM_registerMenuCommand('设置', function () { return G.open(); });
    /**
     * 工具方法 - url 中是否存在某个字符串
     */
    var urlHasString = function (str) { return search.indexOf(str) > -1; };
    var getAidCid = function () {
        try {
            var main = TOP.Ext.CACHE.FileMain;
            return main.Setting.GetActive();
        }
        catch (e) {
            return { cid: 0 };
        }
    };
    /**
     * 在顶部菜单添加链接任务按钮
     */
    var addLinkTaskBtn = function () {
        $('#js_top_panel_box .button[menu="upload"]').after('<a href="javascript:;" class="button btn-line btn-upload" menu="offline_task"><i class="icon-operate ifo-linktask"></i><span>链接任务</span><em style="display:none;" class="num-dot"></em></a>');
    };
    /**
     * 快捷操作增强
     *  - SHA1查重
     *  - 删除空文件夹
     */
    var initQuickOperation = function () {
        // 防止重复点击自动查重
        var autoCheckDisabled = false;
        // 顶部添加快捷操作按钮
        if (!$('.mm-quick-operation').length) {
            var operations = '';
            if (G.get('addAutoSha1Btn')) {
                operations +=
                    '<a href="javascript:;" class="button btn-line mm-quick-operation" type="auto-sha1" style="margin-left: 10px;" title="只查询当前页码目录中的文件"><span>SHA1自动查重</span></a>';
            }
            if (G.get('addDeleteEmptyBtn')) {
                operations +=
                    '<a href="javascript:;" class="button btn-line mm-quick-operation" type="delete-empty" style="margin-left: 10px;" title="只删除当前页码目录中的文件夹"><span>删除空文件夹</span></a>';
            }
            $('#js_path_add_dir').after(operations);
        }
        var listObserver = new MutationObserver(function (mutationsList) {
            var isList = $('.list-thumb').length === 0;
            mutationsList.forEach(function (_a) {
                var type = _a.type;
                if (type === 'childList') {
                    autoCheckDisabled = false;
                    if (!isList) {
                        return;
                    }
                    $('li[rel="item"]').each(function () {
                        if (!$(this).find('.mm-operation').length) {
                            var operations = '';
                            if (G.get('addSearchBtn')) {
                                operations +=
                                    '<a href="javascript:;" class="mm-operation" type="search"><span>一键搜</span></a>';
                            }
                            if (G.get('addSha1Btn') && $(this).attr('file_type') === '1') {
                                operations +=
                                    '<a href="javascript:;" class="mm-operation" type="sha1"><span>SHA1查重</span></a>';
                            }
                            $(this).find('a[menu="public_share"]').after(operations);
                        }
                    });
                }
            });
        });
        if ($('#js_data_list').length) {
            listObserver.observe($('#js_data_list')[0], { childList: true });
        }
        var handleRepeatSha1 = function (file_id, isAll) {
            if (isAll === void 0) { isAll = false; }
            return new Promise(function (resolve) {
                !isAll &&
                    MinMessage.Show({ text: '正在查找', type: 'load', timeout: 2e5 });
                TOP.UA$.ajax({
                    url: '//webapi.115.com/files/get_repeat_sha',
                    data: { file_id: file_id },
                    xhrFields: { withCredentials: !0 },
                    dataType: 'json',
                    type: 'GET',
                    success: function (_a) {
                        var state = _a.state, data = _a.data;
                        !isAll && MinMessage.Hide();
                        if (state && data.length > 1) {
                            GM_openInTab("//115.com/?tab=sha1_repeat&file_id=" + file_id + "&mode=wangpan", { active: !isAll });
                            resolve(true);
                        }
                        else {
                            !isAll &&
                                MinMessage.Show({
                                    text: '没有重复文件',
                                    type: 'war',
                                    timeout: 2e3
                                });
                            resolve(false);
                        }
                    }
                });
            });
        };
        var handleGetDetail = function (aid, cid) {
            return new Promise(function (resolve) {
                TOP.Core.DataAccess.Dir.GetDetail(aid, cid, function (_a) {
                    var size = _a.size;
                    return resolve(size === '0B');
                });
            });
        };
        var handleSearch = function (keyword) {
            var _a = getAidCid(), aid = _a.aid, cid = _a.cid, name = _a.name;
            var openSearch = function (value) {
                GM_openInTab("//115.com/?mode=search&submode=wangpan&url=" + encodeURIComponent("/?aid=" + aid + "&cid=" + cid + "&old_cid=" + cid + "&old_cid_name=" + name + "&search_value=" + value + "&ct=file&ac=search&is_wl_tpl=1"), { active: true });
            };
            if (!G.get('searchMode')) {
                openSearch(keyword);
                return;
            }
            var content = $('<div class="dialog-input"><textarea rel="txt"></textarea></div><div class="dialog-action"><a href="javascript:;" class="dgac-confirm" btn="confirm">搜索</a></div>');
            var $input = content.find("[rel='txt']");
            $input.val(keyword);
            var $dialog = new TOP.Core.DialogBase({
                title: '115 小助手(编辑一键搜)',
                content: content
            });
            var confirm = function () {
                openSearch($input.val().trim());
                $dialog.Close();
            };
            $input.on('keydown', function (e) {
                switch (e.keyCode) {
                    case 13:
                        return confirm();
                    case 27:
                        return $dialog.Close();
                }
            });
            content.find('[btn="confirm"]').on('click', confirm);
            $dialog.Open();
            $input.focus();
        };
        // 单文件操作
        $(document).on('click', '.mm-operation', function () {
            var type = $(this).attr('type');
            var $li = $(this).parents('li');
            if (!type) {
                return;
            }
            switch (type) {
                case 'sha1':
                    return handleRepeatSha1($li.attr('file_id'));
                case 'search':
                    var ico = $li.attr('ico');
                    var title = $li.attr('title');
                    return handleSearch(title.replace("." + ico, ''));
            }
        });
        // SHA1 自动查重
        var SHA1_MAP = {};
        var handleAutoCheckSha1 = function () {
            if (autoCheckDisabled) {
                MinMessage.Show({
                    text: '已查询过当前页码所有文件，需再次查询请刷新页面',
                    type: 'war',
                    timeout: 2e3
                });
                return;
            }
            autoCheckDisabled = true;
            var $li = $('li[file_type="1"]');
            if (!$li.length || Object.keys(SHA1_MAP).length === $li.length) {
                MinMessage.Show({
                    text: '当前文件夹下没有可查重文件',
                    type: 'war',
                    timeout: 2e3
                });
                return;
            }
            MinMessage.Show({ text: '正在查找', type: 'load', timeout: 2e5 });
            var index = 0;
            // 重复数统计
            var repeatCount = 0;
            var findRepeat = function () {
                if (index >= $li.length) {
                    var options = { text: '', type: '', timeout: 2e3 };
                    if (repeatCount) {
                        options.text = "\u67E5\u8BE2\u5230 " + repeatCount + " \u4E2A\u91CD\u590D\u6587\u4EF6";
                        options.type = 'suc';
                    }
                    else {
                        options.text = '当前分页下没有可查重文件';
                        options.type = 'war';
                    }
                    MinMessage.Show(options);
                    return;
                }
                var $currentLi = $li.eq(index);
                var fileId = $currentLi.attr('file_id');
                var sha1 = $currentLi.attr('sha1');
                index++;
                if (fileId && sha1 && !SHA1_MAP[sha1]) {
                    SHA1_MAP[sha1] = 1;
                    return handleRepeatSha1(fileId, true).then(function (flag) {
                        if (flag) {
                            repeatCount++;
                        }
                        return findRepeat();
                    });
                }
                return findRepeat();
            };
            findRepeat();
        };
        // 删除空文件夹
        var handleDeleteEmptyFolder = function () {
            var $li = $('li[file_type="0"]');
            if (!$li.length) {
                MinMessage.Show({
                    text: '当前文件目录下没有文件夹',
                    type: 'war',
                    timeout: 2e3
                });
                return;
            }
            MinMessage.Show({ text: '正在查找', type: 'load', timeout: 2e4 });
            var files = [];
            $li.each(function () {
                files.push(handleGetDetail($(this).attr('area_id'), $(this).attr('cate_id')));
            });
            Promise.all(files).then(function (result) {
                var emptyFolderCount = 0;
                result.forEach(function (item, index) {
                    if (item) {
                        emptyFolderCount++;
                        $li.eq(index).find('[menu="file_check_one"]').trigger('click');
                    }
                });
                if (emptyFolderCount === 0) {
                    MinMessage.Show({
                        text: '当前文件目录下没有空文件夹',
                        type: 'war',
                        timeout: 2e3
                    });
                }
                else {
                    MinMessage.Hide();
                    setTimeout(function () {
                        $('li[menu="delete"]:visible').trigger('click');
                    }, 200);
                }
            });
        };
        // 快捷操作
        $(document).on('click', '.mm-quick-operation', function () {
            var type = $(this).attr('type');
            if (!type) {
                return;
            }
            switch (type) {
                // SHA1 自动查重
                case 'auto-sha1':
                    return handleAutoCheckSha1();
                // 删除空文件夹
                case 'delete-empty':
                    return handleDeleteEmptyFolder();
            }
        });
    };
    /**
     * SHA1 查重列表（支持选中第一个元素）
     */
    var initRepeatSha1List = function () {
        var listObserver = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (_a) {
                var type = _a.type;
                if (type === 'childList') {
                    var $first = $('#js-list li:first-child');
                    if (!$first.attr('item')) {
                        $first.attr('item', 'file');
                        $first.find('i.file-type').removeProp('style');
                        $first
                            .children('.file-name-wrap')
                            .prepend('<b class="checkbox"></b>');
                    }
                }
            });
        });
        listObserver.observe($('#js-list')[0], { childList: true });
    };
    // 初始化
    $(function () {
        // 网盘列表模块
        if (urlHasString('cid=')) {
            // 添加链接任务入口
            G.get('addTaskBtn') && addLinkTaskBtn();
            // 快捷操作初始化
            initQuickOperation();
        }
        // SHA1 查重列表模块
        else if (urlHasString('tab=sha1_repeat')) {
            initRepeatSha1List();
        }
    });
})();
