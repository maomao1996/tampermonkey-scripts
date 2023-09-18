/*!
// ==UserScript==
// @name          黑白网页颜色还原
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.2.0
// @description   移除灰色滤镜，还你一个五彩斑斓的网页
// @author        maomao1996
// @include       *
// @grant         none
// ==/UserScript==
*/
;
(function () {
    'use strict';
    var observerChildList = function (callback, selector) {
        var observer = new MutationObserver(function (_a) {
            var mutation = _a[0];
            mutation.type === 'childList' && callback(observer, mutation);
        });
        observer.observe(selector, { childList: true, subtree: true });
        return observer;
    };
    var style = document.documentElement.style;
    var filterKey = ['filter', '-webkit-filter', '-moz-filter', '-ms-filter', '-o-filter'].find(function (prop) { return typeof style[prop] === 'string'; });
    var restore = function () {
        Array.prototype.forEach.call(document.querySelectorAll('*'), function (el) {
            var filterValue = document.defaultView.getComputedStyle(el)[filterKey];
            if (filterValue.match('grayscale')) {
                el.style.setProperty(filterKey, 'initial', 'important');
            }
        });
    };
    observerChildList(restore, document.querySelector('body'));
    restore();
})();
