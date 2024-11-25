import { BrowserContext, expect, Page } from '@playwright/test'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FEMM_ATTR_KEY } from '../../../../shared/utils/src/dom/constant'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function testRedirectRemoval(
  page: Page,
  context: BrowserContext,
  originalUrl: string | (() => Promise<void>),
  expectedUrl: string,
  {
    originalUrlWaitUntil = 'domcontentloaded',
    urlWaitUntil = 'commit',
    redirectNum = 1,
    log = false,
  }: {
    originalUrlWaitUntil?: 'domcontentloaded' | 'commit' | 'load'
    urlWaitUntil?: 'domcontentloaded' | 'commit'
    redirectNum?: number
    log?: boolean
  } = {},
) {
  if (log) {
    contextLog(context)
  }
  await page.addInitScript({
    path: path.resolve(__dirname, './initGM.js'),
  })
  if (typeof originalUrl === 'function') {
    await originalUrl()
  } else {
    await page.goto(originalUrl, {
      waitUntil: originalUrlWaitUntil,
    })
  }
  let newUrl = typeof originalUrl === 'function' ? await page.url() : originalUrl
  for (let i = 0; i < redirectNum; i++) {
    try {
      await page.addScriptTag({
        path: path.resolve(__dirname, '../../../../dist/remove-redirect.user.js'),
      })
    } catch (error) {
      if (
        error instanceof Error &&
        !error.message.includes(
          'Execution context was destroyed, most likely because of a navigation',
        )
      ) {
        throw error
      }
    }
    const nowUrl = await page.url()
    if (nowUrl.toString() !== newUrl.toString()) {
      newUrl = nowUrl
    } else {
      await page.waitForURL((url) => url.toString() !== newUrl.toString(), {
        waitUntil: urlWaitUntil,
        timeout: 10000,
      })
      newUrl = await page.url()
    }
  }

  expect(newUrl).toContain(expectedUrl)
}

export async function getTransformUrl(
  page: Page,
  context: BrowserContext,
  originalUrl: string,
  {
    selectDomPath,
    log = false,
    noWait = false,
    originalUrlWaitUntil = 'domcontentloaded',
    waitTime = 0,
  }: {
    selectDomPath: string
    originalUrlWaitUntil?: 'domcontentloaded' | 'commit' | 'load'
    log?: boolean
    noWait?: boolean
    waitTime?: number
  },
) {
  if (log) {
    contextLog(context)
  }

  await page.addInitScript({
    path: path.resolve(__dirname, './initGM.js'),
  })

  await page.goto(originalUrl, {
    waitUntil: originalUrlWaitUntil,
  })
  await page.addScriptTag({
    path: path.resolve(__dirname, '../../../../dist/remove-redirect.user.js'),
  })

  if (!waitTime) {
    await page.waitForFunction((FEMM_ATTR_KEY) => {
      const keyValue = document.body.getAttribute(FEMM_ATTR_KEY)
      return keyValue === 'remove-redirect'
    }, FEMM_ATTR_KEY)
  } else {
    await page.waitForTimeout(waitTime)
  }
  if (noWait) {
    return await page.locator(selectDomPath).getAttribute('href')
  }

  return await page.evaluate(
    ([selectDomPath]) => {
      return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          setTimeout(() => {
            return resolve(document.querySelector<HTMLAnchorElement>(selectDomPath)?.href)
          })
        })
        observer.observe(document.body, { childList: true, subtree: true })
      })
    },
    [selectDomPath],
  )
}

function contextLog(context: BrowserContext) {
  context.on('weberror', (webError) => {
    console.log('🍞 ~ context.on ~ webError:', webError.error())
  })
  context.on('console', (msg) => {
    console.log('🍞 ~ context.on ~ msg:', msg.type(), msg.text())
  })
}
