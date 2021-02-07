import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    cartList: []
  },

  mutations: {

    addCounter(state, payload) {
      payload.count++
    },

    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },

  actions: {
    addCart(context, payload) {

      let oldProduct = null
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
      }
    }
  },

  // 类似计算属性,对state中的数据进行过滤
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  }
})

export default store