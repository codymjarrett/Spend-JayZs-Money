import { inventory } from '../../inventory/inventory'

const state = {
	inventory: inventory,
}
const getters = {
	allInventory: state => state.inventory,
}
const actions = {
    
	increaseNumberOfPurchase({ commit },  payload) {
		commit('setNumberOfPurchases', payload)
	},
}
const mutations = {
	setNumberOfPurchases: (state, payload) => {
		state.inventory.forEach(item => {
            if(item.id === payload.id){
                item.purchased += payload.quantity
            }
        })
			// .filter(item => item.id === payload.id)
			// .map(i => (i.purchased = payload.numOfPurchases))
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
