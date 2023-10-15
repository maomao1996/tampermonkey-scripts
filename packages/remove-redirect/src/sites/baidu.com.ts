import { validateUrl } from '@femm/shared-utils'

/******************************************************************************
 ** 百度
 **   - https://www.baidu.com/s?wd=mmPlayer
 **   - https://www.baidu.com/s?wd=es6
 **   - https://www.baidu.com/s?wd=武林外传
 ******************************************************************************/
const sites: SiteModule = [
  [
    '百度',
    'baidu.com',
    {
      transform: {
        selector: '#content_left > [mu]',
        customTransform(node) {
          const originUrl = node.getAttribute('mu')!
          /**
           ** 特殊的链接：
           **   - 重定向 http://nourl.ubs.baidu.com/51270
           **   - 快捷搜索 http://28608.recommend_list.baidu.com
           */
          if (validateUrl(originUrl) && !originUrl.includes('.baidu.com')) {
            node.querySelectorAll('a[href]').forEach((a) => a.setAttribute('href', originUrl))
          }
        },
      },
    },
  ],
]

export default sites
