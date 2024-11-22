import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('爱发电链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://afdian.com/link?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('爱发电 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://afdian.com/a/evanyou', {
    selectDomPath:
      'div.wrapper.app-view > div.vm-page > section.page-content-w100 > div > div.content-left.max-width-320 > div.gl-card.mq-0-1 > pre > a',
  })
  expect(href).toBe('https://cn.vuejs.org/sponsor/')
})
