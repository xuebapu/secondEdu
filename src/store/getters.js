const getters = {
    token: state => state.user.token ,
    userInfo: state => state.user.userInfo,
    base:state=>state.base.base,
    bacBase:state=>state.base.bacBase,
}
export default getters