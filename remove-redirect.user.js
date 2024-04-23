// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配爱发电、百度搜索、CSDN、豆瓣、Facebook、码云、Google 搜索、Google 重定向页、花瓣网、InfoQ、Instagram、简书、掘金、金山文档、链滴、力扣（Leetcode）、51CTO 博客、NGA 玩家社区、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、腾讯兔小巢、360 搜索、少数派、腾讯云开发者社区、推特（Twitter）、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.10.0
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
  }, o = "undefined" != typeof window;
  function n(t) {
    if (!r("string")) return !1;
    try {
      return new URL(t), !0;
    } catch (t) {
      return !1;
    }
  }
  var a = /^http:\/\/[^.]+\.[^.]+\.baidu\.com/, u = [ [ "\u767e\u5ea6\u641c\u7d22", "baidu.com", {
    transform: {
      selector: "#content_left > [mu]",
      customTransform: function(t) {
        var e = t.getAttribute("mu");
        n(e) && !a.test(e) && t.querySelectorAll('div[has-tts] a[href*="baidu.com/link?url="]').forEach((function(t) {
          return t.setAttribute("href", e);
        }));
      }
    }
  } ] ], i = [ [ "Google \u641c\u7d22", /^google\.com/, {
    transform: {
      selector: [ "a[jsname][href][data-jsarwt]", "a[jsname][href][ping]" ].join(","),
      customTransform: function(t) {
        t.setAttribute("data-jrwt", "1"), t.removeAttribute("ping");
        var e = (t.getAttribute("href") || "").match(/\?(.*)/);
        if (e) {
          var r = new URLSearchParams(e[1]).get("url");
          r && n(r) && t.setAttribute("href", r);
        }
      }
    }
  } ], [ "Google \u91cd\u5b9a\u5411\u9875", /^google\.(com|com?\.[a-z]{2}|[a-z]{2})$/, {
    autojump: {
      validator: function(t) {
        return "/url" === t.pathname;
      },
      queryName: "q"
    }
  } ] ], c = [ "onclick", "onmouseover", "onmouseout" ], m = [ [ "NGA \u73a9\u5bb6\u793e\u533a", /^(bbs\.nga\.cn|ngabbs\.com|g\.nga\.cn)$/, {
    transform: {
      selector: 'a[target="_blank"][onclick*="showUrlAlert"]',
      customTransform: function(t) {
        c.forEach((function(e) {
          return t.removeAttribute(e);
        }));
      }
    }
  } ] ], l = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
    transform: {
      selector: [ '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]', '[href*="hd.nowcoder.com/link.html?target="]' ].join(","),
      separator: /\?target|link\=/
    }
  } ], [ , "hd.nowcoder.com", {
    autojump: {}
  } ] ], f = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
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
    rewriteWindowOpen: {
      validationRule: "url=",
      queryName: "url"
    },
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
        var e = t.pathname;
        return /^\/(middleb|middlem|pc|ios|android)\.html$/.test(e);
      },
      queryName: [ "pfurl", "url" ]
    }
  } ], [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    autojump: {
      validator: function(t) {
        return "/scenario/link.html" === t.pathname;
      },
      queryName: "url"
    }
  } ], [ "\u817e\u8baf\u5154\u5c0f\u5de2", /(txc|support)\.qq\.com/, {
    transform: {
      selector: 'a[href*="/link-jump?jump="]',
      queryName: "jump"
    },
    autojump: {
      validator: function(t) {
        var e = t.pathname;
        return /^\/products\/\d+\/link-jump$/.test(e);
      },
      queryName: "jump"
    }
  } ] ], s = [ [ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      customTransform: function(t) {
        var e = t.getAttribute("data-mdurl");
        n(e) && t.setAttribute("href", e);
      }
    }
  } ] ], d = [ [ "\u63a8\u7279\uff08Twitter\uff09", "twitter.com", {
    transform: {
      selector: 'a[href*="://t.co/"]',
      customTransform: function(t) {
        var e = t.innerText;
        n(e) && t.setAttribute("href", e);
      }
    }
  } ] ], p = Object.freeze({
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
    baiduCom: u,
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
    facebookCom: [ [ "Facebook", /^(?:l\.)?facebook\.com$/, {
      autojump: {
        validator: function(t) {
          return t.search.includes("u=");
        },
        queryName: "u"
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
    googleCom: i,
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
    instagramCom: [ [ "Instagram", /^(?:l\.)?instagram\.com$/, {
      autojump: {
        validator: function(t) {
          return t.search.includes("u=");
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
    ld246Com: [ [ "\u94fe\u6ef4", "ld246.com", {
      transform: {
        selector: '[href*="/forward?goto="]',
        queryName: "goto"
      },
      autojump: {
        validator: function(t) {
          return "/forward" === t.pathname;
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
        validator: function(t) {
          return "/transfer" === t.pathname;
        },
        separator: "?"
      }
    } ] ],
    ngaCn: m,
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
        separator: "?",
        queryName: "url"
      },
      autojump: {
        validator: function(t) {
          return "/jump.php" === t.pathname;
        },
        selector: "a[href]",
        separator: "?"
      }
    } ] ],
    qqCom: f,
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
    twitterCom: d,
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
  function h(t, e) {
    t = new URLSearchParams(t);
    var r = null;
    if (Array.isArray(e)) {
      var o = !0, n = !1, a = void 0;
      try {
        for (var u, i = e[Symbol.iterator](); !(o = (u = i.next()).done); o = !0) {
          var c = u.value;
          if (t.has(c)) {
            r = t.get(c);
            break;
          }
        }
      } catch (t) {
        n = !0, a = t;
      } finally {
        try {
          o || null == i.return || i.return();
        } finally {
          if (n) throw a;
        }
      }
    } else r = t.get(e);
    return r || "";
  }
  function v(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, o = new Array(e); r < e; r++) o[r] = t[r];
    return o;
  }
  function g(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, e) {
      var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != r) {
        var o, n, a = [], u = !0, i = !1;
        try {
          for (r = r.call(t); !(u = (o = r.next()).done) && (a.push(o.value), !e || a.length !== e); u = !0) ;
        } catch (t) {
          i = !0, n = t;
        } finally {
          try {
            u || null == r.return || r.return();
          } finally {
            if (i) throw n;
          }
        }
        return a;
      }
    }(t, e) || function(t, e) {
      if (!t) return;
      if ("string" == typeof t) return v(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === r && t.constructor && (r = t.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(r);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return v(t, e);
    }(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var y = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.hostname;
    return o ? t.replace(/^www\./, "") : "";
  }(), b = Object.values(p).flat().find((function(t) {
    var e = g(t, 2)[1];
    return r(e) ? e === y : e.test(y);
  }));
  if (t(b)) {
    var j = b[2], w = j.transform, q = j.rewriteWindowOpen, k = j.autojump;
    if (w) {
      var C = w.selector, N = w.queryName, A = w.separator, S = void 0 === A ? "?target=" : A, T = w.customTransform, O = void 0 === T ? function(t) {
        var e = "";
        N && (e = h(new URL(t.href).search, N));
        n(e) || (e = t.href.split(S)[1]), n(e = decodeURIComponent(e)) && (t.href = e);
      } : T;
      new MutationObserver((function() {
        document.querySelectorAll(C).forEach(O);
      })).observe(document.body, {
        childList: !0,
        subtree: !0
      });
    }
    if (q) {
      var U = q.validationRule, x = q.getOriginalUrl, R = q.separator, L = q.queryName, $ = void 0 === L ? "target" : L, _ = window.open;
      window.open = function(t, o, a) {
        if (r(t)) {
          if (r(U) && !t.includes(U) || e(U) && !U(t)) return _.call(this, t, o, a);
          if (e(x)) {
            var u = x(t);
            u && n(u) && (t = u);
          } else {
            var i, c = new URL(t).search;
            t = decodeURIComponent(R ? null === (i = c.split(R)) || void 0 === i ? void 0 : i[1] : h(c, $));
          }
        }
        return _.call(this, t, o, a);
      };
    }
    k && function() {
      var t = k.validator, r = k.getOriginalUrl, o = k.selector, a = k.separator, u = k.queryName, i = void 0 === u ? "target" : u;
      if (!t || t(location)) {
        if (o && document.querySelector(o)) return document.querySelector(o).click();
        var c;
        if (e(r) && (c = r()), !n(c)) {
          var m, l = location.search;
          if (a) c = null === (m = l.split(a)) || void 0 === m ? void 0 : m[1];
          n(c) || (c = h(l, i)), c = decodeURIComponent(c || "");
        }
        n(c) && location.replace(c);
      }
    }();
  }
}();
