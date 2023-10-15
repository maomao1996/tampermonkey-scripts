/******************************************************************************
 ** YouTube
 **   - https://www.youtube.com/watch?v=c5vGiaTudPc
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
    },
  ],
]

export default sites
