import {
  isString,
  isFunction,
  isArray,
  formatHostname,
  validateUrl,
  FEMM_ATTR_KEY,
} from '@femm/shared-utils'

import * as sites from 'src/sites'
import { getSearchParamsValue, requestOriginalLink } from 'src/utils'

const hostname = formatHostname()
const formatSites = Object.values(sites).flat()
const currentSite = formatSites.find(([, url]) => {
  if (isString(url)) {
    return url === hostname
  }
  return url.test(hostname)
})

if (__DEV__) {
  // 开发模式下，打印当前站点信息
  console.group('%c remove-redirect', 'font-weight: bold; font-size: 16px; color: #03A9F4;')
  console.log(`%chostname: %c${location.hostname} `, 'color: #666;', 'color: unset')
  console.log('%csites:', 'color: #666;')
  console.log(formatSites)
  console.log('%ccurrentSites:', 'color: #666;')
  console.log(currentSite)
  console.groupEnd()
}

if (isArray(currentSite)) {
  const { transform, rewriteWindowOpen, autojump } = currentSite[2]

  transform && handleTransform(transform as Site.Transform)
  rewriteWindowOpen && handleRewriteWindowOpen(rewriteWindowOpen)
  autojump && handleAutoJump(autojump)
}

/******************************************************************************
 ** 处理链接转换
 ******************************************************************************/
function handleTransform<T extends AllHTMLElementTypes>({
  selector,
  attribute,
  queryName,
  separator = '?target=',
  fallbackSelector,
  customTransform = (node: T) => {
    let originUrl = ''

    if (attribute) {
      originUrl = node.getAttribute(attribute) || ''
    }

    if (!attribute && queryName) {
      const { search } = new URL((node as HTMLAnchorElement).href)
      originUrl = getSearchParamsValue(search, queryName)
    }

    if (!validateUrl(originUrl)) {
      originUrl = (node as HTMLAnchorElement).href.split(separator)[1]
    }

    originUrl = decodeURIComponent(originUrl)
    if (validateUrl(originUrl)) {
      ;(node as HTMLAnchorElement).href = originUrl
    }
  },
}: Site.Transform<T>) {
  const observer = new MutationObserver(() => {
    document.querySelectorAll<T>(selector).forEach(customTransform)

    if (fallbackSelector && document.querySelectorAll(fallbackSelector).length) {
      document.querySelectorAll<HTMLAnchorElement>(fallbackSelector).forEach(requestOriginalLink)
    }
  })

  document.body.setAttribute(FEMM_ATTR_KEY, 'remove-redirect')
  observer.observe(document.body, { childList: true, subtree: true })
}

/******************************************************************************
 ** 处理 window.open 方法重写
 ******************************************************************************/
function handleRewriteWindowOpen({
  validationRule,
  getOriginalUrl,
  separator,
  queryName = 'target',
}: Site.RewriteWindowOpen) {
  // 保存原始的 window.open 方法
  const originalWindowOpen = window.open

  window.open = function (url?: string | URL, target?: string, features?: string) {
    // 仅 url 为字符串时进行重写拦截
    if (isString(url)) {
      /* 验证器模块 */
      if (
        // 验证器为字符串时
        (isString(validationRule) && !url.includes(validationRule)) ||
        // 验证器为函数时
        (isFunction(validationRule) && !validationRule(url))
      ) {
        return originalWindowOpen.call(this, url, target, features)
      }

      /* 获取原始链接 */
      if (isFunction(getOriginalUrl)) {
        const originUrl = getOriginalUrl(url)
        if (originUrl && validateUrl(originUrl)) {
          url = originUrl
        }
      } else {
        const { search } = new URL(url)
        url = decodeURIComponent(
          separator ? search.split(separator)?.[1] : getSearchParamsValue(search, queryName),
        )
      }
    }

    return originalWindowOpen.call(this, url, target, features)
  }
}

/******************************************************************************
 ** 处理自动跳转
 ******************************************************************************/
function handleAutoJump({
  validator,
  getOriginalUrl,
  selector,
  separator,
  queryName = 'target',
}: Site.AutoJump) {
  if (validator && !validator(location)) {
    return
  }

  /* 点击按钮直接跳转 */
  if (selector && document.querySelector(selector)) {
    return (document.querySelector(selector) as HTMLElement).click()
  }

  let originUrl

  /* 调用 getOriginalUrl 获取原始链接 */
  if (isFunction(getOriginalUrl)) {
    originUrl = getOriginalUrl()
  }

  if (!validateUrl(originUrl)) {
    /* 解析 url 参数获取原始链接 */
    const { search } = location

    if (separator) {
      originUrl = search.split(separator)?.[1]
    }

    if (!validateUrl(originUrl)) {
      originUrl = getSearchParamsValue(search, queryName)
    }

    originUrl = decodeURIComponent(originUrl || '')
  }

  validateUrl(originUrl) && location.replace(originUrl!)
}
