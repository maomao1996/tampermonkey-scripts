// ==UserScript==
// @name          115小助手
// @namespace     https://github.com/maomao1996/tampermonkey-scripts
// @version       0.1.1
// @description   顶部链接任务入口还原
// @author        maomao1996
// @include       *://115.com/*
// @grant         none
// ==/UserScript==
;
(function () {
    'use strict';
    // 过滤非 iframe 场景
    if (window.self === window.top) {
        return;
    }
    /**
     * 在顶部菜单添加链接任务按钮
     */
    function addLinkTaskBtn() {
        $('#js_top_panel_box .button[menu="upload"]').after('<a href="javascript:;" class="button btn-line btn-upload" menu="offline_task"><i class="icon-operate ifo-linktask"></i><span>链接任务</span><em style="display:none;" class="num-dot"></em></a>');
    }
    // 初始化
    $(function () {
        // 添加链接任务入口
        addLinkTaskBtn();
    });
})();
