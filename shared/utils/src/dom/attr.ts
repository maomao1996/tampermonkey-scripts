export function setAttr(node: HTMLElement, name: string, value: string) {
  if (!node.getAttribute(name)) {
    node.setAttribute(name, value)
  }
}
