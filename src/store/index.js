import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import aumt from './aumt/aumt'
import goodss from './goodss/goodss'
import order from './order/order'
import repor from './repor/repor'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    aumt,
    goodss,
    order,
    repor
  }
})
