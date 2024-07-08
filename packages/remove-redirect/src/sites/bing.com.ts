import { validateUrl } from '@femm/shared-utils'

/******************************************************************************
 ** Bing 搜索
 **   - https://www.bing.com/search?q=mmPlayer
 ******************************************************************************/

const urlMap = new Map()

const sites: SiteModule = [
  [
    'Bing 搜索',
    /^(?:cn\.)?bing\.com$/,
    {
      transform: {
        selector: '#b_results a[target="_blank"][href*="www.bing.com/ck/a"][href*="&u=a1"]',
        customTransform(node) {
          const searchParams = new URLSearchParams(node.getAttribute('href')!)
          const u = searchParams.get('u')!

          if (urlMap.has(u)) {
            node.setAttribute('href', urlMap.get(u))
            return
          }

          const originUrl = atob(
            u
              .replace(/^a1/, '')
              .replace(/[-_]/g, (e) => ('-' == e ? '+' : '/'))
              .replace(/[^A-Za-z0-9\\+\\/]/g, ''),
          )

          if (validateUrl(originUrl)) {
            node.setAttribute('href', originUrl)
            urlMap.set(u, originUrl)
          }
        },
      },
    },
  ],
]

export default sites
