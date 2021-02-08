import request from '@/utils/request.js'
// 学科树
export function courseTreeList(){
    return request({
        url: "/course_subject/tree",
        method: "get",
    })
}
// 学科二级列表
export function courseSecondList(name){
    return request({
        url: "/course_subject/second",
        method: "get",
        params: { name }
    })
}
// 项目类型
export function courseProjectList(){
    return request({
        url: "/course_type/project",
        method: "get",
    })
}
// 学分类型
export function courseCreditList(){
    return request({
        url: "/course_type/credit",
        method: "get",
    })
}
// 分页查询课程

export function courseList(params){
    return request({
        url: "/project/page",
        method: "get",
        params
    })
}
// 课程详情
export function courseDetail(id) {
    return request({
        url: `/course/${id}`,
        method: "get",
    })
}
// 项目详情
export function projectDetail(id) {
    return request({
        url: `/project/${id}`,
        method: "get",
    })
}
// 课程学习观看状态
export function courseStatus(id,status,time) {
    return request({
        url: `/courseSection/course/${id}/${status}?time=${time}`,
        method: "get",
    })
}
// 收藏课程
export function collectionCourse(id) {
    return request({
        url: `/collections/course/${id}`,
        method: "post"
    })
}
// 查询课程是否被收藏
export function isCollectionCourse(id) {
    return request({
        url: `/collections/course/${id}`,
        method: "get"
    })
}
//学习进度
export function studyStatus(params) {
    return request({
        url: "/courseSection/learning/show",
        method: "get",
        params
    })
  }
  //进入考试
export function gotoExam(params) {
    return request({
        url: "/exam/searchExam/"+params,
        method: "get",
    })
  }
  //提交考试
export function subExam(data) {
    return request({
        url: "/exam/submitExam",
        method: "post",
        data
    })
  }