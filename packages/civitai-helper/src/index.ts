import { removeRatedMask } from './modules/remove-rated-mask'

const init = () => {
  removeRatedMask()
}

const main = document.querySelector('#main')
if (main != null) {
  const observer = new MutationObserver(() => init())
  observer.observe(main, {
    childList: true,
    subtree: true,
  })
}

init()
