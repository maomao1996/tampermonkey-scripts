type AllHTMLElementTypes = HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
type QueryName = string | string[]
type Separator = string | RegExp
type CustomTransform<T extends AllHTMLElementTypes = Element> = (node: T) => void

interface TransformOptions<T extends AllHTMLElementTypes = Element> {
  selector: string
  queryName?: QueryName
  separator?: Separator
  customTransform?: CustomTransform<T>
}

interface SiteOptions<T extends AllHTMLElementTypes = Element> {
  /** 链接转换 */
  transform?: {
    /** 链接选择器 */
    selector: string
    /** 获取 url 参数的键名 */
    queryName?: QueryName
    /** 分隔符 */
    separator?: Separator

    /** 自定义转换规则 */
    customTransform?: CustomTransform<T>
  }

  /** 重写 window.open */
  rewriteWindowOpen?: {
    /** 重写前的验证规则 */
    validationRule: string | ((url: string) => boolean)
    /** 获取 url 参数的键名 */
    queryName?: QueryName
    /** 分隔符 */
    separator?: Separator

    /** 获取原始跳转链接 */
    getOriginalUrl?(url: string | URL): string | undefined
  }

  /** 自动跳转 */
  autojump?: {
    /** 点击跳转的选择器  */
    selector?: string
    /** 获取 url 参数的键名 */
    queryName?: QueryName
    /** 分隔符 */
    separator?: Separator

    /** 跳转前的验证器 */
    validator?(location: Location): boolean
    /** 获取原始跳转链接 */
    getOriginalUrl?(): string | null | undefined
  }
}

type Site<T extends AllHTMLElementTypes = Element> = [
  /** 站点名称 */
  string | undefined,
  /** 站点 url */
  string | RegExp,
  /** 站点配置项 */
  SiteOptions<T>,
]

type SiteModule = Site<any>[]
