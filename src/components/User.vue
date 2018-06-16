<template>
<div class="user-wrapper">
  <h1>Single user page</h1>
  <p v-for="(value, key) of user($route.params.id)" :key="key">
    <b>{{key}}</b> : {{value}}
  </p>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'user',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss" scoped>
.user {
  &-wrapper {
    max-width: 400px;
    margin: 0 auto;

    p {
      text-align: left;
    }
  }
}
</style>
