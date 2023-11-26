/******************************************************************************
 ** 金山文档
 **   - https://www.kdocs.cn/office/link?target=https%3A%2F%2Ffe-mm.com
 **   - https://www.kdocs.cn/office/link?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '金山文档',
    'kdocs.cn',
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/office/link',
      },
    },
  ],
]

export default sites
