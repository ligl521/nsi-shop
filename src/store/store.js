import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export const store = new Vuex.Store({
    state: {
        shoppingList: []
    },
    mutations: {
        addGoods: (state, data) => {
            state.shoppingList.push(data)
        },
        deleteGoods: (state, index) => {
            state.shoppingList.splice(index, 1)
        },
        updateGoods: (state, data) => {
            const { index, key, value } = data;
            state.shoppingList[index][key] = value
        }
    },
    getters: {
        sum: state => {
            let total = 0;
            state.shoppingList.forEach((item) => {
                total += item.goodsPrice * item.goodsNum
            })
            return total
        },
        goodsNumber: state => {
            return state.shoppingList.length
        }
    },
    plugins: [vuexLocal.plugin]
})