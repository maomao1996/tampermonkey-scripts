import { validateUrl } from '@femm/shared-utils'
import { defineSite } from 'src/utils'

/******************************************************************************
 ** ACG盒子
 **   - https://www.acgbox.link
 **   - https://www.acgbox.link/h/58.html
 **   - https://www.acgbox.link/go/?url=aHR0cHM6Ly93d3cucGl4aXYubmV0Lw%3D%3D
 ******************************************************************************/
const sites = [
  defineSite([
    'ACG盒子',
    'acgbox.link',
    {
      transform: {
        selector: 'a[href*="/go/?url"]',
        customTransform(node) {
          let originUrl = decodeURIComponent(node.href.split('?url=')[1])
          try {
            originUrl = atob(originUrl)
            if (validateUrl(originUrl)) {
              node.href = originUrl
            }
          } catch {}
        },
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/go/',
        selector: 'a.loading-btn',
      },
    },
  ]),
]

export default sites
