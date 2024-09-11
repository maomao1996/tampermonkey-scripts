type AllHTMLElementTypes = HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
type QueryName = string | string[]
type Separator = string | RegExp
type CustomTransform<T extends AllHTMLElementTypes = Element> = (node: T) => void

type SiteName = string | undefined
type Domain = `${string}.${string}` | RegExp

declare namespace Site {
  export interface Transform<T extends AllHTMLElementTypes = Element> {
    /** 链接元素的 CSS 选择器 */
    selector: string
    /** 获取 url 参数的键名 */
    queryName?: QueryName
    /** 从目标 DOM 元素中提取 URL 参数的属性名 */
    attribute?: string
    /** 分隔符 */
    separator?: Separator

    /**
     * 需要进行兜底处理的链接元素的 CSS 选择器
     * 用于处理 transform 规则无法处理的链接，通过 GM.xmlHttpRequest 请求获取原始链接，并替换为解析后的 URL
     */
    fallbackSelector?: `a${string}`

    /**
     * 自定义转换规则函数
     * 用于定义如何处理 DOM 元素的逻辑，如果定义了该规则，将覆盖默认行为
     */
    customTransform?: CustomTransform<T>
  }

  export interface RewriteWindowOpen {
    /** 重写前的验证规则，可以是字符串模式或验证函数 */
    validationRule: string | ((url: string) => boolean)
    /** 获取 url 参数的键名 */
    queryName?: QueryName
    /** 分隔符 */
    separator?: Separator

    /**
     * 获取原始跳转链接的函数
     * 返回解析后的原始 URL，或 `null` 或 `undefined`，表示解析失败
     */
    getOriginalUrl?(url: string | URL): string | undefined
  }

  export interface AutoJump {
    /** 点击跳转的选择器  */
    selector?: string
    /** 获取 url 参数的键名 */
    queryName?: QueryName
    /** 分隔符 */
    separator?: Separator

    /**
     * 跳转前的验证函数
     * 接收一个 `Location` 对象作为参数，返回布尔值以决定是否跳转
     */
    validator?(location: Location): boolean
    /**
     * 获取原始跳转链接的函数
     * 返回解析后的原始 URL，或 `null` 或 `undefined`，表示解析失败
     */
    getOriginalUrl?(): string | null | undefined
  }
}

interface SiteOptions<T extends AllHTMLElementTypes = Element> {
  /** 链接转换 */
  transform?: Site.Transform<T>

  /** 重写 window.open */
  rewriteWindowOpen?: Site.RewriteWindowOpen
  /** 自动跳转 */
  autojump?: Site.AutoJump
}

type Site<T extends AllHTMLElementTypes = Element> = [
  /** 站点名称 */
  SiteName,
  /** 站点 url */
  Domain,
  /** 站点配置项 */
  SiteOptions<T>,
]

type SiteModule = Site<any>[]
