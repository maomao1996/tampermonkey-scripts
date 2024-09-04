// ==UserScript==
// @name        杀死水印（Kill Watermark）
// @description 杀死水印（移除烦人的水印，还你一个干净清爽的页面）；已适配360 智脑、腾讯文档、飞书、FreeBuf 网络安全行业门户、爱奇艺播放页（右上角 logo、暂停时的广告）、腾讯课堂播放页漂浮水印、哔哩哔哩直播左上角 logo、CSDN C 知道、腾讯视频播放页（右上角 logo、暂停时的弹窗广告）、优酷视频播放页（右上角 logo、暂停时的弹窗广告）、语雀
// @namespace   maomao1996.kill-watermark
// @version     0.10.1
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://v.qq.com/x/cover/*
// @match       *://*.iqiyi.com/*
// @match       *://v.youku.com/*
// @match       *://live.bilibili.com/*
// @match       *://ke.qq.com/course/*
// @match       *://*.yuque.com/*
// @match       *://docs.qq.com/*
// @match       *://so.csdn.net/*
// @match       *://*.feishu.cn/*
// @match       *://*.freebuf.com/*
// @match       *://chat.360.com/*
// @grant       GM_addStyle
// ==/UserScript==
!function() {
  "use strict";
  var isBrowser = "undefined" != typeof window;
  function styleInject(css, ref) {
    void 0 === ref && (ref = {});
    var insertAt = ref.insertAt;
    if (css && "undefined" != typeof document) {
      var head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
      style.type = "text/css", "top" === insertAt && head.firstChild ? head.insertBefore(style, head.firstChild) : head.appendChild(style), 
      style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
    }
  }
  var css_248z$9 = '#nworld-app-container div>div[style*=pointer-events][style*="data:image/"]{display:none!important}';
  styleInject(css_248z$9);
  var site$a = [ "360 \u667a\u8111", "chat.360.com", {
    style: css_248z$9
  } ], css_248z$8 = ".watermark-bg-wrapper{display:none!important}";
  styleInject(css_248z$8);
  var site$9 = [ "\u817e\u8baf\u6587\u6863", "docs.qq.com", {
    style: css_248z$8
  } ], css_248z$7 = ".print-watermark[style],.ssrWaterMark[style],.suite-clear[style]{display:none!important;height:0!important;width:0!important}";
  styleInject(css_248z$7);
  var site$8 = [ "\u98de\u4e66", "feishu.cn", {
    style: css_248z$7
  } ], site$7 = [ "FreeBuf \u7f51\u7edc\u5b89\u5168\u884c\u4e1a\u95e8\u6237", "freebuf.com", {
    script: function() {
      document.querySelectorAll("img[large]").forEach((function(img) {
        var large = img.getAttribute("large");
        large && img.src !== large && (img.src = large);
      }));
    }
  } ], css_248z$6 = ".iqp-logo-bottom,.iqp-logo-box,.iqp-logo-top,.zpc-watermark,iqpdiv.flash-max{display:none!important}iqpdiv.iqp-player-videolayer{height:100%!important;left:auto!important;top:auto!important;width:100%!important}";
  styleInject(css_248z$6);
  var site$6 = [ "\u7231\u5947\u827a\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5e7f\u544a\uff09", /^(?:[^.]+\.)?iqiyi\.com$/, {
    style: css_248z$6
  } ], css_248z$5 = '#loki-player div[style*="position: absolute;"]{display:none!important}';
  styleInject(css_248z$5);
  var site$5 = [ "\u817e\u8baf\u8bfe\u5802\u64ad\u653e\u9875\u6f02\u6d6e\u6c34\u5370", "ke.qq.com", {
    style: css_248z$5
  } ], css_248z$4 = ".web-player-icon-roomStatus{opacity:0!important}";
  styleInject(css_248z$4);
  var site$4 = [ "\u54d4\u54e9\u54d4\u54e9\u76f4\u64ad\u5de6\u4e0a\u89d2 logo", "live.bilibili.com", {
    style: css_248z$4
  } ], css_248z$3 = ".username_mask_cover[style]{display:none!important}";
  styleInject(css_248z$3);
  var site$3 = [ "CSDN C \u77e5\u9053", "so.csdn.net", {
    style: css_248z$3
  } ], css_248z$2 = "txpdiv.txp-watermark{opacity:0!important}[data-role=creative-player-pause-layer]{display:none!important}";
  styleInject(css_248z$2);
  var site$2 = [ "\u817e\u8baf\u89c6\u9891\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5f39\u7a97\u5e7f\u544a\uff09", "v.qq.com", {
    style: css_248z$2
  } ], css_248z$1 = "watermark-layer{opacity:0!important}#youku-pause-container{display:none!important}";
  styleInject(css_248z$1);
  var site$1 = [ "\u4f18\u9177\u89c6\u9891\u64ad\u653e\u9875\uff08\u53f3\u4e0a\u89d2 logo\u3001\u6682\u505c\u65f6\u7684\u5f39\u7a97\u5e7f\u544a\uff09", "v.youku.com", {
    style: css_248z$1
  } ], css_248z = "#main>div.wm{display:none!important}";
  styleInject(css_248z);
  var site = [ "\u8bed\u96c0", "yuque.com", {
    style: css_248z
  } ], sites = Object.freeze({
    __proto__: null,
    chat360Com: site$a,
    docsQqCom: site$9,
    feishuCn: site$8,
    freebufCom: site$7,
    iqiyiCom: site$6,
    keQqCom: site$5,
    liveBilibiliCom: site$4,
    soCsdnNet: site$3,
    vQqCom: site$2,
    vYoukuCom: site$1,
    yuqueCom: site
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
  var hostname = function() {
    var hostname = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.hostname;
    return isBrowser ? hostname.replace(/^www\./, "") : "";
  }(), currentSite = Object.values(sites).find((function(param) {
    var url = _sliced_to_array(param, 2)[1];
    return "string" == typeof url ? hostname.includes(url) : url.test(hostname);
  }));
  if (currentSite) {
    var _currentSite_ = currentSite[2], style = _currentSite_.style, script = _currentSite_.script;
    style && GM_addStyle(style), "function" == typeof script && script();
  }
}();
