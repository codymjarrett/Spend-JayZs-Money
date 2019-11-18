const state = {
	balance: 1000000000,
}
const getters = {
	allBalance: state => state.balance,
}
const actions = {
	makePurchase({ commit }, purchaseAmount) {
		commit('setNewBalance', purchaseAmount)
	},
}
const mutations = {
	setNewBalance: (state, purchaseAmount) => (state.balance -= purchaseAmount),
}

export default {
	state,
	getters,
	actions,
	mutations,
}
