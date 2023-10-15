/******************************************************************************
 ** 知乎
 *
 **   - https://www.zhihu.com/question/29380608/answer/65298472
 **   - https://zhuanlan.zhihu.com/p/472361432
 *
 **   - https://link.zhihu.com/?target=https%3A%2F%2Ffe-mm.com
 **   - https://link.zhihu.com/?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '知乎、知乎专栏',
    /^(?:zhuanlan\.)?zhihu\.com$/,
    {
      transform: {
        selector: '[href*="link.zhihu.com/?target="]',
      },
    },
  ],
  [
    ,
    'link.zhihu.com',
    {
      autojump: {},
    },
  ],
]

export default sites
