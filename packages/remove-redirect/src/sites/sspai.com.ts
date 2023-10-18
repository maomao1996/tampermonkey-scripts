/******************************************************************************
 ** 少数派
 **   - https://sspai.com/post/71216
 **   - https://sspai.com/link?target=https%3A%2F%2Ffe-mm.com
 **   - https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '少数派',
    'sspai.com',
    {
      transform: {
        selector: '[href*="sspai.com/link?target="]',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/link',
      },
    },
  ],
]

export default sites
