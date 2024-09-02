import { FEMM_ATTR_KEY } from './constant'

const map = new WeakMap()

/** 监听元素进入可视区域 */
export function observeElementEnterViewport(element: Element, callback: () => void) {
  if (map.has(element) || element.getAttribute(FEMM_ATTR_KEY)) {
    return
  }
  map.set(element, 1)
  const ob = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        element.setAttribute(FEMM_ATTR_KEY, 'observered')
        callback()
        ob.unobserve(element)
      }
    }
  })

  ob.observe(element)
}
