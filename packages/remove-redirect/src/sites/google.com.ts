import { validateUrl } from '@femm/shared-utils'

/******************************************************************************
 ** 谷歌搜索
 **   - https://www.google.com/search?q=mmPlayer
 **   - https://www.google.com/search?q=茂茂物语
 ******************************************************************************/
const sites: SiteModule = [
  [
    '谷歌搜索',
    /^google\.com/,
    {
      transform: {
        // selector: 'a[href^="/url?"][href*="url="]',
        selector: ['a[jsname][href][data-jsarwt]', 'a[jsname][href][ping]'].join(','),
        customTransform(node) {
          node.setAttribute('data-jrwt', '1')
          node.removeAttribute('ping')

          const match = (node.getAttribute('href') || '').match(/\?(.*)/)
          if (match) {
            const searchParams = new URLSearchParams(match[1])
            const url = searchParams.get('url')
            if (url && validateUrl(url)) {
              node.setAttribute('href', url)
            }
          }
        },
      },
    },
  ],
]

export default sites
