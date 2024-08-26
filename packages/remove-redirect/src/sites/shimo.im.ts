/******************************************************************************
 ** 石墨文档
 **   - https://shimo.im/docs/B1AwdzJNe1FGwe3m
 **   - https://shimo.im/outlink/gray?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '石墨文档',
    'shimo.im',
    {
      rewriteWindowOpen: {
        validationRule: 'outlink/gray?url=',
        queryName: 'url',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/outlink/gray',
        // validator: ({ search }) => search.includes('?url=http'),
        queryName: 'url',
      },
    },
  ],
]

export default sites
