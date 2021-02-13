// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.5.0
// @description   顶部链接任务入口还原、SHA1 快速查重（新页面打开）、SHA1 查重列表支持选中第一个元素、SHA1 自动查重、删除空文件夹
// @icon      	  https://115.com/favicon.ico
// @author        maomao1996
// @include       *://115.com/*
// @grant         GM_openInTab
// ==/UserScript==
;
(function () {
    'use strict';
    // 过滤非 iframe 和 iframe 套娃场景 场景
    if (window.self === window.top || typeof TOP === 'undefined') {
        return;
    }
    var search = location.search;
    var MinMessage = TOP.Core.MinMessage;
    /**
     * 工具方法 - url 中是否存在某个字符串
     */
    var urlHasString = function (str) { return search.indexOf(str) > -1; };
    /**
     * 在顶部菜单添加链接任务按钮
     */
    var addLinkTaskBtn = function () {
        // 避免和其他插件冲突，只添加一次
        if ($('a.btn-upload[menu="offline_task"]').length) {
            return;
        }
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
            $('#js_path_add_dir').after('<a href="javascript:;" class="button btn-line mm-quick-operation" type="auto-sha1" style="margin-left: 10px;" title="只查询当前页码目录中的文件"><span>SHA1自动查重</span></a><a href="javascript:;" class="button btn-line mm-quick-operation" type="delete-empty" style="margin-left: 10px;" title="只删除当前页码目录中的文件夹"><span>删除空文件夹</span></a>');
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
                    $('li[file_type="1"]').each(function () {
                        if (!$(this).find('.mm-operation').length) {
                            $(this)
                                .find('a[menu="public_share"]')
                                .after('<a href="javascript:;" class="mm-operation" type="sha1"><span>SHA1查重</span></a>');
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
            addLinkTaskBtn();
            // 快捷操作初始化
            initQuickOperation();
        }
        // SHA1 查重列表模块
        else if (urlHasString('tab=sha1_repeat')) {
            initRepeatSha1List();
        }
    });
})();
