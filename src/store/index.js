/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import users from '../../test';
/* Plug in Vuex store */
Vue.use(Vuex)

export const state = {
  users : users
}
const usersRef = {}

export const actions = {
  setUsers({commit}) {
    usersRef.once('value')
      .then(res => {
        const result = Object.keys(res.val()).map(key => {
          return res.val()[key]
        })
        commit(types.SET_USERS, result)
      })
  },
  removeUser({commit, state}, id) {
    usersRef.child(id).remove()
      .then(res => {
        let newUsers = state.users.slice()
        newUsers = newUsers.filter(item => {
          return item.id !== id
        })
        commit(types.SET_USERS, newUsers)
      })
  },
  creatUser({commit, state}, user) {
    usersRef.child(user.id).set(user)
      .then(res => {
        const newUsers = state.users.slice()
        newUsers.push(user)
        commit(types.SET_USERS, newUsers)
      })
  }
}

export const mutations = {
  [types.SET_USERS](state, val) {
    state.users = val
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
/* eslint-enable */
