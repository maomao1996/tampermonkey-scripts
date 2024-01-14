import { isBrowser } from './is'

/** 格式化 location.hostname 删除 'www.' 前缀 */
export function formatHostname(hostname: string = location.hostname) {
  if (!isBrowser) {
    return ''
  }
  return hostname.replace(/^www\./, '')
}
