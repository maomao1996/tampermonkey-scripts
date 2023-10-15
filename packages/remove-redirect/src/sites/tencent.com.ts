import { pathname } from 'src/utils'

/******************************************************************************
 ** 腾讯云开发者社区
 **   - https://cloud.tencent.com/developer/article/1829900
 **   - https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Ffe-mm.com
 **   - https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '腾讯云开发者社区',
    'cloud.tencent.com',
    {
      transform: {
        selector: '[href*="/developer/tools/blog-entry?target="]',
      },
      autojump: {
        validator: () => pathname === '/developer/tools/blog-entry',
        // click: '.mod-external-link-btn a'
      },
    },
  ],
]

export default sites
