import sites from 'src/sites'

const hostname = location.hostname
const currentSite = (sites as [string, string][]).find(([url]) => hostname.includes(url))

if (currentSite) {
  const [, css] = currentSite
  css && GM_addStyle(css)
}
