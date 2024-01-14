import { isString, isFunction, formatHostname } from '@femm/shared-utils'

import * as sites from 'src/sites'

const hostname = formatHostname()
const formatSites = Object.values(sites)
const currentSite = formatSites.find(([, url]) => {
  if (isString(url)) {
    return hostname.includes(url)
  }

  return url.test(hostname)
})

if (__DEV__) {
  // 开发模式下，打印当前站点信息
  console.group('kill-watermark')
  console.log('hostname :', hostname)
  console.log('sites :', formatSites)
  console.log('currentSite :', currentSite)
  console.groupEnd()
}

if (currentSite) {
  const { style, script } = currentSite[2]

  style && GM_addStyle(style)
  isFunction(script) && script()
}
