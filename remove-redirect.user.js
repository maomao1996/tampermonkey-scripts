// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 提升用户体验：修复跳转链接为站外直链（移除重定向直接跳转），免去拦截页面点击步骤可直达站外；拦截页面自动跳转（无须额外操作）；已适配爱发电、百度搜索、百度贴吧、Bing 搜索、书签地球、酷安、CSDN、豆瓣、Facebook、码云、Google 搜索、Google 重定向页、花瓣网、InfoQ、Instagram、简书、掘金、金山文档、链滴、力扣（Leetcode）、51CTO 博客、NGA 玩家社区、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、腾讯兔小巢、石墨文档、360 搜索、搜狗搜索、少数派、腾讯云开发者社区、推特（Twitter）、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.17.0
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://*/*
// @exclude     *://localhost:*/*
// @exclude     *://127.0.0.1:*/*
// @exclude     *://0.0.0.0*
// @exclude     *://192.168.*
// @connect     baidu.com
// @connect     *
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// ==/UserScript==
!function() {
  "use strict";
  var r = "femm-helper", e = new WeakMap;
  var t = Array.isArray, o = function(r) {
    return "function" == typeof r;
  }, n = function(r) {
    return "string" == typeof r;
  }, a = "undefined" != typeof window;
  function u(r) {
    if (!n("string")) return !1;
    try {
      return new URL(r), !0;
    } catch (r) {
      return !1;
    }
  }
  var i, c, l = (i = GM.xmlHttpRequest, c = new Map, function(r) {
    if (void 0 !== r.cacheTime && ("number" != typeof r.cacheTime || r.cacheTime < 0)) throw new Error("\u65e0\u6548\u7684 cacheTime \u9009\u9879");
    var e, t = JSON.stringify(r), o = c.get(t);
    if (o) {
      var n, a = o.data, u = o.time, l = o.error, m = o.requestPromise;
      if (m) return m;
      var f = null !== (n = r.cacheTime) && void 0 !== n ? n : 0;
      if (!l && u && f && Date.now() - u < f) return Promise.resolve(a);
      c.delete(t);
    }
    var s = null !== (e = r.shouldCacheError) && void 0 !== e && e, d = i(r).then((function(r) {
      var e = Date.now();
      return c.set(t, {
        data: r,
        time: e
      }), r;
    })).catch((function(r) {
      if (s) {
        var e = Date.now();
        c.set(t, {
          error: r,
          time: e
        });
      }
      throw r;
    }));
    return c.set(t, {
      requestPromise: d
    }), d;
  });
  function m(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, o = new Array(e); t < e; t++) o[t] = r[t];
    return o;
  }
  function f(r, e) {
    return function(r) {
      if (Array.isArray(r)) return r;
    }(r) || function(r, e) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var o, n, a = [], u = !0, i = !1;
        try {
          for (t = t.call(r); !(u = (o = t.next()).done) && (a.push(o.value), !e || a.length !== e); u = !0) ;
        } catch (r) {
          i = !0, n = r;
        } finally {
          try {
            u || null == t.return || t.return();
          } finally {
            if (i) throw n;
          }
        }
        return a;
      }
    }(r, e) || function(r, e) {
      if (!r) return;
      if ("string" == typeof r) return m(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      "Object" === t && r.constructor && (t = r.constructor.name);
      if ("Map" === t || "Set" === t) return Array.from(t);
      if ("Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return m(r, e);
    }(r, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function s(r, e, t) {
    var o;
    Array.isArray(r) && (r = (o = f(r, 3))[0], e = o[1], t = o[2]);
    return [ r, e, t ];
  }
  function d(r, e) {
    r = new URLSearchParams(r);
    var t = null;
    if (Array.isArray(e)) {
      var o = !0, n = !1, a = void 0;
      try {
        for (var u, i = e[Symbol.iterator](); !(o = (u = i.next()).done); o = !0) {
          var c = u.value;
          if (r.has(c)) {
            t = r.get(c);
            break;
          }
        }
      } catch (r) {
        n = !0, a = r;
      } finally {
        try {
          o || null == i.return || i.return();
        } finally {
          if (n) throw a;
        }
      }
    } else t = r.get(e);
    return t || "";
  }
  function p(t) {
    !function(t, o) {
      if (!e.has(t) && !t.getAttribute(r)) {
        e.set(t, 1);
        var n = new IntersectionObserver((function(e) {
          var a = !0, u = !1, i = void 0;
          try {
            for (var c, l = e[Symbol.iterator](); !(a = (c = l.next()).done); a = !0) c.value.isIntersecting && (t.setAttribute(r, "observered"), 
            o(), n.unobserve(t));
          } catch (r) {
            u = !0, i = r;
          } finally {
            try {
              a || null == l.return || l.return();
            } finally {
              if (u) throw i;
            }
          }
        }));
        n.observe(t);
      }
    }(t, (function() {
      l({
        url: t.href
      }).then((function(r) {
        r.finalUrl && (t.href = r.finalUrl);
      }));
    }));
  }
  var h = /^(http:\/\/[^.]+\.[^.]+\.baidu\.com|https:\/\/baike\.baidu\.com)/, v = [ s([ "\u767e\u5ea6\u641c\u7d22", "baidu.com", {
    transform: {
      selector: "#content_left > [mu]",
      fallbackSelector: 'a[href*="baidu.com/link?url="]',
      customTransform: function(r) {
        var e = r.getAttribute("mu");
        u(e) && !h.test(e) && r.querySelectorAll('div[has-tts] a[href*="baidu.com/link?url="]').forEach((function(r) {
          return r.setAttribute("href", e);
        }));
      }
    }
  } ]), s([ "\u767e\u5ea6\u8d34\u5427", /^(jump|jump2)\.bdimg\.com$/, {
    autojump: {
      validator: function(r) {
        return "/safecheck/index" === r.pathname;
      },
      queryName: "url",
      selector: "a.btn.btn-next[href]"
    }
  } ]), s([ , "tieba.baidu.com", {
    autojump: {
      validator: function(r) {
        return "/mo/q/checkurl" === r.pathname;
      },
      queryName: "url",
      selector: ".btns span.j_next"
    }
  } ]) ], y = new Map, g = [ s([ "Bing \u641c\u7d22", /^(?:\w+\.)?bing\.com$/, {
    transform: {
      selector: '#b_results a[target="_blank"][href*="www.bing.com/ck/a"][href*="&u=a1"]',
      customTransform: function(r) {
        var e = new URLSearchParams(r.href).get("u");
        if (y.has(e)) r.href = y.get(e); else {
          var t = atob(e.replace(/^a1/, "").replace(/[-_]/g, (function(r) {
            return "-" == r ? "+" : "/";
          })).replace(/[^A-Za-z0-9\\+\\/]/g, ""));
          u(t) && (r.href = t, y.set(e, t));
        }
      }
    }
  } ]) ], b = [ s([ "\u4e66\u7b7e\u5730\u7403", "bookmarkearth.cn", {
    transform: {
      selector: 'a[href*="/view/"][data-ext]',
      attribute: "data-ext"
    },
    autojump: {
      validator: function(r) {
        var e = r.pathname;
        return /^\/view\//.test(e) && !!document.querySelector(".jump-target-url");
      },
      getOriginalUrl: function() {
        return document.querySelector(".jump-target-url").getAttribute("data-url");
      }
    }
  } ]) ], w = [ s([ "Google \u641c\u7d22", /^google\.com/, {
    transform: {
      selector: [ "a[jsname][href][data-jsarwt]", "a[jsname][href][ping]" ].join(","),
      customTransform: function(r) {
        r.setAttribute("data-jrwt", "1"), r.removeAttribute("ping");
        var e = (r.getAttribute("href") || "").match(/\?(.*)/);
        if (e) {
          var t = new URLSearchParams(e[1]).get("url");
          t && u(t) && r.setAttribute("href", t);
        }
      }
    }
  } ]), s([ "Google \u91cd\u5b9a\u5411\u9875", /^google\.(com|com?\.[a-z]{2}|[a-z]{2})$/, {
    autojump: {
      validator: function(r) {
        return "/url" === r.pathname;
      },
      queryName: "q"
    }
  } ]) ], j = [ "onclick", "onmouseover", "onmouseout" ], q = [ s([ "NGA \u73a9\u5bb6\u793e\u533a", /^(bbs\.nga\.cn|ngabbs\.com|g\.nga\.cn)$/, {
    transform: {
      selector: 'a[target="_blank"][onclick*="showUrlAlert"]',
      customTransform: function(r) {
        j.forEach((function(e) {
          return r.removeAttribute(e);
        }));
      }
    }
  } ]) ], k = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
    transform: {
      selector: [ '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]', '[href*="hd.nowcoder.com/link.html?target="]' ].join(","),
      separator: /\?target|link\=/
    }
  } ], [ , "hd.nowcoder.com", {
    autojump: {}
  } ] ], A = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
    autojump: {
      validator: function(r) {
        return "/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi" === r.pathname;
      },
      getOriginalUrl: function() {
        return document.querySelector(".weui-msg p.weui-msg__desc").textContent;
      },
      selector: "a.weui-btn.weui-btn_default"
    }
  } ], [ "\u5fae\u4fe1\u5f00\u653e\u793e\u533a", "developers.weixin.qq.com", {
    autojump: {
      validator: function(r) {
        return "/community/middlepage/href" === r.pathname;
      },
      queryName: "href"
    }
  } ], [ "QQ \u90ae\u7bb1", "mail.qq.com", {
    rewriteWindowOpen: {
      validationRule: "url=",
      queryName: "url"
    },
    autojump: {
      validator: function(r) {
        return "/cgi-bin/readtemplate" === r.pathname;
      },
      selector: "div.c-footer a.c-footer-a1",
      queryName: "gourl"
    }
  } ], [ "PC \u7248 QQ", "c.pc.qq.com", {
    autojump: {
      validator: function(r) {
        var e = r.pathname;
        return /^\/(middleb|middlem|pc|ios|android)\.html$/.test(e);
      },
      queryName: [ "pfurl", "url" ]
    }
  } ], [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    autojump: {
      validator: function(r) {
        return "/scenario/link.html" === r.pathname;
      },
      queryName: "url"
    }
  } ], [ "\u817e\u8baf\u5154\u5c0f\u5de2", /(txc|support)\.qq\.com/, {
    transform: {
      selector: 'a[href*="/link-jump?jump="]',
      queryName: "jump"
    },
    autojump: {
      validator: function(r) {
        var e = r.pathname;
        return /\/link-jump$/.test(e);
      },
      queryName: "jump"
    }
  } ] ], C = [ s([ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      attribute: "data-mdurl"
    }
  } ]) ], N = [ s([ "\u641c\u72d7\u641c\u7d22", "sogou.com", {
    transform: {
      selector: ".results .vrwrap",
      customTransform: function(r) {
        var e = r.querySelector("[data-url]");
        if (e) {
          var t = e.dataset.url;
          u(t) && r.querySelectorAll('a[href*="/link?url="]').forEach((function(r) {
            return r.setAttribute("href", t);
          }));
        }
      }
    }
  } ]), s([ , "m.sogou.com", {
    transform: {
      selector: 'a[href^="./id="]',
      queryName: "url"
    }
  } ]) ], S = [ s([ "\u63a8\u7279\uff08Twitter\uff09", /^(twitter|x)\.com$/, {
    transform: {
      selector: 'a[href*="://t.co/"]',
      customTransform: function(r) {
        var e = r.innerText.replace("\u2026", "");
        u(e) && r.setAttribute("href", e);
      }
    }
  } ]) ], x = Object.freeze({
    __proto__: null,
    afdianCom: [ [ "\u7231\u53d1\u7535", "afdian.com", {
      transform: {
        selector: '[href*="afdian.com/link?target="]'
      },
      autojump: {
        validator: function(r) {
          return "/link" === r.pathname;
        }
      }
    } ] ],
    baiduCom: v,
    bingCom: g,
    bookmarkearthCn: b,
    coolapkCom: [ [ "\u9177\u5b89", "coolapk.com", {
      autojump: {
        validator: function(r) {
          return "/link" === r.pathname;
        },
        queryName: "url"
      }
    } ] ],
    csdnNet: [ [ , "blog.csdn.net", {
      rewriteWindowOpen: {
        validationRule: "link.csdn.net?target="
      }
    } ], [ "CSDN", "link.csdn.net", {
      autojump: {}
    } ] ],
    doubanCom: [ [ "\u8c46\u74e3", "douban.com", {
      autojump: {
        validator: function(r) {
          return "/link2/" === r.pathname;
        },
        queryName: "url"
      }
    } ] ],
    facebookCom: [ [ "Facebook", /^(?:l\.)?facebook\.com$/, {
      autojump: {
        validator: function(r) {
          return r.search.includes("u=");
        },
        queryName: "u"
      }
    } ] ],
    giteeCom: [ [ "\u7801\u4e91", "gitee.com", {
      transform: {
        selector: '[href*="/link?target="]'
      },
      autojump: {
        validator: function(r) {
          return "/link" === r.pathname;
        }
      }
    } ] ],
    googleCom: w,
    huabanCom: [ [ "\u82b1\u74e3\u7f51", "huaban.com", {
      autojump: {
        validator: function(r) {
          return "/go" === r.pathname;
        },
        selector: ".wrapper button.ant-btn"
      }
    } ] ],
    infoqCn: [ [ "InfoQ", /^(?:xie\.)?infoq\.cn$/, {
      rewriteWindowOpen: {
        validationRule: "infoq.cn/link?target="
      },
      autojump: {
        validator: function(r) {
          return "/link" === r.pathname;
        }
      }
    } ] ],
    instagramCom: [ [ "Instagram", /^(?:l\.)?instagram\.com$/, {
      autojump: {
        validator: function(r) {
          return r.search.includes("u=");
        },
        queryName: "u"
      }
    } ] ],
    jianshuCom: [ [ "\u7b80\u4e66", "jianshu.com", {
      transform: {
        selector: '[href*="links.jianshu.com/go?to="]',
        separator: "go?to="
      },
      autojump: {
        validator: function(r) {
          return "/go-wild" === r.pathname;
        },
        queryName: "url"
      }
    } ] ],
    juejinCn: [ [ "\u6398\u91d1", "juejin.cn", {
      transform: {
        selector: '[href*="link.juejin.cn?target="]'
      }
    } ], [ , "link.juejin.cn", {
      autojump: {}
    } ] ],
    kdocsCn: [ [ "\u91d1\u5c71\u6587\u6863", "kdocs.cn", {
      autojump: {
        validator: function(r) {
          return "/office/link" === r.pathname;
        }
      }
    } ] ],
    ld246Com: [ [ "\u94fe\u6ef4", "ld246.com", {
      transform: {
        selector: '[href*="/forward?goto="]',
        queryName: "goto"
      },
      autojump: {
        validator: function(r) {
          return "/forward" === r.pathname;
        },
        selector: ".text a[href]",
        queryName: "goto"
      }
    } ] ],
    leetcodeCn: [ [ "\u529b\u6263\uff08Leetcode\uff09", "leetcode.cn", {
      transform: {
        selector: '[href*="/link/?target="]'
      }
    } ] ],
    m_51CtoCom: [ [ "51CTO \u535a\u5ba2", "blog.51cto.com", {
      autojump: {
        validator: function(r) {
          return "/transfer" === r.pathname;
        },
        separator: "?"
      }
    } ] ],
    ngaCn: q,
    nowcoderCom: k,
    oschinaNet: [ [ "\u5f00\u6e90\u4e2d\u56fd", /^(?:my\.)?oschina\.net$/, {
      transform: {
        selector: '[href*="oschina.net/action/GoToLink?url="]',
        separator: "GoToLink?url="
      },
      autojump: {
        validator: function(r) {
          return "/action/GoToLink" === r.pathname;
        },
        queryName: "url"
      }
    } ] ],
    pixivNet: [ [ "pixiv", "pixiv.net", {
      transform: {
        selector: '[href*="/jump.php?"]',
        separator: "?",
        queryName: "url"
      },
      autojump: {
        validator: function(r) {
          return "/jump.php" === r.pathname;
        },
        selector: "a[href]",
        separator: "?"
      }
    } ] ],
    qqCom: A,
    shimoIm: [ [ "\u77f3\u58a8\u6587\u6863", "shimo.im", {
      rewriteWindowOpen: {
        validationRule: "outlink/gray?url=",
        queryName: "url"
      },
      autojump: {
        validator: function(r) {
          return "/outlink/gray" === r.pathname;
        },
        queryName: "url"
      }
    } ] ],
    soCom: C,
    sogouCom: N,
    sspaiCom: [ [ "\u5c11\u6570\u6d3e", "sspai.com", {
      transform: {
        selector: '[href*="sspai.com/link?target="]'
      },
      autojump: {
        validator: function(r) {
          return "/link" === r.pathname;
        }
      }
    } ] ],
    tencentCom: [ [ "\u817e\u8baf\u4e91\u5f00\u53d1\u8005\u793e\u533a", "cloud.tencent.com", {
      transform: {
        selector: '[href*="/developer/tools/blog-entry?target="]',
        queryName: "target"
      },
      autojump: {
        validator: function(r) {
          return "/developer/tools/blog-entry" === r.pathname;
        }
      }
    } ] ],
    twitterCom: S,
    weiboCom: [ [ "\u5fae\u535a", "weibo.com", {
      transform: {
        selector: '[href*="weibo.cn/sinaurl?u="]',
        queryName: "u"
      }
    } ], [ , "weibo.cn", {
      autojump: {
        validator: function(r) {
          return "/sinaurl" === r.pathname;
        },
        queryName: "u"
      }
    } ] ],
    youtubeCom: [ [ "YouTube", "youtube.com", {
      transform: {
        selector: '[href*="youtube.com/redirect?event="]',
        queryName: "q"
      },
      autojump: {
        validator: function(r) {
          return "/redirect" === r.pathname;
        },
        queryName: "q"
      }
    } ] ],
    yuqueCom: [ [ "\u8bed\u96c0", /^(?:[a-zA-Z0-9-]+\.)?yuque\.com$/, {
      autojump: {
        validator: function(r) {
          return "/r/goto" === r.pathname;
        },
        queryName: "url"
      }
    } ] ],
    zhihuCom: [ [ "\u77e5\u4e4e\u3001\u77e5\u4e4e\u4e13\u680f", /^(?:zhuanlan\.)?zhihu\.com$/, {
      transform: {
        selector: '[href*="link.zhihu.com/?target="]'
      }
    } ], [ , "link.zhihu.com", {
      autojump: {}
    } ] ]
  });
  function T(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, o = new Array(e); t < e; t++) o[t] = r[t];
    return o;
  }
  function O(r, e) {
    return function(r) {
      if (Array.isArray(r)) return r;
    }(r) || function(r, e) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var o, n, a = [], u = !0, i = !1;
        try {
          for (t = t.call(r); !(u = (o = t.next()).done) && (a.push(o.value), !e || a.length !== e); u = !0) ;
        } catch (r) {
          i = !0, n = r;
        } finally {
          try {
            u || null == t.return || t.return();
          } finally {
            if (i) throw n;
          }
        }
        return a;
      }
    }(r, e) || function(r, e) {
      if (!r) return;
      if ("string" == typeof r) return T(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      "Object" === t && r.constructor && (t = r.constructor.name);
      if ("Map" === t || "Set" === t) return Array.from(t);
      if ("Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return T(r, e);
    }(r, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var U, R, $, I, _, L, z, E, G, M, P = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.hostname;
    return a ? r.replace(/^www\./, "") : "";
  }(), W = Object.values(x).flat().find((function(r) {
    var e = O(r, 2)[1];
    return n(e) ? e === P : e.test(P);
  }));
  if (t(W)) {
    var Q = W[2], D = Q.transform, Z = Q.rewriteWindowOpen, B = Q.autojump;
    D && (R = (U = D).selector, $ = U.attribute, I = U.queryName, _ = U.separator, L = void 0 === _ ? "?target=" : _, 
    z = U.fallbackSelector, E = U.customTransform, G = void 0 === E ? function(r) {
      var e = "";
      $ && (e = r.getAttribute($) || ""), !$ && I && (e = d(new URL(r.href).search, I)), 
      u(e) || (e = r.href.split(L)[1]), u(e = decodeURIComponent(e)) && (r.href = e);
    } : E, M = new MutationObserver((function() {
      document.querySelectorAll(R).forEach(G), z && document.querySelectorAll(z).length && document.querySelectorAll(z).forEach(p);
    })), document.body.setAttribute(r, "remove-redirect"), M.observe(document.body, {
      childList: !0,
      subtree: !0
    })), Z && function(r) {
      var e = r.validationRule, t = r.getOriginalUrl, a = r.separator, i = r.queryName, c = void 0 === i ? "target" : i, l = window.open;
      window.open = function(r, i, m) {
        if (n(r)) {
          if (n(e) && !r.includes(e) || o(e) && !e(r)) return l.call(this, r, i, m);
          if (o(t)) {
            var f = t(r);
            f && u(f) && (r = f);
          } else {
            var s, p = new URL(r).search;
            r = decodeURIComponent(a ? null === (s = p.split(a)) || void 0 === s ? void 0 : s[1] : d(p, c));
          }
        }
        return l.call(this, r, i, m);
      };
    }(Z), B && function(r) {
      var e, t = r.validator, n = r.getOriginalUrl, a = r.selector, i = r.separator, c = r.queryName, l = void 0 === c ? "target" : c;
      if (t && !t(location)) return;
      if (a && document.querySelector(a)) return document.querySelector(a).click();
      o(n) && (e = n());
      if (!u(e)) {
        var m, f = location.search;
        if (i) e = null === (m = f.split(i)) || void 0 === m ? void 0 : m[1];
        u(e) || (e = d(f, l)), e = decodeURIComponent(e || "");
      }
      u(e) && location.replace(e);
    }(B);
  }
}();
