/******************************************************************************
 ** pixiv
 **   - https://www.pixiv.net/artworks/105069080
 ******************************************************************************/
const sites: SiteModule = [
  [
    'pixiv',
    'pixiv.net',
    {
      transform: {
        selector: '[href*="/jump.php?"]',
        separator: '?',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/jump.php',
        selector: 'a[href]',
        separator: '?',
      },
    },
  ],
]

export default sites
