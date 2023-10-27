<template>
    <div class="registration-section">
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <div class="text-center">
              <img class="logo-image" src="@/assets/ygo-logo.png" alt="Yu-Gi-Oh Logo" />
            </div>
            <div class="registration-form">
              <form @submit.prevent="submitRegister">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" id="username" name="username" v-model="form.username" />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" name="email" v-model="form.email" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" name="password" v-model="form.password" />
                </div>
                <button class="btn btn-primary register-button" @click.prevent="submitRegister">Register</button>
                <RouterLink class="btn btn-primary cancel-button" to="login">Cancel</RouterLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { RouterLink } from 'vue-router';
import {mapActions} from "pinia"
import {useIndexStore} from "../stores/index"

  export default {
    name : "RegisterView",
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        ...mapActions(useIndexStore,["register"]),

        submitRegister() {
            this.register(this.form)
        }
    },
    components: { 
        
    }
};
  </script>
  
  <style scoped>
  .registration-section {
    background-image: url('../assets/login-background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    color: rgba(255, 255, 255, 1);
    font-family: 'Yu-Gi-Oh themed font', sans-serif;
  }
  
  .logo-image {
    width: 80%;
    margin-top: 20px;
  }
  
  .registration-form {
    margin-top: 20px;
  }

  .form-group {
  margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-size: 1.2rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .cancel-button, .register-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
  }

  .cancel-button:hover, .register-button:hover {
    background-color: #0056b3;
  }
  </style>
  