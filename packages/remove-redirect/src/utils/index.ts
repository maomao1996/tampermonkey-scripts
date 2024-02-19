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
