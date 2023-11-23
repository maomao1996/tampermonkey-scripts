// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配爱发电、百度、NGA 玩家社区、CSDN、豆瓣、码云、花瓣网、InfoQ、简书、掘金、力扣（Leetcode）、51CTO 博客、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、360 搜索、少数派、腾讯云开发者社区、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.2.0
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
  }, n = location.hostname.replace(/^www\./, "");
  function o(e) {
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
        o(t) && !t.includes(".baidu.com") && e.querySelectorAll("a[href]").forEach((function(e) {
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
  } ] ], c = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
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
  } ] ], m = [ [ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      customTransform: function(e) {
        var t = e.getAttribute("data-mdurl");
        o(t) && e.setAttribute("href", t);
      }
    }
  } ] ], s = Object.freeze({
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
    nowcoderCom: c,
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
    soCom: m,
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
        selector: '[href*="/developer/tools/blog-entry?target="]'
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
  function f(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function p(e, t) {
    return function(e) {
      if (Array.isArray(e)) return e;
    }(e) || function(e, t) {
      var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != r) {
        var n, o, a = [], u = !0, i = !1;
        try {
          for (r = r.call(e); !(u = (n = r.next()).done) && (a.push(n.value), !t || a.length !== t); u = !0) ;
        } catch (e) {
          i = !0, o = e;
        } finally {
          try {
            u || null == r.return || r.return();
          } finally {
            if (i) throw o;
          }
        }
        return a;
      }
    }(e, t) || function(e, t) {
      if (!e) return;
      if ("string" == typeof e) return f(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(r);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return f(e, t);
    }(e, t) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var d = Object.values(s).flat().find((function(e) {
    var t = p(e, 2)[1];
    return r(t) ? t === n : t.test(n);
  }));
  if (e(d)) {
    var h = d[2], v = h.transform, g = h.rewriteWindowOpen, b = h.autojump;
    if (v) {
      var y = v.selector, j = v.queryName, w = v.separator, q = void 0 === w ? "?target=" : w, k = v.customTransform, C = void 0 === k ? function(e) {
        var t = j ? new URL(e.href).searchParams.get(j) : e.href.split(q)[1];
        t && (e.href = decodeURIComponent(t));
      } : k;
      new MutationObserver((function() {
        document.querySelectorAll(y).forEach(C);
      })).observe(document.body, {
        childList: !0,
        subtree: !0
      });
    }
    if (g) {
      var N = g.validationRule, A = g.getOriginalUrl, S = g.separator, U = g.queryName, O = void 0 === U ? "target" : U, R = window.open;
      window.open = function(e, n, a) {
        if (r(e)) {
          if (r(N) && !e.includes(N) || t(N) && !N(e)) return R.call(this, e, n, a);
          if (t(A)) {
            var u = A(e);
            u && o(u) && (e = u);
          } else {
            var i, c = new URL(e).search;
            e = decodeURIComponent(S ? null === (i = c.split(S)) || void 0 === i ? void 0 : i[1] : new URLSearchParams(c).get(O) || "");
          }
        }
        return R.call(this, e, n, a);
      };
    }
    b && function() {
      var e, r = b.validator, n = b.getOriginalUrl, a = b.selector, u = b.separator, i = b.queryName, c = void 0 === i ? "target" : i;
      if (!r || r(location)) {
        if (t(n)) {
          var l = n();
          if (l && o(l)) return location.replace(l);
        }
        if (a && document.querySelector(a)) return document.querySelector(a).click();
        var m = location.search, s = decodeURIComponent(u ? null === (e = m.split(u)) || void 0 === e ? void 0 : e[1] : new URLSearchParams(m).get(c) || "");
        o(s) && location.replace(s);
      }
    }();
  }
}();
