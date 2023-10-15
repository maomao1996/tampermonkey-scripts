import { pathname } from 'src/utils'

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
        validator: () => pathname === '/jump.php',
        selector: 'a[href]',
        separator: '?',
      },
    },
  ],
]

export default sites
