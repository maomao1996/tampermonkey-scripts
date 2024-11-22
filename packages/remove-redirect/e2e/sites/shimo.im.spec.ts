import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('石墨文档链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://shimo.im/outlink/gray?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
