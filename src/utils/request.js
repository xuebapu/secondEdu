import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store';
import router from '../router/index'
const service =  axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 20000 
})
service.defaults.headers.post['Content-Type'] = 'application/json'

service.interceptors.request.use(
    config => {
        if(store.getters.token){
            config.headers['Authorization'] = store.getters.token;
        }
        return config
    },
    error =>{
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data;
        if(res.code != 200){
            // Message({
            //     message: res.msg || "请求失败",
            //     type: 'error',
            //     duration: 2500
            // })
            if(res.code === 401){
                MessageBox.alert("登录已过期，请重新登录", "提示", {
                    confirmButtonText: "重新登录",
                    type: 'warning',
                    callback: () => {
                        store.dispatch("user/resetToken").then(() => {
                            router.push({
                                name:'主页',
                                params:{log:true}
                            })
                        })
                    }
                })
            }else if(res.code==500){
                return res
            }
            else if(res.code==567){
                return res
            }
            else if(res.code==678){
                return res
            }
            else if(res.code==101){
                return res
            }
            else if(res.code==102){
                return res
            }
            return Promise.reject(new Error(res.msg || "请求失败"))
        }else{
            return res
        }
    },
    error =>{
        console.log(error)
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
)
export default service