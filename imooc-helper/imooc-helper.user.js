/*!
// ==UserScript==
// @name         慕课小助手
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      0.3.10
// @description  慕课网问答区快速查看问答详情、自动播放下一节视频
// @icon         https://coding.m.imooc.com/static/wap/static/favicon.ico
// @author       maomao1996
// @include      *://coding.imooc.com/learn/qa/*
// @include      *://coding.imooc.com/lesson/*
// @grant        GM_addStyle
// ==/UserScript==
*/
;
(function () {
    'use strict';
    var STYLE_MAP = {
        'learn/qa': ".mm-modal {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: 1996;\n      display: none;\n      overflow-y: auto;\n    }\n    .mm-mask {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: 1;\n      background-color: rgba(0, 0, 0, 0.5);\n    }\n    .mm-modal-x {\n      overflow: hidden;\n      position: absolute;\n      top: 10%;\n      bottom: 5%;\n      left: 50%;\n      z-index: 2;\n      border-radius: 20px;\n      padding: 25px;\n      width: 836px;\n      min-height: 480px;\n      background: #fff;\n      transform: translateX(-50%);\n    }\n    .mm-modal-x::before {\n      position: absolute;\n      top: 0;\n      left: 0;\n      z-index: -1;\n      width: 100%;\n      content: '\u6570\u636E\u52A0\u8F7D\u4E2D...';\n      font-size: 24px;\n      text-align: center;\n      line-height: 480px;\n    }",
    };
    function addStyle(type) {
        var rules = STYLE_MAP[type];
        if (!rules) {
            return;
        }
        GM_addStyle(rules);
    }
    function getBntHtml(link) {
        return "<a class=\"mm-btn\" href=\"javascript:void(0)\" data-link=\"" + link + "\">\u5F39\u7A97\u67E5\u770B</a>";
    }
    function appendModal() {
        var modalHtml = '<div class="mm-modal" id="mm-modal"><div class="mm-mask"></div><div class="mm-modal-x"><iframe id="mm-content" width="100%" height="100%" frameborder="0"></iframe></div></div>';
        $('body').append(modalHtml);
    }
    function handleClick() {
        var link = $(this).data('link');
        $('#mm-modal').show().scrollTop(0);
        var $content = $('iframe#mm-content');
        $content.attr('src', link).on('load', function () {
            var iframeCtx = $(this).contents();
            var style = "<style id=\"mm-style\">\n      html, body {\n        overflow-x: hidden;\n        width: 836px!important;\n        min-width: 836px!important;\n        padding-bottom: 0!important\n      }\n      #footer, #globalTopBanner, #new_header, #J_GotoTop,html .col-aside.wenda-col-aside, .detail-r {\n        display: none!important\n      }\n      html .quedetail-wrap {\n        margin: 2px;\n      }\n      html .wenda-answer .cmt-post {\n        margin-bottom: 2px;\n      }\n      </style>";
            iframeCtx.find('head').append(style);
        });
    }
    function qaInit() {
        $('#qa-list .nwenda-box').each(function () {
            var link = $(this).attr('href');
            $(this).find('h3').append(getBntHtml(link));
        });
        appendModal();
        $(document).on('click', '.mm-mask', function () {
            $('#mm-modal').hide();
            $('#mm-content').attr({ src: '' });
        });
        $('#qa-list').on('click', '.mm-btn', handleClick);
    }
    function videoInit() {
        setTimeout(function () {
            $('#video-container-mocoplayer-hls-video_html5_api').on('ended', function () {
                var _a;
                console.log('当前视频播放完毕，即将播放下一节');
                (_a = $('.next-btn.js-next-media')[0]) === null || _a === void 0 ? void 0 : _a.click();
            });
        }, 3e3);
    }
    $(window).on('load', function () {
        var pathname = location.pathname;
        var TYPE = pathname.substr(1, pathname.lastIndexOf('/') - 1);
        addStyle(TYPE);
        switch (TYPE) {
            case 'learn/qa':
                console.log('问答区');
                qaInit();
                break;
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
