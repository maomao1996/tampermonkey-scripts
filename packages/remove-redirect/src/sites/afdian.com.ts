/******************************************************************************
 ** 爱发电
 **   - https://afdian.com/a/evanyou
 **   - https://afdian.com/link?target=https%3A%2F%2Ffe-mm.com
 **   - https://afdian.com/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '爱发电',
    'afdian.com',
    {
      transform: {
        selector: '[href*="afdian.com/link?target="]',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/link',
      },
    },
  ],
]

export default sites
