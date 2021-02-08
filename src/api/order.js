import request from '@/utils/request.js'
//确认订单
export function checkOrder(data) {
  return request({
      url: "/order/create",
      method: "post",
      data
  })
}
//取消订单
export function removeOrder(orderId) {
  return request({
      url: "/order/cancel/"+orderId,
      method: "put",
  })
}
//订单列表
export function getOrderList(params) {
  return request({
      url: "/order/list",
      method: "get",
      params
  })
}
//订单详情
export function getOrderDetials(orderNum) {
  return request({
      url: "/order/query/"+orderNum,
      method: "get",
  })
}
//支付订单
export function payOrder(params) {
  return request({
      url: "/order/toPay",
      method: "get",
      params
  })
}
//查询支付是否成功
export function queryPay(params) {
  return request({
      url: "/order/queryPay",
      method: "get",
      params
    })
  }