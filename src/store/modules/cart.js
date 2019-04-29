import shop from '../../api/shop'
import { CART, PRODUCTS } from './types'
const state = {
    items: [],
    checkoutStatus: null,
    goods: [],
    amount: false
}

// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
        state.goods = rootState.products.all;
        return state.items.map(({ id, quantity }) => {
            const product = rootState.products.all.find(product => product.id === id)
            return {
                title: product.title,
                price: product.price,
                quantity
            }
        })
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    },

    getCartQuantity: (state) => (id) => {
        return state.items.filter(todo => todo.id === id).map(item => item.quantity);
    }
}
// mutations
const mutations = {
    // 把整个商品添加到购物车中
    [CART.PUSH_PRODUCT_TO_CART](state, { id }) {
        state.items.push({
            id,
            quantity: 1
        })
    },
    // 如果商品添加过，那么就是再次添加就是数量加1
    [CART.INCREMENT_ITEM_QUANTITY](state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++
        state.amount = true
    },
    // 获取购物车的商品
    [CART.SET_CART_ITEMS](state, { items }) {
        state.items = items
    },

    [CART.SET_CHECKOUT_STATUS](state, status) {
        state.checkoutStatus = status
    },

    // 移除商品
    [CART.REMOVE_PRODUCTS](state, id) {
        state.goods.map((item, index) => {
            if (state.goods[index].id === id) {
                state.goods[index].inventory++;

            }
        })
        state.items.map((item, index) => {
            if (state.items[index].id === id) {
                state.items[index].quantity--;
            }
            if (state.items[index].quantity === 0) {
                state.items.splice(index, 1)
            }
        })
    }
}
// actions
const actions = {
    // 结算按钮提交
    checkout({ commit, state }, products) {
        const savedCartItems = [...state.items]
        commit(CART.SET_CHECKOUT_STATUS, null)
        // empty cart
        commit(CART.SET_CART_ITEMS, { items: [] })
        shop.buyProducts(
            products,
            () => commit(CART.SET_CHECKOUT_STATUS, 'successful'),
            () => {
                commit(CART.SET_CHECKOUT_STATUS, 'failed')
                // rollback to the cart saved before sending the request
                commit(CART.SET_CART_ITEMS, { items: savedCartItems })
            }
        )
    },

    // 加入购物车
    addProductToCart({ state, commit }, product) {
        commit(CART.SET_CHECKOUT_STATUS, null)
        if (product.inventory > 0) {
            const cartItem = state.items.find(item => item.id === product.id);
            if (!cartItem) {
                commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id })
            } else {
                // 如果商品已经添加过，那么就是该商品的数量增1
                commit(CART.INCREMENT_ITEM_QUANTITY, cartItem)
            }
            // remove 1 item from stock
            commit(`products/${PRODUCTS.DECREMENT_PRODUCT_INVENTORY}`, { id: product.id }, { root: true })
        }
    },

    // 从购物车中移除
    removeProductFromCart({ state, commit }, id) {
        if (state.items.length == 0) return;
        const product = state.items.find(item => item.id === id);
        if (product.quantity > 0) {
            commit(CART.REMOVE_PRODUCTS, id)
        } else {
            alert("该商品在购物车没有了")
        }
    }
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}