import { validateUrl } from '@femm/shared-utils'

/******************************************************************************
 ** Twitter
 **   - https://twitter.com
 **   - https://twitter.com/vuejs
 ******************************************************************************/
const sites: SiteModule = [
  [
    '推特（Twitter）',
    'twitter.com',
    {
      transform: {
        selector: 'a[href*="://t.co/"]',
        customTransform(node) {
          const originUrl = node.innerText
          if (validateUrl(originUrl)) {
            node.setAttribute('href', originUrl)
          }
        },
      },
    },
  ],
]

export default sites
