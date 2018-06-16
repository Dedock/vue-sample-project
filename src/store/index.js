import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
// import users from '../../test'
import axios from 'axios'
/* Plug in Vuex store */
Vue.use(Vuex)

export const state = {
  users: []
}

export const getters = {
  users: state => state.users,
  user (state) {
    return id => state.users.find(user => user.id === id)
  }
}

export const actions = {
  async updateUser ({commit, state}, user) {
    await axios.put(`/api/user/${user.id}`, user)
    const userIndex = state.users.findIndex(item => item.id === user.id)
    commit(types.SAVE_USER, {userIndex, user})
  },
  async createUser ({commit, state}, user) {
    const response = await axios.post(`/api/user`, user)
    commit(types.ADD_USER, response.data)
  },
  async getUsers ({commit}) {
    try {
      const users = await axios.get('/api/users')
      commit(types.SAT_USERS, users.data)
    } catch (err) {
      console.log(err)
    }
  },
  async deleteUser ({commit}, userId) {
    await axios.delete(`/api/user/${userId}`)
    const userIndex = state.users.findIndex(item => item.id === userId)
    commit(types.DELETE_USER, userIndex)
  }
}

export const mutations = {
  [types.SAVE_USER] (state, {userIndex, user}) {
    state.users[userIndex] = user
    state.users = [].concat(state.users)
  },
  [types.ADD_USER] (state, user) {
    state.users.push(user)
  },
  [types.SAT_USERS] (state, users) {
    state.users = users
  },
  [types.DELETE_USER] (state, userIndex) {
    state.users.splice(userIndex, 1)
  }
}

export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations
})
