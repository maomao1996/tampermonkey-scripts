/******************************************************************************
 ** 酷安
 **   - https://www.coolapk.com/link?url=https://www.lanzou.com
 ******************************************************************************/
const sites: SiteModule = [
  [
    '酷安',
    'coolapk.com',
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/link',
        queryName: 'url',
      },
    },
  ],
]

export default sites
