import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('力扣链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://leetcode.cn/link/?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
