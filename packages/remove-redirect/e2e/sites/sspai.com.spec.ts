import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('少数派链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://sspai.com/link?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('少数派 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://sspai.com/post/71216', {
    selectDomPath:
      '#article-title > div.articleWidth-content > div.content.wangEditor-txt.minHeight > p:nth-child(5) > a:nth-child(1)',
    noWait: true,
  })
  expect(href).toBe('https://github.com/BlackINT3/OpenArk/')
})
