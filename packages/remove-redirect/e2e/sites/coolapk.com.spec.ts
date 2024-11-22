import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('酷安链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.coolapk.com/link?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
