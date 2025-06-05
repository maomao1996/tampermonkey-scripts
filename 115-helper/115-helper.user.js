/*!
// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       1.8.4
// @description   网盘顶部菜单栏添加链接任务和云下载、SHA1 快速查重（新页面打开）、SHA1 自动查重、删除空文件夹、一键搜（快捷搜索）、SHA1 查重列表支持选中第一个元素和悬浮菜单展示、搜索列表支持悬浮菜单展示、列表显示文件 SHA1 信息、关闭网盘侧边栏、悬浮菜单移除图标、悬浮菜单支持新标签页打开文件夹、加速转码
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
;
(function () {
    'use strict';
    if (unsafeWindow.self === unsafeWindow.top || typeof TOP === 'undefined') {
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
            width: '520px',
            zIndex: '13145201996',
        },
        fields: {
            'delay.minCount': {
                section: ['', '延迟相关设置'],
                label: '开始延迟最小查询数量',
                labelPos: 'left',
                type: 'int',
                min: 5,
                max: 50,
                default: 15,
            },
            'delay.minTime': {
                label: '最小延迟时间(毫秒)',
                type: 'int',
                min: 100,
                max: 1e3,
                default: 200,
            },
            'delay.maxTime': {
                label: '最大延迟时间(毫秒)',
                type: 'int',
                min: 300,
                max: 3e3,
                default: 400,
                line: 'end',
            },
            'layout.addSidebarBtn': {
                section: ['', '界面布局相关设置'],
                label: '侧边栏增加网盘侧边栏控制按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'layout.hideSidebar': {
                label: '默认关闭网盘侧边栏',
                labelPos: 'right',
                type: 'checkbox',
                default: false,
            },
            'layout.addSettingBtn': {
                label: '侧边栏增加插件设置按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'layout.addTaskBtn': {
                label: '网盘顶部菜单增加链接任务按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'layout.addOfflineBtn': {
                label: '网盘顶部菜单增加云下载按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'autoSha1.addBtn': {
                section: ['', '网盘路径栏相关设置'],
                label: '网盘路径栏增加SHA1自动查重按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
                line: 'start',
            },
            'autoSha1.maxCount': {
                label: '每次最多打开的标签页数量',
                type: 'int',
                min: 1,
                max: 50,
                default: 25,
                line: 'end',
            },
            addDeleteEmptyBtn: {
                label: '网盘路径栏增加删除空文件夹按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'folderRepeat.addBtn': {
                label: '网盘路径栏增加单文件夹查重按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
                line: 'start',
            },
            'folderRepeat.select': {
                label: '选中重复文件',
                labelPos: 'right',
                type: 'checkbox',
                default: false,
                line: 'end',
            },
            'transcoded.addBtn': {
                label: '网盘路径栏增加加速转码按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'list.showSha1': {
                section: ['', '网盘列表相关设置(悬浮菜单不支持缩略图模式)'],
                label: '列表显示文件SHA1信息(包含标签页)',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'floatOperation.removeIcon': {
                label: '悬浮菜单移除图标',
                labelPos: 'right',
                type: 'checkbox',
                default: false,
            },
            'floatOperation.newTab.addBtn': {
                label: '悬浮菜单增加新标签页打开按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'floatOperation.sha1.addBtn': {
                label: '悬浮菜单增加SHA1查重按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'quickSearch.addBtn': {
                label: '悬浮菜单增加一键搜按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
                line: 'start',
            },
            'quickSearch.edit': {
                label: '打开编辑弹窗再搜索',
                labelPos: 'right',
                type: 'checkbox',
                default: false,
            },
            'quickSearch.isAll': {
                label: '默认搜索全部',
                labelPos: 'right',
                type: 'checkbox',
                default: false,
                line: 'end',
            },
            'sha1Repeat.addCheckbox': {
                section: ['', 'SHA1 查重列表模块(重复文件列表)'],
                label: '增加第一个文件选中按钮',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'sha1Repeat.addMenu': {
                label: '列表增加悬浮菜单',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'sha1Repeat.select': {
                label: '打开后默认选中',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'search.addMenu': {
                section: ['', '网盘搜索列表模块'],
                label: '列表增加悬浮菜单',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            'search.showSha1': {
                label: '列表显示文件SHA1信息',
                labelPos: 'right',
                type: 'checkbox',
                default: true,
            },
            sponsor: {
                section: ['', '其他'],
                label: '给作者赞助',
                labelPos: 'right',
                type: 'button',
                click: function () {
                    GM_openInTab('https://gitee.com/fe-mm/picture/raw/main/sponsor/sponsor.jpg', {
                        active: true,
                    });
                },
            },
            joinGroup: {
                label: '加入 QQ 群',
                labelPos: 'right',
                type: 'button',
                click: function () {
                    GM_openInTab('https://jq.qq.com/?_wv=1027&k=ToOoVmku', {
                        active: true,
                    });
                },
            },
            reminder: {
                label: '温馨提示',
                labelPos: 'right',
                type: 'button',
                click: function () {
                    alert("1. \u4E3A\u4FDD\u8BC1\u8D26\u53F7\u5B89\u5168\uFF0C\u4ECE 1.1.0 \u7248\u672C\u5F00\u59CB\uFF0C\u6240\u6709\u9891\u7E41\u8BF7\u6C42\u63A5\u53E3\u7684\u64CD\u4F5C\u90FD\u4F1A\u52A0\u5165\u968F\u673A\u5EF6\u8FDF\uFF1B\u540C\u65F6 SHA1 \u81EA\u52A8\u67E5\u91CD \u529F\u80FD\u4F1A\u4F7F\u7528\u7F13\u5B58\u673A\u5236\uFF08\u6BCF\u4E2A\u9875\u7801\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u53EA\u4F1A\u67E5\u8BE2\u4E00\u6B21\uFF0C\u5982\u9700\u518D\u6B21\u67E5\u8BE2\u8BF7\u4F7F\u7528\u5177\u4F53\u6587\u4EF6\u7684 SHA1\u67E5\u91CD \u6309\u94AE\u6216\u5237\u65B0\u9875\u9762\u540E\u518D\u4F7F\u7528\uFF09\n2. \u52A0\u901F\u8F6C\u7801\uFF1A\uFF08\u52A0\u901F\u8F6C\u7801\u662F\u4E0D\u6392\u961F\u7684\uFF0C\u666E\u901A\u8F6C\u7801\u9700\u8981\u6392\u961F\uFF09\n   115 \u662F\u901A\u8FC7\u5F53\u524D\u76EE\u5F55\u4E0B\u7B2C\u4E00\u4E2A\u89C6\u9891\u6587\u4EF6\u53BB\u67E5\u8BE2\u5269\u4F59\u672A\u8F6C\u7801\u7684\u89C6\u9891\u6587\u4EF6\uFF0C\u5728\u67E5\u8BE2\u65F6\u4F1A\u5C06\u5F53\u524D\u76EE\u5F55\u4E0B\u7B2C\u4E00\u4E2A\u89C6\u9891\u6587\u4EF6\u81EA\u52A8\u8FDB\u884C\u8F6C\u7801\uFF08\u53EA\u4F1A\u5728\u7B2C\u4E00\u4E2A\u89C6\u9891\u6587\u4EF6\u672A\u8F6C\u7801\u65F6\u89E6\u53D1\uFF09\uFF0C\u6240\u4EE5\u4F1A\u5B58\u5728\u4E0B\u6B21\u67E5\u8BE2\u65F6\u6570\u91CF\u4E0D\u4E00\u81F4\u7684\u95EE\u9898\uFF1B\n  \u5728\u67E5\u8BE2\u65F6\u4F1A\u6709\u7F13\u5B58\u95EE\u9898\uFF0C\u6240\u4EE5\u4F1A\u5B58\u5728\u4E0B\u6B21\u67E5\u8BE2\u65F6\u8FD4\u56DE\u7684\u672A\u8F6C\u7801\u7684\u6570\u91CF\u548C\u4E0A\u6B21\u4E00\u6837\uFF0C\u7B49\u4E00\u4E24\u79D2\u518D\u70B9\u5C31\u884C\uFF08\u63D0\u4EA4\u7684\u52A0\u901F\u8F6C\u7801\u6587\u4EF6\u8FC7\u591A\u4F1A\u88AB 115 \u9650\u5236\uFF0C\u9700\u8981\u7B49\u63D0\u4EA4\u7684\u6587\u4EF6\u8F6C\u7801\u5B8C\u4EE5\u540E\u518D\u8FDB\u884C\u8F6C\u7801\uFF09\n3. \u811A\u672C\u8BBE\u7F6E\u4FDD\u5B58\u540E\u5C06\u4F1A\u81EA\u52A8\u5237\u65B0\u9875\u9762\n4. \u811A\u672C\u52A0\u8F7D\u6709\u6761\u4EF6\u9650\u5236\u4F1A\u9020\u6210\u8BBE\u7F6E\u5F39\u7A97\u4E0D\u5C45\u4E2D");
                },
            },
        },
        events: {
            save: function () {
                top.location.reload();
            },
        },
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
    var random = function (lower, upper, floating) {
        if (floating) {
            var rand = Math.random();
            var randLength = "".concat(rand).length - 1;
            return Math.min(lower + rand * (upper - lower + parseFloat("1e-".concat(randLength))), upper);
        }
        return lower + Math.floor(Math.random() * (upper - lower + 1));
    };
    var delay = function (timeout) {
        if (!timeout) {
            timeout = random(G.get('delay.minTime'), G.get('delay.maxTime'));
        }
        console.log('等待 :', timeout, 'ms');
        return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
    };
    var getRandomRgba = function () {
        var g = random(220, 255);
        var r = random(120, 240);
        var b = random(120, 240);
        return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", 0.39)");
    };
    var getStyles = function (styles, key) {
        if (!Array.isArray(key)) {
            key = [key];
        }
        if (key.some(function (k) { return G.get(k); })) {
            return styles;
        }
        return '';
    };
    var isThumbnail = function () { return !!$('.list-thumb').length; };
    var getAidCid = function () {
        try {
            var main = top.Ext.CACHE.FileMain;
            return main.Setting.GetActive();
        }
        catch (e) {
            return { cid: 0 };
        }
    };
    var randomDelayIndex = [3, 5];
    var styles = [
        ".mm-quick-operation{margin-left: 12px;padding: 0 4px;white-space: nowrap;}",
        ".list-contents .active::before, .list-thumb .active{background: var(--repeat-color, rgba(199, 237, 204, 0.7))!important;}",
        ".left-tvf .btn-upload{z-index: 1;}",
        "[show-sha1]{line-height: 1;color: #999;}",
        ".page-center .lstc-search .list-contents [file_type=\"1\"] .file-name.h-auto,.list-cell:not(.lstc-search) .list-contents [file_type=\"1\"] .file-name.h-auto{flex:1;padding-bottom: 20px;height:auto;}",
        getStyles(".file-opr [class|=\"icon\"]{display:none!important;}", 'floatOperation.removeIcon'),
    ].join('');
    GM_addStyle(styles);
    var addLinkTaskBtn = function () {
        var content = "<a href=\"javascript:;\" class=\"button btn-line btn-upload\" menu=\"offline_task\"><i class=\"icon-operate ifo-linktask\"></i><span>\u94FE\u63A5\u4EFB\u52A1</span></a>";
        urlHasString('mode=search')
            ? $('[rel="left_tvf"]').prepend(content)
            : $('a#js_filter_btn').after(content);
    };
    var addOfflineBtn = function () {
        $('a#js_filter_btn').after("<a href=\"/?tab=offline&mode=wangpan\" class=\"button btn-line\" tab_btn=\"wangpan\" mode-tab=\"offline\"><i class=\"icon-operate ifo-linktask\"></i><span>\u4E91\u4E0B\u8F7D</span></a>");
    };
    var handleRepeatSha1 = function (file_id, isAll) {
        if (isAll === void 0) { isAll = false; }
        return new Promise(function (resolve) {
            !isAll && MinMessage.Show({ text: '正在查找', type: 'load', timeout: 0 });
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
                        var sha1RepeatUrl = "//115.com/?tab=sha1_repeat&file_id=".concat(file_id, "&mode=wangpan");
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
                                timeout: 2e3,
                            });
                        resolve(false);
                    }
                },
            });
        });
    };
    var MENU_MAP = {
        move: "<a href=\"javascript:;\" menu=\"move\"><i class=\"icon-operate ifo-move\" menu=\"move\"></i><span menu=\"move\">\u79FB\u52A8</span></a>",
        edit_name: "<a href=\"javascript:;\" menu=\"edit_name\"><i class=\"icon-operate ifo-rename\" menu=\"edit_name\"></i><span menu=\"edit_name\">\u91CD\u547D\u540D</span></a>",
        delete: "<a href=\"javascript:;\" menu=\"delete\" btn=\"del\"><i class=\"icon-operate ifo-remove\" menu=\"delete\"></i><span menu=\"delete\">\u5220\u9664</span></a>",
        search: "<a href=\"javascript:;\" class=\"mm-operation\" type=\"search\" title=\"\u4F7F\u7528\u5F53\u524D\u540D\u79F0\u4F5C\u4E3A\u641C\u7D22\u6761\u4EF6\"><span>\u4E00\u952E\u641C</span></a>",
        sha1: "<a href=\"javascript:;\" class=\"mm-operation\" type=\"sha1\" title=\"\u67E5\u8BE2\u5F53\u524D\u6587\u4EF6\u662F\u5426\u91CD\u590D\"><span>SHA1\u67E5\u91CD</span></a>",
        new_tab: "<a href=\"$href\" target=\"_blank\" class=\"mm-operation\" title=\"\u5728\u65B0\u6807\u7B7E\u9875\u6253\u5F00\u8BE5\u6587\u4EF6\u5939\"><span>\u65B0\u6807\u7B7E\u9875</span></a>",
    };
    var CONTROLLED_MENU = ['new_tab', 'search', 'sha1'];
    var getFloatMenu = function (_a) {
        var fileType = _a.fileType, _b = _a.menuKeys, menuKeys = _b === void 0 ? CONTROLLED_MENU : _b, isAddWrap = _a.isAddWrap, cid = _a.cid;
        var menu = menuKeys.reduce(function (prev, key) {
            if (key === 'search' && G.get('quickSearch.addBtn')) {
                prev += MENU_MAP.search;
            }
            else if (key === 'new_tab' && G.get('floatOperation.newTab.addBtn') && fileType === '0') {
                prev += MENU_MAP.new_tab.replace('$href', "/?cid=".concat(cid, "&offset=0&mode=wangpan"));
            }
            else if (key === 'sha1' && G.get('floatOperation.sha1.addBtn') && fileType === '1') {
                prev += MENU_MAP.sha1;
            }
            else if (!CONTROLLED_MENU.includes(key)) {
                prev += MENU_MAP[key];
            }
            return prev;
        }, '');
        if (isAddWrap) {
            return "<div class=\"file-opr\" rel=\"menu\">".concat(menu, "</div>");
        }
        return menu;
    };
    var initMenu = function () {
        var handleQuickSearch = function (keyword) {
            var _a = getAidCid(), aid = _a.aid, cid = _a.cid, name = _a.name;
            var openSearch = function (value) {
                GM_openInTab("//115.com/?mode=search&submode=wangpan&url=".concat(encodeURIComponent("/?aid=".concat(aid, "&cid=").concat(G.get('quickSearch.isAll') ? 0 : cid, "&old_cid=").concat(cid, "&old_cid_name=").concat(encodeURIComponent(name), "&search_value=").concat(encodeURIComponent(value), "&ct=file&ac=search&is_wl_tpl=1"))), { active: true });
            };
            if (!G.get('quickSearch.edit')) {
                openSearch(keyword);
                return;
            }
            var content = $("<div class=\"dialog-input\"><textarea rel=\"txt\"></textarea></div><div class=\"dialog-action\"><a href=\"javascript:;\" class=\"dgac-confirm\" btn=\"confirm\">\u641C\u7D22</a></div>");
            var $input = content.find("[rel='txt']");
            $input.val(keyword);
            var $dialog = new top.Core.DialogBase({
                title: '115 小助手(编辑一键搜)',
                content: content,
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
                    return handleQuickSearch(title.replace(".".concat(ico), ''));
            }
        });
    };
    var listShowSHA1 = function ($listItem) {
        var sha1 = $listItem.attr('sha1');
        if (sha1 && !$listItem.find('[show-sha1]').length) {
            $listItem.find('.file-name').addClass('h-auto').after("<small show-sha1>".concat(sha1, "</small>"));
        }
    };
    var initQuickOperation = function () {
        var autoCheckDisabled = false;
        observerChildList(function () {
            autoCheckDisabled = false;
            if (isThumbnail()) {
                return;
            }
            $('li[rel="item"]').each(function () {
                G.get('list.showSha1') && listShowSHA1($(this));
                if (!$(this).find('.mm-operation').length) {
                    $(this)
                        .find('.file-opr')
                        .prepend(getFloatMenu({
                        fileType: $(this).attr('file_type'),
                        cid: $(this).attr('cate_id'),
                    }))
                        .on('mousedown', function (e) {
                        e.stopPropagation();
                        return true;
                    });
                }
            });
        });
        var handleGetDetail = function (aid, cid) {
            return new Promise(function (resolve) { return top.Core.DataAccess.Dir.GetDetail(aid, cid, function (res) { return resolve(res); }); });
        };
        var SHA1_MAP = {};
        var delayIndex = random.apply(void 0, randomDelayIndex);
        var QUIC_OPERATION_CONFIGS = {
            'auto-sha1': {
                GMConfigKey: 'autoSha1.addBtn',
                btnHtml: "<a href=\"javascript:;\" class=\"button btn-line mm-quick-operation\" type=\"auto-sha1\" title=\"\u53EA\u67E5\u8BE2\u5F53\u524D\u9875\u7801\u76EE\u5F55\u4E2D\u7684\u6587\u4EF6\"><span>SHA1\u81EA\u52A8\u67E5\u91CD</span></a>",
                func: function () {
                    var _this = this;
                    if (autoCheckDisabled) {
                        MinMessage.Show({
                            text: '已查询过当前页码所有文件，需再次查询请刷新页面',
                            type: 'war',
                            timeout: 2e3,
                        });
                        return;
                    }
                    var $li = $('li[file_type="1"]');
                    if (!$li.length) {
                        MinMessage.Show({
                            text: '当前文件夹下没有可查重文件',
                            type: 'war',
                            timeout: 2e3,
                        });
                        return;
                    }
                    MinMessage.Show({ text: '正在查找', type: 'load', timeout: 0 });
                    var index = 0;
                    var repeatCount = 0;
                    var findRepeat = function () { return __awaiter(_this, void 0, void 0, function () {
                        var isMax, isEnd, options, $currentLi, fileId, sha1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    isMax = repeatCount >= G.get('autoSha1.maxCount');
                                    isEnd = index >= $li.length;
                                    if (isEnd || isMax) {
                                        isEnd && (autoCheckDisabled = true);
                                        options = { text: '', type: '', timeout: 2e3 };
                                        if (repeatCount) {
                                            options.text = isMax
                                                ? "\u5DF2\u67E5\u8BE2\u5230 ".concat(repeatCount, " \u4E2A\u91CD\u590D\u6587\u4EF6")
                                                : "\u5DF2\u67E5\u8BE2\u5B8C\u5F53\u524D\u5206\u9875\uFF0C\u5171 ".concat(repeatCount, " \u4E2A\u91CD\u590D\u6587\u4EF6");
                                            options.type = 'suc';
                                        }
                                        else {
                                            options.text = '当前分页下没有可查重文件';
                                            options.type = 'war';
                                        }
                                        MinMessage.Show(options);
                                        return [2];
                                    }
                                    $currentLi = $li.eq(index);
                                    fileId = $currentLi.attr('file_id');
                                    sha1 = $currentLi.attr('sha1');
                                    if (!(!SHA1_MAP[sha1] && index > G.get('delay.minCount') && index % delayIndex === 0)) return [3, 2];
                                    delayIndex = random.apply(void 0, randomDelayIndex);
                                    return [4, delay()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    index++;
                                    if (fileId && sha1 && !SHA1_MAP[sha1]) {
                                        SHA1_MAP[sha1] = 1;
                                        return [2, handleRepeatSha1(fileId, true).then(function (flag) {
                                                if (flag) {
                                                    $currentLi.addClass('active');
                                                    repeatCount++;
                                                }
                                                return findRepeat();
                                            })];
                                    }
                                    return [2, findRepeat()];
                            }
                        });
                    }); };
                    findRepeat();
                },
            },
            'delete-empty': {
                GMConfigKey: 'addDeleteEmptyBtn',
                btnHtml: "<a href=\"javascript:;\" class=\"button btn-line mm-quick-operation\" type=\"delete-empty\" title=\"\u53EA\u5220\u9664\u5F53\u524D\u9875\u7801\u76EE\u5F55\u4E2D\u7684\u6587\u4EF6\u5939\"><span>\u5220\u9664\u7A7A\u6587\u4EF6\u5939</span></a>",
                func: function () {
                    var _this = this;
                    var $li = $('li[file_type="0"]');
                    if (!$li.length) {
                        MinMessage.Show({
                            text: '当前文件目录下没有文件夹',
                            type: 'war',
                            timeout: 2e3,
                        });
                        return;
                    }
                    MinMessage.Show({ text: '正在查找', type: 'load', timeout: 0 });
                    var index = 0;
                    var emptyFolderCount = 0;
                    var recursive = function () { return __awaiter(_this, void 0, void 0, function () {
                        var $currentLi;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (index >= $li.length) {
                                        if (emptyFolderCount === 0) {
                                            MinMessage.Show({
                                                text: '当前文件目录下没有空文件夹',
                                                type: 'war',
                                                timeout: 2e3,
                                            });
                                        }
                                        else {
                                            MinMessage.Hide();
                                            setTimeout(function () {
                                                $('li[menu="delete"]:visible').trigger('click');
                                            }, 2e2);
                                        }
                                        return [2];
                                    }
                                    if (!(index > G.get('delay.minCount') && index % delayIndex === 0)) return [3, 2];
                                    delayIndex = random.apply(void 0, randomDelayIndex);
                                    return [4, delay()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    $currentLi = $li.eq(index);
                                    handleGetDetail($currentLi.attr('area_id'), $currentLi.attr('cate_id')).then(function (_a) {
                                        var size = _a.size;
                                        if (size === '0B') {
                                            emptyFolderCount++;
                                            $currentLi.find('.checkbox').trigger('click');
                                        }
                                        index++;
                                        $currentLi.find('.file-size span').text(size);
                                        return recursive();
                                    });
                                    return [2];
                            }
                        });
                    }); };
                    recursive();
                },
            },
            'folder-sha1': {
                GMConfigKey: 'folderRepeat.addBtn',
                btnHtml: "<a href=\"javascript:;\" class=\"button btn-line mm-quick-operation\" type=\"folder-sha1\" title=\"\u53EA\u67E5\u8BE2\u5E76\u6807\u8BB0\u5F53\u524D\u76EE\u5F55\u4E2D\u7684\u91CD\u590D\u6587\u4EF6\"><span>\u5355\u6587\u4EF6\u5939\u67E5\u91CD</span></a>",
                func: function () {
                    var $loadAllFile = $('[menu="load_all_file"]:visible');
                    var isMore = !!$loadAllFile.length;
                    var isSelected = G.get('folderRepeat.select');
                    var checkSha1 = function () {
                        var SHA1_MAP = {};
                        var $li = $('li[file_type="1"]');
                        if (!$li.length) {
                            return $.alertTip('当前文件夹下没有可查重文件');
                        }
                        var repeatCount = 0;
                        $li.each(function () {
                            var sha1 = $(this).attr('sha1');
                            if (!SHA1_MAP[sha1]) {
                                SHA1_MAP[sha1] = getRandomRgba();
                            }
                            else {
                                repeatCount++;
                                $(this).addClass('active')[0].style.setProperty('--repeat-color', SHA1_MAP[sha1]);
                                if (isSelected) {
                                    $(this).find('.checkbox').trigger('click');
                                }
                            }
                        });
                        var options = { text: '', type: '', timeout: 2e3 };
                        if (repeatCount) {
                            options.text = "\u5F53\u524D\u6587\u4EF6\u5939\u4E0B\u5171 ".concat(repeatCount, " \u4E2A\u91CD\u590D\u6587\u4EF6");
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
                },
            },
            transcoded: {
                GMConfigKey: 'transcoded.addBtn',
                btnHtml: "<a href=\"javascript:;\" class=\"button btn-line mm-quick-operation\" type=\"transcoded\" title=\"\u5BF9\u5F53\u524D\u9875\u7801\u76EE\u5F55\u4E2D\u6240\u6709\u672A\u8F6C\u7801\u6587\u4EF6\u8FDB\u884C\u52A0\u901F\u8F6C\u7801\uFF08115\u4F1A\u81EA\u52A8\u5C06\u7B2C\u4E00\u4E2A\u6587\u4EF6\u8FDB\u884C\u8F6C\u7801\uFF09\"><span>\u52A0\u901F\u8F6C\u7801</span></a>",
                func: function () {
                    if (top.USER_INFO.IS_VIP !== 1) {
                        return $.alertTip('该功能仅 115 VIP 用户可用');
                    }
                    var pickCode = $('li[file_type="1"][iv=1]:first').attr('pick_code');
                    if (!pickCode) {
                        return $.alertTip("\u5F53\u524D\u76EE\u5F55\u4E0B\u6CA1\u6709\u9700\u8981\u8F6C\u7801\u7684\u6587\u4EF6\u54E6");
                    }
                    top.UA$.ajax({
                        url: '//webapi.115.com/files/is_transcoded',
                        type: 'POST',
                        data: {
                            pick_code: pickCode,
                        },
                        dataType: 'json',
                        success: function (_a) {
                            var state = _a.state, data = _a.data, count = _a.count;
                            if (state && data && data.length) {
                                $.confirm({
                                    text: "\u6B64\u76EE\u5F55\u4E0B\u8FD8\u6709 ".concat(count, " \u4E2A\u6587\u4EF6\u672A\u8F6C\u7801\uFF0C").concat(data.length < count
                                        ? "\u662F\u5426\u63D0\u4EA4 VIP \u52A0\u901F\uFF1F<br/>\uFF08\u5355\u6B21\u63D0\u4EA4\u6700\u591A\u53EF\u52A0\u901F50\u4E2A\uFF09"
                                        : "\u662F\u5426\u5168\u90E8\u63D0\u4EA4 VIP \u52A0\u901F\uFF1F"),
                                    confirm_text: '全部加速',
                                    callback: function (e) {
                                        e &&
                                            top.UA$.ajax({
                                                url: '//115.com/?ctl=play&ac=batch_push',
                                                data: {
                                                    file_ids: data.join(','),
                                                },
                                                dataType: 'json',
                                                type: 'POST',
                                                xhrFields: { withCredentials: !0 },
                                                success: function (t) {
                                                    t.state || $.alertTip(t.message || t.error);
                                                },
                                            });
                                    },
                                });
                            }
                            else {
                                $.alertTip("\u5F53\u524D\u76EE\u5F55\u4E0B\u6CA1\u6709\u9700\u8981\u8F6C\u7801\u7684\u6587\u4EF6\u54E6");
                            }
                        },
                    });
                },
            },
        };
        if (!$('.mm-quick-operation').length) {
            var operations_1 = '';
            Object.keys(QUIC_OPERATION_CONFIGS).forEach(function (key) {
                var data = QUIC_OPERATION_CONFIGS[key];
                if (G.get(data.GMConfigKey)) {
                    operations_1 += data.btnHtml;
                }
            });
            $('#js_path_add_dir').after(operations_1);
        }
        $(document).on('click', '.mm-quick-operation', function () {
            var type = $(this).attr('type');
            if (!type || !QUIC_OPERATION_CONFIGS[type]) {
                return;
            }
            QUIC_OPERATION_CONFIGS[type].func();
        });
    };
    var initRepeatSha1List = function () {
        var $list = $('#js-list');
        observerChildList(function () {
            if (G.get('sha1Repeat.addCheckbox')) {
                var $first = $list.find('li:first-child');
                if (!$first.attr('item')) {
                    $first.attr('item', 'file').find('i.file-type').removeProp('style');
                    $first.prepend('<b class="checkbox"></b>');
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
                        that.append(getFloatMenu({
                            fileType: that.attr('file_type'),
                            menuKeys: ['move', 'edit_name', 'delete'],
                            isAddWrap: true,
                        }));
                    }
                    that.find('.file-opr').on('mousedown', function (e) {
                        e.stopPropagation();
                        return true;
                    });
                });
            }
        }, $list);
        $list.on('click', '.file-opr a', function (event) {
            event.stopPropagation();
            top.Core.FileMenu.DoEvent([$(this).parents('li')], $(this).attr('menu'), checkRepaatApi.load);
        });
    };
    var initMainLayout = function () {
        var SIDEBAR_SELECTOR = '[mm-layout="sidebar"]';
        var HELPER_SETTING_SELECTOR = '[mm-layout="helper-setting"]';
        var $mainSidebar = top.$('#js-main_leftUI .bottom-side .navigation-ceiling ul').eq(0);
        var initSidebar = function () {
            if (top.$(SIDEBAR_SELECTOR).length) {
                return;
            }
            $mainSidebar
                .prepend("<li mm-layout=\"sidebar\"><a href=\"javascript:;\" style=\"height: auto\"><span id=\"mm-sidebar\">".concat(top.$('.wrap-hflow .sub-hflow').is(':visible') ? '关闭' : '打开', "</span><span>\u4FA7\u8FB9\u680F</span></a></li>"))
                .find(SIDEBAR_SELECTOR)
                .on('click', function () {
                var $sidebar = top.$('.wrap-hflow .sub-hflow');
                $sidebar.toggle(200);
                setTimeout(function () {
                    var isVisible = $sidebar.is(':visible');
                    top.$('#mm-sidebar').text(isVisible ? '关闭' : '打开');
                    top.localStorage.setItem('wangpan_is_hide', isVisible ? '0' : '1');
                }, 200);
            });
        };
        var initSetting = function () {
            if (top.$(HELPER_SETTING_SELECTOR).length) {
                return;
            }
            $mainSidebar
                .prepend("<li mm-layout=\"helper-setting\"><a href=\"javascript:;\" style=\"height: auto\"><span>\u5C0F\u52A9\u624B</span><span>\u8BBE\u7F6E</span></a></li>")
                .find(HELPER_SETTING_SELECTOR)
                .on('click', function () { return (G.isOpen ? G.close() : G.open()); });
        };
        G.get('layout.addSettingBtn') && initSetting();
        G.get('layout.addSidebarBtn') && initSidebar();
        if (G.get('layout.hideSidebar')) {
            top.$('[btn="left_hide_btn"]').trigger('click');
        }
    };
    $(function () {
        initMenu();
        if (urlHasString('mode=wangpan')) {
            initMainLayout();
            G.get('layout.addTaskBtn') && addLinkTaskBtn();
        }
        if (urlHasString('cid=')) {
            initQuickOperation();
            G.get('layout.addOfflineBtn') && addOfflineBtn();
        }
        else if (urlHasString('tab=sha1_repeat')) {
            initRepeatSha1List();
        }
        else if (urlHasString('mode=search') && G.get('search.addMenu')) {
            observerChildList(function () {
                $('li[rel="item"]').each(function () {
                    var that = $(this);
                    G.get('search.showSha1') && listShowSHA1(that);
                    if (!that.find('.mm-operation').length) {
                        that.append(getFloatMenu({
                            fileType: that.attr('file_type'),
                            menuKeys: ['new_tab', 'search', 'sha1', 'move', 'edit_name', 'delete'],
                            isAddWrap: true,
                            cid: that.attr('cate_id'),
                        }));
                        that.find('.file-opr').on('mousedown', function (e) {
                            e.stopPropagation();
                            return true;
                        });
                    }
                });
            });
        }
        else if (urlHasString('tab=label') && G.get('list.showSha1')) {
            observerChildList(function () {
                $('li[rel="item"]').each(function () {
                    listShowSHA1($(this));
                });
            });
        }
    });
})();
