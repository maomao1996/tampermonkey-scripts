import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('ACG盒子链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.acgbox.link/go/?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
    {
      originalUrlWaitUntil: 'load',
    },
  )
})

test('ACG盒子 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://www.acgbox.link/h/58.html', {
    selectDomPath:
      '#content > div.row.site-content.py-4.py-md-5.mb-xl-5.mb-0.mx-xxxl-n5 > div.col.mt-4.mt-sm-0 > div > div > div.site-go.mt-3 > span > a',
  })
  expect(href).toBe('https://www.pixiv.net/')
})
