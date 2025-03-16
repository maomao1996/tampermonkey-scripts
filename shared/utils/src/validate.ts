import { isString } from './is'

/** 简单验证 url 是否为合法  */
export function validateUrl(url: unknown): boolean {
  if (!isString(url)) {
    return false
  }
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
