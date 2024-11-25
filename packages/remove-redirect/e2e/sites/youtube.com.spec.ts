import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('YouTube链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.youtube.com/redirect?q=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
