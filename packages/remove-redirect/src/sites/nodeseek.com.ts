/******************************************************************************
 ** NodeSeek
 **   - https://www.nodeseek.com/post-128140-1
 **   - https://www.nodeseek.com/jump?to=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    'NodeSeek',
    'nodeseek.com',
    {
      transform: {
        selector: 'a[href^="/jump?to="]',
        queryName: 'to',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/jump',
        queryName: 'to',
      },
    },
  ],
]

export default sites
