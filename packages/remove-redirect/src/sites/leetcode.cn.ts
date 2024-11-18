/******************************************************************************
 ** 力扣（Leetcode）
 **   - https://leetcode.cn/problems/merge-intervals/solutions/204805/chi-jing-ran-yi-yan-miao-dong-by-sweetiee/
 **   - https://leetcode.cn/link/?target=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    '力扣（Leetcode）',
    'leetcode.cn',
    {
      transform: {
        selector: '[href*="/link/?target="]',
      },
      autojump: {
        validator: ({ pathname }) => pathname === '/link/',
        queryName: 'target',
      },
    },
  ],
]

export default sites
