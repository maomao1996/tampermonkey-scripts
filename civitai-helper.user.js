// ==UserScript==
// @name        Civitai 小助手
// @description 提升 Civitai 使用体验的小助手；自动移除分级遮罩直接展示图片
// @namespace   maomao1996.civitai-helper
// @version     1.0.0
// @author      maomao1996
// @homepage    https://github.com/maomao1996/tampermonkey-scripts
// @supportURL  https://github.com/maomao1996/tampermonkey-scripts/issues
// @license     MIT
// @match       *://civitai.com/*
// @grant       none
// ==/UserScript==
!function() {
  "use strict";
  var ob = new IntersectionObserver((function(entries) {
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _step, _iterator = entries[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var entry = _step.value;
        if (entry.isIntersecting) {
          var node = entry.target;
          node.click(), ob.unobserve(node);
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
  }));
  var init = function() {
    document.querySelectorAll(".mantine-Stack-root > button.mantine-UnstyledButton-root.mantine-Button-root").forEach((function(node) {
      "Show" === node.innerText && ob.observe(node);
    }));
  }, main = document.querySelector("#main");
  null != main && new MutationObserver((function() {
    return init();
  })).observe(main, {
    childList: !0,
    subtree: !0
  });
  init();
}();
