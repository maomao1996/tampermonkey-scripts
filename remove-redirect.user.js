// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 提升用户体验：修复跳转链接为站外直链（移除重定向直接跳转），免去拦截页面点击步骤可直达站外；拦截页面自动跳转（无须额外操作）；已适配爱发电、百度搜索、百度贴吧、Bing 搜索、书签地球、酷安、CSDN、豆瓣、Facebook、码云、Google 搜索、Google 重定向页、花瓣网、InfoQ、Instagram、简书、掘金、金山文档、链滴、力扣（Leetcode）、51CTO 博客、NGA 玩家社区、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、腾讯兔小巢、石墨文档、360 搜索、搜狗搜索、少数派、腾讯云开发者社区、推特（Twitter）、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.16.0
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://*/*
// @exclude     *://localhost:*/*
// @exclude     *://127.0.0.1:*/*
// @exclude     *://0.0.0.0*
// @exclude     *://192.168.*
// @grant       none
// ==/UserScript==
!function() {
  "use strict";
  var r = Array.isArray, t = function(r) {
    return "function" == typeof r;
  }, e = function(r) {
    return "string" == typeof r;
  }, o = "undefined" != typeof window;
  function n(r) {
    if (!e("string")) return !1;
    try {
      return new URL(r), !0;
    } catch (r) {
      return !1;
    }
  }
  function a(r, t) {
    (null == t || t > r.length) && (t = r.length);
    for (var e = 0, o = new Array(t); e < t; e++) o[e] = r[e];
    return o;
  }
  function u(r, t) {
    return function(r) {
      if (Array.isArray(r)) return r;
    }(r) || function(r, t) {
      var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != e) {
        var o, n, a = [], u = !0, i = !1;
        try {
          for (e = e.call(r); !(u = (o = e.next()).done) && (a.push(o.value), !t || a.length !== t); u = !0) ;
        } catch (r) {
          i = !0, n = r;
        } finally {
          try {
            u || null == e.return || e.return();
          } finally {
            if (i) throw n;
          }
        }
        return a;
      }
    }(r, t) || function(r, t) {
      if (!r) return;
      if ("string" == typeof r) return a(r, t);
      var e = Object.prototype.toString.call(r).slice(8, -1);
      "Object" === e && r.constructor && (e = r.constructor.name);
      if ("Map" === e || "Set" === e) return Array.from(e);
      if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return a(r, t);
    }(r, t) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function i(r, t, e) {
    var o;
    Array.isArray(r) && (r = (o = u(r, 3))[0], t = o[1], e = o[2]);
    return [ r, t, e ];
  }
  function c(r, t) {
    r = new URLSearchParams(r);
    var e = null;
    if (Array.isArray(t)) {
      var o = !0, n = !1, a = void 0;
      try {
        for (var u, i = t[Symbol.iterator](); !(o = (u = i.next()).done); o = !0) {
          var c = u.value;
          if (r.has(c)) {
            e = r.get(c);
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
    } else e = r.get(t);
    return e || "";
  }
  var l = /^http:\/\/[^.]+\.[^.]+\.baidu\.com/, m = [ i([ "\u767e\u5ea6\u641c\u7d22", "baidu.com", {
    transform: {
      selector: "#content_left > [mu]",
      customTransform: function(r) {
        var t = r.getAttribute("mu");
        n(t) && !l.test(t) && r.querySelectorAll('div[has-tts] a[href*="baidu.com/link?url="]').forEach((function(r) {
          return r.setAttribute("href", t);
        }));
      }
    }
  } ]), i([ "\u767e\u5ea6\u8d34\u5427", /^(jump|jump2)\.bdimg\.com$/, {
    autojump: {
      validator: function(r) {
        return "/safecheck/index" === r.pathname;
      },
      queryName: "url",
      selector: "a.btn.btn-next[href]"
    }
  } ]), i([ , "tieba.baidu.com", {
    autojump: {
      validator: function(r) {
        return "/mo/q/checkurl" === r.pathname;
      },
      queryName: "url",
      selector: ".btns span.j_next"
    }
  } ]) ], f = new Map, s = [ i([ "Bing \u641c\u7d22", /^(?:cn\.)?bing\.com$/, {
    transform: {
      selector: '#b_results a[target="_blank"][href*="www.bing.com/ck/a"][href*="&u=a1"]',
      customTransform: function(r) {
        var t = new URLSearchParams(r.href).get("u");
        if (f.has(t)) r.href = f.get(t); else {
          var e = atob(t.replace(/^a1/, "").replace(/[-_]/g, (function(r) {
            return "-" == r ? "+" : "/";
          })).replace(/[^A-Za-z0-9\\+\\/]/g, ""));
          n(e) && (r.href = e, f.set(t, e));
        }
      }
    }
  } ]) ], p = [ i([ "\u4e66\u7b7e\u5730\u7403", "bookmarkearth.cn", {
    transform: {
      selector: 'a[href*="/view/"][data-ext]',
      customTransform: function(r) {
        var t = decodeURIComponent(r.getAttribute("data-ext") || "");
        n(t) && (r.href = t);
      }
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return /^\/view\//.test(t) && !!document.querySelector(".jump-target-url");
      },
      getOriginalUrl: function() {
        return document.querySelector(".jump-target-url").getAttribute("data-url");
      }
    }
  } ]) ], d = [ i([ "Google \u641c\u7d22", /^google\.com/, {
    transform: {
      selector: [ "a[jsname][href][data-jsarwt]", "a[jsname][href][ping]" ].join(","),
      customTransform: function(r) {
        r.setAttribute("data-jrwt", "1"), r.removeAttribute("ping");
        var t = (r.getAttribute("href") || "").match(/\?(.*)/);
        if (t) {
          var e = new URLSearchParams(t[1]).get("url");
          e && n(e) && r.setAttribute("href", e);
        }
      }
    }
  } ]), i([ "Google \u91cd\u5b9a\u5411\u9875", /^google\.(com|com?\.[a-z]{2}|[a-z]{2})$/, {
    autojump: {
      validator: function(r) {
        return "/url" === r.pathname;
      },
      queryName: "q"
    }
  } ]) ], h = [ "onclick", "onmouseover", "onmouseout" ], v = [ i([ "NGA \u73a9\u5bb6\u793e\u533a", /^(bbs\.nga\.cn|ngabbs\.com|g\.nga\.cn)$/, {
    transform: {
      selector: 'a[target="_blank"][onclick*="showUrlAlert"]',
      customTransform: function(r) {
        h.forEach((function(t) {
          return r.removeAttribute(t);
        }));
      }
    }
  } ]) ], g = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
    transform: {
      selector: [ '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]', '[href*="hd.nowcoder.com/link.html?target="]' ].join(","),
      separator: /\?target|link\=/
    }
  } ], [ , "hd.nowcoder.com", {
    autojump: {}
  } ] ], y = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
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
        var t = r.pathname;
        return /^\/(middleb|middlem|pc|ios|android)\.html$/.test(t);
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
        var t = r.pathname;
        return /\/link-jump$/.test(t);
      },
      queryName: "jump"
    }
  } ] ], b = [ i([ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      customTransform: function(r) {
        var t = r.getAttribute("data-mdurl");
        n(t) && r.setAttribute("href", t);
      }
    }
  } ]) ], j = [ i([ "\u641c\u72d7\u641c\u7d22", "sogou.com", {
    transform: {
      selector: ".results .vrwrap",
      customTransform: function(r) {
        var t = r.querySelector("[data-url]");
        if (t) {
          var e = t.dataset.url;
          n(e) && r.querySelectorAll('a[href*="/link?url="]').forEach((function(r) {
            return r.setAttribute("href", e);
          }));
        }
      }
    }
  } ]), i([ , "m.sogou.com", {
    transform: {
      selector: 'a[href^="./id="]',
      queryName: "url"
    }
  } ]) ], w = [ i([ "\u63a8\u7279\uff08Twitter\uff09", /^(twitter|x)\.com$/, {
    transform: {
      selector: 'a[href*="://t.co/"]',
      customTransform: function(r) {
        var t = r.innerText.replace("\u2026", "");
        n(t) && r.setAttribute("href", t);
      }
    }
  } ]) ], q = Object.freeze({
    __proto__: null,
    afdianNet: [ [ "\u7231\u53d1\u7535", "afdian.net", {
      transform: {
        selector: '[href*="afdian.net/link?target="]'
      },
      autojump: {
        validator: function(r) {
          return "/link" === r.pathname;
        }
      }
    } ] ],
    baiduCom: m,
    bingCom: s,
    bookmarkearthCn: p,
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
    googleCom: d,
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
    ngaCn: v,
    nowcoderCom: g,
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
    qqCom: y,
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
    soCom: b,
    sogouCom: j,
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
    twitterCom: w,
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
  function k(r, t) {
    (null == t || t > r.length) && (t = r.length);
    for (var e = 0, o = new Array(t); e < t; e++) o[e] = r[e];
    return o;
  }
  function C(r, t) {
    return function(r) {
      if (Array.isArray(r)) return r;
    }(r) || function(r, t) {
      var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != e) {
        var o, n, a = [], u = !0, i = !1;
        try {
          for (e = e.call(r); !(u = (o = e.next()).done) && (a.push(o.value), !t || a.length !== t); u = !0) ;
        } catch (r) {
          i = !0, n = r;
        } finally {
          try {
            u || null == e.return || e.return();
          } finally {
            if (i) throw n;
          }
        }
        return a;
      }
    }(r, t) || function(r, t) {
      if (!r) return;
      if ("string" == typeof r) return k(r, t);
      var e = Object.prototype.toString.call(r).slice(8, -1);
      "Object" === e && r.constructor && (e = r.constructor.name);
      if ("Map" === e || "Set" === e) return Array.from(e);
      if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return k(r, t);
    }(r, t) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var A = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.hostname;
    return o ? r.replace(/^www\./, "") : "";
  }(), N = Object.values(q).flat().find((function(r) {
    var t = C(r, 2)[1];
    return e(t) ? t === A : t.test(A);
  }));
  if (r(N)) {
    var S = N[2], x = S.transform, T = S.rewriteWindowOpen, O = S.autojump;
    if (x) {
      var U = x.selector, R = x.queryName, $ = x.separator, _ = void 0 === $ ? "?target=" : $, I = x.customTransform, L = void 0 === I ? function(r) {
        var t = "";
        R && (t = c(new URL(r.href).search, R));
        n(t) || (t = r.href.split(_)[1]), n(t = decodeURIComponent(t)) && (r.href = t);
      } : I;
      new MutationObserver((function() {
        document.querySelectorAll(U).forEach(L);
      })).observe(document.body, {
        childList: !0,
        subtree: !0
      });
    }
    if (T) {
      var z = T.validationRule, E = T.getOriginalUrl, G = T.separator, Q = T.queryName, W = void 0 === Q ? "target" : Q, M = window.open;
      window.open = function(r, o, a) {
        if (e(r)) {
          if (e(z) && !r.includes(z) || t(z) && !z(r)) return M.call(this, r, o, a);
          if (t(E)) {
            var u = E(r);
            u && n(u) && (r = u);
          } else {
            var i, l = new URL(r).search;
            r = decodeURIComponent(G ? null === (i = l.split(G)) || void 0 === i ? void 0 : i[1] : c(l, W));
          }
        }
        return M.call(this, r, o, a);
      };
    }
    O && function() {
      var r = O.validator, e = O.getOriginalUrl, o = O.selector, a = O.separator, u = O.queryName, i = void 0 === u ? "target" : u;
      if (!r || r(location)) {
        if (o && document.querySelector(o)) return document.querySelector(o).click();
        var l;
        if (t(e) && (l = e()), !n(l)) {
          var m, f = location.search;
          if (a) l = null === (m = f.split(a)) || void 0 === m ? void 0 : m[1];
          n(l) || (l = c(f, i)), l = decodeURIComponent(l || "");
        }
        n(l) && location.replace(l);
      }
    }();
  }
}();
