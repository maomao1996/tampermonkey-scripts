// ==UserScript==
// @name        跳转链接修复（移除重定向外链直达）
// @description 提升用户体验：修复跳转链接为站外直链（移除重定向直接跳转），免去拦截页面点击步骤可直达站外；拦截页面自动跳转（无须额外操作）；已适配ACG盒子、爱发电、百度搜索、百度贴吧、哔哩哔哩游戏WIKI、Bing 搜索、书签地球、酷安、CSDN、豆瓣、Facebook、码云、Google 搜索、Google 重定向页、花瓣网、InfoQ、Instagram、简书、掘金、金山文档、链滴、力扣（Leetcode）、51CTO 博客、NGA 玩家社区、牛客网、开源中国、pixiv、微信、微信开放社区、QQ 邮箱、PC 版 QQ、腾讯文档、腾讯兔小巢、石墨文档、360 搜索、搜狗搜索、少数派、Steam 社区、腾讯云开发者社区、推特（Twitter）、微博、微博短链接、YouTube、语雀、知乎、知乎专栏
// @namespace   maomao1996.remove-redirect
// @version     2.24.0
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
// @grant       unsafeWindow
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// ==/UserScript==
!function() {
  "use strict";
  var FEMM_ATTR_KEY = "femm-helper", map = new WeakMap;
  var isArray = Array.isArray, isFunction = function(value) {
    return "function" == typeof value;
  }, isString = function(val) {
    return "string" == typeof val;
  }, isBrowser = "undefined" != typeof window;
  function validateUrl(url) {
    if (!isString(url)) return !1;
    try {
      return new URL(url), !0;
    } catch (e) {
      return !1;
    }
  }
  var requestFunction, cache, GMCachedRequest = (requestFunction = GM.xmlHttpRequest, 
  cache = new Map, function(options) {
    if (void 0 !== options.cacheTime && ("number" != typeof options.cacheTime || options.cacheTime < 0)) throw new Error("\u65e0\u6548\u7684 cacheTime \u9009\u9879");
    var _options_shouldCacheError, cacheKey = JSON.stringify(options), cachedData = cache.get(cacheKey);
    if (cachedData) {
      var _options_cacheTime, data = cachedData.data, time = cachedData.time, error = cachedData.error, requestPromise = cachedData.requestPromise;
      if (requestPromise) return requestPromise;
      var cacheTime = null !== (_options_cacheTime = options.cacheTime) && void 0 !== _options_cacheTime ? _options_cacheTime : 0;
      if (!error && time && cacheTime && Date.now() - time < cacheTime) return Promise.resolve(data);
      cache.delete(cacheKey);
    }
    var shouldCacheError = null !== (_options_shouldCacheError = options.shouldCacheError) && void 0 !== _options_shouldCacheError && _options_shouldCacheError, requestPromise1 = requestFunction(options).then((function(data) {
      var time = Date.now();
      return cache.set(cacheKey, {
        data: data,
        time: time
      }), data;
    })).catch((function(error) {
      if (shouldCacheError) {
        var time = Date.now();
        cache.set(cacheKey, {
          error: error,
          time: time
        });
      }
      throw error;
    }));
    return cache.set(cacheKey, {
      requestPromise: requestPromise1
    }), requestPromise1;
  });
  function _array_like_to_array$1(arr, len) {
    (null == len || len > arr.length) && (len = arr.length);
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _sliced_to_array$1(arr, i) {
    return function(arr) {
      if (Array.isArray(arr)) return arr;
    }(arr) || function(arr, i) {
      var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
      if (null != _i) {
        var _s, _e, _arr = [], _n = !0, _d = !1;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !i || _arr.length !== i); _n = !0) ;
        } catch (err) {
          _d = !0, _e = err;
        } finally {
          try {
            _n || null == _i.return || _i.return();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
    }(arr, i) || function(o, minLen) {
      if (!o) return;
      if ("string" == typeof o) return _array_like_to_array$1(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      "Object" === n && o.constructor && (n = o.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(n);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
    }(arr, i) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function defineSite(siteInfo, domain, options) {
    var ref;
    Array.isArray(siteInfo) && (siteInfo = (ref = _sliced_to_array$1(siteInfo, 3))[0], 
    domain = ref[1], options = ref[2]);
    return [ siteInfo, domain, options ];
  }
  function getSearchParamsValue(searchParams, queryName) {
    searchParams = new URLSearchParams(searchParams);
    var result = null;
    if (Array.isArray(queryName)) {
      var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
      try {
        for (var _step, _iterator = queryName[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var name = _step.value;
          if (searchParams.has(name)) {
            result = searchParams.get(name);
            break;
          }
        }
      } catch (err) {
        _didIteratorError = !0, _iteratorError = err;
      } finally {
        try {
          _iteratorNormalCompletion || null == _iterator.return || _iterator.return();
        } finally {
          if (_didIteratorError) throw _iteratorError;
        }
      }
    } else result = searchParams.get(queryName);
    return result || "";
  }
  function requestOriginalLink(element) {
    !function(element, callback) {
      if (!map.has(element) && !element.getAttribute(FEMM_ATTR_KEY)) {
        map.set(element, 1);
        var ob = new IntersectionObserver((function(entries) {
          var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
          try {
            for (var _step, _iterator = entries[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) _step.value.isIntersecting && (element.setAttribute(FEMM_ATTR_KEY, "observered"), 
            callback(), ob.unobserve(element));
          } catch (err) {
            _didIteratorError = !0, _iteratorError = err;
          } finally {
            try {
              _iteratorNormalCompletion || null == _iterator.return || _iterator.return();
            } finally {
              if (_didIteratorError) throw _iteratorError;
            }
          }
        }));
        ob.observe(element);
      }
    }(element, (function() {
      GMCachedRequest({
        method: "GET",
        url: element.href,
        anonymous: !0
      }).then((function(res) {
        res.finalUrl && res.finalUrl !== element.href && (element.href = res.finalUrl);
      }));
    }));
  }
  var sites$A = [ defineSite([ "ACG\u76d2\u5b50", "acgbox.link", {
    transform: {
      selector: 'a[href*="/go/?url"]',
      customTransform: function(node) {
        var originUrl = decodeURIComponent(node.href.split("?url=")[1]);
        try {
          validateUrl(originUrl = atob(originUrl)) && (node.href = originUrl);
        } catch (e) {}
      }
    },
    autojump: {
      validator: function(param) {
        return "/go/" === param.pathname;
      },
      selector: "a.loading-btn"
    }
  } ]) ], BAIDU_RE = /^(http:\/\/[^.]+\.[^.]+\.baidu\.com|https:\/\/baike\.baidu\.com)/, sites$y = [ defineSite([ "\u767e\u5ea6\u641c\u7d22", "baidu.com", {
    transform: {
      selector: "#content_left > [mu]",
      fallbackSelector: 'a[href*="baidu.com/link?url="]',
      customTransform: function(node) {
        var originUrl = node.getAttribute("mu");
        validateUrl(originUrl) && !BAIDU_RE.test(originUrl) && node.querySelectorAll('div[has-tts] a[href*="baidu.com/link?url="]').forEach((function(a) {
          return a.setAttribute("href", originUrl);
        }));
      }
    }
  } ]), defineSite([ "\u767e\u5ea6\u8d34\u5427", /^(jump|jump2)\.bdimg\.com$/, {
    autojump: {
      validator: function(param) {
        return "/safecheck/index" === param.pathname;
      },
      queryName: "url",
      selector: "a.btn.btn-next[href]"
    }
  } ]), defineSite([ , "tieba.baidu.com", {
    autojump: {
      validator: function(param) {
        return "/mo/q/checkurl" === param.pathname;
      },
      queryName: "url",
      selector: ".btns span.j_next"
    }
  } ]) ], urlMap = new Map, sites$w = [ defineSite([ "Bing \u641c\u7d22", /^(?:\w+\.)?bing\.com$/, {
    transform: {
      selector: '#b_results a[target="_blank"][href*="www.bing.com/ck/a"][href*="&u=a1"]',
      customTransform: function(node) {
        var u = new URLSearchParams(node.href).get("u");
        if (urlMap.has(u)) node.href = urlMap.get(u); else {
          var originUrl = atob(u.replace(/^a1/, "").replace(/[-_]/g, (function(e) {
            return "-" == e ? "+" : "/";
          })).replace(/[^A-Za-z0-9\\+\\/]/g, ""));
          validateUrl(originUrl) && (node.href = originUrl, urlMap.set(u, originUrl));
        }
      }
    }
  } ]) ], sites$v = [ defineSite([ "\u4e66\u7b7e\u5730\u7403", "bookmarkearth.cn", {
    transform: {
      selector: 'a[href*="/view/"][data-ext]',
      attribute: "data-ext"
    },
    autojump: {
      validator: function(param) {
        var pathname = param.pathname;
        return /^\/view\//.test(pathname) && !!document.querySelector(".jump-target-url");
      },
      getOriginalUrl: function() {
        return document.querySelector(".jump-target-url").getAttribute("data-url");
      }
    }
  } ]) ], sites$p = [ defineSite([ "Google \u641c\u7d22\u3001Google \u91cd\u5b9a\u5411\u9875", /^google\.(com|com?\.[a-z]{2}|[a-z]{2})$/, {
    transform: {
      selector: [ "a[jsname][href][data-jsarwt]", "a[jsname][href][ping]", "[data-rw][data-al]" ].join(","),
      customTransform: function(node) {
        node.setAttribute("data-jrwt", "1"), node.removeAttribute("ping"), node.removeAttribute("data-rw");
        var match = (node.getAttribute("href") || "").match(/\?(.*)/);
        if (match) {
          var url = new URLSearchParams(match[1]).get("url");
          url && validateUrl(url) && node.setAttribute("href", url);
        }
      }
    },
    autojump: {
      validator: function(param) {
        return "/url" === param.pathname;
      },
      queryName: "q"
    }
  } ]) ], REMOVE_ATTRS = [ "onclick", "onmouseover", "onmouseout" ], sites$g = [ defineSite([ "NGA \u73a9\u5bb6\u793e\u533a", /^(bbs\.nga\.cn|ngabbs\.com|g\.nga\.cn)$/, {
    transform: {
      selector: 'a[target="_blank"][onclick*="showUrlAlert"]',
      customTransform: function(node) {
        REMOVE_ATTRS.forEach((function(attr) {
          return node.removeAttribute(attr);
        }));
      }
    }
  } ]) ], sites$f = [ [ "\u725b\u5ba2\u7f51", "nowcoder.com", {
    transform: {
      selector: [ '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]', '[href*="hd.nowcoder.com/link.html?target="]' ].join(","),
      separator: /\?target|link\=/
    }
  } ], [ , "hd.nowcoder.com", {
    autojump: {}
  } ] ], sites$c = [ [ "\u5fae\u4fe1", "weixin110.qq.com", {
    autojump: {
      validator: function(param) {
        return "/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi" === param.pathname;
      },
      getOriginalUrl: function() {
        return document.querySelector(".weui-msg p.weui-msg__desc").textContent;
      },
      selector: "a.weui-btn.weui-btn_default"
    }
  } ], [ "\u5fae\u4fe1\u5f00\u653e\u793e\u533a", "developers.weixin.qq.com", {
    rewriteWindowOpen: {
      validationRule: "/community/middlepage/href?href=",
      queryName: "href"
    },
    autojump: {
      validator: function(param) {
        return "/community/middlepage/href" === param.pathname;
      },
      queryName: "href"
    }
  } ], [ "QQ \u90ae\u7bb1", "mail.qq.com", {
    rewriteWindowOpen: {
      validationRule: "url=",
      queryName: "url"
    },
    autojump: {
      validator: function(param) {
        return "/cgi-bin/readtemplate" === param.pathname;
      },
      selector: "div.c-footer a.c-footer-a1",
      queryName: "gourl"
    }
  } ], [ "PC \u7248 QQ", "c.pc.qq.com", {
    autojump: {
      validator: function(param) {
        var pathname = param.pathname;
        return /^\/[a-z]+\.html$/.test(pathname);
      },
      queryName: [ "pfurl", "url" ]
    }
  } ], [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    autojump: {
      validator: function(param) {
        return "/scenario/link.html" === param.pathname;
      },
      queryName: "url"
    }
  } ], [ "\u817e\u8baf\u5154\u5c0f\u5de2", /(txc|support)\.qq\.com/, {
    transform: {
      selector: 'a[href*="/link-jump?jump="]',
      queryName: "jump"
    },
    autojump: {
      validator: function(param) {
        var pathname = param.pathname;
        return /\/link-jump$/.test(pathname);
      },
      queryName: "jump"
    }
  } ] ], sites$a = [ defineSite([ "360 \u641c\u7d22", "so.com", {
    transform: {
      selector: 'a[href*="so.com/link?"][data-mdurl]',
      attribute: "data-mdurl"
    }
  } ]) ], sites$9 = [ defineSite([ "\u641c\u72d7\u641c\u7d22", "sogou.com", {
    transform: {
      selector: ".results .vrwrap",
      customTransform: function(node) {
        var dataNode = node.querySelector("[data-url]");
        if (dataNode) {
          var originUrl = dataNode.dataset.url;
          validateUrl(originUrl) && node.querySelectorAll('a[href*="/link?url="]').forEach((function(a) {
            return a.setAttribute("href", originUrl);
          }));
        }
      }
    }
  } ]), defineSite([ , "m.sogou.com", {
    transform: {
      selector: 'a[href^="./id="]',
      queryName: "url"
    }
  } ]) ], sites$5 = [ defineSite([ "\u63a8\u7279\uff08Twitter\uff09", /^(twitter|x)\.com$/, {
    transform: {
      selector: 'a[href*="://t.co/"]',
      customTransform: function(node) {
        var originUrl = node.innerText.replace("\u2026", "");
        validateUrl(originUrl) && node.setAttribute("href", originUrl);
      }
    }
  } ]) ], sites$4 = [ [ "\u5fae\u535a", "weibo.com", {
    transform: {
      selector: '[href*="weibo.cn/sinaurl?u="]',
      queryName: "u"
    }
  } ], [ , "weibo.cn", {
    autojump: {
      validator: function(param) {
        return "/sinaurl" === param.pathname;
      },
      queryName: "u"
    }
  } ], [ "\u5fae\u535a\u77ed\u94fe\u63a5", "t.cn", {
    autojump: {
      getOriginalUrl: function() {
        var _document_querySelector;
        return null === (_document_querySelector = document.querySelector("#textline")) || void 0 === _document_querySelector ? void 0 : _document_querySelector.innerText;
      },
      selector: ".open-url a"
    }
  } ] ], sites = Object.freeze({
    __proto__: null,
    acgboxLink: sites$A,
    afdianCom: [ [ "\u7231\u53d1\u7535", "afdian.com", {
      transform: {
        selector: '[href*="afdian.com/link?target="]'
      },
      autojump: {
        validator: function(param) {
          return "/link" === param.pathname;
        }
      }
    } ] ],
    baiduCom: sites$y,
    bilibiliCom: [ [ "\u54d4\u54e9\u54d4\u54e9\u6e38\u620fWIKI", "game.bilibili.com", {
      autojump: {
        validator: function(param) {
          return param.pathname.includes("/linkfilter/");
        },
        queryName: "url"
      }
    } ] ],
    bingCom: sites$w,
    bookmarkearthCn: sites$v,
    coolapkCom: [ [ "\u9177\u5b89", "coolapk.com", {
      autojump: {
        validator: function(param) {
          return "/link" === param.pathname;
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
        validator: function(param) {
          return "/link2/" === param.pathname;
        },
        queryName: "url"
      }
    } ] ],
    facebookCom: [ [ "Facebook", /^(?:l\.)?facebook\.com$/, {
      transform: {
        selector: 'a[target="_blank"]',
        customTransform: function(node) {
          node.addEventListener("click", (function(e) {
            return e.stopPropagation();
          }), {
            capture: !0
          });
        }
      },
      autojump: {
        validator: function(param) {
          return param.search.includes("u=");
        },
        queryName: "u"
      }
    } ] ],
    giteeCom: [ [ "\u7801\u4e91", "gitee.com", {
      transform: {
        selector: '[href*="/link?target="]'
      },
      autojump: {
        validator: function(param) {
          return "/link" === param.pathname;
        }
      }
    } ] ],
    googleCom: sites$p,
    huabanCom: [ [ "\u82b1\u74e3\u7f51", "huaban.com", {
      autojump: {
        validator: function(param) {
          return "/go" === param.pathname;
        },
        selector: ".wrapper button.ant-btn"
      }
    } ] ],
    infoqCn: [ [ "InfoQ", /^(?:xie\.)?infoq\.cn$/, {
      rewriteWindowOpen: {
        validationRule: "infoq.cn/link?target="
      },
      autojump: {
        validator: function(param) {
          return "/link" === param.pathname;
        }
      }
    } ] ],
    instagramCom: [ [ "Instagram", /^(?:l\.)?instagram\.com$/, {
      transform: {
        selector: '[href*="l.instagram.com/?u="]',
        queryName: "u"
      },
      rewriteWindowOpen: {
        validationRule: "l.instagram.com/?u=",
        queryName: "u"
      },
      autojump: {
        validator: function(param) {
          return param.search.includes("u=");
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
        validator: function(param) {
          return "/go-wild" === param.pathname;
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
        validator: function(param) {
          return "/office/link" === param.pathname;
        }
      }
    } ] ],
    ld246Com: [ [ "\u94fe\u6ef4", "ld246.com", {
      transform: {
        selector: '[href*="/forward?goto="]',
        queryName: "goto"
      },
      autojump: {
        validator: function(param) {
          return "/forward" === param.pathname;
        },
        selector: ".text a[href]",
        queryName: "goto"
      }
    } ] ],
    leetcodeCn: [ [ "\u529b\u6263\uff08Leetcode\uff09", "leetcode.cn", {
      transform: {
        selector: '[href*="/link/?target="]'
      },
      autojump: {
        validator: function(param) {
          return "/link/" === param.pathname;
        },
        queryName: "target"
      }
    } ] ],
    m_51CtoCom: [ [ "51CTO \u535a\u5ba2", "blog.51cto.com", {
      rewriteWindowOpen: {
        validationRule: "51cto.com/transfer?",
        separator: "?"
      },
      autojump: {
        validator: function(param) {
          return "/transfer" === param.pathname;
        },
        separator: "?"
      }
    } ] ],
    ngaCn: sites$g,
    nowcoderCom: sites$f,
    oschinaNet: [ [ "\u5f00\u6e90\u4e2d\u56fd", /^(?:my\.)?oschina\.net$/, {
      transform: {
        selector: '[href*="oschina.net/action/GoToLink?url="]',
        separator: "GoToLink?url="
      },
      autojump: {
        validator: function(param) {
          return "/action/GoToLink" === param.pathname;
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
        validator: function(param) {
          return "/jump.php" === param.pathname;
        },
        selector: "a[href]",
        separator: "?"
      }
    } ] ],
    qqCom: sites$c,
    shimoIm: [ [ "\u77f3\u58a8\u6587\u6863", "shimo.im", {
      rewriteWindowOpen: {
        validationRule: "outlink/gray?url=",
        queryName: "url"
      },
      autojump: {
        validator: function(param) {
          return "/outlink/gray" === param.pathname;
        },
        queryName: "url"
      }
    } ] ],
    soCom: sites$a,
    sogouCom: sites$9,
    sspaiCom: [ [ "\u5c11\u6570\u6d3e", "sspai.com", {
      transform: {
        selector: '[href*="sspai.com/link?target="]'
      },
      autojump: {
        validator: function(param) {
          return "/link" === param.pathname;
        }
      }
    } ] ],
    steamcommunityCom: [ [ "Steam \u793e\u533a", "steamcommunity.com", {
      autojump: {
        validator: function(param) {
          return "/linkfilter/" === param.pathname;
        },
        queryName: "u"
      }
    } ] ],
    tencentCom: [ [ "\u817e\u8baf\u4e91\u5f00\u53d1\u8005\u793e\u533a", "cloud.tencent.com", {
      transform: {
        selector: '[href*="/developer/tools/blog-entry?target="]',
        queryName: "target"
      },
      autojump: {
        validator: function(param) {
          return "/developer/tools/blog-entry" === param.pathname;
        }
      }
    } ] ],
    twitterCom: sites$5,
    weiboCom: sites$4,
    youtubeCom: [ [ "YouTube", "youtube.com", {
      transform: {
        selector: '[href*="youtube.com/redirect?event="]',
        queryName: "q"
      },
      autojump: {
        validator: function(param) {
          return "/redirect" === param.pathname;
        },
        queryName: "q"
      }
    } ] ],
    yuqueCom: [ [ "\u8bed\u96c0", /^(?:[a-zA-Z0-9-]+\.)?yuque\.com$/, {
      autojump: {
        validator: function(param) {
          return "/r/goto" === param.pathname;
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
  function _array_like_to_array(arr, len) {
    (null == len || len > arr.length) && (len = arr.length);
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _sliced_to_array(arr, i) {
    return function(arr) {
      if (Array.isArray(arr)) return arr;
    }(arr) || function(arr, i) {
      var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
      if (null != _i) {
        var _s, _e, _arr = [], _n = !0, _d = !1;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !i || _arr.length !== i); _n = !0) ;
        } catch (err) {
          _d = !0, _e = err;
        } finally {
          try {
            _n || null == _i.return || _i.return();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
    }(arr, i) || function(o, minLen) {
      if (!o) return;
      if ("string" == typeof o) return _array_like_to_array(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      "Object" === n && o.constructor && (n = o.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(n);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
    }(arr, i) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var param, selector, attribute, queryName, _param_separator, separator, fallbackSelector, _param_customTransform, customTransform, observer, hostname = function() {
    var hostname = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.hostname;
    return isBrowser ? hostname.replace(/^www\./, "") : "";
  }(), currentSite = Object.values(sites).flat().find((function(param) {
    var url = _sliced_to_array(param, 2)[1];
    return isString(url) ? url === hostname : url.test(hostname);
  }));
  if (isArray(currentSite)) {
    var _currentSite_ = currentSite[2], transform = _currentSite_.transform, rewriteWindowOpen = _currentSite_.rewriteWindowOpen, autojump = _currentSite_.autojump;
    transform && (selector = (param = transform).selector, attribute = param.attribute, 
    queryName = param.queryName, _param_separator = param.separator, separator = void 0 === _param_separator ? "?target=" : _param_separator, 
    fallbackSelector = param.fallbackSelector, _param_customTransform = param.customTransform, 
    customTransform = void 0 === _param_customTransform ? function(node) {
      var originUrl = "";
      attribute && (originUrl = node.getAttribute(attribute) || ""), !attribute && queryName && (originUrl = getSearchParamsValue(new URL(node.href).search, queryName)), 
      validateUrl(originUrl) || (originUrl = node.href.split(separator)[1]), validateUrl(originUrl = decodeURIComponent(originUrl)) && (node.href = originUrl);
    } : _param_customTransform, observer = new MutationObserver((function() {
      document.querySelectorAll(selector).forEach(customTransform), fallbackSelector && document.querySelectorAll(fallbackSelector).length && document.querySelectorAll(fallbackSelector).forEach(requestOriginalLink);
    })), document.body.setAttribute(FEMM_ATTR_KEY, "remove-redirect"), observer.observe(document.body, {
      childList: !0,
      subtree: !0
    })), rewriteWindowOpen && function(param) {
      var validationRule = param.validationRule, getOriginalUrl = param.getOriginalUrl, separator = param.separator, _param_queryName = param.queryName, queryName = void 0 === _param_queryName ? "target" : _param_queryName, originalWindowOpen = unsafeWindow.open;
      unsafeWindow.open = function(url, target, features) {
        if (isString(url)) {
          if (isString(validationRule) && !url.includes(validationRule) || isFunction(validationRule) && !validationRule(url)) return originalWindowOpen.call(this, url, target, features);
          if (isFunction(getOriginalUrl)) {
            var originUrl = getOriginalUrl(url);
            originUrl && validateUrl(originUrl) && (url = originUrl);
          } else {
            var _search_split, search = new URL(url).search;
            url = decodeURIComponent(separator ? null === (_search_split = search.split(separator)) || void 0 === _search_split ? void 0 : _search_split[1] : getSearchParamsValue(search, queryName));
          }
        }
        return originalWindowOpen.call(this, url, target, features);
      };
    }(rewriteWindowOpen), autojump && function(param) {
      var originUrl, validator = param.validator, getOriginalUrl = param.getOriginalUrl, selector = param.selector, separator = param.separator, _param_queryName = param.queryName, queryName = void 0 === _param_queryName ? "target" : _param_queryName;
      if (validator && !validator(location)) return;
      if (selector && document.querySelector(selector)) return document.querySelector(selector).click();
      isFunction(getOriginalUrl) && (originUrl = getOriginalUrl());
      if (!validateUrl(originUrl)) {
        var _search_split, search = location.search;
        if (separator) originUrl = null === (_search_split = search.split(separator)) || void 0 === _search_split ? void 0 : _search_split[1];
        validateUrl(originUrl) || (originUrl = getSearchParamsValue(search, queryName)), 
        originUrl = decodeURIComponent(originUrl || "");
      }
      validateUrl(originUrl) && location.replace(originUrl);
    }(autojump);
  }
}();
