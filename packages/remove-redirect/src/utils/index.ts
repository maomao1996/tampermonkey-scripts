export function defineSite<T extends AllHTMLElementTypes = HTMLAnchorElement>(
  siteInfo: Site<T>,
): Site<T>
export function defineSite<T extends AllHTMLElementTypes = HTMLAnchorElement>(
  siteName: string | undefined,
  domain: string | RegExp,
  options: SiteOptions<T>,
): Site<T>

export function defineSite<T extends AllHTMLElementTypes = HTMLAnchorElement>(
  siteInfo: string | undefined | Site<T>,
  domain?: string | RegExp,
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
