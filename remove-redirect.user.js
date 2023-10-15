// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 修复跳转链接为站外直链（移除重定向），免去拦截页面点击步骤可直达站外；拦截页面自动跳转；已适配爱发电、百度、CSDN、豆瓣、码云、花瓣网、简书、掘金、力扣（Leetcode）、51CTO 博客、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、360 搜索、少数派、腾讯云开发者社区、微博、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.0.0
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
  var e = location.pathname;
  var o = [ [ "51CTO \u535a\u5ba2", "blog.51cto.com", {
    autojump: {
      validator: function() {
        return e === "/transfer";
      },
      separator: "?"
    }
  } ] ];
  var a = [ [ "\u7231\u53d1\u7535", "afdian.net", {
    transform: {
      selector: '[href*="afdian.net/link?target="]'
    },
    autojump: {
      validator: function() {
        return e === "/link";
      }
    }
  } ] ];
  var n = [ [ "\u767e\u5ea6", "baidu.com", {
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
  var u = [ [ "CSDN", "link.csdn.net", {
    autojump: {}
  } ] ];
  var i = [ [ "\u8c46\u74e3", "douban.com", {
    autojump: {
      validator: function() {
        return e === "/link2/";
      },
      queryName: "url"
    }
  } ] ];
  var l = [ [ "\u7801\u4e91", "gitee.com", {
    transform: {
      selector: '[href*="gitee.com/link?target="]'
    },
    autojump: {
      validator: function() {
        return e === "/link";
      }
    }
  } ] ];
  var c = [ [ "\u82b1\u74e3\u7f51", "huaban.com", {
    autojump: {
      validator: function() {
        return e === "/go";
      },
      selector: ".wrapper button.ant-btn"
    }
  } ] ];
  var m = [ [ "\u7b80\u4e66", "jianshu.com", {
    transform: {
      selector: '[href*="links.jianshu.com/go?to="]',
      separator: "go?to="
    },
    autojump: {
      validator: function() {
        return e === "/go-wild";
      },
      queryName: "url"
    }
  } ] ];
  var f = [ [ "\u6398\u91d1", "juejin.cn", {
    transform: {
      selector: '[href*="link.juejin.cn?target="]'
    }
  } ], [ , "link.juejin.cn", {
    autojump: {}
  } ] ];
  var s = [ [ "\u529b\u6263\uff08Leetcode\uff09", "leetcode.cn", {
    transform: {
      selector: '[href*="/link/?target="]'
    }
  } ] ];
  var d = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
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
      validator: function() {
        return e === "/action/GoToLink";
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
      validator: function() {
        return e === "/jump.php";
      },
      selector: "a[href]",
      separator: "?"
    }
  } ] ];
  var h = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
    autojump: {
      validator: function() {
        return e === "/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi";
      },
      getOriginalUrl: function() {
        return document.querySelector(".weui-msg p.weui-msg__desc").textContent;
      },
      selector: "a.weui-btn.weui-btn_default"
    }
  } ], [ "\u5fae\u4fe1\u5f00\u653e\u793e\u533a", "developers.weixin.qq.com", {
    autojump: {
      validator: function() {
        return e === "/community/middlepage/href";
      },
      queryName: "href"
    }
  } ], [ "QQ \u90ae\u7bb1", "mail.qq.com", {
    autojump: {
      validator: function() {
        return e === "/cgi-bin/readtemplate";
      },
      selector: "div.c-footer a.c-footer-a1",
      queryName: "gourl"
    }
  } ], [ "PC \u7248 QQ", "c.pc.qq.com", {
    autojump: {
      validator: function() {
        return e === "/middlem.html";
      },
      queryName: "pfurl"
    }
  } ], [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    autojump: {
      validator: function() {
        return e === "/scenario/link.html";
      },
      queryName: "url"
    }
  } ] ];
  var y = [ [ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      customTransform: function customTransform(r) {
        var t = r.getAttribute("data-mdurl");
        if (validateUrl(t)) r.setAttribute("href", t);
      }
    }
  } ] ];
  var _ = [ [ "\u5c11\u6570\u6d3e", "sspai.com", {
    transform: {
      selector: '[href*="sspai.com/link?target="]'
    },
    autojump: {
      validator: function() {
        return e === "/link";
      }
    }
  } ] ];
  var b = [ [ "\u817e\u8baf\u4e91\u5f00\u53d1\u8005\u793e\u533a", "cloud.tencent.com", {
    transform: {
      selector: '[href*="/developer/tools/blog-entry?target="]'
    },
    autojump: {
      validator: function() {
        return e === "/developer/tools/blog-entry";
      }
    }
  } ] ];
  var g = [ [ "\u5fae\u535a", "weibo.com", {
    transform: {
      selector: '[href*="weibo.cn/sinaurl?u="]',
      queryName: "u"
    }
  } ], [ , "weibo.cn", {
    autojump: {
      validator: function() {
        return e === "/sinaurl";
      },
      queryName: "u"
    }
  } ] ];
  var j = [ [ "YouTube", "youtube.com", {
    transform: {
      selector: '[href*="youtube.com/redirect?event="]',
      queryName: "q"
    }
  } ] ];
  var q = [ [ "\u8bed\u96c0", "yuque.com", {
    autojump: {
      validator: function() {
        return e === "/r/goto";
      },
      queryName: "url"
    }
  } ] ];
  var w = [ [ "\u77e5\u4e4e\u3001\u77e5\u4e4e\u4e13\u680f", /^(?:zhuanlan\.)?zhihu\.com$/, {
    transform: {
      selector: '[href*="link.zhihu.com/?target="]'
    }
  } ], [ , "link.zhihu.com", {
    autojump: {}
  } ] ];
  var k = Object.freeze({
    __proto__: null,
    afdianNet: a,
    baiduCom: n,
    csdnNet: u,
    doubanCom: i,
    giteeCom: l,
    huabanCom: c,
    jianshuCom: m,
    juejinCn: f,
    leetcodeCn: s,
    m_51CtoCom: o,
    nowcoderCom: d,
    oschinaNet: v,
    pixivNet: p,
    qqCom: h,
    soCom: y,
    sspaiCom: _,
    tencentCom: b,
    weiboCom: g,
    youtubeCom: j,
    yuqueCom: q,
    zhihuCom: w
  });
  function _array_like_to_array(r, t) {
    if (t == null || t > r.length) t = r.length;
    for (var e = 0, o = new Array(t); e < t; e++) o[e] = r[e];
    return o;
  }
  function _array_with_holes(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterable_to_array_limit(r, t) {
    var e = r == null ? null : typeof Symbol !== "undefined" && r[Symbol.iterator] || r["@@iterator"];
    if (e == null) return;
    var o = [];
    var a = true;
    var n = false;
    var u, i;
    try {
      for (e = e.call(r); !(a = (u = e.next()).done); a = true) {
        o.push(u.value);
        if (t && o.length === t) break;
      }
    } catch (r) {
      n = true;
      i = r;
    } finally {
      try {
        if (!a && e["return"] != null) e["return"]();
      } finally {
        if (n) throw i;
      }
    }
    return o;
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
  var C = Object.values(k).flat();
  var N = C.find((function(r) {
    var e = _sliced_to_array(r, 2), o = e[1];
    if (isString(o)) return o === t;
    return o.test(t);
  }));
  if (r(N)) {
    var A = N[2], U = A.transform, S = A.autojump;
    if (U) {
      var T = U.selector, L = U.queryName, O = U.separator, x = O === void 0 ? "?target=" : O, z = U.customTransform, I = z === void 0 ? function(r) {
        var t = L ? new URL(r.href).searchParams.get(L) : r.href.split(x)[1];
        if (t) r.href = decodeURIComponent(t);
      } : z;
      var R = new MutationObserver((function() {
        document.querySelectorAll(T).forEach(I);
      }));
      R.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    if (S) (function() {
      var r;
      var t = S.validator, e = S.getOriginalUrl, o = S.selector, a = S.separator, n = S.queryName, u = n === void 0 ? "target" : n;
      if (t && !t()) return;
      if (isFunction(e)) {
        var i = e();
        if (i && validateUrl(i)) return location.replace(i);
      }
      if (o && document.querySelector(o)) return document.querySelector(o).click();
      var l = location.search;
      var c = decodeURIComponent(a ? (r = l.split(a)) === null || r === void 0 ? void 0 : r[1] : new URLSearchParams(l).get(u) || "");
      validateUrl(c) && location.replace(c);
    })();
  }
})();
