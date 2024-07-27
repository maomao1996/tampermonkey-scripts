/******************************************************************************
 ** 语雀
 **   - https://www.yuque.com/r/goto?url=https%3A%2F%2Ffe-mm.com
 **   - https://www.yuque.com/r/goto?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 **   - https://bcdh.yuque.com/r/goto?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '语雀',
    /^(?:[a-zA-Z0-9-]+\.)?yuque\.com$/,
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/r/goto',
        queryName: 'url',
      },
    },
  ],
]

export default sites
