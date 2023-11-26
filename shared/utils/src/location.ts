import { isBrowser } from './is'

/** 格式化 location.hostname 删除 'www.' 前缀 */
export const formatHostname = isBrowser ? location.hostname.replace(/^www\./, '') : ''
