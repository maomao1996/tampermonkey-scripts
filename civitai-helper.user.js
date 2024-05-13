// ==UserScript==
// @name        Civitai 小助手
// @description 提升 Civitai 使用体验的小助手
// @namespace   maomao1996.civitai-helper
// @version     1.0.0
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://civitai.com/*
// @grant       none
// ==/UserScript==
!function() {
  "use strict";
  var t = new IntersectionObserver((function(n) {
    var e = !0, r = !1, o = void 0;
    try {
      for (var i, u = n[Symbol.iterator](); !(e = (i = u.next()).done); e = !0) {
        var a = i.value;
        if (a.isIntersecting) {
          var c = a.target;
          c.click(), t.unobserve(c);
        }
      }
    } catch (t) {
      r = !0, o = t;
    } finally {
      try {
        e || null == u.return || u.return();
      } finally {
        if (r) throw o;
      }
    }
  }));
  var n = function() {
    document.querySelectorAll(".mantine-Stack-root > button.mantine-UnstyledButton-root.mantine-Button-root").forEach((function(n) {
      "Show" === n.innerText && t.observe(n);
    }));
  }, e = document.querySelector("#main");
  null != e && new MutationObserver((function() {
    return n();
  })).observe(e, {
    childList: !0,
    subtree: !0
  });
  n();
}();
