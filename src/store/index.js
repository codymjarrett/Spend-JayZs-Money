import Vuex from 'vuex'
import Vue from 'vue'

import inventory from './modules/inventory'
import bank from './modules/bank'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        inventory,
        bank,
        
    }
})