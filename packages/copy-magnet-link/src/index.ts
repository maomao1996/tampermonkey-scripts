import style from './styles/index.scss'
;(() => {
  // 过滤 iframe
  if (window.self !== window.top) {
    return
  }

  GM_addStyle(style)

  const message = (text?: string) => {
    if (__DEV__) {
      console.log(text)
    }

    text && GM_notification({ timeout: 2e3, text })
  }

  const getMagnetUrls = <T extends HTMLElement>(selectors: T | null) => {
    if (!selectors) {
      return []
    }

    return (selectors.innerHTML.match(/[0-9a-fA-F]{40}/gm) || []).map(
      (s) => 'magnet:?xt=urn:btih:' + s.replace(/&.+/gm, ''),
    )
  }

  const handler = () => {
    let magnet = getMagnetUrls(document.querySelector('body'))

    document.querySelectorAll('iframe').forEach((iframe) => {
      try {
        // 过滤跨域 iframe
        if (iframe.src === '' || iframe.src.includes(location.host)) {
          magnet = magnet.concat(getMagnetUrls(iframe.contentWindow!.document.body))
        }
      } catch (error) {
        console.log('获取 iframe 异常', error)
      }
    })

    const totalLength = magnet.length

    if (window.Set) {
      magnet = Array.from(new Set(magnet))
    }

    magnet.length
      ? GM_setClipboard(magnet.join('\n'), 'text', () =>
          message(`磁力总数: ${totalLength}
重复磁力: ${totalLength - magnet.length}
已成功复制 ${magnet.length} 条磁力链接`),
        )
      : message(`当前页面没有磁力链接`)
  }

  // 过滤非 BT 页面
  if (!getMagnetUrls(document.querySelector('body')).length) {
    return
  }

  if (!document.querySelector('#femm-copy-magnet-link')) {
    document
      .querySelector('body')!
      .insertAdjacentHTML(
        'beforeend',
        /*html*/ `<div id="femm-copy-magnet-link" class="femm-copy-magnet-link" tips="复制页面内的磁力链接"><div class="femm-copy-magnet-link-btn"><svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M232 706h142c22.1 0 40 17.9 40 40v142h250V264H232v442z" fill="#e6f4ff"></path><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z" fill="#1677ff"></path><path d="M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" fill="#1677ff"></path></svg></div></div>`,
      )
  }

  document.querySelector('#femm-copy-magnet-link')!.addEventListener('click', handler)
})()
