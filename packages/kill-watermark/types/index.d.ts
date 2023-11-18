declare module '*.css' {
  const styles: string
  export default styles
}

type SiteOptions = {
  /** 站点样式 */
  style?: string

  /** 站点脚本 */
  script?: () => void
}

type SiteModule = [
  /** 站点名称 */
  string | undefined,
  /** 站点 url */
  string | RegExp,
  /** 站点配置项 */
  SiteOptions,
]
