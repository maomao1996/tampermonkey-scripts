/******************************************************************************
 ** LINUX DO
 **   - https://linux.do/t/topic/320877
 ******************************************************************************/
const sites: SiteModule = [
  [
    'LINUX DO',
    'linux.do',
    {
      transform: {
        selector: 'a.external-link-icon, a[rel*="nofollow"]',
        customTransform(node) {
          node.addEventListener(
            'click',
            function (e: Event) {
              e.stopPropagation()
            },
            { capture: true },
          )
        },
      },
    },
  ],
]

export default sites
