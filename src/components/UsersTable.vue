<template>
  <div class="hello">
    <p>Total sum of currency {{currencySum}}</p>
    <div>
      Filter by
      <select v-model="currentSearchOption">
        <option v-for="(option, index) in searchOptions" :value="option" :key="index">{{option}}</option>
      </select>
      <input v-model="searchValue"/>
    </div>
    <div>
      <button class="add-new-user" @click="showAddUserModal">add user</button>
    </div>
    <table class="users-table">
      <thead>
      <th>
        Sort by
      </th>
      <th>name
        <select @change="changeSortOption('name', $event)">
          <option value="none">
            none
          </option>
          <option value="up">
            up
          </option>
          <option value="down">
            down
          </option>
        </select>
      </th>
      <th>location
        <select @change="changeSortOption('location', $event)">
          <option value="none">
            none
          </option>
          <option value="up">
            up
          </option>
          <option value="down">
            down
          </option>
        </select>
      </th>
      <th>
        currency
        <select @change="changeSortOption('currency', $event)">
          <option value="none">
            none
          </option>
          <option value="up">
            up
          </option>
          <option value="down">
            down
          </option>
        </select>
      </th>
      <th>
        action
      </th>
      </thead>
      <tbody  v-if="filteredUsers.length">
      <tr v-for="user in filteredUsers" :key="user.id">
        <td><router-link :to="{ name: 'User', params: { id: user.id }}">link to user</router-link></td>
        <td>{{user.name}}</td>
        <td>{{user.location}}</td>
        <td>{{user.currency}}</td>
        <td>
          <button @click="showEditUserModal(user)">edit</button>
          <button @click="removeUser(user.id)">delete</button>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <h2>
          no users
        </h2>
      </tr>
      </tbody>
    </table>
    <edit-user-modal v-if="showModal" :user="selectedUser" :addUser="addUser" @add="saveUser" @edit="editUser" @close="showModal = false"></edit-user-modal>
  </div>
</template>

<script>
import editUserModal from './EditUserModal'

import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  components: {
    editUserModal
  },
  name: 'HelloWorld',
  data () {
    return {
      searchOptions: [],
      currentSearchOption: '',
      currentSortField: '',
      sortOption: '',
      searchValue: '',
      showModal: false,
      selectedUser: {},
      addUser: false
    }
  },
  comments: {
    editUserModal
  },
  computed: {
    ...mapGetters(['users']),
    filteredUsers () {
      if (!this.users.length || !this.currentSearchOption) {
        return this.users
      }

      let filteredUsers = this.users.filter(user => user[this.currentSearchOption].toString().includes(this.searchValue))

      if (this.currentSortField && this.sortOption !== 'none') {
        filteredUsers.sort(
          (a, b) => {
            a = a[this.currentSortField]
            b = b[this.currentSortField]

            if (typeof a === 'number' && typeof b === 'number') {
              return a - b
            } else {
              a = a.toLowerCase()
              b = b.toLowerCase()

              if (a > b) {
                return 1
              }

              if (a < b) {
                return -1
              }

              return 0
            }
          }
        )

        if (this.sortOption === 'down') {
          return filteredUsers.reverse()
        } else {
          return filteredUsers
        }
      } else {
        return filteredUsers
      }
    },
    currencySum () {
      if (this.users.length) {
        return this.users.reduce((sum, user) => sum + user.currency, 0)
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions(['updateUser', 'getUsers', 'deleteUser', 'createUser']),
    changeSortOption (name, event) {
      this.currentSortField = name
      this.sortOption = event.target.value
    },
    showEditUserModal (user) {
      this.showModal = true
      this.selectedUser = user
    },
    async editUser (user) {
      user.currency = +user.currency || 0
      await this.updateUser(user)
      this.showModal = false
    },
    async removeUser (userId) {
      this.deleteUser(userId)
    },
    showAddUserModal () {
      this.addUser = true
      this.showEditUserModal()
    },
    async saveUser (user) {
      user.currency = +user.currency || 0
      await this.createUser(user)
      this.showModal = false
    }
  },
  async created () {
    await this.getUsers()
    this.searchOptions = Object.keys(this.users[0])
    this.currentSearchOption = this.searchOptions[0]
  }
}
</script>

<style scoped lang="scss">
  h1, h2 {
    font-weight: normal;
  }

  table {
    font-family:sans-serif;
    border-collapse: collapse;
    font-size:14px;
    margin: 20px auto;
  }

  table, th, td {
    border: 1px solid white;
  }
  table th, table td{
    padding:10px;
  }
  table th{
    color:white;
    background:black;
    font-size:18px;
  }

  table.greyscale{
    tr:nth-child(even){
      background:#d2d5d5;
    }
    tr:nth-child(odd){
      background:#e9eaea;
    }
  }
  table.colorscale{
    tr:nth-child(even){
      background:#d3d26e;
    }
    tr:nth-child(odd){
      background:#ECECC1;
    }
  }

  a {
    color: #42b983;
  }

  .add-new-user {
    margin: 20px auto 0;
    background-color: #42b983;
    color: white;
    font-size: 18px;
    width: 200px;
    height: 30px;
  }
</style>
