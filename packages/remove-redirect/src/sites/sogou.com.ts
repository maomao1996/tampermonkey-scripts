import { validateUrl } from '@femm/shared-utils'
import { defineSite } from 'src/utils'

/******************************************************************************
 ** 搜狗搜索
 **   - https://sogou.com/web?query=mmPlayer
 **   - https://sogou.com/web?query=武林外传
 **
 **   - https://m.sogou.com/web/searchList.jsp?keyword=mmPlayer
 ******************************************************************************/
const sites = [
  defineSite<HTMLDivElement>([
    '搜狗搜索',
    'sogou.com',
    {
      transform: {
        selector: '.results .vrwrap',
        customTransform(node) {
          const dataNode = node.querySelector<HTMLDivElement>('[data-url]')
          if (dataNode) {
            const originUrl = dataNode.dataset.url!
            if (validateUrl(originUrl)) {
              node
                .querySelectorAll<HTMLAnchorElement>('a[href*="/link?url="]')
                .forEach((a) => a.setAttribute('href', originUrl))
            }
          }
        },
      },
    },
  ]),
  defineSite([
    ,
    'm.sogou.com',
    {
      transform: {
        selector: 'a[href^="./id="]',
        queryName: 'url',
      },
    },
  ]),
]

export default sites
