/*!
// ==UserScript==
// @name          贴吧小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.6.1
// @description   自动顶贴回复(立即回复)、移除贴吧列表和帖子内部广告、移除碍眼模块
// @icon          https://tb1.bdstatic.com/tb/favicon.ico
// @author        maomao1996
// @include       *://tieba.baidu.com/*
// @grant         GM_registerMenuCommand
// @grant         GM_notification
// @grant         GM_addStyle
// @require       https://greasyfork.org/scripts/398240-gm-config-zh-cn/code/G_zh-CN.js
// ==/UserScript==
*/
;
(function () {
    'use strict';
    var GMConfigOptions = {
        id: 'Helper_Cfg',
        title: '贴吧小助手',
        css: '#Helper_Cfg .config_var textarea{max-width: 100%; width: 100%; min-height: 120px;} #Helper_Cfg .inline {padding-bottom:0px;}#Helper_Cfg .config_var {margin-left: 20px;margin-right: 20px;} #Helper_Cfg input[type="checkbox"] {margin-left: 0px;vertical-align: top;} #Helper_Cfg input[type="text"] {width: 60px;} #Helper_Cfg {background-color: lightblue;} #Helper_Cfg .reset_holder {float: left; position: relative; bottom: -1.2em;}',
        frameStyle: {
            zIndex: '1314520',
            width: '400px',
            height: '520px'
        },
        fields: {
            removeAd: {
                section: ['', '全局设置'],
                label: '移除列表和详情页广告',
                labelPos: 'right',
                type: 'checkbox',
                default: true
            },
            removeEyesore: {
                label: '移除碍眼模块（app下载、勋章、送礼物、游戏按钮等）',
                labelPos: 'right',
                type: 'checkbox',
                default: true
            },
            responseTimeMin: {
                section: ['', '自动顶贴相关设置'],
                label: '顶帖最小间隔（分钟）',
                labelPos: 'left',
                type: 'unsigned int',
                default: '1'
            },
            responseTimeMax: {
                label: '顶帖最大间隔（分钟）',
                type: 'unsigned int',
                default: '30'
            },
            responseMode: {
                label: '顶贴模式选择',
                labelPos: 'left',
                type: 'select',
                options: ['自定义模式', '网络语句模式'],
                default: '网络语句模式'
            },
            customResponseText: {
                label: '自定义模式回复内容（请按如下格式输入）',
                type: 'textarea',
                default: "\u6C99\u53D1\n\u9876\n\u9876~"
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
    var CONFIG = {
        STATUS: false,
        TIME_MIN: Number(G.get('responseTimeMin')),
        TIME_MAX: Number(G.get('responseTimeMax')),
        TEXT: G.get('customResponseText').split('\n'),
        timer: null
    };
    var pathname = location.pathname;
    var message = function (text) {
        GM_notification({ timeout: 2e3, text: text });
    };
    var random = function (lower, upper, floating) {
        if (floating) {
            var rand = Math.random();
            var randLength = ("" + rand).length - 1;
            return Math.min(lower + rand * (upper - lower + parseFloat("1e-" + randLength)), upper);
        }
        return lower + Math.floor(Math.random() * (upper - lower + 1));
    };
    var removeHtmlElement = function (selector) {
        selector.each(function () {
            $(this).remove();
        });
    };
    var moduleSelector = [
        '.u_member',
        '.celebrity',
        '.app_download_box',
        '.tbui_aside_fbar_button.tbui_fbar_down',
        'tbui_fbar_props',
        '.tbui_fbar_tsukkomi',
        '.icon_wrap.icon_wrap_theme1',
        '#j_navtab_game',
        '.post-foot-send-gift-btn',
        '.tb_poster_placeholder'
    ];
    G.get('removeEyesore') &&
        GM_addStyle(moduleSelector.join(',') + '{display:none !important;}');
    var autoResponse = function () {
        if (!$('.core_title_btns.pull-right').length) {
            return;
        }
        var appendResponseBtn = function () {
            if (!$('#ding_btn').length) {
                $('#quick_reply').after("<a id=\"ding_btn\" rel=\"noopener\" class=\"btn-sub btn-small\">" + (CONFIG.STATUS ? '关闭' : '开启') + "\u81EA\u52A8\u9876\u8D34\u56DE\u590D</a>");
            }
            if (CONFIG.STATUS && !$('#reply_immediate').length) {
                $('#ding_btn').after('<a id="reply_immediate" rel="noopener" class="btn-sub btn-small">立即回复(重新计时)</a>');
            }
        };
        appendResponseBtn();
        var responseObserver = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    appendResponseBtn();
                }
            });
        });
        responseObserver.observe($('.core_title_btns.pull-right')[0], {
            childList: true
        });
        var runResponse = function () {
            if (!CONFIG.STATUS) {
                return;
            }
            var selectors = {
                editor: '#j_editor_for_container',
                submit: '.lzl_panel_submit.j_lzl_p_sb'
            };
            try {
                if (!$('#j_editor_for_container:visible').length) {
                    var lzlPSelector = '.j_lzl_p.btn-sub.pull-right:visible';
                    if ($(lzlPSelector).length) {
                        $(lzlPSelector).eq(0).trigger('click');
                    }
                    else if ($('a.lzl_link_unfold:visible').length) {
                        $('a.lzl_link_unfold:visible').eq(0).trigger('click');
                    }
                    else {
                        $('#quick_reply').trigger('click');
                        selectors.editor = '#ueditor_replace';
                        selectors.submit = '.j_submit.poster_submit';
                    }
                }
            }
            catch (error) {
                message('自动回复出错，请刷新页面后重试！');
                console.log('runResponse', error);
            }
            var submit = function (text) {
                $(selectors.editor).text(text);
                $(selectors.submit).trigger('click');
                var time = random(CONFIG.TIME_MIN, CONFIG.TIME_MAX, true) * 6e4;
                console.log(time / 1e3 + "\u79D2\u540E\u81EA\u52A8\u9876\u8D34\u56DE\u590D");
                CONFIG.timer = setTimeout(function () {
                    runResponse();
                }, time);
            };
            if (G.get('responseMode') === '网络语句模式') {
                $.ajax({
                    type: 'GET',
                    url: 'https://v1.hitokoto.cn',
                    dataType: 'json',
                    success: function (data) {
                        submit(data.hitokoto);
                    },
                    error: function (_jqXHR, textStatus, errorThrown) {
                        console.error(textStatus, errorThrown);
                    }
                });
            }
            else {
                var index = random(0, CONFIG.TEXT.length - 1);
                submit(CONFIG.TEXT[index]);
            }
        };
        var clearTimer = function () {
            clearTimeout(CONFIG.timer);
            CONFIG.timer = null;
        };
        if (CONFIG.STATUS) {
            setTimeout(function () {
                runResponse();
                message('已开启自动顶贴回复');
            }, 1e3);
        }
        $(document).on('click', '#ding_btn', function () {
            if (CONFIG.STATUS) {
                CONFIG.STATUS = false;
                $(this).text('开启自动顶贴回复');
                $('#reply_immediate').remove();
                clearTimer();
                message('已关闭自动顶贴回复');
            }
            else {
                CONFIG.STATUS = true;
                $(this).text('关闭自动顶贴回复');
                runResponse();
                appendResponseBtn();
                message('已开启自动顶贴回复');
            }
        });
        $(document).on('click', '#reply_immediate', function () {
            clearTimer();
            runResponse();
        });
    };
    $(window).on('load', function () {
        if (/^\/p\/\d{1,}$/.test(pathname)) {
            console.log('进入贴子详情');
            autoResponse();
            G.get('removeAd') && removeHtmlElement($('div[ad-dom-img="true"]'));
        }
        else if (pathname === '/f') {
            console.log('进入贴吧列表');
            if (!G.get('removeAd')) {
                return;
            }
            removeHtmlElement($('#thread_list>li span.pull_right.label_text')
                .parents('li.clearfix')
                .not('.j_thread_list'));
            var adObserver = new MutationObserver(function (mutationsList) {
                mutationsList.forEach(function (mutation) {
                    if (mutation.type === 'childList' &&
                        $('li.clearfix .pull_right.label_text').length) {
                        removeHtmlElement($('#thread_list>li').not('.j_thread_list'));
                    }
                });
            });
            adObserver.observe($('body')[0], { childList: true });
        }
    });
})();
