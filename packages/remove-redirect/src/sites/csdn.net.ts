/******************************************************************************
 ** CSDN
 **   - https://blog.csdn.net/LoseInVain/article/details/122735603
 **   - https://link.csdn.net/?target=https%3A%2F%2Ffe-mm.com
 **   - https://link.csdn.net/?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    ,
    'blog.csdn.net',
    {
      rewriteWindowOpen: {
        validationRule: 'link.csdn.net?target=',
      },
    },
  ],
  [
    'CSDN',
    'link.csdn.net',
    {
      autojump: {},
    },
  ],
]

export default sites
