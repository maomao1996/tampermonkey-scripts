import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('简书链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('简书 transform', async ({ page, context }) => {
  const href = await getTransformUrl(page, context, 'https://www.jianshu.com/p/28788506c0da', {
    selectDomPath:
      '#__next > div._21bLU4._3kbg6I > div > div > section:nth-child(1) > article > p:nth-child(4) > a',
  })
  expect(href).toBe('https://pan.baidu.com/s/1ccvNa3TrmkaWdgU1nhLvGw?pwd=b5t8')
})
