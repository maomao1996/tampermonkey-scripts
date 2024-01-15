import { FEMM_ATTR_KEY, setAttr } from '@femm/shared-utils'
import { isRepoHome } from 'src/utils'

/******************************************************************************
 ** GitHub 计数统计（issues、watch、fork、star）显示为具体数值
 **   - https://github.com/microsoft/vscode issues 超过 5k 以后只返回 5,000+
 **   - https://github.com/topics/react
 **   - https://github.com/sindresorhus
 ******************************************************************************/

const COUNT_REGEX = /^(\d{1,3}(,\d{3})*|\d+|\d{1,3},\d{3}\+)$/

const SELECTORS = {
  COUNTER: `span[class*="Counter"]:not([${FEMM_ATTR_KEY}])`,

  REPO_SIDEBAR: '#repo-content-pjax-container .Layout-sidebar',
  /* 仓库统计信息 */
  WATCH: '#repo-notifications-counter',
  FORKS: '#repo-network-counter',
  STARS: '[id^="repo-stars-counter-"]',
}
const REPO_COUNT_SELECTORS = [
  ['a[href$="/watchers"] strong', SELECTORS.WATCH],
  ['a[href$="/forks"] strong', SELECTORS.FORKS],
  ['a[href$="/stargazers"] strong', SELECTORS.STARS],
]

function shouldUpdateNodeText(node: HTMLElement, count: string) {
  return !node.getAttribute(FEMM_ATTR_KEY) && COUNT_REGEX.test(count) && node.innerText !== count
}
function updateNodeText(node: HTMLElement, count: string) {
  node.innerText = count
}
function updateNode(node: HTMLElement, count: string) {
  if (shouldUpdateNodeText(node, count)) {
    updateNodeText(node, count)
    setAttr(node, FEMM_ATTR_KEY, 'update-count')
  }
}

function updateRepoCount() {
  const repoSidebar = document.querySelector(SELECTORS.REPO_SIDEBAR)
  if (!repoSidebar) {
    return
  }
  REPO_COUNT_SELECTORS.forEach(([target, original]) => {
    const node = repoSidebar.querySelector<HTMLElement>(target)!
    const count = document.querySelector(original)?.getAttribute('title') || ''
    updateNode(node, count)
  })
}

export function updateCount() {
  document.querySelectorAll<HTMLSpanElement>(SELECTORS.COUNTER).forEach((node) => {
    const count = node.getAttribute('title') || ''
    updateNode(node, count)
  })

  isRepoHome() && updateRepoCount()
}
