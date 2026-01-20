/******************************************************************************
 ** GitCode
 **   - https://gitcode.com/yangzongzhuan/RuoYi-Vue3
 **   - https://link.gitcode.com/?target=https%3A%2F%2Fnotes.fe-mm.com
 ******************************************************************************/
const sites: SiteModule = [
  [
    'GitCode',
    'gitcode.com',
    {
      rewriteWindowOpen: {
        validationRule: 'link.gitcode.com/?target=',
        queryName: 'target',
      },
    },
  ],
  [
    ,
    'link.gitcode.com',
    {
      autojump: {},
    },
  ],
]

export default sites
