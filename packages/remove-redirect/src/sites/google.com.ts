import { validateUrl } from '@femm/shared-utils'

const sites: SiteModule = [
  /******************************************************************************
   ** Google 搜索
   **   - https://www.google.com/search?q=mmPlayer
   **   - https://www.google.com/search?q=茂茂物语
   ******************************************************************************/
  [
    'Google 搜索',
    /^google\.com/,
    {
      transform: {
        // selector: 'a[href^="/url?"][href*="url="]',
        selector: ['a[jsname][href][data-jsarwt]', 'a[jsname][href][ping]'].join(','),
        customTransform(node) {
          node.setAttribute('data-jrwt', '1')
          node.removeAttribute('ping')

          const match = (node.getAttribute('href') || '').match(/\?(.*)/)
          if (match) {
            const searchParams = new URLSearchParams(match[1])
            const url = searchParams.get('url')
            if (url && validateUrl(url)) {
              node.setAttribute('href', url)
            }
          }
        },
      },
    },
  ],
  /******************************************************************************
   ** Google 重定向页
   **   - https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts&sa=D&source=docs
   **   - https://www.google.com.hk/url?q=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts&sa=D&source=docs
   **   - https://www.google.co.jp/url?q=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts&sa=D&source=docs
   ******************************************************************************/
  [
    'Google 重定向页',
    /^google\.(com|com?\.[a-z]{2}|[a-z]{2})$/,
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/url',
        queryName: 'q',
      },
    },
  ],
]

export default sites
