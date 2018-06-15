import Vue from 'vue'
import Router from 'vue-router'
import UsersTable from '@/components/UsersTable'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes : [
    {
      path : '/',
      name : 'UsersTable',
      component : UsersTable
    },
    {
      path : '/user/:id',
      name: 'User',
      component : User
    },
    {
      path : '*',
      component : UsersTable
    }
  ]
})
