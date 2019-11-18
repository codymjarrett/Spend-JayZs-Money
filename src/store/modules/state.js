import { inventory } from '../../inventory/inventory'

const state = {
	inventory: inventory,
	balance: 1000000000,
}
const getters = {
	allInventory: state => state.inventory,
	allBalance: state => state.balance,
}
const actions = {
	// inventory actions
	increaseNumberOfPurchase({ commit }, payload) {
		commit('setNumberOfPurchases', payload)
	},
	makeASell({ commit }, payload) {
		commit('setASell', payload)
	},
	//bank actions
	makePurchase({ commit }, purchaseAmount) {
		commit('setNewBalanceWithPurchase', purchaseAmount)
	},
	sellPurchase({ commit }, soldAmount) {
		commit('setNewBalanceWithSell', soldAmount)
	},
}
const mutations = {
	// inventory mutations
	setNumberOfPurchases: (state, payload) => {
		state.inventory.forEach(item => {
			if (item.id === payload.id) {
				item.purchased += payload.quantity
			}
		})
	},
	setASell: (state, payload) => {
		state.inventory
			.filter(item => item.id === payload.id)
			.forEach(i => {
				if (i.purchased > 0) {
					i.purchased -= payload.quantity
					i.sold = payload.quantity
				}
				return
			})
	},
	// bank mutations
	setNewBalanceWithPurchase: (state, purchaseAmount) =>
		(state.balance -= purchaseAmount),
	setNewBalanceWithSell: (state, soldAmount) => {
		state.balance.forEach(i => {
			if (i.purchased > 0) {
				state.balance += soldAmount
			}
		})
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
