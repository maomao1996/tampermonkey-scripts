import { createCachedRequest } from '../request'

export const GMCachedRequest = createCachedRequest(GM.xmlHttpRequest)
