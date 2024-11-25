import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('百度贴吧重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://tieba.baidu.com/mo/q/checkurl?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})
test('百度搜索 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://www.baidu.com/s?wd=mmPlayer', {
    selectDomPath: '#content_left  a',
  })
  expect(href).not.toMatch(/^https\:\/\/www\.baidu\.comm/)
})
