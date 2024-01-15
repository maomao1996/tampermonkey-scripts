/** 是否在仓库主页 */
export function isRepoHome() {
  return document.querySelector('#repository-container-header:not([hidden])')!!
}
