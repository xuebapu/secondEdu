import request from '@/utils/request'

// 首页最新资讯列表
export function newsList(num) {
    return request({
        method: "get",
        url: "/site_news/latest",
        params: { num }
    })
}
// 首页轮播列表
export function bannerList(num) {
    return request({
        method: "get",
        url: "/site_carouse/latest",
        params: { num }
    })
}
// 查询推荐项目
export function courseList({topNum, num}) {
    return request({
        method: "get",
        url: "/project/type/" + topNum,
        params: { num }
    })
}
// 精品课程列表
export function boutiqueList(num) {
    return request({
        method: "get",
        url: "/course/boutique",
        params: { num }
    })
}
// 名师列表
export function teacherList(num) {
    return request({
        method: "get",
        url: "/user/famous_teacher",
        params: { num }
    })
}
// 验证码
export function getCaptcha() {
    return request({
        method: "get",
        url: "/captcha/captchaImage"
    })
}
//专科学院推荐
export function collegeRecommend(num){
    return request({
        method:'get',
        url:'/college/recommend',
        params:{num}
    })
}