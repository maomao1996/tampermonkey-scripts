/******************************************************************************
 ** 简书
 **   - https://www.jianshu.com/p/28788506c0da
 **   - https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Ffe-mm.com
 **   - https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '简书',
    'jianshu.com',
    {
      transform: {
        selector: '[href*="links.jianshu.com/go?to="]',
        separator: 'go?to=',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/go-wild',
        queryName: 'url',
      },
    },
  ],
]

export default sites
