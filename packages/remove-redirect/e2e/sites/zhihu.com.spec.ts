import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('知乎链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://link.zhihu.com/?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
