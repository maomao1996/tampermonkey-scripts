/******************************************************************************
 ** Instagram
 **   - https://www.instagram.com/jaychou
 **   - https://www.instagram.com/linkshim/?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts&e=AT3Mdb540GAp6eHsU0Z_QGrlAc5-VgTKBSWUnq0lwzTDCfOTdT-GR2LIFutHYByEP2A0ql_mLpeU9oe1IuxVdisH-sh2AO2xwj6br5GuXjDODuX8zrwUIjYbkiya3t61XE3p3io
 **   - https://l.instagram.com/?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts&e=AT3Mdb540GAp6eHsU0Z_QGrlAc5-VgTKBSWUnq0lwzTDCfOTdT-GR2LIFutHYByEP2A0ql_mLpeU9oe1IuxVdisH-sh2AO2xwj6br5GuXjDODuX8zrwUIjYbkiya3t61XE3p3io
 ******************************************************************************/
const sites: SiteModule = [
  [
    'Instagram',
    /^(?:l\.)?instagram\.com$/,
    {
      transform: {
        selector: '[href*="l.instagram.com/?u="]',
        queryName: 'u',
      },
      rewriteWindowOpen: {
        validationRule: 'l.instagram.com/?u=',
        queryName: 'u',
      },
      autojump: {
        validator: ({ search }) => search.includes('u='),
        queryName: 'u',
      },
    },
  ],
]

export default sites
