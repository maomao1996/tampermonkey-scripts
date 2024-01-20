import { updateCount } from './modules/update-count'
import { zoomImage } from './modules/zoom-image'

import style from './styles/index.scss'

GM_addStyle(style)

const init = () => {
  updateCount()
  zoomImage()
}

const main = document.querySelector('main')
if (main != null) {
  const observer = new MutationObserver(() => init())
  observer.observe(main, {
    childList: true,
    subtree: true,
  })
}

init()
