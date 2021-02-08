import request from '@/utils/request.js'
//省市区
export function area(params) {
  return request({
    url: "/region/pid",
    method: "get",
    params
  });
}
//单位列表
export function unitList(params) {
  return request({
    url: "/unit/list",
    method: "get",
    params
  });
}
//注册
export function sign(data) {
  return request({
    url: "/user/register",
    method: "post",
    data
  });
}
//在线查看ppt。word
export function onlinePreview(params) {
  return request({
    url: "/onlinePreview",
    method: "get",
    params
  });
}
