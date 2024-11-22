import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('链滴链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://ld246.com/forward?goto=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
    {
      urlWaitUntil: 'domcontentloaded',
      redirectNum: 1,
    },
  )
})
