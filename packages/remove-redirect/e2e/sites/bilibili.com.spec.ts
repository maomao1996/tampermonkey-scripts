import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('哔哩哔哩游戏WIKI链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://game.bilibili.com/linkfilter/?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
