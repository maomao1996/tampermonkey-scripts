/******************************************************************************
 ** 哔哩哔哩游戏WIKI
 **   - https://game.bilibili.com/linkfilter/?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '哔哩哔哩游戏WIKI',
    'game.bilibili.com',
    {
      autojump: {
        validator: ({ pathname }) => pathname.includes('/linkfilter/'),
        queryName: 'url',
      },
    },
  ],
]

export default sites
