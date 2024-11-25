import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('牛客网链接重定向移除 - hd域名', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://hd.nowcoder.com/link.html?target=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('牛客网链接重定向移除 - gw-c域名', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
    {
      redirectNum: 2,
    },
  )
})

test('牛客网 transform', async ({ page, context }) => {
  const href = await getTransformUrl(
    page,
    context,
    'https://www.nowcoder.com/discuss/451073381044064256',
    {
      selectDomPath:
        '#jsApp > main > div > div > div > section > div:nth-child(3) > div > div > section.post-content-box.tw-relative > div.nc-slate-editor-content > p:nth-child(27) > a',
    },
  )
  expect(href).toBe('https://leetcode.cn/problems/longest-substring-without-repeating-characters/')
})
