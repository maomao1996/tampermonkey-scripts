import { pathname } from 'src/utils'

/******************************************************************************
 ** 开源中国
 **   - https://www.oschina.net/news/226616/fish-shell-be-rewritten-rust
 **   - https://my.oschina.net/dingdayu/blog/867680
 **   - https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Ffe-mm.com
 **   - https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '开源中国',
    /^(?:my\.)?oschina\.net$/,
    {
      transform: {
        selector: '[href*="oschina.net/action/GoToLink?url="]',
        separator: 'GoToLink?url=',
      },
      autojump: {
        validator: () => pathname === '/action/GoToLink',
        queryName: 'url',
      },
    },
  ],
]

export default sites
