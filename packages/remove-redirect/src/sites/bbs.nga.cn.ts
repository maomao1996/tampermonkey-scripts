/******************************************************************************
 ** NGA 玩家社区
 **   - https://bbs.nga.cn/read.php?tid=38319227
 **   - https://ngabbs.com/read.php?tid=38319227
 **   - https://g.nga.cn/read.php?tid=38319227
 ******************************************************************************/

const REMOVE_ATTRS = ['onclick', 'onmouseover', 'onmouseout']

const sites: SiteModule = [
  [
    'NGA 玩家社区',
    /^(bbs\.nga\.cn|ngabbs\.com|g\.nga\.cn)$/,
    {
      transform: {
        selector: 'a[target="_blank"][onclick*="showUrlAlert"]',
        customTransform(node) {
          REMOVE_ATTRS.forEach((attr) => node.removeAttribute(attr))
        },
      },
    },
  ],
]

export default sites
