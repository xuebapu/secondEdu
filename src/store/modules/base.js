const state = {
  base: process.env.VUE_APP_BASE_API,
  bacBase:process.env.VUE_APP_BASEBAC_API,
}
export default {
  namespaced: true,
  state,
}