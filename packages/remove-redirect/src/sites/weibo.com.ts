import { pathname } from 'src/utils'

/******************************************************************************
 ** 微博
 **   - https://weibo.com/u/1400854834
 **   - https://weibo.cn/sinaurl?u=https%3A%2F%2Ffe-mm.com
 **   - https://weibo.cn/sinaurl?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '微博',
    'weibo.com',
    {
      transform: {
        selector: '[href*="weibo.cn/sinaurl?u="]',
        queryName: 'u',
      },
    },
  ],
  [
    ,
    'weibo.cn',
    {
      autojump: {
        validator: () => pathname === '/sinaurl',
        queryName: 'u',
      },
    },
  ],
]

export default sites
