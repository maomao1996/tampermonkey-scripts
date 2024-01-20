import mediumZoom from 'medium-zoom'

const DEFAULT_SELECTOR = '.markdown-body img:not(.medium-zoom-image)'
const zoom = mediumZoom()

function refresh(selector = DEFAULT_SELECTOR) {
  zoom.detach()
  zoom.attach(selector)
}

document.addEventListener('click', (event) => {
  const targetElement = event.target as HTMLElement
  if (
    targetElement?.tagName === 'IMG' &&
    document.querySelector('.markdown-body')?.contains(targetElement)
  ) {
    event.preventDefault()
    event.stopPropagation()
  }
})

export function zoomImage() {
  refresh()
}
