import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('Steam 社区链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts',
    'https://github.com/maomao1996/tampermonkey-scripts',
  )
})
