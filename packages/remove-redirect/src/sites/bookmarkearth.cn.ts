import { validateUrl } from '@femm/shared-utils'
import { defineSite } from 'src/utils'

/******************************************************************************
 ** 书签地球
 **   - https://www.bookmarkearth.cn
 **   - https://www.bookmarkearth.cn/view/a61cf21a93d711edb9f55254005bdbf9
 ******************************************************************************/
const sites = [
  defineSite([
    '书签地球',
    'bookmarkearth.cn',
    {
      transform: {
        selector: 'a[href*="/view/"][data-ext]',
        customTransform(node) {
          const originUrl = decodeURIComponent(node.getAttribute('data-ext') || '')
          if (validateUrl(originUrl)) {
            node.href = originUrl
          }
        },
      },
      autojump: {
        validator: ({ pathname }) =>
          /^\/view\//.test(pathname) && !!document.querySelector('.jump-target-url'),
        getOriginalUrl: () => document.querySelector('.jump-target-url')!.getAttribute('data-url'),
      },
    },
  ]),
]

export default sites
