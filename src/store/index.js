import Vuex from 'vuex'
import Vue from 'vue'

import state from './modules/state'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        state,  
    }
})