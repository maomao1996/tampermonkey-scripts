/*
 * FreeBuf 网络安全行业门户
 * https://www.freebuf.com/articles/database/363290.html
 * https://www.freebuf.com/sectool/375602.html
 ******************************************************************************/

const site: SiteModule = [
  'FreeBuf 网络安全行业门户',
  'freebuf.com',
  {
    script() {
      document.querySelectorAll<HTMLImageElement>('img[large]').forEach((img) => {
        const large = img.getAttribute('large')
        if (large && img.src !== large) {
          img.src = large
        }
      })
    },
  },
]

export default site
