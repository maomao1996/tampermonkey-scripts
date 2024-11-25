import test, { expect } from '@playwright/test'
import { getTransformUrl } from '../utils/common'

test('360 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://www.so.com/s?q=mmPlayer', {
    selectDomPath: '#main > ul > li:nth-child(1) > h3 > a',
  })
  expect(href).not.toMatch(/^https\:\/\/www\.so\.com/)
})
