import { isString, isFunction, isArray, formatHostname, validateUrl } from '@femm/shared-utils'

import * as sites from 'src/sites'

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
  console.group('remove-redirect')
  console.log('hostname :', hostname)
  console.log('sites :', formatSites)
  console.log('currentSite :', currentSite)
  console.groupEnd()
}

if (isArray(currentSite)) {
  const { transform, rewriteWindowOpen, autojump } = currentSite[2]

  /* 转换链接 */
  if (transform) {
    const {
      selector,
      queryName,
      separator = '?target=',
      customTransform = (node: HTMLAnchorElement) => {
        const originUrl = queryName
          ? new URL(node.href).searchParams.get(queryName)
          : node.href.split(separator)[1]

        if (originUrl) {
          node.href = decodeURIComponent(originUrl)
        }
      },
    } = transform
    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLAnchorElement>(selector).forEach(customTransform)
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  /* 重写 window.open 方法 */
  if (rewriteWindowOpen) {
    const { validationRule, getOriginalUrl, separator, queryName = 'target' } = rewriteWindowOpen
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
            separator
              ? search.split(separator)?.[1]
              : new URLSearchParams(search).get(queryName) || '',
          )
        }
      }

      return originalWindowOpen.call(this, url, target, features)
    }
  }

  /* 自动跳转 */
  if (autojump) {
    // 使用 iife 避免编辑器提示报错
    ;(() => {
      const { validator, getOriginalUrl, selector, separator, queryName = 'target' } = autojump

      if (validator && !validator(location)) {
        return
      }

      /* 调用 getOriginalUrl 获取原始链接 */
      if (isFunction(getOriginalUrl)) {
        const originUrl = getOriginalUrl()
        if (originUrl && validateUrl(originUrl)) {
          return location.replace(originUrl)
        }
      }

      /* 点击按钮直接跳转 */
      if (selector && document.querySelector(selector)) {
        return (document.querySelector(selector) as HTMLElement).click()
      }

      /* 解析 url 参数获取原始链接 */
      const { search } = location
      const originUrl = decodeURIComponent(
        separator ? search.split(separator)?.[1] : new URLSearchParams(search).get(queryName) || '',
      )
      validateUrl(originUrl) && location.replace(originUrl)
    })()
  }
}
