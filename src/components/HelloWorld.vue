<template>
  <div class="hello">
    <table class="bnr-table">
      <thead>
      <th>name<select>
        <option value="up">
          up
        </option>
        <option value="down">
          down
        </option>
      </select></th>
      <th>location<select>
        <option value="up">
          up
        </option>
        <option value="down">
          down
        </option>
      </select></th>
      <th>currency<select>
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
            <option v-for="option in searchOptions" :value="option">{{option}}</option>
          </select>
          <input v-model="searchValue"/>
        </td>
      </tr>
      <tr v-for="user in filteredUsers">
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
    name : 'HelloWorld',
    data() {
      return {
        searchOptions : [],
        currentSearchOption : '',
        searchValue : ''
      }
    },
    computed : {
      ...mapState({
        users : state => state.users
      }),
      filteredUsers() {
        return this.users.filter(user => user[this.currentSearchOption].includes(this.searchValue))
      },
      currencySum() {
        return this.users.reduce((sum, user) => sum + user.currency, 0)
      }
    },
    created() {
      this.searchOptions = Object.keys(this.users[0]);
      this.currentSearchOption = this.searchOptions[0];
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
