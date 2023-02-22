/*!
// ==UserScript==
// @name         跳转链接修复（移除重定向外链直达）
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      1.4.0
// @description  修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配百度搜索、360 搜索、知乎、知乎专栏、掘金、码云、开源中国、简书、CSDN、力扣（Leetcode）、语雀、微信开放社区、微博、牛客网、豆瓣、YouTube、花瓣网、51CTO 博客
// @author       maomao1996
// @include      *
// @grant        none
// ==/UserScript==
*/
;
(function () {
    'use strict';
    var isUrl = function (string) {
        if (typeof string !== 'string') {
            return false;
        }
        try {
            new URL(string);
            return true;
        }
        catch (err) {
            return false;
        }
    };
    var SITES = {
        'baidu.com': {
            transform: {
                selector: '#content_left > [mu]',
                customTransform: function (node) {
                    var originUrl = node.getAttribute('mu');
                    if (isUrl(originUrl) && !originUrl.includes('nourl.ubs.baidu.com')) {
                        node.querySelectorAll('a[href]').forEach(function (a) { return a.setAttribute('href', originUrl); });
                    }
                }
            }
        },
        'so.com': {
            transform: {
                selector: '.result li.res-list',
                customTransform: function (node) {
                    var _a;
                    var originUrl = (_a = node.querySelector('a[data-mdurl]')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-mdurl');
                    if (isUrl(originUrl)) {
                        var isVideo = node.querySelector('[data-mohe-type="svideo_top"]');
                        node
                            .querySelectorAll(isVideo ? 'h3 a' : 'a')
                            .forEach(function (a) { return a.setAttribute('href', originUrl); });
                    }
                }
            }
        },
        'zhihu.com': {
            transform: { selector: '[href*="link.zhihu.com/?target="]' }
        },
        'zhuanlan.zhihu.com': {
            transform: { selector: '[href*="link.zhihu.com/?target="]' }
        },
        'link.zhihu.com': {
            autojump: {}
        },
        'juejin.cn': {
            transform: { selector: '[href*="link.juejin.cn?target="]' }
        },
        'link.juejin.cn': {
            autojump: {}
        },
        'gitee.com': {
            transform: { selector: '[href*="gitee.com/link?target="]' },
            autojump: { validator: function () { return pathname === '/link'; } }
        },
        'oschina.net': {
            transform: {
                selector: '[href*="oschina.net/action/GoToLink?url="]',
                separator: 'GoToLink?url='
            },
            autojump: {
                validator: function () { return pathname === '/action/GoToLink'; },
                query: 'url'
            }
        },
        'my.oschina.net': {
            transform: {
                selector: '[href*="oschina.net/action/GoToLink?url="]',
                separator: 'GoToLink?url='
            }
        },
        'jianshu.com': {
            transform: {
                selector: '[href*="links.jianshu.com/go?to="]',
                separator: 'go?to='
            },
            autojump: { validator: function () { return pathname === '/go-wild'; }, query: 'url' }
        },
        'link.csdn.net': {
            autojump: {}
        },
        'leetcode.cn': {
            transform: { selector: '[href*="/link/?target="]' }
        },
        'yuque.com': {
            autojump: { validator: function () { return pathname === '/r/goto'; }, query: 'url' }
        },
        'developers.weixin.qq.com': {
            autojump: {
                validator: function () { return pathname === '/community/middlepage/href'; },
                query: 'href'
            }
        },
        'weibo.cn': {
            autojump: { validator: function () { return pathname === '/sinaurl'; }, query: 'u' }
        },
        'nowcoder.com': {
            transform: {
                selector: [
                    '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]',
                    '[href*="hd.nowcoder.com/link.html?target="]'
                ].join(','),
                separator: /\?target|link\=/
            }
        },
        'hd.nowcoder.com': {
            autojump: {}
        },
        'douban.com': {
            autojump: { validator: function () { return pathname === '/link2/'; }, query: 'url' }
        },
        'youtube.com': {
            transform: {
                selector: '[href*="youtube.com/redirect?event="]',
                query: 'q'
            }
        },
        'huaban.com': {
            autojump: {
                validator: function () { return pathname === '/go'; },
                click: '.wrapper button.ant-btn'
            }
        },
        'blog.51cto.com': {
            autojump: {
                validator: function () { return pathname === '/transfer'; },
                separator: '?'
            }
        }
    };
    var hostname = location.hostname, pathname = location.pathname;
    var _a = SITES[hostname.replace(/^www\./, '')] || {}, transform = _a.transform, autojump = _a.autojump;
    if (transform) {
        var selector_1 = transform.selector, query_1 = transform.query, _b = transform.separator, separator_1 = _b === void 0 ? '?target=' : _b, _c = transform.customTransform, customTransform_1 = _c === void 0 ? function (node) {
            var originUrl = query_1
                ? new URL(node.href).searchParams.get(query_1)
                : node.href.split(separator_1)[1];
            if (originUrl) {
                node.href = decodeURIComponent(originUrl);
            }
        } : _c;
        var observer = new MutationObserver(function () {
            document.querySelectorAll(selector_1).forEach(customTransform_1);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    if (autojump) {
        var validator = autojump.validator, click = autojump.click, separator = autojump.separator, _d = autojump.query, query = _d === void 0 ? 'target' : _d;
        if (validator && !validator()) {
            return;
        }
        if (click && document.querySelector(click)) {
            return document.querySelector(click).click();
        }
        var originUrl = separator
            ? location.search.split(separator)[1]
            : new URLSearchParams(location.search).get(query);
        isUrl(originUrl) && location.replace(originUrl);
    }
})();
