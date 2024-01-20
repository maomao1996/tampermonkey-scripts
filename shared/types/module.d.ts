/******************************************************************************
 ** 参考 vite 中的类型定义
 *  https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts
 ******************************************************************************/

/* CSS */
declare module '*.css' {
  const styles: string
  export default styles
}
declare module '*.scss' {
  const styles: string
  export default styles
}
declare module '*.sass' {
  const styles: string
  export default styles
}
declare module '*.less' {}
declare module '*.styl' {}
declare module '*.stylus' {}
declare module '*.pcss' {}
declare module '*.sss' {}
