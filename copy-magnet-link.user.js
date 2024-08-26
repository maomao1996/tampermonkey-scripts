// ==UserScript==
// @name        复制磁力链接
// @description 一键复制页面内所有磁力链接（自动过滤重复磁力链接）
// @namespace   maomao1996.copy-magnet-link
// @version     1.0.1
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://*/*
// @exclude     *://localhost:*/*
// @exclude     *://127.0.0.1:*/*
// @exclude     *://0.0.0.0*
// @exclude     *://192.168.*
// @grant       GM_addStyle
// @grant       GM_setClipboard
// @grant       GM_notification
// ==/UserScript==
!function() {
  "use strict";
  var e = '.femm-copy-magnet-link{bottom:30vh;cursor:pointer;opacity:.5;position:fixed;right:18px;transform:translateX(40px);transition:transform .3s,opacity .2s;z-index:1996}.femm-copy-magnet-link:after{bottom:0;content:"";display:block;left:0;position:absolute;top:0;width:150%}.femm-copy-magnet-link:before{background-color:rgba(0,0,0,.85);border-radius:6px;bottom:120%;color:#e6f4ff;content:attr(tips);display:none;font-size:12px;padding:8px;position:absolute;right:0;text-align:center;transition:opacity .25s .1s;white-space:nowrap;z-index:1}.femm-copy-magnet-link:hover{opacity:1;transform:translateX(10px)}.femm-copy-magnet-link:hover:before{display:block}.femm-copy-magnet-link-btn{align-items:center;background-color:#fff;border-radius:50%;box-shadow:0 6px 16px 0 rgba(0,0,0,.08),0 3px 6px -4px rgba(0,0,0,.12),0 9px 28px 8px rgba(0,0,0,.05);display:flex;font-size:16px;height:40px;justify-content:center;overflow:hidden;transition:background-color .2s;width:40px}.femm-copy-magnet-link-btn:hover{background-color:rgba(0,0,0,.06)}';
  !function(e, t) {
    void 0 === t && (t = {});
    var n = t.insertAt;
    if (e && "undefined" != typeof document) {
      var o = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
      i.type = "text/css", "top" === n && o.firstChild ? o.insertBefore(i, o.firstChild) : o.appendChild(i), 
      i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e));
    }
  }(e), function() {
    if (window.self === window.top) {
      GM_addStyle(e);
      var t = function(e) {
        e && GM_notification({
          timeout: 2e3,
          text: e
        });
      }, n = function(e) {
        return e ? (e.innerHTML.match(/[0-9a-fA-F]{40}/gm) || []).map((function(e) {
          return "magnet:?xt=urn:btih:" + e.replace(/&.+/gm, "");
        })) : [];
      };
      n(document.querySelector("body")).length && (document.querySelector("#femm-copy-magnet-link") || document.querySelector("body").insertAdjacentHTML("beforeend", '<div id="femm-copy-magnet-link" class="femm-copy-magnet-link" tips="\u590d\u5236\u9875\u9762\u5185\u7684\u78c1\u529b\u94fe\u63a5"><div class="femm-copy-magnet-link-btn"><svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M232 706h142c22.1 0 40 17.9 40 40v142h250V264H232v442z" fill="#e6f4ff"></path><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z" fill="#1677ff"></path><path d="M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" fill="#1677ff"></path></svg></div></div>'), 
      document.querySelector("#femm-copy-magnet-link").addEventListener("click", (function() {
        var e = n(document.querySelector("body"));
        document.querySelectorAll("iframe").forEach((function(t) {
          try {
            ("" === t.src || t.src.includes(location.host)) && (e = e.concat(n(t.contentWindow.document.body)));
          } catch (e) {
            console.log("\u83b7\u53d6 iframe \u5f02\u5e38", e);
          }
        }));
        var o = e.length;
        window.Set && (e = Array.from(new Set(e))), e.length ? GM_setClipboard(e.join("\n"), "text", (function() {
          return t("\u78c1\u529b\u603b\u6570: ".concat(o, "\n\u91cd\u590d\u78c1\u529b: ").concat(o - e.length, "\n\u5df2\u6210\u529f\u590d\u5236 ").concat(e.length, " \u6761\u78c1\u529b\u94fe\u63a5"));
        })) : t("\u5f53\u524d\u9875\u9762\u6ca1\u6709\u78c1\u529b\u94fe\u63a5");
      })));
    }
  }();
}();