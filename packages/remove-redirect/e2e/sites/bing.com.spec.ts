import test, { expect } from '@playwright/test'
import { getTransformUrl } from '../utils/common'

test('Bing 搜索', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://www.bing.com/search?q=mmPlayer', {
    selectDomPath: '#b_results > li.b_algo.b_vtl_deeplinks > h2 > a',
  })
  expect(href).not.toMatch(/^https\:\/\/www\.bing\.comm/)
})
