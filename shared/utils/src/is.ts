/** Object.prototype.toString */
export const toString = (value: any) => Object.prototype.toString.call(value)

/** 获取类型 */
export function getTypeName(value: any) {
  if (value === null) return 'null'

  const type = typeof value
  if (type === 'object' || type === 'function') {
    return toString(value).slice(8, -1).toLowerCase()
  } else {
    return type
  }
}

/** 是否为数组 */
export const isArray = Array.isArray

/** 是否为布尔值 */
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

/** 是否为函数 */
export const isFunction = <T extends Function>(value: any): value is T =>
  typeof value === 'function'

/** 是否为数字 */
export const isNumber = (val: any): val is number => typeof val === 'number'

/** 是否为字符串 */
export const isString = (val: any): val is string => typeof val === 'string'
