import request from '@/utils/request.js'
export function liveIndex(params) {
  return request({
      url: "/live/page",
      method: "get",
      params
  })
}
export function liveId(params) {
  return request({
      url: "/live/"+params,
      method: "get",
  })
}