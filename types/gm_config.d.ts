interface GMConfig {
  get(key: string): any
  [key: string]: any
}
/**
 * 脚本设置
 */
declare const GM_config: GMConfig
