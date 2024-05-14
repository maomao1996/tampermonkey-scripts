/******************************************************************************
 ** 移除分级遮罩
 **   - https://civitai.com/images
 **   - https://civitai.com/images/9078274
 **   - https://civitai.com/posts/1960154
 **   - https://civitai.com/models/43331/majicmix-realistic
 ******************************************************************************/

const SELECTOR = '.mantine-Stack-root > button.mantine-UnstyledButton-root.mantine-Button-root'

const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const node = entry.target as HTMLElement
      node.click()
      ob.unobserve(node)
    }
  }
})

export function removeRatedMask() {
  document.querySelectorAll<HTMLButtonElement>(SELECTOR).forEach((node) => {
    if (node.innerText === 'Show') {
      ob.observe(node)
    }
  })
}
