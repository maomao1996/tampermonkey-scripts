import test, { expect } from '@playwright/test'
import { getTransformUrl } from '../utils/common'

test('搜狗搜索 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://www.sogou.com/web?query=mmPlayer', {
    selectDomPath: '#sogou_vr_30000000_0',
  })
  expect(href).not.toMatch(/^\/link\?/)
})
