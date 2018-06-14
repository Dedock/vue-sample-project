<template>
  <div class="hello">
    <table class="bnr-table">
      <thead>
      <th>name
        <select @change="changeSortOption('name', $event)">
          <option value="up">
            up
          </option>
          <option value="down">
            down
          </option>
        </select></th>
      <th>location
        <select>
          <option value="up">
            up
          </option>
          <option value="down">
            down
          </option>
        </select></th>
      <th>
        currency
        <select @change="changeSortOption('currency', $event)">
          <option value="up">
            up
          </option>
          <option value="down">
            down
          </option>
        </select></th>
      </thead>
      <tbody>
      <tr>
        <td>
          <select v-model="currentSearchOption">
            <option v-for="(option, index) in searchOptions" :value="option" :key="index">{{option}}</option>
          </select>
          <input v-model="searchValue"/>
        </td>
      </tr>
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{user.name}}</td>
        <td>{{user.location}}</td>
        <td>{{user.currency}}</td>
      </tr>
      </tbody>
    </table>
    <p>{{currencySum}}</p>
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      searchOptions: [],
      currentSearchOption: '',
      currentSortField: '',
      sortOption: '',
      searchValue: '',
      sortedUsers: []
    }
  },
  computed: {
    ...mapState({
      users: state => state.users
    }),
    filteredUsers () {
      let filteredUsers = this.users.filter(user => user[this.currentSearchOption].includes(this.searchValue))

      if (this.currentSortField && this.sortOption) {
        filteredUsers.sort(
          (a, b) => {
            if (typeof a[this.currentSortField] === 'number' && typeof b[this.currentSortField] === 'number') {
              return +a[this.currentSortField] > +b[this.currentSortField]
            } else {
              return a[this.currentSortField] > b[this.currentSortField]
            }
          }
        )

        if (this.sortOption === 'up') {
          return filteredUsers.reverse()
        } else {
          return filteredUsers
        }
      } else {
        return filteredUsers
      }
    },
    currencySum () {
      return this.users.reduce((sum, user) => sum + user.currency, 0)
    }
    // sortedUsers () {
    //   return this.filteredUsers.sort(
    //     (a, b) => {
    //       return a[this.currentSortField] > b[this.currentSortField]
    //     }
    //   )
    // }
  },
  methods: {
    changeSortOption (name, event) {
      this.currentSortField = name
      this.sortOption = event.target.value
      this.sortedUsers = this.filteredUsers.sort(
        (a, b) => {
          return a[this.currentSortField] > b[this.currentSortField]
        }
      )
    }
  },
  created () {
    this.searchOptions = Object.keys(this.users[0])
    this.currentSearchOption = this.searchOptions[0]
    this.sortedUsers = this.filteredUsers
  }
}
</script>

<style scoped lang="scss">
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
