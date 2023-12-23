/******************************************************************************
 ** Facebook
 **   - https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 **   - https://www.facebook.com/flx/warn/?u=https%3A%2F%2Fgithub.com%2Fmaomao1996%2Ftampermonkey-scripts
 ******************************************************************************/
const sites: SiteModule = [
  [
    'Facebook',
    /^(?:l\.)?facebook\.com$/,
    {
      // transform: {
      //   selector: 'a[target="_blank"]',
      //   customTransform(node) {
      //     node.addEventListener('click', (e: Event) => e.stopPropagation())
      //   },
      // },
      autojump: {
        validator: ({ search }) => search.includes('u='),
        queryName: 'u',
      },
    },
  ],
]

export default sites
