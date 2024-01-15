// ==UserScript==
// @name        GitHub 小助手
// @description 优化 GitHub 使用体验的小工具；仓库页显示 GitHub 计数统计（issues、watch、fork、star）为具体数值
// @namespace   maomao1996.github-helper
// @version     1.0.0
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://github.com/*
// @grant       none
// ==/UserScript==
!function() {
  "use strict";
  var t = "femm-helper";
  function r(t, r) {
    (null == r || r > t.length) && (r = t.length);
    for (var e = 0, n = new Array(r); e < r; e++) n[e] = t[e];
    return n;
  }
  function e(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, r) {
      var e = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != e) {
        var n, o, u = [], i = !0, a = !1;
        try {
          for (e = e.call(t); !(i = (n = e.next()).done) && (u.push(n.value), !r || u.length !== r); i = !0) ;
        } catch (t) {
          a = !0, o = t;
        } finally {
          try {
            i || null == e.return || e.return();
          } finally {
            if (a) throw o;
          }
        }
        return u;
      }
    }(t, e) || function(t, e) {
      if (!t) return;
      if ("string" == typeof t) return r(t, e);
      var n = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === n && t.constructor && (n = t.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(n);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return r(t, e);
    }(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var n = /^(\d{1,3}(,\d{3})*|\d+|\d{1,3},\d{3}\+)$/, o = {
    COUNTER: 'span[class*="Counter"]:not(['.concat(t, "])"),
    REPO_SIDEBAR: "#repo-content-pjax-container .Layout-sidebar",
    WATCH: "#repo-notifications-counter",
    FORKS: "#repo-network-counter",
    STARS: '[id^="repo-stars-counter-"]'
  }, u = [ [ 'a[href$="/watchers"] strong', o.WATCH ], [ 'a[href$="/forks"] strong', o.FORKS ], [ 'a[href$="/stargazers"] strong', o.STARS ] ];
  function i(r, e) {
    (function(r, e) {
      return !r.getAttribute(t) && n.test(e) && r.innerText !== e;
    })(r, e) && (function(t, r) {
      t.innerText = r;
    }(r, e), function(t, r, e) {
      t.getAttribute(r) || t.setAttribute(r, e);
    }(r, t, "update-count"));
  }
  function a() {
    var t;
    document.querySelectorAll(o.COUNTER).forEach((function(t) {
      var r = t.getAttribute("title") || "";
      i(t, r);
    })), document.querySelector("#repository-container-header:not([hidden])") && ((t = document.querySelector(o.REPO_SIDEBAR)) && u.forEach((function(r) {
      var n, o = e(r, 2), u = o[0], a = o[1];
      i(t.querySelector(u), (null === (n = document.querySelector(a)) || void 0 === n ? void 0 : n.getAttribute("title")) || "");
    })));
  }
  var c = function() {
    a();
  }, l = document.querySelector("main");
  null != l && new MutationObserver((function() {
    return c();
  })).observe(l, {
    childList: !0,
    subtree: !0
  });
  c();
}();
