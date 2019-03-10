
const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  
}

// actions
const actions = {
  handleFunction ({ commit, state }, products) {
    
  },
}

// mutations
const mutations = {

  handleFunction (state, { items }) {
    state.items = items
  },

  handleFunction (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
