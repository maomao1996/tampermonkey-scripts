/*!
// ==UserScript==
// @name         跳转链接修复（外链直达）
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      1.0.0
// @description  修复跳转链接为站外直链，免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配知乎、掘金、码云、简书、CSDN
// @author       maomao1996
// @include      *
// @grant        none
// ==/UserScript==
*/
;
(function () {
    'use strict';
    var SITES = {
        'www.zhihu.com': {
            selector: '[href*="link.zhihu.com/?target="]'
        },
        'link.zhihu.com': {
            type: 'autojump'
        },
        'juejin.cn': {
            selector: '[href*="link.juejin.cn?target="]'
        },
        'link.juejin.cn': {
            type: 'autojump'
        },
        'gitee.com': {
            selector: '[href*="gitee.com/link?target="]'
        },
        'www.jianshu.com': {
            selector: '[href*="links.jianshu.com/go?to="]',
            separator: 'go?to='
        },
        'link.csdn.net': {
            type: 'autojump'
        }
    };
    var hostname = location.hostname;
    var _a = SITES[hostname], selector = _a.selector, _b = _a.type, type = _b === void 0 ? 'transform' : _b, _c = _a.separator, separator = _c === void 0 ? '?target=' : _c, _d = _a.query, query = _d === void 0 ? 'target' : _d;
    if (type === 'autojump') {
        var originUrl = new URLSearchParams(location.search).get(query);
        originUrl && location.replace(originUrl);
    }
    else if (selector) {
        var observer = new MutationObserver(function () {
            document.querySelectorAll(selector).forEach(function (node) {
                var _a = node.href.split(separator), originUrl = _a[1];
                if (originUrl) {
                    node.href = decodeURIComponent(originUrl);
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
