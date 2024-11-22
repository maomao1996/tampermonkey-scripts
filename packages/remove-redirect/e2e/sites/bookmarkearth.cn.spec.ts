import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('书签地球链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://www.bookmarkearth.cn/view/a61cf21a93d711edb9f55254005bdbf9',
    'https://netease-music.fe-mm.com/#/music/playlist',
  )
})

test('书签地球 transform', async ({ page, context }) => {
  const href = await getTransformUrl(
    page,
    context,
    'https://www.bookmarkearth.cn/detail/221486638f5f4c2aa9139d08bd1bcfd2',
    {
      selectDomPath:
        '#container > div > div.content-point > ul > li > ul > li:nth-child(1) > ul > li > a:nth-child(1)',
      noWait: true,
    },
  )
  expect(href).not.toMatch(/^https\:\/\/www\.bookmarkearth\.comm/)
})
