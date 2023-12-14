/******************************************************************************
 ** YouTube
 **   - https://www.youtube.com/watch?v=c5vGiaTudPc
 **   - https://www.youtube.com/redirect?&q=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    'YouTube',
    'youtube.com',
    {
      transform: {
        selector: '[href*="youtube.com/redirect?event="]',
        queryName: 'q',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/redirect',
        queryName: 'q',
      },
    },
  ],
]

export default sites
