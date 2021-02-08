import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, userInfo, logout } from '@/api/user'
import { MessageBox, Message } from 'element-ui'
const state = {
    token: getToken(),
    userInfo: {}
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data;
    }
}
const actions = {
    login( { commit }, userInfo){
        return new Promise( (resolve, reject) => {
            login(userInfo).then( res => {
                console.log(res)
                if(res.code==200){
                    Message({
                        message:'登录成功',
                        type:'success'
                    })
                    const data = res.data;
                    commit("SET_TOKEN", data.token);
                    setToken(data.token);
                    resolve();
                }else{
                    Message.error(res.msg)
                    reject(error);
                }
            }).catch( error => {
                reject(error);
            })
        })
    },
    userInfo({ commit }){
        return new Promise ( (resolve, reject) => {
            userInfo().then( res => {
                const data = res.data;
                commit("SET_USERINFO", data);
                resolve(data);
            }).catch( error => {
                reject(error);
            })
        })
    },
    logout( {commit }){
        return new Promise ( (resolve, reject) => {
            logout().then( res => {
                commit("SET_TOKEN", "");
                commit("SET_USERINFO", "")
                removeToken();
                resolve();
            }).catch( error => {
                reject(error);
            })
        })
    },
    resetToken({ commit }){
        return new Promise ( (resolve, reject) => {
            logout().then( res => {
                commit("SET_TOKEN", "");
                commit("SET_USERINFO", "")
                removeToken();
                resolve();
            }).catch( error => {
                reject(error);
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}