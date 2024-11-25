import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('豆瓣链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.douban.com/link2/?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
