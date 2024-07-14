import { validateUrl } from '@femm/shared-utils'
import { defineSite } from 'src/utils'

/******************************************************************************
 ** 360 搜索
 **   - https://www.so.com/s?q=mmPlayer
 **   - https://www.so.com/s?q=es6
 **   - https://www.so.com/s?q=武林外传
 ******************************************************************************/
const sites = [
  defineSite([
    '360 搜索',
    'so.com',
    {
      transform: {
        selector: 'a[href*="so.com/link?"][data-mdurl]',
        customTransform(node) {
          const originUrl = node.getAttribute('data-mdurl')
          if (validateUrl(originUrl)) {
            node.setAttribute('href', originUrl!)
          }
        },
      },
    },
  ]),
]

export default sites
