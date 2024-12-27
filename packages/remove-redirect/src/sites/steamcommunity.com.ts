/******************************************************************************
 ** Steam 社区
 **   - https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    'Steam 社区',
    'steamcommunity.com',
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/linkfilter/',
        queryName: 'u',
      },
    },
  ],
]

export default sites
