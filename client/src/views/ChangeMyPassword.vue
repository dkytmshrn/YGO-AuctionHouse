<template>
    <div>
      <Sidebar />
      <div class="container d-flex justify-content-center align-items-center form-change-password">
        <form @submit.prevent="submitNewPassword" class="form-only">
            <div class="container d-flex justify-content-center mb-2">
                <label for="password">NEW PASSWORD</label>
            </div>
            <div class="mb-3">
                <input type="password" id="password" name="password" v-model="form.password" />
            </div>
            <div class="container d-flex justify-content-center">
                <button class="btn submit-button" @click.prevent="submitNewPassword">CHANGE!</button>
            </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import {mapActions} from "pinia"
  import {useIndexStore} from "../stores/index"
  import Sidebar from '../components/Sidebar.vue'

  export default {
    name : "ChangeMyPassword",
    data() {
    return {
        form : {
            password: ''
        }
        };
    },
    methods: {
      ...mapActions(useIndexStore,['changePassword']),

      submitNewPassword() {
        this.changePassword(this.form)
      }
    },
    components : { Sidebar }
  };
  </script>
  
  <style scoped>
    .form-change-password {
        height: 100vh;
    }
    .form-only {
      padding: 20px;
      background-color: rgba(0,0,0,0.6);
    }
    .submit-button {
      background-color: rgba(0, 0, 0, 0.3);
    }
  </style>
  