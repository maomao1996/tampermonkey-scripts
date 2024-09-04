// ==UserScript==
// @name        GitHub 小助手
// @description 优化 GitHub 使用体验的小工具；仓库页显示 GitHub 计数统计（issues、watch、fork、star）为具体数值、放大查看 Markdown 中的图片
// @namespace   maomao1996.github-helper
// @version     1.1.0
// @icon        https://github.githubassets.com/favicons/favicon.svg
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://github.com/*
// @grant       GM_addStyle
// ==/UserScript==
!function() {
  "use strict";
  var FEMM_ATTR_KEY = "femm-helper";
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
  var COUNT_REGEX = /^(\d{1,3}(,\d{3})*|\d+|\d{1,3},\d{3}\+)$/, SELECTORS = {
    COUNTER: 'span[class*="Counter"]:not(['.concat(FEMM_ATTR_KEY, "])"),
    REPO_SIDEBAR: "#repo-content-pjax-container .Layout-sidebar",
    WATCH: "#repo-notifications-counter",
    FORKS: "#repo-network-counter",
    STARS: '[id^="repo-stars-counter-"]'
  }, REPO_COUNT_SELECTORS = [ [ 'a[href$="/watchers"] strong', SELECTORS.WATCH ], [ 'a[href$="/forks"] strong', SELECTORS.FORKS ], [ 'a[href$="/stargazers"] strong', SELECTORS.STARS ] ];
  function updateNode(node, count) {
    (function(node, count) {
      return !node.getAttribute(FEMM_ATTR_KEY) && COUNT_REGEX.test(count) && node.innerText !== count;
    })(node, count) && (function(node, count) {
      node.innerText = count;
    }(node, count), function(node, name, value) {
      node.getAttribute(name) || node.setAttribute(name, value);
    }(node, FEMM_ATTR_KEY, "update-count"));
  }
  function updateCount() {
    var repoSidebar;
    document.querySelectorAll(SELECTORS.COUNTER).forEach((function(node) {
      var count = node.getAttribute("title") || "";
      updateNode(node, count);
    })), document.querySelector("#repository-container-header:not([hidden])") && ((repoSidebar = document.querySelector(SELECTORS.REPO_SIDEBAR)) && REPO_COUNT_SELECTORS.forEach((function(param) {
      var _document_querySelector, _param = _sliced_to_array(param, 2), target = _param[0], original = _param[1];
      updateNode(repoSidebar.querySelector(target), (null === (_document_querySelector = document.querySelector(original)) || void 0 === _document_querySelector ? void 0 : _document_querySelector.getAttribute("title")) || "");
    })));
  }
  /*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom */  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, isSupported = function(node) {
    return "IMG" === node.tagName;
  }, isNode = function(selector) {
    return selector && 1 === selector.nodeType;
  }, isSvg = function(image) {
    return ".svg" === (image.currentSrc || image.src).substr(-4).toLowerCase();
  }, getImagesFromSelector = function(selector) {
    try {
      return Array.isArray(selector) ? selector.filter(isSupported) : function(selector) {
        return NodeList.prototype.isPrototypeOf(selector);
      }(selector) ? [].slice.call(selector).filter(isSupported) : isNode(selector) ? [ selector ].filter(isSupported) : "string" == typeof selector ? [].slice.call(document.querySelectorAll(selector)).filter(isSupported) : [];
    } catch (err) {
      throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
    }
  }, createCustomEvent = function(type, params) {
    var eventParams = _extends({
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    }, params);
    if ("function" == typeof window.CustomEvent) return new CustomEvent(type, eventParams);
    var customEvent = document.createEvent("CustomEvent");
    return customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail), 
    customEvent;
  };
  !function(css, ref) {
    void 0 === ref && (ref = {});
    var insertAt = ref.insertAt;
    if (css && "undefined" != typeof document) {
      var head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
      style.type = "text/css", "top" === insertAt && head.firstChild ? head.insertBefore(style, head.firstChild) : head.appendChild(style), 
      style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
    }
  }(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}");
  var mediumZoom$1 = function mediumZoom(selector) {
    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, Promise = window.Promise || function(fn) {
      function noop() {}
      fn(noop, noop);
    }, attach = function() {
      for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) selectors[_key] = arguments[_key];
      var newImages = selectors.reduce((function(imagesAccumulator, currentSelector) {
        return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
      }), []);
      return newImages.filter((function(newImage) {
        return -1 === images.indexOf(newImage);
      })).forEach((function(newImage) {
        images.push(newImage), newImage.classList.add("medium-zoom-image");
      })), eventListeners.forEach((function(_ref) {
        var type = _ref.type, listener = _ref.listener, options = _ref.options;
        newImages.forEach((function(image) {
          image.addEventListener(type, listener, options);
        }));
      })), zoom;
    }, open = function() {
      var target = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target, _animate = function() {
        var container = {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }, viewportWidth = void 0, viewportHeight = void 0;
        if (zoomOptions.container) if (zoomOptions.container instanceof Object) viewportWidth = (container = _extends({}, container, zoomOptions.container)).width - container.left - container.right - 2 * zoomOptions.margin, 
        viewportHeight = container.height - container.top - container.bottom - 2 * zoomOptions.margin; else {
          var _zoomContainer$getBou = (isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container)).getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
          container = _extends({}, container, {
            width: _width,
            height: _height,
            left: _left,
            top: _top
          });
        }
        viewportWidth = viewportWidth || container.width - 2 * zoomOptions.margin, viewportHeight = viewportHeight || container.height - 2 * zoomOptions.margin;
        var zoomTarget = active.zoomedHd || active.original, naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth, naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight, _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height, scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width, scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height, scale = Math.min(scaleX, scaleY), transform = "scale(" + scale + ") translate3d(" + ((viewportWidth - width) / 2 - left + zoomOptions.margin + container.left) / scale + "px, " + ((viewportHeight - height) / 2 - top + zoomOptions.margin + container.top) / scale + "px, 0)";
        active.zoomed.style.transform = transform, active.zoomedHd && (active.zoomedHd.style.transform = transform);
      };
      return new Promise((function(resolve) {
        if (target && -1 === images.indexOf(target)) resolve(zoom); else {
          if (active.zoomed) resolve(zoom); else {
            if (target) active.original = target; else {
              if (!(images.length > 0)) return void resolve(zoom);
              var _images = images;
              active.original = _images[0];
            }
            if (active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
              detail: {
                zoom: zoom
              }
            })), scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, 
            isAnimating = !0, active.zoomed = function(template) {
              var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height, clone = template.cloneNode(), scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
              return clone.removeAttribute("id"), clone.style.position = "absolute", clone.style.top = top + scrollTop + "px", 
              clone.style.left = left + scrollLeft + "px", clone.style.width = width + "px", clone.style.height = height + "px", 
              clone.style.transform = "", clone;
            }(active.original), document.body.appendChild(overlay), zoomOptions.template) {
              var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
              active.template = document.createElement("div"), active.template.appendChild(template.content.cloneNode(!0)), 
              document.body.appendChild(active.template);
            }
            if (active.original.parentElement && "PICTURE" === active.original.parentElement.tagName && active.original.currentSrc && (active.zoomed.src = active.original.currentSrc), 
            document.body.appendChild(active.zoomed), window.requestAnimationFrame((function() {
              document.body.classList.add("medium-zoom--opened");
            })), active.original.classList.add("medium-zoom-image--hidden"), active.zoomed.classList.add("medium-zoom-image--opened"), 
            active.zoomed.addEventListener("click", close), active.zoomed.addEventListener("transitionend", (function _handleOpenEnd() {
              isAnimating = !1, active.zoomed.removeEventListener("transitionend", _handleOpenEnd), 
              active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
                detail: {
                  zoom: zoom
                }
              })), resolve(zoom);
            })), active.original.getAttribute("data-zoom-src")) {
              active.zoomedHd = active.zoomed.cloneNode(), active.zoomedHd.removeAttribute("srcset"), 
              active.zoomedHd.removeAttribute("sizes"), active.zoomedHd.removeAttribute("loading"), 
              active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src"), active.zoomedHd.onerror = function() {
                clearInterval(getZoomTargetSize), console.warn("Unable to reach the zoom image target " + active.zoomedHd.src), 
                active.zoomedHd = null, _animate();
              };
              var getZoomTargetSize = setInterval((function() {
                active.zoomedHd.complete && (clearInterval(getZoomTargetSize), active.zoomedHd.classList.add("medium-zoom-image--opened"), 
                active.zoomedHd.addEventListener("click", close), document.body.appendChild(active.zoomedHd), 
                _animate());
              }), 10);
            } else if (active.original.hasAttribute("srcset")) {
              active.zoomedHd = active.zoomed.cloneNode(), active.zoomedHd.removeAttribute("sizes"), 
              active.zoomedHd.removeAttribute("loading");
              var loadEventListener = active.zoomedHd.addEventListener("load", (function() {
                active.zoomedHd.removeEventListener("load", loadEventListener), active.zoomedHd.classList.add("medium-zoom-image--opened"), 
                active.zoomedHd.addEventListener("click", close), document.body.appendChild(active.zoomedHd), 
                _animate();
              }));
            } else _animate();
          }
        }
      }));
    }, close = function() {
      return new Promise((function(resolve) {
        if (!isAnimating && active.original) {
          isAnimating = !0, document.body.classList.remove("medium-zoom--opened"), active.zoomed.style.transform = "", 
          active.zoomedHd && (active.zoomedHd.style.transform = ""), active.template && (active.template.style.transition = "opacity 150ms", 
          active.template.style.opacity = 0), active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
            detail: {
              zoom: zoom
            }
          })), active.zoomed.addEventListener("transitionend", (function _handleCloseEnd() {
            active.original.classList.remove("medium-zoom-image--hidden"), document.body.removeChild(active.zoomed), 
            active.zoomedHd && document.body.removeChild(active.zoomedHd), document.body.removeChild(overlay), 
            active.zoomed.classList.remove("medium-zoom-image--opened"), active.template && document.body.removeChild(active.template), 
            isAnimating = !1, active.zoomed.removeEventListener("transitionend", _handleCloseEnd), 
            active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
              detail: {
                zoom: zoom
              }
            })), active.original = null, active.zoomed = null, active.zoomedHd = null, active.template = null, 
            resolve(zoom);
          }));
        } else resolve(zoom);
      }));
    }, toggle = function() {
      var target = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target;
      return active.original ? close() : open({
        target: target
      });
    }, images = [], eventListeners = [], isAnimating = !1, scrollTop = 0, zoomOptions = options, active = {
      original: null,
      zoomed: null,
      zoomedHd: null,
      template: null
    };
    "[object Object]" === Object.prototype.toString.call(selector) ? zoomOptions = selector : (selector || "string" == typeof selector) && attach(selector);
    var overlay = function(background) {
      var overlay = document.createElement("div");
      return overlay.classList.add("medium-zoom-overlay"), overlay.style.background = background, 
      overlay;
    }((zoomOptions = _extends({
      margin: 0,
      background: "#fff",
      scrollOffset: 40,
      container: null,
      template: null
    }, zoomOptions)).background);
    document.addEventListener("click", (function(event) {
      var target = event.target;
      target !== overlay ? -1 !== images.indexOf(target) && toggle({
        target: target
      }) : close();
    })), document.addEventListener("keyup", (function(event) {
      var key = event.key || event.keyCode;
      "Escape" !== key && "Esc" !== key && 27 !== key || close();
    })), document.addEventListener("scroll", (function() {
      if (!isAnimating && active.original) {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset && setTimeout(close, 150);
      }
    })), window.addEventListener("resize", close);
    var zoom = {
      open: open,
      close: close,
      toggle: toggle,
      update: function() {
        var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, newOptions = options;
        if (options.background && (overlay.style.background = options.background), options.container && options.container instanceof Object && (newOptions.container = _extends({}, zoomOptions.container, options.container)), 
        options.template) {
          var template = isNode(options.template) ? options.template : document.querySelector(options.template);
          newOptions.template = template;
        }
        return zoomOptions = _extends({}, zoomOptions, newOptions), images.forEach((function(image) {
          image.dispatchEvent(createCustomEvent("medium-zoom:update", {
            detail: {
              zoom: zoom
            }
          }));
        })), zoom;
      },
      clone: function() {
        return mediumZoom(_extends({}, zoomOptions, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}));
      },
      attach: attach,
      detach: function() {
        for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) selectors[_key2] = arguments[_key2];
        active.zoomed && close();
        var imagesToDetach = selectors.length > 0 ? selectors.reduce((function(imagesAccumulator, currentSelector) {
          return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
        }), []) : images;
        return imagesToDetach.forEach((function(image) {
          image.classList.remove("medium-zoom-image"), image.dispatchEvent(createCustomEvent("medium-zoom:detach", {
            detail: {
              zoom: zoom
            }
          }));
        })), images = images.filter((function(image) {
          return -1 === imagesToDetach.indexOf(image);
        })), zoom;
      },
      on: function(type, listener) {
        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return images.forEach((function(image) {
          image.addEventListener("medium-zoom:" + type, listener, options);
        })), eventListeners.push({
          type: "medium-zoom:" + type,
          listener: listener,
          options: options
        }), zoom;
      },
      off: function(type, listener) {
        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return images.forEach((function(image) {
          image.removeEventListener("medium-zoom:" + type, listener, options);
        })), eventListeners = eventListeners.filter((function(eventListener) {
          return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
        })), zoom;
      },
      getOptions: function() {
        return zoomOptions;
      },
      getImages: function() {
        return images;
      },
      getZoomedImage: function() {
        return active.original;
      }
    };
    return zoom;
  }, DEFAULT_SELECTOR = ".markdown-body img:not(.medium-zoom-image)", zoom = mediumZoom$1();
  function zoomImage() {
    !function() {
      var selector = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : DEFAULT_SELECTOR;
      zoom.detach(), zoom.attach(selector);
    }();
  }
  document.addEventListener("click", (function(event) {
    var _document_querySelector, targetElement = event.target;
    "IMG" === (null == targetElement ? void 0 : targetElement.tagName) && (null === (_document_querySelector = document.querySelector(".markdown-body")) || void 0 === _document_querySelector ? void 0 : _document_querySelector.contains(targetElement)) && (event.preventDefault(), 
    event.stopPropagation());
  }));
  var css_248z = ".medium-zoom-overlay{background-color:#fff!important;z-index:1996}.medium-zoom-image--opened{z-index:1997}@media (prefers-color-scheme:dark){.medium-zoom-overlay{background-color:#000!important}}";
  !function(css, ref) {
    void 0 === ref && (ref = {});
    var insertAt = ref.insertAt;
    if (css && "undefined" != typeof document) {
      var head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
      style.type = "text/css", "top" === insertAt && head.firstChild ? head.insertBefore(style, head.firstChild) : head.appendChild(style), 
      style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
    }
  }(css_248z), GM_addStyle(css_248z);
  var init = function() {
    updateCount(), zoomImage();
  }, main = document.querySelector("main");
  null != main && new MutationObserver((function() {
    return init();
  })).observe(main, {
    childList: !0,
    subtree: !0
  });
  init();
}();
