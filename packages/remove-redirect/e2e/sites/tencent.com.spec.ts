import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('腾讯云开发者社区链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2FVue-mmPlayer&objectId=1829900&objectType=1',
    'https://github.com/maomao1996/Vue-mmPlayer',
  )
})

test('腾讯云开发者社区 搜索', async ({ page, context }) => {
  const href = await getTransformUrl(
    page,
    context,
    'https://cloud.tencent.com/developer/article/1829900',
    {
      selectDomPath:
        '#__next > div > div > div.cdc-global__main > div > div > div.cdc-layout__main > div:nth-child(2) > div.mod-content > div.mod-content__markdown > div > div > p:nth-child(7) > a',
      noWait: true,
    },
  )
  expect(href).toBe('https://github.com/maomao1996/Vue-mmPlayer')
})
