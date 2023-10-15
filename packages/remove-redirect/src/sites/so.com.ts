import { validateUrl } from '@femm/shared-utils'

/******************************************************************************
 ** 360 搜索
 **   - https://www.so.com/s?q=mmPlayer
 **   - https://www.so.com/s?q=es6
 **   - https://www.so.com/s?q=武林外传
 ******************************************************************************/
const sites: SiteModule = [
  [
    '360 搜索',
    'so.com',
    {
      transform: {
        selector: '.result li.res-list',
        customTransform(node) {
          const originUrl = node.querySelector('a[data-mdurl]')?.getAttribute('data-mdurl')
          if (validateUrl(originUrl)) {
            const isVideo = node.querySelector('[data-mohe-type="svideo_top"]')

            node
              .querySelectorAll(isVideo ? 'h3 a' : 'a')
              .forEach((a) => a.setAttribute('href', originUrl!))
          }
        },
      },
    },
  ],
]

export default sites
