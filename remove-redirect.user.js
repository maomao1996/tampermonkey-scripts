// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配爱发电、百度、CSDN、豆瓣、码云、花瓣网、简书、掘金、力扣（Leetcode）、51CTO 博客、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、360 搜索、少数派、腾讯云开发者社区、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.0.1
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://*/*
// @grant       none
// ==/UserScript==
(function() {
  "use strict";
  var r = Array.isArray;
  var isFunction = function(r) {
    return typeof r === "function";
  };
  var isString = function(r) {
    return typeof r === "string";
  };
  var t = location.hostname.replace(/^www\./, "");
  function validateUrl(r) {
    if (!isString("string")) return false;
    try {
      new URL(r);
      return true;
    } catch (r) {
      return false;
    }
  }
  var e = [ [ "51CTO \u535a\u5ba2", "blog.51cto.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/transfer";
      },
      separator: "?"
    }
  } ] ];
  var a = [ [ "\u7231\u53d1\u7535", "afdian.net", {
    transform: {
      selector: '[href*="afdian.net/link?target="]'
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/link";
      }
    }
  } ] ];
  var o = [ [ "\u767e\u5ea6", "baidu.com", {
    transform: {
      selector: "#content_left > [mu]",
      customTransform: function customTransform(r) {
        var t = r.getAttribute("mu");
        if (validateUrl(t) && !t.includes(".baidu.com")) r.querySelectorAll("a[href]").forEach((function(r) {
          return r.setAttribute("href", t);
        }));
      }
    }
  } ] ];
  var n = [ [ "CSDN", "link.csdn.net", {
    autojump: {}
  } ] ];
  var u = [ [ "\u8c46\u74e3", "douban.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/link2/";
      },
      queryName: "url"
    }
  } ] ];
  var i = [ [ "\u7801\u4e91", "gitee.com", {
    transform: {
      selector: '[href*="/link?target="]'
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/link";
      }
    }
  } ] ];
  var l = [ [ "\u82b1\u74e3\u7f51", "huaban.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/go";
      },
      selector: ".wrapper button.ant-btn"
    }
  } ] ];
  var c = [ [ "\u7b80\u4e66", "jianshu.com", {
    transform: {
      selector: '[href*="links.jianshu.com/go?to="]',
      separator: "go?to="
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/go-wild";
      },
      queryName: "url"
    }
  } ] ];
  var m = [ [ "\u6398\u91d1", "juejin.cn", {
    transform: {
      selector: '[href*="link.juejin.cn?target="]'
    }
  } ], [ , "link.juejin.cn", {
    autojump: {}
  } ] ];
  var f = [ [ "\u529b\u6263\uff08Leetcode\uff09", "leetcode.cn", {
    transform: {
      selector: '[href*="/link/?target="]'
    }
  } ] ];
  var s = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
    transform: {
      selector: [ '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]', '[href*="hd.nowcoder.com/link.html?target="]' ].join(","),
      separator: /\?target|link\=/
    }
  } ], [ , "hd.nowcoder.com", {
    autojump: {}
  } ] ];
  var v = [ [ "\u5f00\u6e90\u4e2d\u56fd", /^(?:my\.)?oschina\.net$/, {
    transform: {
      selector: '[href*="oschina.net/action/GoToLink?url="]',
      separator: "GoToLink?url="
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/action/GoToLink";
      },
      queryName: "url"
    }
  } ] ];
  var p = [ [ "pixiv", "pixiv.net", {
    transform: {
      selector: '[href*="/jump.php?"]',
      separator: "?"
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/jump.php";
      },
      selector: "a[href]",
      separator: "?"
    }
  } ] ];
  var d = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi";
      },
      getOriginalUrl: function() {
        return document.querySelector(".weui-msg p.weui-msg__desc").textContent;
      },
      selector: "a.weui-btn.weui-btn_default"
    }
  } ], [ "\u5fae\u4fe1\u5f00\u653e\u793e\u533a", "developers.weixin.qq.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/community/middlepage/href";
      },
      queryName: "href"
    }
  } ], [ "QQ \u90ae\u7bb1", "mail.qq.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/cgi-bin/readtemplate";
      },
      selector: "div.c-footer a.c-footer-a1",
      queryName: "gourl"
    }
  } ], [ "PC \u7248 QQ", "c.pc.qq.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/middlem.html";
      },
      queryName: "pfurl"
    }
  } ], [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/scenario/link.html";
      },
      queryName: "url"
    }
  } ] ];
  var h = [ [ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      customTransform: function customTransform(r) {
        var t = r.getAttribute("data-mdurl");
        if (validateUrl(t)) r.setAttribute("href", t);
      }
    }
  } ] ];
  var y = [ [ "\u5c11\u6570\u6d3e", "sspai.com", {
    transform: {
      selector: '[href*="sspai.com/link?target="]'
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/link";
      }
    }
  } ] ];
  var _ = [ [ "\u817e\u8baf\u4e91\u5f00\u53d1\u8005\u793e\u533a", "cloud.tencent.com", {
    transform: {
      selector: '[href*="/developer/tools/blog-entry?target="]'
    },
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/developer/tools/blog-entry";
      }
    }
  } ] ];
  var b = [ [ "\u5fae\u535a", "weibo.com", {
    transform: {
      selector: '[href*="weibo.cn/sinaurl?u="]',
      queryName: "u"
    }
  } ], [ , "weibo.cn", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/sinaurl";
      },
      queryName: "u"
    }
  } ] ];
  var g = [ [ "YouTube", "youtube.com", {
    transform: {
      selector: '[href*="youtube.com/redirect?event="]',
      queryName: "q"
    }
  } ] ];
  var j = [ [ "\u8bed\u96c0", "yuque.com", {
    autojump: {
      validator: function(r) {
        var t = r.pathname;
        return t === "/r/goto";
      },
      queryName: "url"
    }
  } ] ];
  var q = [ [ "\u77e5\u4e4e\u3001\u77e5\u4e4e\u4e13\u680f", /^(?:zhuanlan\.)?zhihu\.com$/, {
    transform: {
      selector: '[href*="link.zhihu.com/?target="]'
    }
  } ], [ , "link.zhihu.com", {
    autojump: {}
  } ] ];
  var w = Object.freeze({
    __proto__: null,
    afdianNet: a,
    baiduCom: o,
    csdnNet: n,
    doubanCom: u,
    giteeCom: i,
    huabanCom: l,
    jianshuCom: c,
    juejinCn: m,
    leetcodeCn: f,
    m_51CtoCom: e,
    nowcoderCom: s,
    oschinaNet: v,
    pixivNet: p,
    qqCom: d,
    soCom: h,
    sspaiCom: y,
    tencentCom: _,
    weiboCom: b,
    youtubeCom: g,
    yuqueCom: j,
    zhihuCom: q
  });
  function _array_like_to_array(r, t) {
    if (t == null || t > r.length) t = r.length;
    for (var e = 0, a = new Array(t); e < t; e++) a[e] = r[e];
    return a;
  }
  function _array_with_holes(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterable_to_array_limit(r, t) {
    var e = r == null ? null : typeof Symbol !== "undefined" && r[Symbol.iterator] || r["@@iterator"];
    if (e == null) return;
    var a = [];
    var o = true;
    var n = false;
    var u, i;
    try {
      for (e = e.call(r); !(o = (u = e.next()).done); o = true) {
        a.push(u.value);
        if (t && a.length === t) break;
      }
    } catch (r) {
      n = true;
      i = r;
    } finally {
      try {
        if (!o && e["return"] != null) e["return"]();
      } finally {
        if (n) throw i;
      }
    }
    return a;
  }
  function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array(r, t) {
    return _array_with_holes(r) || _iterable_to_array_limit(r, t) || _unsupported_iterable_to_array(r, t) || _non_iterable_rest();
  }
  function _unsupported_iterable_to_array(r, t) {
    if (!r) return;
    if (typeof r === "string") return _array_like_to_array(r, t);
    var e = Object.prototype.toString.call(r).slice(8, -1);
    if (e === "Object" && r.constructor) e = r.constructor.name;
    if (e === "Map" || e === "Set") return Array.from(e);
    if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return _array_like_to_array(r, t);
  }
  var k = Object.values(w).flat();
  var C = k.find((function(r) {
    var e = _sliced_to_array(r, 2), a = e[1];
    if (isString(a)) return a === t;
    return a.test(t);
  }));
  if (r(C)) {
    var N = C[2], A = N.transform, U = N.autojump;
    if (A) {
      var S = A.selector, T = A.queryName, L = A.separator, O = L === void 0 ? "?target=" : L, x = A.customTransform, z = x === void 0 ? function(r) {
        var t = T ? new URL(r.href).searchParams.get(T) : r.href.split(O)[1];
        if (t) r.href = decodeURIComponent(t);
      } : x;
      var I = new MutationObserver((function() {
        document.querySelectorAll(S).forEach(z);
      }));
      I.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    if (U) (function() {
      var r;
      var t = U.validator, e = U.getOriginalUrl, a = U.selector, o = U.separator, n = U.queryName, u = n === void 0 ? "target" : n;
      if (t && !t(location)) return;
      if (isFunction(e)) {
        var i = e();
        if (i && validateUrl(i)) return location.replace(i);
      }
      if (a && document.querySelector(a)) return document.querySelector(a).click();
      var l = location.search;
      var c = decodeURIComponent(o ? (r = l.split(o)) === null || r === void 0 ? void 0 : r[1] : new URLSearchParams(l).get(u) || "");
      validateUrl(c) && location.replace(c);
    })();
  }
})();
