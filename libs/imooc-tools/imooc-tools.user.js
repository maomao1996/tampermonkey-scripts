// ==UserScript==
// @name         慕课小助手
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      0.3.2
// @description  慕课网问答区快速查看问答详情、自动播放下一节视频
// @author       maomao1996
// @include      *://coding.imooc.com/learn/qa/*
// @include      *://coding.imooc.com/lesson/*
// @grant        none
// ==/UserScript==
;
(function () {
    'use strict';
    // 问答区样式
    var STYLE_MAP = {
        'learn/qa': ".mm-modal {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: 1996;\n      display: none;\n      overflow-y: auto;\n    }\n    .mm-mask {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: 1;\n      background-color: rgba(0, 0, 0, 0.5);\n    }\n    .mm-modal-x {\n      position: absolute;\n      left: 50%;\n      top: 15%;\n      z-index: 2;\n      margin-bottom: 10%;\n      border-radius: 20px;\n      padding: 25px;\n      width: 780px;\n      min-height: 520px;\n      background: #fff;\n      transform: translateX(-50%);\n    }\n    .mm-modal-x::before {\n      position: absolute;\n      z-index: -1;\n      width: 100%;\n      content: '\u6570\u636E\u52A0\u8F7D\u4E2D...';\n      font-size: 24px;\n      text-align: center;\n      line-height: 520px;\n    }"
    };
    function addStyle(type) {
        var rules = STYLE_MAP[type];
        if (!rules) {
            return;
        }
        $('head').append("<style>" + rules + "</style>");
    }
    /**
     * 问答区
     */
    // 获取按钮 html
    function getBntHtml(id) {
        return ('<a class="mm-btn" href="javascript:void(0)" data-id="' +
            id +
            '">弹窗查看</a>');
    }
    // 插入弹窗 dom
    function appendModal() {
        var modalHtml = '<div class="mm-modal" id="mm-modal"><div class="mm-mask"></div><div class="mm-modal-x"><iframe id="mm-content" width="100%" height="520" frameborder="0"></firame></div></div>';
        $('body').append(modalHtml);
    }
    // 点击事件
    function handleClick() {
        var id = $(this).data('id');
        $('#mm-modal').show().scrollTop(0);
        var $content = $('iframe#mm-content');
        $content
            .attr('src', "//coding.imooc.com/learn/questiondetail/" + id + ".html")
            .on('load', function () {
            var iframeCtx = $(this).contents();
            var style = "<style id=\"mm-style\">html {width: 780px!important;min-width: 780px!important;overflow-x:hidden} html .wrap {margin: 0 2px!important;}html .col-aside.wenda-col-aside {display: none}</style>";
            iframeCtx.find('head').append(style);
            var h = iframeCtx.height();
            $content.attr('height', h);
        });
    }
    // 问答区初始化
    function qaInit() {
        $('.qa-item-title').each(function () {
            var id = $(this).find('a').attr('href').replace(/\D/g, '');
            $(this).append(getBntHtml(id));
        });
        appendModal();
        $(document).on('click', '.mm-mask', function () {
            $('#mm-modal').hide();
            $('#mm-content').attr({ src: '', height: 0 });
        });
        $('#qa-list').on('click', '.mm-btn', handleClick);
    }
    /**
     * 视频详情
     */
    // 初始化
    function videoInit() {
        setTimeout(function () {
            $('video').on('ended', function () {
                var _a;
                console.log('当前视频播放完毕，即将播放下一节');
                (_a = $('.next-btn.js-next-media')[0]) === null || _a === void 0 ? void 0 : _a.click();
            });
        }, 2e3);
    }
    // 初始化操作
    $(window).on('load', function () {
        var pathname = location.pathname;
        var TYPE = pathname.substr(1, pathname.lastIndexOf('/') - 1);
        // 重置样式
        addStyle(TYPE);
        switch (TYPE) {
            // 问答区
            case 'learn/qa':
                console.log('问答区');
                qaInit();
                break;
            // 视频详情
            case 'lesson':
                console.log('视频详情');
                videoInit();
                $(window).on('hashchange', videoInit);
                break;
            default:
                break;
        }
    });
})();
