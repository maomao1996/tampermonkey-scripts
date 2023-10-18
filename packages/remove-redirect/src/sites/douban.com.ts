/******************************************************************************
 ** 豆瓣
 **   - https://www.douban.com/link2/?url=https%3A%2F%2Ffe-mm.com
 **   - https://www.douban.com/link2/?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '豆瓣',
    'douban.com',
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/link2/',
        queryName: 'url',
      },
    },
  ],
]

export default sites
