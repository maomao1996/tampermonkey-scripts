/******************************************************************************
 ** pixiv
 **   - https://www.pixiv.net/artworks/105069080
 **   - https://www.pixiv.net/users/49552835
 ******************************************************************************/
const sites: SiteModule = [
  [
    'pixiv',
    'pixiv.net',
    {
      transform: {
        selector: '[href*="/jump.php?"]',
        separator: '?',
        queryName: 'url',
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
