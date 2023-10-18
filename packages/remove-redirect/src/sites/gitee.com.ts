/******************************************************************************
 ** 码云
 **   - https://gitee.com/mirrors/vue-mmplayer
 **   - https://gitee.com/link?target=https%3A%2F%2Ffe-mm.com
 **   - https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '码云',
    'gitee.com',
    {
      transform: {
        selector: '[href*="gitee.com/link?target="]',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/link',
      },
    },
  ],
]

export default sites
