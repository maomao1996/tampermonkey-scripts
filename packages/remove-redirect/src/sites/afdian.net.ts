import { pathname } from 'src/utils'

/******************************************************************************
 ** 爱发电
 **   - https://afdian.net/a/evanyou
 **   - https://afdian.net/link?target=https%3A%2F%2Ffe-mm.com
 **   - https://afdian.net/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '爱发电',
    'afdian.net',
    {
      transform: {
        selector: '[href*="afdian.net/link?target="]',
      },
      autojump: {
        validator: () => pathname === '/link',
      },
    },
  ],
]

export default sites
