/******************************************************************************
 ** 链滴
 **   - https://ld246.com/article/1704204876718
 ******************************************************************************/
const sites: SiteModule = [
  [
    '链滴',
    'ld246.com',
    {
      transform: {
        selector: '[href*="/forward?goto="]',
        queryName: 'goto',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/forward',
        selector: '.text a[href]',
        queryName: 'goto',
      },
    },
  ],
]

export default sites
