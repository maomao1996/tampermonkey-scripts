import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('码云链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://gitee.com/link?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('码云 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://gitee.com/mirrors/vue-mmplayer', {
    selectDomPath:
      '#git-readme > div > div.readme-content > div.file_content.markdown-body > blob-markdown-renderer > ul:nth-child(4) > li:nth-child(1) > a',
  })
  expect(href).toBe('https://netease-music.fe-mm.com/')
})
