import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('花瓣网链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://huaban.com/go?pin_id=5108412769&url=weibo.com',
    'weibo.com',
  )
})
