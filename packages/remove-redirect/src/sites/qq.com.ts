const sites: SiteModule = [
  /******************************************************************************
   ** 微信
   **   无跳转按钮
   **   - https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi?midpagecode=e2faa0ee03e19e6efecf869b7f9ca0522c68d4854df6fbfa04376e4e5a76fb68051eaf8948fea39790a1cd7df4a64a26&bancode=89d3568371f79149d12922166481d28a6da76ea9bfcc9e3cdaf42f8eede7f10b
   **   有跳转按钮
   **   - https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi?midpagecode=67377a2adb44e17c1b0adb24b5cf2bd12c34d9b56e06ccd6dd4c291b423b5bd7ff6dabdc557c992f5d60d892b6870f746be01453da89926dc75a288449d95675652f50f2dd8613b8c0898d7a4ff50cd6a8a6ee035f2795d1b47d37610595ed36a216a3feb0e7c625dacf7da1ce72ca0d27ebe250ee33a4fffe70fb8109ce95d1&bancode=bd156c95934ef352f7478771d0b739c7d1d06b36a093e9591226c240bbb591b4
   ******************************************************************************/
  [
    '微信',
    'weixin110.qq.com',
    {
      autojump: {
        validator: ({ pathname }) =>
          pathname === '/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi',
        getOriginalUrl: () =>
          document.querySelector<HTMLElement>('.weui-msg p.weui-msg__desc')!.textContent,
        selector: 'a.weui-btn.weui-btn_default',
      },
    },
  ],
  /******************************************************************************
   ** 微信开放社区
   **   - https://developers.weixin.qq.com/community/develop/article/doc/000ecc775a86807f7ba9b7dc956c13
   **   - https://developers.weixin.qq.com/community/middlepage/href?href=https%3A%2F%2Ffe-mm.com
   **   - https://developers.weixin.qq.com/community/middlepage/href?href=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   ******************************************************************************/
  [
    '微信开放社区',
    'developers.weixin.qq.com',
    {
      rewriteWindowOpen: {
        validationRule: '/community/middlepage/href?href=',
        queryName: 'href',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/community/middlepage/href',
        queryName: 'href',
      },
    },
  ],
  /******************************************************************************
   ** QQ 邮箱
   **   - https://mail.qq.com/cgi-bin/readtemplate?t=safety&check=false&gourl=https%3A%2F%2Fwww.jetbrains.com
   **   - https://mail.qq.com/cgi-bin/readtemplate?t=safety&check=false&gourl=https%3A%2F%2Ffe-mm.com
   **   - https://mail.qq.com/cgi-bin/readtemplate?t=safety&check=false&gourl=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   ******************************************************************************/
  [
    'QQ 邮箱',
    'mail.qq.com',
    {
      rewriteWindowOpen: {
        validationRule: 'url=',
        queryName: 'url',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/cgi-bin/readtemplate',
        selector: 'div.c-footer a.c-footer-a1',
        queryName: 'gourl',
      },
    },
  ],
  /******************************************************************************
   ** PC 版 QQ
   **   -  https://c.pc.qq.com/middlem.html?pfurl=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   **   -  https://c.pc.qq.com/middleb.html?pfurl=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   **   -  https://c.pc.qq.com/pc.html?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   **   -  https://c.pc.qq.com/ios.html?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   **   -  https://c.pc.qq.com/android.html?url=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   **   -  https://c.pc.qq.com/middlect.html?pfurl=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   ******************************************************************************/
  [
    'PC 版 QQ',
    'c.pc.qq.com',
    {
      autojump: {
        // validator: ({ pathname }) => /^\/(middleb|middlem|pc|ios|android)\.html$/.test(pathname),
        validator: ({ pathname }) => /^\/[a-z]+\.html$/.test(pathname),
        queryName: ['pfurl', 'url'],
      },
    },
  ],
  /******************************************************************************
   ** 腾讯文档
   **   - https://docs.qq.com/doc/DTUtISURFbFN3RFVu
   **   - https://docs.qq.com/scenario/link.html?url=https%3A%2F%2Fnotes.fe-mm.com
   ******************************************************************************/
  [
    '腾讯文档',
    'docs.qq.com',
    {
      autojump: {
        validator: ({ pathname }) => pathname === '/scenario/link.html',
        // selector: '.url-tips .url-click',
        queryName: 'url',
      },
    },
  ],
  /******************************************************************************
   ** 腾讯兔小巢
   **   - https://txc.qq.com/products/606094/
   **   - https://txc.qq.com/products/606094/faqs-more?id=149310
   **   - https://txc.qq.com/products/606094/blog/777398
   **   - https://txc.qq.com/products/606094/link-jump?jump=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   **   - https://txc.qq.com/embed/phone/606094/link-jump?jump=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
   **
   **   - https://support.qq.com/products/1368
   ******************************************************************************/
  [
    '腾讯兔小巢',
    /(txc|support)\.qq\.com/,
    {
      transform: {
        selector: 'a[href*="/link-jump?jump="]',
        queryName: 'jump',
      },
      autojump: {
        validator: ({ pathname }) => /\/link-jump$/.test(pathname),
        queryName: 'jump',
      },
    },
  ],
]

export default sites
