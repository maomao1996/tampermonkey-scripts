import { expect, test } from '@playwright/test'
import { getTransformUrl, testRedirectRemoval } from '../utils/common'

test('微信链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi?midpagecode=e2faa0ee03e19e6efecf869b7f9ca0522c68d4854df6fbfa04376e4e5a76fb68051eaf8948fea39790a1cd7df4a64a26&bancode=89d3568371f79149d12922166481d28a6da76ea9bfcc9e3cdaf42f8eede7f10b',
    'https://www.douyin.com',
  )
})

test('微信开放社区链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://developers.weixin.qq.com/community/middlepage/href?href=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('QQ邮箱链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://mail.qq.com/cgi-bin/readtemplate?t=safety&check=false&gourl=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('PC版QQ链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://c.pc.qq.com/middlem.html?pfurl=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('腾讯文档链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://docs.qq.com/scenario/link.html?url=https%3A%2F%2Ffe-mm.com',
    'https://fe-mm.com/',
  )
})

test('腾讯兔小巢链接重定向移除', async ({ page, context }) => {
  await testRedirectRemoval(
    page,
    context,
    'https://txc.qq.com/embed/phone/606094/link-jump?jump=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts',
    'https://github.com/maomao1996/tampermonkey-scripts',
  )
})

