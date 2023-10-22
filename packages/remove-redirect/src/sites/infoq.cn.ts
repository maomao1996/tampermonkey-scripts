/******************************************************************************
 ** InfoQ
 **   - https://www.infoq.cn/article/pcy0BDHgmVWzmrTWIHqV
 **   - https://www.infoq.cn/link?target=https%3A%2F%2Fnodejs.dev%2Fen%2Fabout%2Freleases%2F
 **   - https://www.infoq.cn/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 **
 **   - https://xie.infoq.cn/article/aad4610523c72781f0dd5b5b7
 **   - https://xie.infoq.cn/link?target=https%3A%2F%2Fnodejs.dev%2Fen%2Fabout%2Freleases%2F
 **   - https://xie.infoq.cn/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    'InfoQ',
    /^(?:xie\.)?infoq\.cn$/,
    {
      rewriteWindowOpen: {
        validationRule: 'infoq.cn/link?target=',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/link',
      },
    },
  ],
]

export default sites
