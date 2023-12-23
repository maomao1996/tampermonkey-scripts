// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配爱发电、百度、NGA 玩家社区、CSDN、豆瓣、码云、谷歌搜索、花瓣网、InfoQ、简书、掘金、金山文档、力扣（Leetcode）、51CTO 博客、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、360 搜索、少数派、腾讯云开发者社区、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.4.0
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
  var e = Array.isArray, t = function(e) {
    return "function" == typeof e;
  }, r = function(e) {
    return "string" == typeof e;
  }, o = "undefined" != typeof window ? location.hostname.replace(/^www\./, "") : "";
  function n(e) {
    if (!r("string")) return !1;
    try {
      return new URL(e), !0;
    } catch (e) {
      return !1;
    }
  }
  var a = [ [ "\u767e\u5ea6", "baidu.com", {
    transform: {
      selector: "#content_left > [mu]",
      customTransform: function(e) {
        var t = e.getAttribute("mu");
        n(t) && !t.includes(".baidu.com") && e.querySelectorAll("a[href]").forEach((function(e) {
          return e.setAttribute("href", t);
        }));
      }
    }
  } ] ], u = [ "onclick", "onmouseover", "onmouseout" ], i = [ [ "NGA \u73a9\u5bb6\u793e\u533a", /^(bbs\.nga\.cn|ngabbs\.com|g\.nga\.cn)$/, {
    transform: {
      selector: 'a[target="_blank"][onclick*="showUrlAlert"]',
      customTransform: function(e) {
        u.forEach((function(t) {
          return e.removeAttribute(t);
        }));
      }
    }
  } ] ], c = [ [ "\u8c37\u6b4c\u641c\u7d22", /^google\.com/, {
    transform: {
      selector: [ "a[jsname][href][data-jsarwt]", "a[jsname][href][ping]" ].join(","),
      customTransform: function(e) {
        e.setAttribute("data-jrwt", "1"), e.removeAttribute("ping");
        var t = (e.getAttribute("href") || "").match(/\?(.*)/);
        if (t) {
          var r = new URLSearchParams(t[1]).get("url");
          r && n(r) && e.setAttribute("href", r);
        }
      }
    }
  } ] ], m = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
    transform: {
      selector: [ '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]', '[href*="hd.nowcoder.com/link.html?target="]' ].join(","),
      separator: /\?target|link\=/
    }
  } ], [ , "hd.nowcoder.com", {
    autojump: {}
  } ] ], l = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
    autojump: {
      validator: function(e) {
        return "/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi" === e.pathname;
      },
      getOriginalUrl: function() {
        return document.querySelector(".weui-msg p.weui-msg__desc").textContent;
      },
      selector: "a.weui-btn.weui-btn_default"
    }
  } ], [ "\u5fae\u4fe1\u5f00\u653e\u793e\u533a", "developers.weixin.qq.com", {
    autojump: {
      validator: function(e) {
        return "/community/middlepage/href" === e.pathname;
      },
      queryName: "href"
    }
  } ], [ "QQ \u90ae\u7bb1", "mail.qq.com", {
    autojump: {
      validator: function(e) {
        return "/cgi-bin/readtemplate" === e.pathname;
      },
      selector: "div.c-footer a.c-footer-a1",
      queryName: "gourl"
    }
  } ], [ "PC \u7248 QQ", "c.pc.qq.com", {
    autojump: {
      validator: function(e) {
        return "/middlem.html" === e.pathname;
      },
      queryName: "pfurl"
    }
  } ], [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    autojump: {
      validator: function(e) {
        return "/scenario/link.html" === e.pathname;
      },
      queryName: "url"
    }
  } ] ], s = [ [ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      customTransform: function(e) {
        var t = e.getAttribute("data-mdurl");
        n(t) && e.setAttribute("href", t);
      }
    }
  } ] ], f = Object.freeze({
    __proto__: null,
    afdianNet: [ [ "\u7231\u53d1\u7535", "afdian.net", {
      transform: {
        selector: '[href*="afdian.net/link?target="]'
      },
      autojump: {
        validator: function(e) {
          return "/link" === e.pathname;
        }
      }
    } ] ],
    baiduCom: a,
    bbsNgaCn: i,
    csdnNet: [ [ , "blog.csdn.net", {
      rewriteWindowOpen: {
        validationRule: "link.csdn.net?target="
      }
    } ], [ "CSDN", "link.csdn.net", {
      autojump: {}
    } ] ],
    doubanCom: [ [ "\u8c46\u74e3", "douban.com", {
      autojump: {
        validator: function(e) {
          return "/link2/" === e.pathname;
        },
        queryName: "url"
      }
    } ] ],
    facebookCom: [ [ "Facebook", /^(?:l\.)?facebook\.com$/, {
      autojump: {
        validator: function(e) {
          return e.search.includes("u=");
        },
        queryName: "u"
      }
    } ] ],
    giteeCom: [ [ "\u7801\u4e91", "gitee.com", {
      transform: {
        selector: '[href*="/link?target="]'
      },
      autojump: {
        validator: function(e) {
          return "/link" === e.pathname;
        }
      }
    } ] ],
    googleCom: c,
    huabanCom: [ [ "\u82b1\u74e3\u7f51", "huaban.com", {
      autojump: {
        validator: function(e) {
          return "/go" === e.pathname;
        },
        selector: ".wrapper button.ant-btn"
      }
    } ] ],
    infoqCn: [ [ "InfoQ", /^(?:xie\.)?infoq\.cn$/, {
      rewriteWindowOpen: {
        validationRule: "infoq.cn/link?target="
      },
      autojump: {
        validator: function(e) {
          return "/link" === e.pathname;
        }
      }
    } ] ],
    instagramCom: [ [ "Instagram", /^(?:l\.)?instagram\.com$/, {
      autojump: {
        validator: function(e) {
          return e.search.includes("u=");
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
        validator: function(e) {
          return "/go-wild" === e.pathname;
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
        validator: function(e) {
          return "/office/link" === e.pathname;
        }
      }
    } ] ],
    leetcodeCn: [ [ "\u529b\u6263\uff08Leetcode\uff09", "leetcode.cn", {
      transform: {
        selector: '[href*="/link/?target="]'
      }
    } ] ],
    m_51CtoCom: [ [ "51CTO \u535a\u5ba2", "blog.51cto.com", {
      autojump: {
        validator: function(e) {
          return "/transfer" === e.pathname;
        },
        separator: "?"
      }
    } ] ],
    nowcoderCom: m,
    oschinaNet: [ [ "\u5f00\u6e90\u4e2d\u56fd", /^(?:my\.)?oschina\.net$/, {
      transform: {
        selector: '[href*="oschina.net/action/GoToLink?url="]',
        separator: "GoToLink?url="
      },
      autojump: {
        validator: function(e) {
          return "/action/GoToLink" === e.pathname;
        },
        queryName: "url"
      }
    } ] ],
    pixivNet: [ [ "pixiv", "pixiv.net", {
      transform: {
        selector: '[href*="/jump.php?"]',
        separator: "?"
      },
      autojump: {
        validator: function(e) {
          return "/jump.php" === e.pathname;
        },
        selector: "a[href]",
        separator: "?"
      }
    } ] ],
    qqCom: l,
    soCom: s,
    sspaiCom: [ [ "\u5c11\u6570\u6d3e", "sspai.com", {
      transform: {
        selector: '[href*="sspai.com/link?target="]'
      },
      autojump: {
        validator: function(e) {
          return "/link" === e.pathname;
        }
      }
    } ] ],
    tencentCom: [ [ "\u817e\u8baf\u4e91\u5f00\u53d1\u8005\u793e\u533a", "cloud.tencent.com", {
      transform: {
        selector: '[href*="/developer/tools/blog-entry?target="]',
        queryName: "target"
      },
      autojump: {
        validator: function(e) {
          return "/developer/tools/blog-entry" === e.pathname;
        }
      }
    } ] ],
    weiboCom: [ [ "\u5fae\u535a", "weibo.com", {
      transform: {
        selector: '[href*="weibo.cn/sinaurl?u="]',
        queryName: "u"
      }
    } ], [ , "weibo.cn", {
      autojump: {
        validator: function(e) {
          return "/sinaurl" === e.pathname;
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
        validator: function(e) {
          return "/redirect" === e.pathname;
        },
        queryName: "q"
      }
    } ] ],
    yuqueCom: [ [ "\u8bed\u96c0", "yuque.com", {
      autojump: {
        validator: function(e) {
          return "/r/goto" === e.pathname;
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
  function d(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, o = new Array(t); r < t; r++) o[r] = e[r];
    return o;
  }
  function p(e, t) {
    return function(e) {
      if (Array.isArray(e)) return e;
    }(e) || function(e, t) {
      var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != r) {
        var o, n, a = [], u = !0, i = !1;
        try {
          for (r = r.call(e); !(u = (o = r.next()).done) && (a.push(o.value), !t || a.length !== t); u = !0) ;
        } catch (e) {
          i = !0, n = e;
        } finally {
          try {
            u || null == r.return || r.return();
          } finally {
            if (i) throw n;
          }
        }
        return a;
      }
    }(e, t) || function(e, t) {
      if (!e) return;
      if ("string" == typeof e) return d(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(r);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return d(e, t);
    }(e, t) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var h = Object.values(f).flat().find((function(e) {
    var t = p(e, 2)[1];
    return r(t) ? t === o : t.test(o);
  }));
  if (e(h)) {
    var v = h[2], g = v.transform, b = v.rewriteWindowOpen, y = v.autojump;
    if (g) {
      var j = g.selector, w = g.queryName, q = g.separator, k = void 0 === q ? "?target=" : q, C = g.customTransform, N = void 0 === C ? function(e) {
        var t = w ? new URL(e.href).searchParams.get(w) : e.href.split(k)[1];
        t && (e.href = decodeURIComponent(t));
      } : C;
      new MutationObserver((function() {
        document.querySelectorAll(j).forEach(N);
      })).observe(document.body, {
        childList: !0,
        subtree: !0
      });
    }
    if (b) {
      var A = b.validationRule, S = b.getOriginalUrl, U = b.separator, O = b.queryName, R = void 0 === O ? "target" : O, L = window.open;
      window.open = function(e, o, a) {
        if (r(e)) {
          if (r(A) && !e.includes(A) || t(A) && !A(e)) return L.call(this, e, o, a);
          if (t(S)) {
            var u = S(e);
            u && n(u) && (e = u);
          } else {
            var i, c = new URL(e).search;
            e = decodeURIComponent(U ? null === (i = c.split(U)) || void 0 === i ? void 0 : i[1] : new URLSearchParams(c).get(R) || "");
          }
        }
        return L.call(this, e, o, a);
      };
    }
    y && function() {
      var e, r = y.validator, o = y.getOriginalUrl, a = y.selector, u = y.separator, i = y.queryName, c = void 0 === i ? "target" : i;
      if (!r || r(location)) {
        if (t(o)) {
          var m = o();
          if (m && n(m)) return location.replace(m);
        }
        if (a && document.querySelector(a)) return document.querySelector(a).click();
        var l = location.search, s = decodeURIComponent(u ? null === (e = l.split(u)) || void 0 === e ? void 0 : e[1] : new URLSearchParams(l).get(c) || "");
        n(s) && location.replace(s);
      }
    }();
  }
}();
