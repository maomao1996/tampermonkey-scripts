import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('掘金链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://link.juejin.cn/?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('掘金 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://juejin.cn/post/6844903608622956557', {
    selectDomPath: '#article-root > div > blockquote:nth-child(5) > p > a',
  })
  expect(href).toBe('https://binaryify.github.io/NeteaseCloudMusicApi')
})
