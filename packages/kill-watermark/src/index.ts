import { isString, isFunction, formatHostname } from '@femm/shared-utils'

import * as sites from 'src/sites'

const formatSites = Object.values(sites)
const currentSite = formatSites.find(([, url]) => {
  if (isString(url)) {
    return formatHostname.includes(url)
  }

  return url.test(formatHostname)
})

if (currentSite) {
  const { style, script } = currentSite[2]

  style && GM_addStyle(style)
  isFunction(script) && script()
}
