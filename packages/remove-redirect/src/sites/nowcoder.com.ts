/******************************************************************************
 ** 牛客网
 **   - https://www.nowcoder.com/interview/center
 **   - https://www.nowcoder.com/discuss/451073381044064256
 **   - https://hd.nowcoder.com/link.html?target=https%3A%2F%2Ffe-mm.com
 **   - https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Ffe-mm.com
 ******************************************************************************/
const sites: SiteModule = [
  [
    '牛客网',
    'nowcoder.com',
    {
      transform: {
        selector: [
          // 列表描述信息
          '[href*="gw-c.nowcoder.com/api/sparta/jump/link?link="]',
          // 详情和弹窗
          '[href*="hd.nowcoder.com/link.html?target="]',
        ].join(','),
        separator: /\?target|link\=/,
      },
    },
  ],
  [
    ,
    'hd.nowcoder.com',
    {
      autojump: {},
    },
  ],
]

export default sites
