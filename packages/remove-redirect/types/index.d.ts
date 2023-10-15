type SiteOptions = {
  /** 链接转换 */
  transform?: {
    /** 链接选择器 */
    selector: string
    /** 获取 url 参数的键名 */
    queryName?: string
    /** 分隔符 */
    separator?: string | RegExp

    /** 自定义转换规则 */
    customTransform?<T extends HTMLElement>(node: T): void
  }
  /** 自动跳转 */
  autojump?: {
    /** 点击跳转的选择器  */
    selector?: string
    /** 获取 url 参数的键名 */
    queryName?: string
    /** 分隔符 */
    separator?: string | RegExp

    /** 跳转前的验证器 */
    validator?(): boolean
    /** 获取原始跳转链接 */
    getOriginalUrl?(): string | null | undefined
  }
}

type SiteModule = [
  /** 站点名称 */
  string | undefined,
  /** 站点 url */
  string | RegExp,
  /** 站点配置项 */
  SiteOptions,
][]
