import { updateCount } from './modules/update-count'

const init = () => {
  updateCount()
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
