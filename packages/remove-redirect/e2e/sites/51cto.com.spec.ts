import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('51cto blog redirect removal', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://blog.51cto.com/transfer?https://cloud.tencent.com/product/hai',
    'https://cloud.tencent.com/product/hai',
    {
      originalUrlWaitUntil: 'load',
    },
  )
})
