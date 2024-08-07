import { validateUrl } from '@femm/shared-utils'
import { defineSite } from 'src/utils'

/******************************************************************************
 ** Twitter
 **   - https://twitter.com
 **   - https://twitter.com/vuejs
 **   - https://x.com
 **   - https://x.com/vuejs
 ******************************************************************************/
const sites = [
  defineSite([
    '推特（Twitter）',
    /^(twitter|x)\.com$/,
    {
      transform: {
        selector: 'a[href*="://t.co/"]',
        customTransform(node) {
          const originUrl = node.innerText.replace('…', '')
          if (validateUrl(originUrl)) {
            node.setAttribute('href', originUrl)
          }
        },
      },
    },
  ]),
]

export default sites
