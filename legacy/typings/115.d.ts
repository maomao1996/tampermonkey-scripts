/**
 * 115 相关类型声明
 */
declare const TOP: Window

declare const checkRepaatApi: any

interface Window {
  $: JQueryStatic
  Core: any
  oofUtil: any
  UA$: { ajax(options: JQuery.AjaxSettings): void }
  USER_INFO: {
    ALIAS_NAME: string
    IS_VIP: number
    USER_ID: string
    USER_NAME: string
  }
  Ext: any
}

interface JQueryStatic {
  confirm(...args: any[]): void
  alertTip(...args: any[]): void
}
