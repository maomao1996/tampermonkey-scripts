interface CachedRequestOptions {
  /** 过期时间，如果为 0 则表示永不过期 */
  cacheTime?: number
  shouldCacheError?: boolean
}
interface CacheEntry<R> {
  data?: R
  time?: number
  error?: any
  requestPromise?: Promise<R>
}

type RequestFunctionWithCacheOptions<TContext = any> = (
  details: Tampermonkey.Request<TContext> & CachedRequestOptions,
) => Promise<Tampermonkey.Response<TContext>>

export function createCachedRequest(requestFunction: RequestFunctionWithCacheOptions) {
  const cache = new Map<string, CacheEntry<any>>()

  return function cachedRequest<TContext extends any>(
    options: Tampermonkey.Request<TContext> & CachedRequestOptions,
  ): Promise<Tampermonkey.Response<TContext>> {
    if (
      options.cacheTime !== undefined &&
      (typeof options.cacheTime !== 'number' || options.cacheTime < 0)
    ) {
      throw new Error('无效的 cacheTime 选项')
    }

    const cacheKey = JSON.stringify(options)
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      const { data, time, error, requestPromise } = cachedData

      if (requestPromise) {
        return requestPromise
      }

      const cacheTime = options.cacheTime ?? 0

      if (!error && time && cacheTime && Date.now() - time < cacheTime) {
        return Promise.resolve(data as Tampermonkey.Response<TContext>)
      } else {
        cache.delete(cacheKey)
      }
    }

    const shouldCacheError = options.shouldCacheError ?? false

    const requestPromise = requestFunction(options)
      .then((data) => {
        const time = Date.now()
        cache.set(cacheKey, { data, time })
        return data
      })
      .catch((error) => {
        if (shouldCacheError) {
          const time = Date.now()
          cache.set(cacheKey, { error, time })
        }
        throw error
      })

    cache.set(cacheKey, { requestPromise })

    return requestPromise
  }
}
