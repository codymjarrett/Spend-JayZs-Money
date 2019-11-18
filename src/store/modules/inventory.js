import { inventory } from '../../inventory/inventory'

const state = {
    inventory: inventory
}
const getters = {
    allInventory: (state) => state.inventory
}
const actions = {}
const mutations = {}


export default {
    state,
    getters,
    actions,
    mutations
}