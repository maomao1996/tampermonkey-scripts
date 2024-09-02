import { validateUrl } from '@femm/shared-utils'
import { defineSite } from 'src/utils'

const BAIDU_RE = /^(http:\/\/[^.]+\.[^.]+\.baidu\.com|https:\/\/baike\.baidu\.com)/

const sites = [
  /******************************************************************************
   ** 百度搜索
   **   - https://www.baidu.com/s?wd=mmPlayer
   **   - https://www.baidu.com/s?wd=es6
   **   - https://www.baidu.com/s?wd=武林外传
   **   - https://www.baidu.com/s?wd=实现简单的实时渲染器
   ******************************************************************************/
  defineSite([
    '百度搜索',
    'baidu.com',
    {
      transform: {
        selector: '#content_left > [mu]',
        fallbackSelector: 'a[href*="baidu.com/link?url="]',
        customTransform(node) {
          const originUrl = node.getAttribute('mu')!
          /**
           ** 特殊的链接：
           **   - 重定向 http://nourl.ubs.baidu.com/51270
           **   - 快捷搜索 http://28608.recommend_list.baidu.com
           **   - 短视频 http://3108.lightapp.baidu.com/%CE%E4%C1%D6%CD%E2%B4%AB
           */
          if (validateUrl(originUrl) && !BAIDU_RE.test(originUrl)) {
            node
              .querySelectorAll('div[has-tts] a[href*="baidu.com/link?url="]')
              .forEach((a) => a.setAttribute('href', originUrl))
          }
        },
      },
    },
  ]),
  /******************************************************************************
   ** 百度贴吧
   **   - https://tieba.baidu.com/p/8863884278
   **   - https://tieba.baidu.com/mo/q/checkurl?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   ******************************************************************************/
  defineSite([
    '百度贴吧',
    /^(jump|jump2)\.bdimg\.com$/,
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/safecheck/index',
        queryName: 'url',
        selector: 'a.btn.btn-next[href]',
      },
    },
  ]),
  defineSite([
    ,
    'tieba.baidu.com',
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/mo/q/checkurl',
        queryName: 'url',
        selector: '.btns span.j_next',
      },
    },
  ]),
]

export default sites
