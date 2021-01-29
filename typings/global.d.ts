/**
 * 添加指定样式添加到文档中，并返回注入的样式元素
 **/
declare function GM_addStyle(css: string): HTMLStyleElement

/**
 * 标签页通知
 **/
declare function GM_notification(details: {
  /**
   * 通知的标题 默认读取脚本名
   **/
  title?: string
  /**
   * 通知的文本
   **/
  text: string
  /**
   * 通知的图片
   **/
  image?: string
  /**
   * 是否突出显示
   **/
  highlight?: boolean
  /**
   * 是否播放声音
   **/
  silent?: boolean
  /**
   * 通知显示的时长 0=禁用
   **/
  timeout?: number
  /**
   * 在关闭通知时调用
   **/
  ondone?(): void
  /**
   * 超时或单击通知时调用
   **/
  onclick?(): void
}): void

/**
 * 115 相关
 **/
declare const TOP: Window

interface Window {
  Core: any
  UA$: any
}
