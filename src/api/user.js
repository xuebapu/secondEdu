import request from '@/utils/request.js'

export function login(data) {
    return request({
        url: "/user/login",
        method: "post",
        data
    })
}
export function logout() {
    return request ({
        url: "/user/logout",
        method: "get"
    })
}
export function userInfo() {
    return request ({
        url: "/user/getInfo",
        method: "get"
    })
}
export function learningList() {
    return request ({
        url: "/courseSection/learning",
        method: "get"
    })
}

export function collectList() {
    return request ({
        url: "/collections/collect",
        method: "get"
    })
}
export function historyList() {
    return request ({
        url: "/courseSection/history",
        method: "get",
        params: { pageSize: 4, pageNum: 1}
    })
}
//用户收藏
export function collect(courseId) {
    return request ({
        url: "/collections/course/"+courseId,
        method: "post"
    })
}
//手机验证码
export function phoneCode(params) {
    return request ({
        url: "/sms/code",
        method: "get",
        params
    })
}
//用户学习统计
export function statementList(params) {
    return request ({
        url: "/courseSection/learning/statistics",
        method: "get",
        params
    })
}
//修改密码
export function changePassword(data) {
    return request ({
        url: "/user/update/pwd",
        method: "put",
        data
    })
}