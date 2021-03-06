/*!
// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       1.0.1
// @description   顶部链接任务入口还原、SHA1 快速查重（新页面打开）、SHA1 自动查重、删除空文件夹、一键搜（快捷搜索）、SHA1 查重列表支持选中第一个元素和悬浮菜单展示、搜索列表支持悬浮菜单展示
// @icon      	  https://115.com/favicon.ico
// @author        maomao1996
// @include       *://115.com/*
// @grant         GM_registerMenuCommand
// @grant         GM_addStyle
// @grant         GM_openInTab
// @require       https://greasyfork.org/scripts/398240-gm-config-zh-cn/code/G_zh-CN.js
// @run-at        document-end
// ==/UserScript==
*/
;
(function () {
    'use strict';
    if (window.self === window.top || typeof TOP === 'undefined') {
        return;
    }
    var search = top.location.search;
    var MinMessage = top.Core.MinMessage;
    var GMConfigOptions = {
        id: 'Helper_Cfg',
        title: '115 小助手',
        css: '#Helper_Cfg .config_var textarea{width: 310px; height: 50px;} #Helper_Cfg .inline {padding-bottom:0px;}#Helper_Cfg .config_var {margin-left: 20px;margin-right: 20px;} #Helper_Cfg input[type="checkbox"] {margin-left: 0px;vertical-align: top;} #Helper_Cfg input[type="text"] {width: 53px;} #Helper_Cfg {background-color: lightblue;} #Helper_Cfg .reset_holder {float: left; position: relative; bottom: -1.2em;}',
        frameStyle: {
            height: '560px',
            width: '420px',
            zIndex: '13145201996'
        },
        fields: {
            addTaskBtn: {
                section: ['', '网盘顶部菜单相关设置'],
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
                default: '20',
                line: 'end'
            },
            addDeleteEmptyBtn: {
                label: '网盘路径栏增加删除空文件夹按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true
            },
            addFolderRepeatBtn: {
                label: '网盘路径栏增加单文件夹查重按钮',
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
            joinGroup: {
                section: ['', '其他'],
                label: '加入 QQ 群',
                labelPos: 'right',
                type: 'button',
                click: function () {
                    GM_openInTab('https://jq.qq.com/?_wv=1027&k=ToOoVmku', {
                        active: true
                    });
                }
            },
            reminder: {
                label: '温馨提示',
                labelPos: 'right',
                type: 'button',
                click: function () {
                    alert("1. \u4E3A\u4FDD\u8BC1\u8D26\u53F7\u5B89\u5168 SHA1 \u81EA\u52A8\u67E5\u91CD \u529F\u80FD\u4F7F\u7528\u4E86\u7F13\u5B58\u673A\u5236\uFF08\u6BCF\u4E2A\u9875\u7801\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u53EA\u4F1A\u67E5\u8BE2\u4E00\u6B21\uFF0C\u5982\u9700\u518D\u6B21\u67E5\u8BE2\u8BF7\u4F7F\u7528\u5177\u4F53\u6587\u4EF6\u7684 SHA1\u67E5\u91CD \u6309\u94AE\u6216\u5237\u65B0\u9875\u9762\u540E\u518D\u4F7F\u7528\uFF09\n2. \u811A\u672C\u8BBE\u7F6E\u4FDD\u5B58\u540E\u5C06\u4F1A\u81EA\u52A8\u5237\u65B0\u9875\u9762\n3. \u811A\u672C\u52A0\u8F7D\u6709\u6761\u4EF6\u9650\u5236\u4F1A\u9020\u6210\u8BBE\u7F6E\u5F39\u7A97\u4E0D\u5C45\u4E2D");
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
    var urlHasString = function (str) { return search.indexOf(str) > -1; };
    var observerChildList = function (callback, selector) {
        if (selector === void 0) { selector = '#js_data_list'; }
        var observer = new MutationObserver(function (_a) {
            var mutation = _a[0];
            mutation.type === 'childList' && callback(observer, mutation);
        });
        var $selector = typeof selector === 'string' ? $(selector) : selector;
        if ($selector.length) {
            observer.observe($selector[0], { childList: true });
        }
        return observer;
    };
    var getAidCid = function () {
        try {
            var main = top.Ext.CACHE.FileMain;
            return main.Setting.GetActive();
        }
        catch (e) {
            return { cid: 0 };
        }
    };
    var styles = [
        '.mm-quick-operation{margin-left: 12px;padding: 0 6px}',
        '.list-contents .active::before{background: rgba(199, 237, 204, 0.7)!important;}'
    ].join('');
    GM_addStyle(styles);
    var addLinkTaskBtn = function () {
        $('#js_top_panel_box .button[menu="upload"]').after('<a href="javascript:;" class="button btn-line btn-upload" menu="offline_task"><i class="icon-operate ifo-linktask"></i><span>链接任务</span><em style="display:none;" class="num-dot"></em></a>');
    };
    var handleRepeatSha1 = function (file_id, isAll) {
        if (isAll === void 0) { isAll = false; }
        return new Promise(function (resolve) {
            !isAll &&
                MinMessage.Show({ text: '正在查找', type: 'load', timeout: 2e5 });
            top.UA$.ajax({
                url: '//webapi.115.com/files/get_repeat_sha',
                data: { file_id: file_id },
                xhrFields: { withCredentials: !0 },
                dataType: 'json',
                type: 'GET',
                success: function (_a) {
                    var state = _a.state, data = _a.data;
                    !isAll && MinMessage.Hide();
                    if (state && data.length > 1) {
                        var sha1RepeatUrl = "//115.com/?tab=sha1_repeat&file_id=" + file_id + "&mode=wangpan";
                        if (G.get('sha1Repeat.select')) {
                            sha1RepeatUrl += '&select=1';
                        }
                        GM_openInTab(sha1RepeatUrl, { active: !isAll });
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
    var MENU_MAP = {
        move: "<a href=\"javascript:;\" menu=\"move\"><i class=\"icon-operate ifo-move\" menu=\"move\"></i><span menu=\"move\">\u79FB\u52A8</span></a>",
        edit_name: "<a href=\"javascript:;\" menu=\"edit_name\"><i class=\"icon-operate ifo-rename\" menu=\"edit_name\"></i><span menu=\"edit_name\">\u91CD\u547D\u540D</span></a>",
        delete: "<a href=\"javascript:;\" menu=\"delete\" btn=\"del\"><i class=\"icon-operate ifo-remove\" menu=\"delete\"></i><span menu=\"delete\">\u5220\u9664</span></a>",
        search: "<a href=\"javascript:;\" class=\"mm-operation\" type=\"search\"><span>\u4E00\u952E\u641C</span></a>",
        sha1: "<a href=\"javascript:;\" class=\"mm-operation\" type=\"sha1\"><span>SHA1\u67E5\u91CD</span></a>"
    };
    var CONTROLLED_MENU = ['search', 'sha1'];
    var getFloatMenu = function (fileType, menuKeys, isAddWrap) {
        if (menuKeys === void 0) { menuKeys = CONTROLLED_MENU; }
        var menu = menuKeys.reduce(function (prev, key) {
            if (key === 'search' && G.get('quickSearch.addBtn')) {
                prev += MENU_MAP.search;
            }
            else if (key === 'sha1' && G.get('addSha1Btn') && fileType === '1') {
                prev += MENU_MAP.sha1;
            }
            else if (!CONTROLLED_MENU.includes(key)) {
                prev += MENU_MAP[key];
            }
            return prev;
        }, '');
        if (isAddWrap) {
            return "<div class=\"file-opr\" rel=\"menu\">" + menu + "</div>";
        }
        return menu;
    };
    var initMenu = function () {
        var handleQuickSearch = function (keyword) {
            var _a = getAidCid(), aid = _a.aid, cid = _a.cid, name = _a.name;
            var openSearch = function (value) {
                GM_openInTab("//115.com/?mode=search&submode=wangpan&url=" + encodeURIComponent("/?aid=" + aid + "&cid=" + (G.get('quickSearch.isAll') ? 0 : cid) + "&old_cid=" + cid + "&old_cid_name=" + encodeURIComponent(name) + "&search_value=" + encodeURIComponent(value) + "&ct=file&ac=search&is_wl_tpl=1"), { active: true });
            };
            if (!G.get('quickSearch.edit')) {
                openSearch(keyword);
                return;
            }
            var content = $('<div class="dialog-input"><textarea rel="txt"></textarea></div><div class="dialog-action"><a href="javascript:;" class="dgac-confirm" btn="confirm">搜索</a></div>');
            var $input = content.find("[rel='txt']");
            $input.val(keyword);
            var $dialog = new top.Core.DialogBase({
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
                    return handleQuickSearch(title.replace("." + ico, ''));
            }
        });
    };
    var initQuickOperation = function () {
        var autoCheckDisabled = false;
        if (!$('.mm-quick-operation').length) {
            var operations = '';
            if (G.get('autoSha1.addBtn')) {
                operations += "<a href=\"javascript:;\" class=\"button btn-line mm-quick-operation\" type=\"auto-sha1\" title=\"\u53EA\u67E5\u8BE2\u5F53\u524D\u9875\u7801\u76EE\u5F55\u4E2D\u7684\u6587\u4EF6\"><span>SHA1\u81EA\u52A8\u67E5\u91CD</span></a>";
            }
            if (G.get('addDeleteEmptyBtn')) {
                operations += "<a href=\"javascript:;\" class=\"button btn-line mm-quick-operation\" type=\"delete-empty\" title=\"\u53EA\u5220\u9664\u5F53\u524D\u9875\u7801\u76EE\u5F55\u4E2D\u7684\u6587\u4EF6\u5939\"><span>\u5220\u9664\u7A7A\u6587\u4EF6\u5939</span></a>";
            }
            if (G.get('addFolderRepeatBtn')) {
                operations += "<a href=\"javascript:;\" class=\"button btn-line mm-quick-operation\" type=\"folder-sha1\" title=\"\u53EA\u67E5\u8BE2\u5E76\u6807\u8BB0\u5F53\u524D\u76EE\u5F55\u4E2D\u7684\u91CD\u590D\u6587\u4EF6\"><span>\u5355\u6587\u4EF6\u5939\u67E5\u91CD</span></a>";
            }
            $('#js_path_add_dir').after(operations);
        }
        observerChildList(function () {
            autoCheckDisabled = false;
            if ($('.list-thumb').length > 0) {
                return;
            }
            $('li[rel="item"]').each(function () {
                if (!$(this).find('.mm-operation').length) {
                    $(this)
                        .find('a[menu="public_share"]')
                        .after(getFloatMenu($(this).attr('file_type')));
                }
            });
        });
        var handleGetDetail = function (aid, cid) {
            return new Promise(function (resolve) {
                top.Core.DataAccess.Dir.GetDetail(aid, cid, function (res) { return resolve(res); });
            });
        };
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
            var repeatCount = 0;
            var findRepeat = function () {
                var isMax = repeatCount >= G.get('autoSha1.maxCount');
                var isEnd = index >= $li.length;
                if (isEnd || isMax) {
                    isEnd && (autoCheckDisabled = true);
                    var options = { text: '', type: '', timeout: 2e3 };
                    if (repeatCount) {
                        options.text = isMax
                            ? "\u5DF2\u67E5\u8BE2\u5230 " + repeatCount + " \u4E2A\u91CD\u590D\u6587\u4EF6"
                            : "\u5DF2\u67E5\u8BE2\u5B8C\u5F53\u524D\u5206\u9875\uFF0C\u5171 " + repeatCount + " \u4E2A\u91CD\u590D\u6587\u4EF6";
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
                            $currentLi.addClass('active');
                            repeatCount++;
                        }
                        return findRepeat();
                    });
                }
                return findRepeat();
            };
            findRepeat();
        };
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
                    var $current = $li.eq(index);
                    if (item.size === '0B') {
                        emptyFolderCount++;
                        $current.find('[menu="file_check_one"]').trigger('click');
                    }
                    $current.find('.file-size span').text(item.size);
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
        var handleFolderCheckSha1 = function () {
            var $loadAllFile = $('[menu="load_all_file"]:visible');
            var isMore = !!$loadAllFile.length;
            var checkSha1 = function () {
                var SHA1_MAP = {};
                var $li = $('li[file_type="1"]');
                if (!$li.length) {
                    MinMessage.Show({
                        text: '当前文件夹下没有可查重文件',
                        type: 'war',
                        timeout: 2e3
                    });
                    return;
                }
                var repeatCount = 0;
                $li.each(function () {
                    var sha1 = $(this).attr('sha1');
                    if (!SHA1_MAP[sha1]) {
                        SHA1_MAP[sha1] = 1;
                    }
                    else {
                        repeatCount++;
                        $(this).addClass('active');
                    }
                });
                var options = { text: '', type: '', timeout: 2e3 };
                if (repeatCount) {
                    options.text = "\u5F53\u524D\u6587\u4EF6\u5939\u4E0B\u5171 " + repeatCount + " \u4E2A\u91CD\u590D\u6587\u4EF6";
                    options.type = 'suc';
                }
                else {
                    options.text = '当前文件夹下没有重复文件';
                    options.type = 'war';
                }
                MinMessage.Show(options);
            };
            if (isMore) {
                observerChildList(function (_, _a) {
                    var addedNodes = _a.addedNodes;
                    addedNodes.length && checkSha1();
                }, '#js_data_list .list-contents > ul');
                $loadAllFile.trigger('click');
            }
            else {
                checkSha1();
            }
        };
        $(document).on('click', '.mm-quick-operation', function () {
            var type = $(this).attr('type');
            if (!type) {
                return;
            }
            switch (type) {
                case 'auto-sha1':
                    return handleAutoCheckSha1();
                case 'delete-empty':
                    return handleDeleteEmptyFolder();
                case 'folder-sha1':
                    return handleFolderCheckSha1();
            }
        });
    };
    var initRepeatSha1List = function () {
        var $list = $('#js-list');
        observerChildList(function () {
            if (G.get('sha1Repeat.addCheckbox')) {
                var $first = $list.find('li:first-child');
                if (!$first.attr('item')) {
                    $first.attr('item', 'file').find('i.file-type').removeProp('style');
                    $first.children('.file-name-wrap').prepend('<b class="checkbox"></b>');
                }
                if (G.get('sha1Repeat.select')) {
                    $first.trigger('click');
                }
            }
            if (G.get('sha1Repeat.addMenu')) {
                $('li[rel="item"]').each(function () {
                    var that = $(this);
                    if (!that.attr('shared')) {
                        that.attr('shared', '0');
                    }
                    if (!that.find('.file-opr').length) {
                        that.append(getFloatMenu(that.attr('file_type'), ['move', 'edit_name', 'delete'], true));
                    }
                });
            }
        }, $list);
        $list.on('click', '.file-opr a', function (event) {
            event.stopPropagation();
            top.Core.FileMenu.DoEvent([$(this).parents('li')], $(this).attr('menu'), checkRepaatApi.load);
        });
    };
    $(function () {
        initMenu();
        if (urlHasString('cid=')) {
            G.get('addTaskBtn') && addLinkTaskBtn();
            initQuickOperation();
        }
        else if (urlHasString('tab=sha1_repeat')) {
            initRepeatSha1List();
        }
        else if (urlHasString('mode=search') && G.get('search.addMenu')) {
            observerChildList(function () {
                $('li[rel="item"]').each(function () {
                    if (!$(this).find('.mm-operation').length) {
                        $(this).append(getFloatMenu($(this).attr('file_type'), ['move', 'edit_name', 'delete', 'search', 'sha1'], true));
                    }
                });
            });
        }
    });
})();
