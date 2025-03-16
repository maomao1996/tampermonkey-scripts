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
        validator: ({ pathname }) => pathname === '/sinaurl',
        queryName: 'u',
      },
    },
  ],
  /******************************************************************************
   ** 微博短链接
   **   - https://t.cn/A61RceZD
   ******************************************************************************/
  [
    '微博短链接',
    't.cn',
    {
      autojump: {
        getOriginalUrl: () => document.querySelector<HTMLSpanElement>('#textline')?.innerText,
        selector: '.open-url a',
      },
    },
  ],
]

export default sites
