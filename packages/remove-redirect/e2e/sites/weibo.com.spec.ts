import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('微博链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://weibo.cn/sinaurl?u=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
