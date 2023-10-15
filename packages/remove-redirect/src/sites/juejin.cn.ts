/******************************************************************************
 ** 掘金
 **   - https://juejin.cn/post/6844903608622956557
 **   - https://link.juejin.cn/?target=https%3A%2F%2Ffe-mm.com
 **   - https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '掘金',
    'juejin.cn',
    {
      transform: {
        selector: '[href*="link.juejin.cn?target="]',
      },
    },
  ],
  [
    ,
    'link.juejin.cn',
    {
      autojump: {},
    },
  ],
]

export default sites
