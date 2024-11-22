import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('金山文档链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.kdocs.cn/office/link?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
