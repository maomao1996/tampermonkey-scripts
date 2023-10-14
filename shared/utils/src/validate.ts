import { isString } from './is'

/** 简单验证 url 是否为合法  */
export function validateUrl(url: any): boolean {
  if (!isString('string')) {
    return false
  }
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}
