import { inventory } from '../../inventory/inventory'

const state = {
	inventory: inventory,
	balance: 1000000000,
}
const getters = {
	allInventory: state => state.inventory,
	allBalance: state => state.balance,
	getItemQuantity: state => id => {
		const item = state.inventory.filter(i => i.id === id).map(n => n.quantity)
		return parseInt(item[0])
	},
	getItemAmount: state => id => {
		const item = state.inventory.filter(i => i.id === id).map(n => n.price)
		return parseInt(item[0])
	},
}
const actions = {
	// inventory actions
	increaseNumberOfPurchase({ commit }, payload) {
		commit('setNumberOfPurchases', payload)
	},
	// makeASell({ commit }, payload) {
	// 	commit('setASell', payload)
	// },
	//bank actions
	makePurchase({ commit }, purchaseAmount) {
		commit('setNewBalanceWithPurchase', purchaseAmount)
	},

	sellPurchase({ commit }, payload) {
		commit('setANewSell', payload)
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
	setANewSell: (state, payload) => {
		state.inventory
			.filter(item => item.id === payload.id)
			.forEach(i => {
				if (i.quantity > i.purchased) {
					alert("Nah G, you ain't got that!")
					return
				}
				if (i.quantity <= i.purchased || i.purchased > 0) {
					i.purchased -= payload.quantity
					i.sold = payload.quantity
					state.balance += payload.total
				}
				return
			})
	},
	// bank mutations
	setNewBalanceWithPurchase: (state, purchaseAmount) =>
		(state.balance -= purchaseAmount),
	// setNewBalanceWithSell: (state, soldAmount) => {
	// 	state.balance += soldAmount
	// },
}

export default {
	state,
	getters,
	actions,
	mutations,
}
