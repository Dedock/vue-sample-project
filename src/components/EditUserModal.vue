<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <input class="modal-input" v-model="userToEdit.name"/>
          <input class="modal-input" v-model="userToEdit.location"/>
          <input class="modal-input" v-model="userToEdit.currency"/>

          <div class="modal-buttons--wrapper">
            <button @click="editUser">
              save
            </button>
            <button @click="close">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'edit-user-modal',
  data () {
    return {
      userToEdit: {}
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    editUser () {
      if (this.addUser) {
        this.$emit('add', this.userToEdit)
      } else {
        this.$emit('edit', this.userToEdit)
      }
    }
  },
  props: {
    user: Object,
    addUser: Boolean
  },
  mounted () {
    this.userToEdit = Object.assign({}, this.user)
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    &-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
    }

    &-wrapper {
      display: table-cell;
      vertical-align: middle;
    }

    &-container {
      width: 300px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }

    &-header h3 {
      margin-top: 0;
      color: #42b983;
    }

    &-body {
      margin: 20px 0;
    }

    &-input {
      margin: 10px 0;
    }

    &-buttons--wrapper {
      display: flex;
      justify-content: space-around;
    }
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
