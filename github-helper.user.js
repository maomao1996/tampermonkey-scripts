// ==UserScript==
// @name        GitHub 小助手
// @description 优化 GitHub 使用体验的小工具；仓库页显示 GitHub 计数统计（issues、watch、fork、star）为具体数值、放大查看 Markdown 中的图片
// @namespace   maomao1996.github-helper
// @version     1.1.0
// @icon        https://github.githubassets.com/favicons/favicon.svg
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://github.com/*
// @grant       GM_addStyle
// ==/UserScript==
!function() {
  "use strict";
  var e = "femm-helper";
  function t(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
    return n;
  }
  function o(e, o) {
    return function(e) {
      if (Array.isArray(e)) return e;
    }(e) || function(e, t) {
      var o = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != o) {
        var n, r, i = [], d = !0, a = !1;
        try {
          for (o = o.call(e); !(d = (n = o.next()).done) && (i.push(n.value), !t || i.length !== t); d = !0) ;
        } catch (e) {
          a = !0, r = e;
        } finally {
          try {
            d || null == o.return || o.return();
          } finally {
            if (a) throw r;
          }
        }
        return i;
      }
    }(e, o) || function(e, o) {
      if (!e) return;
      if ("string" == typeof e) return t(e, o);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(n);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return t(e, o);
    }(e, o) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var n = /^(\d{1,3}(,\d{3})*|\d+|\d{1,3},\d{3}\+)$/, r = {
    COUNTER: 'span[class*="Counter"]:not(['.concat(e, "])"),
    REPO_SIDEBAR: "#repo-content-pjax-container .Layout-sidebar",
    WATCH: "#repo-notifications-counter",
    FORKS: "#repo-network-counter",
    STARS: '[id^="repo-stars-counter-"]'
  }, i = [ [ 'a[href$="/watchers"] strong', r.WATCH ], [ 'a[href$="/forks"] strong', r.FORKS ], [ 'a[href$="/stargazers"] strong', r.STARS ] ];
  function d(t, o) {
    (function(t, o) {
      return !t.getAttribute(e) && n.test(o) && t.innerText !== o;
    })(t, o) && (function(e, t) {
      e.innerText = t;
    }(t, o), function(e, t, o) {
      e.getAttribute(t) || e.setAttribute(t, o);
    }(t, e, "update-count"));
  }
  function a() {
    var e;
    document.querySelectorAll(r.COUNTER).forEach((function(e) {
      var t = e.getAttribute("title") || "";
      d(e, t);
    })), document.querySelector("#repository-container-header:not([hidden])") && ((e = document.querySelector(r.REPO_SIDEBAR)) && i.forEach((function(t) {
      var n, r = o(t, 2), i = r[0], a = r[1];
      d(e.querySelector(i), (null === (n = document.querySelector(a)) || void 0 === n ? void 0 : n.getAttribute("title")) || "");
    })));
  }
  /*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom */  var m = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
  }, c = function(e) {
    return "IMG" === e.tagName;
  }, l = function(e) {
    return e && 1 === e.nodeType;
  }, u = function(e) {
    return ".svg" === (e.currentSrc || e.src).substr(-4).toLowerCase();
  }, s = function(e) {
    try {
      return Array.isArray(e) ? e.filter(c) : function(e) {
        return NodeList.prototype.isPrototypeOf(e);
      }(e) ? [].slice.call(e).filter(c) : l(e) ? [ e ].filter(c) : "string" == typeof e ? [].slice.call(document.querySelectorAll(e)).filter(c) : [];
    } catch (e) {
      throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
    }
  }, f = function(e, t) {
    var o = m({
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    }, t);
    if ("function" == typeof window.CustomEvent) return new CustomEvent(e, o);
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(e, o.bubbles, o.cancelable, o.detail), n;
  };
  !function(e, t) {
    void 0 === t && (t = {});
    var o = t.insertAt;
    if (e && "undefined" != typeof document) {
      var n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
      r.type = "text/css", "top" === o && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), 
      r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
    }
  }(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}");
  var p = function e(t) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = window.Promise || function(e) {
      function t() {}
      e(t, t);
    }, r = function() {
      for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
      var n = t.reduce((function(e, t) {
        return [].concat(e, s(t));
      }), []);
      return n.filter((function(e) {
        return -1 === c.indexOf(e);
      })).forEach((function(e) {
        c.push(e), e.classList.add("medium-zoom-image");
      })), p.forEach((function(e) {
        var t = e.type, o = e.listener, r = e.options;
        n.forEach((function(e) {
          e.addEventListener(t, o, r);
        }));
      })), b;
    }, i = function() {
      var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target, t = function() {
        var e = {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }, t = void 0, o = void 0;
        if (h.container) if (h.container instanceof Object) t = (e = m({}, e, h.container)).width - e.left - e.right - 2 * h.margin, 
        o = e.height - e.top - e.bottom - 2 * h.margin; else {
          var n = (l(h.container) ? h.container : document.querySelector(h.container)).getBoundingClientRect(), r = n.width, i = n.height, d = n.left, a = n.top;
          e = m({}, e, {
            width: r,
            height: i,
            left: d,
            top: a
          });
        }
        t = t || e.width - 2 * h.margin, o = o || e.height - 2 * h.margin;
        var c = y.zoomedHd || y.original, s = u(c) ? t : c.naturalWidth || t, f = u(c) ? o : c.naturalHeight || o, p = c.getBoundingClientRect(), g = p.top, v = p.left, z = p.width, b = p.height, E = Math.min(Math.max(z, s), t) / z, w = Math.min(Math.max(b, f), o) / b, S = Math.min(E, w), A = "scale(" + S + ") translate3d(" + ((t - z) / 2 - v + h.margin + e.left) / S + "px, " + ((o - b) / 2 - g + h.margin + e.top) / S + "px, 0)";
        y.zoomed.style.transform = A, y.zoomedHd && (y.zoomedHd.style.transform = A);
      };
      return new n((function(o) {
        if (e && -1 === c.indexOf(e)) o(b); else {
          if (y.zoomed) o(b); else {
            if (e) y.original = e; else {
              if (!(c.length > 0)) return void o(b);
              var n = c;
              y.original = n[0];
            }
            if (y.original.dispatchEvent(f("medium-zoom:open", {
              detail: {
                zoom: b
              }
            })), v = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, 
            g = !0, y.zoomed = function(e) {
              var t = e.getBoundingClientRect(), o = t.top, n = t.left, r = t.width, i = t.height, d = e.cloneNode(), a = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, m = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
              return d.removeAttribute("id"), d.style.position = "absolute", d.style.top = o + a + "px", 
              d.style.left = n + m + "px", d.style.width = r + "px", d.style.height = i + "px", 
              d.style.transform = "", d;
            }(y.original), document.body.appendChild(z), h.template) {
              var r = l(h.template) ? h.template : document.querySelector(h.template);
              y.template = document.createElement("div"), y.template.appendChild(r.content.cloneNode(!0)), 
              document.body.appendChild(y.template);
            }
            if (y.original.parentElement && "PICTURE" === y.original.parentElement.tagName && y.original.currentSrc && (y.zoomed.src = y.original.currentSrc), 
            document.body.appendChild(y.zoomed), window.requestAnimationFrame((function() {
              document.body.classList.add("medium-zoom--opened");
            })), y.original.classList.add("medium-zoom-image--hidden"), y.zoomed.classList.add("medium-zoom-image--opened"), 
            y.zoomed.addEventListener("click", d), y.zoomed.addEventListener("transitionend", (function e() {
              g = !1, y.zoomed.removeEventListener("transitionend", e), y.original.dispatchEvent(f("medium-zoom:opened", {
                detail: {
                  zoom: b
                }
              })), o(b);
            })), y.original.getAttribute("data-zoom-src")) {
              y.zoomedHd = y.zoomed.cloneNode(), y.zoomedHd.removeAttribute("srcset"), y.zoomedHd.removeAttribute("sizes"), 
              y.zoomedHd.removeAttribute("loading"), y.zoomedHd.src = y.zoomed.getAttribute("data-zoom-src"), 
              y.zoomedHd.onerror = function() {
                clearInterval(i), console.warn("Unable to reach the zoom image target " + y.zoomedHd.src), 
                y.zoomedHd = null, t();
              };
              var i = setInterval((function() {
                y.zoomedHd.complete && (clearInterval(i), y.zoomedHd.classList.add("medium-zoom-image--opened"), 
                y.zoomedHd.addEventListener("click", d), document.body.appendChild(y.zoomedHd), 
                t());
              }), 10);
            } else if (y.original.hasAttribute("srcset")) {
              y.zoomedHd = y.zoomed.cloneNode(), y.zoomedHd.removeAttribute("sizes"), y.zoomedHd.removeAttribute("loading");
              var a = y.zoomedHd.addEventListener("load", (function() {
                y.zoomedHd.removeEventListener("load", a), y.zoomedHd.classList.add("medium-zoom-image--opened"), 
                y.zoomedHd.addEventListener("click", d), document.body.appendChild(y.zoomedHd), 
                t();
              }));
            } else t();
          }
        }
      }));
    }, d = function() {
      return new n((function(e) {
        if (!g && y.original) {
          g = !0, document.body.classList.remove("medium-zoom--opened"), y.zoomed.style.transform = "", 
          y.zoomedHd && (y.zoomedHd.style.transform = ""), y.template && (y.template.style.transition = "opacity 150ms", 
          y.template.style.opacity = 0), y.original.dispatchEvent(f("medium-zoom:close", {
            detail: {
              zoom: b
            }
          })), y.zoomed.addEventListener("transitionend", (function t() {
            y.original.classList.remove("medium-zoom-image--hidden"), document.body.removeChild(y.zoomed), 
            y.zoomedHd && document.body.removeChild(y.zoomedHd), document.body.removeChild(z), 
            y.zoomed.classList.remove("medium-zoom-image--opened"), y.template && document.body.removeChild(y.template), 
            g = !1, y.zoomed.removeEventListener("transitionend", t), y.original.dispatchEvent(f("medium-zoom:closed", {
              detail: {
                zoom: b
              }
            })), y.original = null, y.zoomed = null, y.zoomedHd = null, y.template = null, e(b);
          }));
        } else e(b);
      }));
    }, a = function() {
      var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target;
      return y.original ? d() : i({
        target: e
      });
    }, c = [], p = [], g = !1, v = 0, h = o, y = {
      original: null,
      zoomed: null,
      zoomedHd: null,
      template: null
    };
    "[object Object]" === Object.prototype.toString.call(t) ? h = t : (t || "string" == typeof t) && r(t);
    var z = function(e) {
      var t = document.createElement("div");
      return t.classList.add("medium-zoom-overlay"), t.style.background = e, t;
    }((h = m({
      margin: 0,
      background: "#fff",
      scrollOffset: 40,
      container: null,
      template: null
    }, h)).background);
    document.addEventListener("click", (function(e) {
      var t = e.target;
      t !== z ? -1 !== c.indexOf(t) && a({
        target: t
      }) : d();
    })), document.addEventListener("keyup", (function(e) {
      var t = e.key || e.keyCode;
      "Escape" !== t && "Esc" !== t && 27 !== t || d();
    })), document.addEventListener("scroll", (function() {
      if (!g && y.original) {
        var e = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        Math.abs(v - e) > h.scrollOffset && setTimeout(d, 150);
      }
    })), window.addEventListener("resize", d);
    var b = {
      open: i,
      close: d,
      toggle: a,
      update: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e;
        if (e.background && (z.style.background = e.background), e.container && e.container instanceof Object && (t.container = m({}, h.container, e.container)), 
        e.template) {
          var o = l(e.template) ? e.template : document.querySelector(e.template);
          t.template = o;
        }
        return h = m({}, h, t), c.forEach((function(e) {
          e.dispatchEvent(f("medium-zoom:update", {
            detail: {
              zoom: b
            }
          }));
        })), b;
      },
      clone: function() {
        return e(m({}, h, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}));
      },
      attach: r,
      detach: function() {
        for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
        y.zoomed && d();
        var n = t.length > 0 ? t.reduce((function(e, t) {
          return [].concat(e, s(t));
        }), []) : c;
        return n.forEach((function(e) {
          e.classList.remove("medium-zoom-image"), e.dispatchEvent(f("medium-zoom:detach", {
            detail: {
              zoom: b
            }
          }));
        })), c = c.filter((function(e) {
          return -1 === n.indexOf(e);
        })), b;
      },
      on: function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return c.forEach((function(n) {
          n.addEventListener("medium-zoom:" + e, t, o);
        })), p.push({
          type: "medium-zoom:" + e,
          listener: t,
          options: o
        }), b;
      },
      off: function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return c.forEach((function(n) {
          n.removeEventListener("medium-zoom:" + e, t, o);
        })), p = p.filter((function(o) {
          return !(o.type === "medium-zoom:" + e && o.listener.toString() === t.toString());
        })), b;
      },
      getOptions: function() {
        return h;
      },
      getImages: function() {
        return c;
      },
      getZoomedImage: function() {
        return y.original;
      }
    };
    return b;
  }, g = ".markdown-body img:not(.medium-zoom-image)", v = p();
  function h() {
    !function() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : g;
      v.detach(), v.attach(e);
    }();
  }
  document.addEventListener("click", (function(e) {
    var t, o = e.target;
    "IMG" === (null == o ? void 0 : o.tagName) && (null === (t = document.querySelector(".markdown-body")) || void 0 === t ? void 0 : t.contains(o)) && (e.preventDefault(), 
    e.stopPropagation());
  }));
  var y = ".medium-zoom-overlay{background-color:#fff!important;z-index:1996}.medium-zoom-image--opened{z-index:1997}@media (prefers-color-scheme:dark){.medium-zoom-overlay{background-color:#000!important}}";
  !function(e, t) {
    void 0 === t && (t = {});
    var o = t.insertAt;
    if (e && "undefined" != typeof document) {
      var n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
      r.type = "text/css", "top" === o && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), 
      r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
    }
  }(y), GM_addStyle(y);
  var z = function() {
    a(), h();
  }, b = document.querySelector("main");
  null != b && new MutationObserver((function() {
    return z();
  })).observe(b, {
    childList: !0,
    subtree: !0
  });
  z();
}();
