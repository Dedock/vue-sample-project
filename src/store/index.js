/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
// import users from '../../test'
import axios from 'axios'
/* Plug in Vuex store */
Vue.use(Vuex)

export const state = {
  users : []
}

export const getters = {
  users : state => state.users,
  user(state){
    return id => state.users.find(user => user.id === id)
  }
}

export const actions = {
  async saveUser({commit, state}, user) {
    await axios.post(`/api/user/${user.id}`, user)
    const userIndex = state.users.findIndex(i => i.id === user.id)
    commit(types.SAVE_USER, {userIndex, user})
  },
  async getUsers({commit}) {
    try {
      const users = await axios.get('/api/users')
      commit(types.SAT_USERS, users.data)
    } catch (err) {
      console.log(err)
    }
  }
  /*  setUsers({commit}) {
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
   }*/
}

export const mutations = {
  [types.SAVE_USER](state, {userIndex, user}) {
    state.users[userIndex] = user
    state.users = [].concat(state.users)
  },
  [types.SAT_USERS](state, users) {
    state.users = users
  }
}

export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations
})
/* eslint-enable */
