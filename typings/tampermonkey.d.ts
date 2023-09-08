/**
 * tampermonkey 相关类型声明
 */

/**
 * 添加指定样式添加到文档中，并返回注入的样式元素
 */
declare function GM_addStyle(css: string): HTMLStyleElement

/**
 * 标签页通知
 */
declare function GM_notification(details: {
  /**
   * 通知的标题 默认读取脚本名
   */
  title?: string
  /**
   * 通知的文本
   */
  text: string
  /**
   * 通知的图片
   */
  image?: string
  /**
   * 是否突出显示
   */
  highlight?: boolean
  /**
   * 是否播放声音
   **/
  silent?: boolean
  /**
   * 通知显示的时长 0=禁用
   */
  timeout?: number
  /**
   * 在关闭通知时调用
   */
  ondone?(): void
  /**
   * 超时或单击通知时调用
   */
  onclick?(): void
}): void

/**
 * 打开一个新的浏览器标签页
 */
declare function GM_openInTab(
  /**
   * 打开指定的页面的URL
   */
  url: string,
  options?: {
    /**
     * 是否聚焦到新标签页(默认 false)
     */
    active?: boolean
    /**
     * 是否在当前标签页之后插入(默认 true)
     */
    insert?: boolean
    /**
     * 使浏览器将当前标签重新聚焦在关闭位置上
     */
    setParent?: boolean
    /**
     * 使标签页在无痕模式下打开
     */
    incognito?: boolean
  },
): void

/**
 * 注册要显示在 Tampermonkey 菜单上的菜单
 **/
declare function GM_registerMenuCommand(
  /**
   * 菜单名称
   */
  name: string,
  /**
   * 点击菜单的回调
   */
  fn?: () => void,
  accessKey?: string,
): number

/**
 * 正在运行的页面的窗口对象
 */
declare const unsafeWindow: Window

interface GMConfig {
  get(key: string): any
  [key: string]: any
}
/**
 * 脚本设置
 */
declare const GM_config: GMConfig
