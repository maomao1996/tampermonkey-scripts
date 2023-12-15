// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配爱发电、百度、NGA 玩家社区、CSDN、豆瓣、码云、谷歌搜索、花瓣网、InfoQ、简书、掘金、金山文档、力扣（Leetcode）、51CTO 博客、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、360 搜索、少数派、腾讯云开发者社区、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.3.2
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
  var t = Array.isArray, e = function(t) {
    return "function" == typeof t;
  }, r = function(t) {
    return "string" == typeof t;
  }, n = "undefined" != typeof window ? location.hostname.replace(/^www\./, "") : "";
  function o(t) {
    if (!r("string")) return !1;
    try {
      return new URL(t), !0;
    } catch (t) {
      return !1;
    }
  }
  var a = [ [ "\u767e\u5ea6", "baidu.com", {
    transform: {
      selector: "#content_left > [mu]",
      customTransform: function(t) {
        var e = t.getAttribute("mu");
        o(e) && !e.includes(".baidu.com") && t.querySelectorAll("a[href]").forEach((function(t) {
          return t.setAttribute("href", e);
        }));
      }
    }
  } ] ], u = [ "onclick", "onmouseover", "onmouseout" ], i = [ [ "NGA \u73a9\u5bb6\u793e\u533a", /^(bbs\.nga\.cn|ngabbs\.com|g\.nga\.cn)$/, {
    transform: {
      selector: 'a[target="_blank"][onclick*="showUrlAlert"]',
      customTransform: function(t) {
        u.forEach((function(e) {
          return t.removeAttribute(e);
        }));
      }
    }
  } ] ], c = [ [ "\u8c37\u6b4c\u641c\u7d22", /^google\.com/, {
    transform: {
      selector: [ "a[jsname][href][data-jsarwt]", "a[jsname][href][ping]" ].join(","),
      customTransform: function(t) {
        t.setAttribute("data-jrwt", "1"), t.removeAttribute("ping");
        var e = (t.getAttribute("href") || "").match(/\?(.*)/);
        if (e) {
          var r = new URLSearchParams(e[1]).get("url");
          r && o(r) && t.setAttribute("href", r);
        }
      }
    }
  } ] ], l = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
    transform: {
      selector: [ '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]', '[href*="hd.nowcoder.com/link.html?target="]' ].join(","),
      separator: /\?target|link\=/
    }
  } ], [ , "hd.nowcoder.com", {
    autojump: {}
  } ] ], m = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
    autojump: {
      validator: function(t) {
        return "/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi" === t.pathname;
      },
      getOriginalUrl: function() {
        return document.querySelector(".weui-msg p.weui-msg__desc").textContent;
      },
      selector: "a.weui-btn.weui-btn_default"
    }
  } ], [ "\u5fae\u4fe1\u5f00\u653e\u793e\u533a", "developers.weixin.qq.com", {
    autojump: {
      validator: function(t) {
        return "/community/middlepage/href" === t.pathname;
      },
      queryName: "href"
    }
  } ], [ "QQ \u90ae\u7bb1", "mail.qq.com", {
    autojump: {
      validator: function(t) {
        return "/cgi-bin/readtemplate" === t.pathname;
      },
      selector: "div.c-footer a.c-footer-a1",
      queryName: "gourl"
    }
  } ], [ "PC \u7248 QQ", "c.pc.qq.com", {
    autojump: {
      validator: function(t) {
        return "/middlem.html" === t.pathname;
      },
      queryName: "pfurl"
    }
  } ], [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    autojump: {
      validator: function(t) {
        return "/scenario/link.html" === t.pathname;
      },
      queryName: "url"
    }
  } ] ], s = [ [ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      customTransform: function(t) {
        var e = t.getAttribute("data-mdurl");
        o(e) && t.setAttribute("href", e);
      }
    }
  } ] ], f = Object.freeze({
    __proto__: null,
    afdianNet: [ [ "\u7231\u53d1\u7535", "afdian.net", {
      transform: {
        selector: '[href*="afdian.net/link?target="]'
      },
      autojump: {
        validator: function(t) {
          return "/link" === t.pathname;
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
        validator: function(t) {
          return "/link2/" === t.pathname;
        },
        queryName: "url"
      }
    } ] ],
    giteeCom: [ [ "\u7801\u4e91", "gitee.com", {
      transform: {
        selector: '[href*="/link?target="]'
      },
      autojump: {
        validator: function(t) {
          return "/link" === t.pathname;
        }
      }
    } ] ],
    googleCom: c,
    huabanCom: [ [ "\u82b1\u74e3\u7f51", "huaban.com", {
      autojump: {
        validator: function(t) {
          return "/go" === t.pathname;
        },
        selector: ".wrapper button.ant-btn"
      }
    } ] ],
    infoqCn: [ [ "InfoQ", /^(?:xie\.)?infoq\.cn$/, {
      rewriteWindowOpen: {
        validationRule: "infoq.cn/link?target="
      },
      autojump: {
        validator: function(t) {
          return "/link" === t.pathname;
        }
      }
    } ] ],
    jianshuCom: [ [ "\u7b80\u4e66", "jianshu.com", {
      transform: {
        selector: '[href*="links.jianshu.com/go?to="]',
        separator: "go?to="
      },
      autojump: {
        validator: function(t) {
          return "/go-wild" === t.pathname;
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
        validator: function(t) {
          return "/office/link" === t.pathname;
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
        validator: function(t) {
          return "/transfer" === t.pathname;
        },
        separator: "?"
      }
    } ] ],
    nowcoderCom: l,
    oschinaNet: [ [ "\u5f00\u6e90\u4e2d\u56fd", /^(?:my\.)?oschina\.net$/, {
      transform: {
        selector: '[href*="oschina.net/action/GoToLink?url="]',
        separator: "GoToLink?url="
      },
      autojump: {
        validator: function(t) {
          return "/action/GoToLink" === t.pathname;
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
        validator: function(t) {
          return "/jump.php" === t.pathname;
        },
        selector: "a[href]",
        separator: "?"
      }
    } ] ],
    qqCom: m,
    soCom: s,
    sspaiCom: [ [ "\u5c11\u6570\u6d3e", "sspai.com", {
      transform: {
        selector: '[href*="sspai.com/link?target="]'
      },
      autojump: {
        validator: function(t) {
          return "/link" === t.pathname;
        }
      }
    } ] ],
    tencentCom: [ [ "\u817e\u8baf\u4e91\u5f00\u53d1\u8005\u793e\u533a", "cloud.tencent.com", {
      transform: {
        selector: '[href*="/developer/tools/blog-entry?target="]',
        queryName: "target"
      },
      autojump: {
        validator: function(t) {
          return "/developer/tools/blog-entry" === t.pathname;
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
        validator: function(t) {
          return "/sinaurl" === t.pathname;
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
        validator: function(t) {
          return "/redirect" === t.pathname;
        },
        queryName: "q"
      }
    } ] ],
    yuqueCom: [ [ "\u8bed\u96c0", "yuque.com", {
      autojump: {
        validator: function(t) {
          return "/r/goto" === t.pathname;
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
  function d(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  function p(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, e) {
      var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != r) {
        var n, o, a = [], u = !0, i = !1;
        try {
          for (r = r.call(t); !(u = (n = r.next()).done) && (a.push(n.value), !e || a.length !== e); u = !0) ;
        } catch (t) {
          i = !0, o = t;
        } finally {
          try {
            u || null == r.return || r.return();
          } finally {
            if (i) throw o;
          }
        }
        return a;
      }
    }(t, e) || function(t, e) {
      if (!t) return;
      if ("string" == typeof t) return d(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === r && t.constructor && (r = t.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(r);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return d(t, e);
    }(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var h = Object.values(f).flat().find((function(t) {
    var e = p(t, 2)[1];
    return r(e) ? e === n : e.test(n);
  }));
  if (t(h)) {
    var v = h[2], g = v.transform, b = v.rewriteWindowOpen, y = v.autojump;
    if (g) {
      var j = g.selector, w = g.queryName, q = g.separator, k = void 0 === q ? "?target=" : q, C = g.customTransform, N = void 0 === C ? function(t) {
        var e = w ? new URL(t.href).searchParams.get(w) : t.href.split(k)[1];
        e && (t.href = decodeURIComponent(e));
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
      window.open = function(t, n, a) {
        if (r(t)) {
          if (r(A) && !t.includes(A) || e(A) && !A(t)) return L.call(this, t, n, a);
          if (e(S)) {
            var u = S(t);
            u && o(u) && (t = u);
          } else {
            var i, c = new URL(t).search;
            t = decodeURIComponent(U ? null === (i = c.split(U)) || void 0 === i ? void 0 : i[1] : new URLSearchParams(c).get(R) || "");
          }
        }
        return L.call(this, t, n, a);
      };
    }
    y && function() {
      var t, r = y.validator, n = y.getOriginalUrl, a = y.selector, u = y.separator, i = y.queryName, c = void 0 === i ? "target" : i;
      if (!r || r(location)) {
        if (e(n)) {
          var l = n();
          if (l && o(l)) return location.replace(l);
        }
        if (a && document.querySelector(a)) return document.querySelector(a).click();
        var m = location.search, s = decodeURIComponent(u ? null === (t = m.split(u)) || void 0 === t ? void 0 : t[1] : new URLSearchParams(m).get(c) || "");
        o(s) && location.replace(s);
      }
    }();
  }
}();
