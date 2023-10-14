/** 格式化 location.hostname 删除 'www.' 前缀 */
export const formatHostname = location.hostname.replace(/^www\./, '')
