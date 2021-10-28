/*!
// ==UserScript==
// @name         跳转链接修复
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      0.4.1
// @description  为知乎、微信、掘金拦截页面增加跳转按钮（支持3秒后自动跳转）
// @author       maomao1996
// @include      *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/*
// @include      *://link.zhihu.com/*
// @include      *://link.juejin.cn/*
// @grant        GM_notification
// @require		   https://cdn.jsdelivr.net/npm/jquery@v3.4.1
// ==/UserScript==
*/
;
(function () {
    'use strict';
    function getQueryStringArgs(url) {
        if (url && url.indexOf('?') > -1) {
            var arr = url.split('?');
            var qs = arr[1];
            var args = {};
            var items = qs.length ? qs.split('&') : [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i].split('=');
                var key = decodeURIComponent(item[0]);
                var value = decodeURIComponent(item[1]);
                if (key.length) {
                    args[key] = value;
                }
            }
            return args;
        }
        return {};
    }
    var urlCharRE = /^(https|http):\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    var params = getQueryStringArgs(location.search);
    var target = '';
    var url = '';
    var insertion = 'after';
    function initParams(u, t, cls) {
        if (cls === void 0) { cls = 'button'; }
        url = u;
        target = t;
        return ('<a href="' + u + '" class="' + cls + '">继续访问 (3 秒后自动跳转)</a>');
    }
    var fns = {
        'weixin110.qq.com': function () {
            return initParams($('.weui-msg .weui-msg__desc')
                .text()
                .replace(/非微信官方网页，请确认是否继续访问。/, ''), '.weui-msg', 'weui-btn_cell weui-btn_cell-primary');
        },
        'link.zhihu.com': function () {
            insertion = 'html';
            return initParams(params.target, '.actions');
        },
        'link.juejin.cn': function () {
            url = params.target;
            $('button.btn').text('继续访问 (3 秒后自动跳转)');
        }
    };
    var fn = fns[location.hostname];
    var html = typeof fn === 'function' ? fn() : '';
    var isUrl = urlCharRE.test(url);
    if (isUrl) {
        if (target && html) {
            $(target)[insertion](html);
        }
        setTimeout(function () {
            location.href = url;
        }, 3000);
    }
    else {
        GM_notification({ timeout: 2e3, text: '获取 url 失败！' });
    }
})();
