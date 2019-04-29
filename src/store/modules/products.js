
import shop from '../../api/shop'
import { PRODUCTS } from './types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  // productAmount: (state, getters, rootState) =>(id) =>{
  // }
}

// mutations
const mutations = {
  [PRODUCTS.SET_PRODUCTS](state, products) {
    state.all = products
  },

  [PRODUCTS.DECREMENT_PRODUCT_INVENTORY](state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }

}

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit(PRODUCTS.SET_PRODUCTS, products)
    })
  },
  // getCartItems({commit,state,rootState},id){
  //   return rootState.cart.items.find(todo => todo.id === id).map(item => item.quantity)
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}