/******************************************************************************
 ** 花瓣网
 **   - https://huaban.com/pins/5108412769
 ******************************************************************************/
const sites: SiteModule = [
  [
    '花瓣网',
    'huaban.com',
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/go',
        selector: '.wrapper button.ant-btn',
      },
    },
  ],
]

export default sites
