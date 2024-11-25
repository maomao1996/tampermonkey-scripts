import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('开源中国链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('开源中国 transform', async ({ page, context }) => {
  const href = await getTransformUrl(
    page,
    context,
    'https://www.oschina.net/news/226616/fish-shell-be-rewritten-rust',
    {
      selectDomPath:
        '#mainScreen > div.home-container > div > div.detail-body-box > div:nth-child(2) > div.main-box > div > div.article-box.box-card.box-card--shadow > div > div.article-box__content > div.detail-box > div.article-detail > div > ol > li:nth-child(1) > a',
    },
  )
  expect(href).toBe('https://www.rust-lang.org/tools/install')
})
