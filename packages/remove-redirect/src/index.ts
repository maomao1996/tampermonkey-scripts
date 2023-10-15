import { isString, isFunction, isArray, formatHostname, validateUrl } from '@femm/shared-utils'

import * as sites from 'src/sites'

const formatSites = Object.values(sites).flat()
const currentSite = formatSites.find(([, url]) => {
  if (isString(url)) {
    return url === formatHostname
  }
  return url.test(formatHostname)
})

if (isArray(currentSite)) {
  const { transform, autojump } = currentSite[2]

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

  /* 自动跳转 */
  if (autojump) {
    // 使用 iife 避免编辑器提示报错
    ;(() => {
      const { validator, getOriginalUrl, selector, separator, queryName = 'target' } = autojump

      if (validator && !validator()) {
        return
      }

      if (isFunction(getOriginalUrl)) {
        const originUrl = getOriginalUrl()
        if (originUrl && validateUrl(originUrl)) {
          return location.replace(originUrl)
        }
      }

      if (selector && document.querySelector(selector)) {
        return (document.querySelector(selector) as HTMLElement).click()
      }

      const { search } = location
      const originUrl = decodeURIComponent(
        separator ? search.split(separator)?.[1] : new URLSearchParams(search).get(queryName) || '',
      )
      validateUrl(originUrl) && location.replace(originUrl)
    })()
  }
}
