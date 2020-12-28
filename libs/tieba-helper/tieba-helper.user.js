// ==UserScript==
// @name          贴吧小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.1.2
// @description   自动顶贴回复
// @author        maomao1996
// @include       *://tieba.baidu.com/p/*
// @grant         GM_notification
// ==/UserScript==
;
(function () {
    'use strict';
    /**
     * 随机函数
     * https://github.com/lodash/lodash/blob/master/random.js
     */
    var random = function (lower, upper, floating) {
        if (floating) {
            var rand = Math.random();
            var randLength = ("" + rand).length - 1;
            return Math.min(lower + rand * (upper - lower + parseFloat("1e-" + randLength)), upper);
        }
        return lower + Math.floor(Math.random() * (upper - lower + 1));
    };
    /**
     * 顶帖模块
     **/
    var DING_CONFIG = {
        // 当前顶贴状态
        STATUS: false,
        // 顶帖最小间隔（分钟）
        TIME_MIN: 1,
        // 顶帖最大间隔（分钟）
        TIME_MAX: 30,
        // 顶贴回复内容
        TEXT: ['顶', '顶', '顶'],
        // 定时器
        timer: null
    };
    var autoResponse = function () {
        // 插入控制按钮
        $('#quick_reply').after('<a id="ding_btn" rel="noopener" class="btn-sub btn-small j_favor">开启自动顶贴回复</a>');
        // 执行顶贴回复
        var runResponse = function () {
            var selectors = {
                // 输入框选择器
                editor: '#j_editor_for_container',
                // 提交按钮选择器
                submit: '.lzl_panel_submit.j_lzl_p_sb'
            };
            if (!$('#j_editor_for_container:visible').length) {
                var lzlPSelector = '.j_lzl_p.btn-sub.pull-right:visible';
                // 是否存在一条打开的回复
                if ($(lzlPSelector).length) {
                    $(lzlPSelector).trigger('click');
                }
                // 是否打开楼中楼回复
                else if ($('a.lzl_link_unfold:visible').length) {
                    $($('.lzl_link_unfold')[0]).trigger('click');
                }
                // 打开回复楼主
                else {
                    $('#quick_reply').trigger('click');
                    selectors.editor = '#ueditor_replace';
                    selectors.submit = '.j_submit.poster_submit';
                }
            }
            var index = random(0, DING_CONFIG.TEXT.length - 1);
            $(selectors.editor).text(DING_CONFIG.TEXT[index]);
            $(selectors.submit).trigger('click');
            if (DING_CONFIG.STATUS) {
                var time = random(DING_CONFIG.TIME_MIN, DING_CONFIG.TIME_MAX, true) * 6e4;
                console.log(time / 1000 + "\u79D2\u540E\u81EA\u52A8\u9876\u8D34\u56DE\u590D");
                DING_CONFIG.timer = setTimeout(function () {
                    runResponse();
                }, time);
            }
        };
        $('#ding_btn').on('click', function () {
            if (DING_CONFIG.STATUS) {
                // 关闭
                DING_CONFIG.STATUS = false;
                clearTimeout(DING_CONFIG.timer);
                DING_CONFIG.timer = null;
                $(this).text('开启自动顶贴回复');
                GM_notification({
                    text: '已关闭自动顶贴回复',
                    timeout: 2000
                });
            }
            else {
                // 开启
                DING_CONFIG.STATUS = true;
                $(this).text('关闭自动顶贴回复');
                GM_notification({
                    text: '已开启自动顶贴回复',
                    timeout: 2000
                });
                runResponse();
            }
        });
    };
    $(window).on('load', function () {
        var pathname = location.pathname;
        // 自动顶贴回复
        if (/^\/p\/\d{1,}$/.test(pathname)) {
            autoResponse();
        }
    });
})();
