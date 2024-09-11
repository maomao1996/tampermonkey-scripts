import { observeElementEnterViewport } from '@femm/shared-utils/dom/'
import { GMCachedRequest } from '@femm/shared-utils/gm/'

export function defineSite<T extends AllHTMLElementTypes = HTMLAnchorElement>(
  siteInfo: Site<T>,
): Site<T>
export function defineSite<T extends AllHTMLElementTypes = HTMLAnchorElement>(
  siteName: SiteName,
  domain: Domain,
  options: SiteOptions<T>,
): Site<T>

export function defineSite<T extends AllHTMLElementTypes = HTMLAnchorElement>(
  siteInfo: SiteName | Site<T>,
  domain?: Domain,
  options?: SiteOptions<T>,
): Site<T> {
  if (Array.isArray(siteInfo)) {
    ;[siteInfo, domain, options] = siteInfo
  }
  return [siteInfo, domain!, options!]
}

/** 获取 URL 参数 */
export function getSearchParamsValue(
  searchParams: string | URLSearchParams,
  queryName: string | string[],
): string {
  searchParams = new URLSearchParams(searchParams)

  let result: string | null = null

  if (Array.isArray(queryName)) {
    for (const name of queryName) {
      if (searchParams.has(name)) {
        result = searchParams.get(name)
        break
      }
    }
  } else {
    result = searchParams.get(queryName)
  }

  return result || ''
}

export function requestOriginalLink(element: HTMLAnchorElement) {
  observeElementEnterViewport(element, () => {
    GMCachedRequest({ method: 'GET', url: element.href, anonymous: true }).then((res) => {
      if (res.finalUrl && res.finalUrl !== element.href) {
        element.href = res.finalUrl
      }
    })
  })
}
