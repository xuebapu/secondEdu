import request from '@/utils/request.js'
//专科学院列表
export function collegeList(){
  return request({
      method:'get',
      url:'/college/list',
  })
}
//专科学院详情
export function collegeDetails(id){
  return request({
      method:'get',
      url:'/college/'+id,
  })
}