import { test } from '@playwright/test'
import { testRedirectRemoval } from '../utils/common'

test('Facebook链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.facebook.com/flx/warn/?u=https%3A%2F%2Ffe-mm.com%2F&h=AT3rQZSh11Lt_BU05Y5GdcM4AnpqrnDK2c2xhNUvIxzo6_VKIzItCrEi6udhWA6mMnQxUKCpO20vWTt-sJXSY3k_VQOBKA4SjWPIxQP_A78sEgVKHJuMM38',
    'https://fe-mm.com/',
  )
})
