<template>
  <div class="login-section">
    <div class="container login-form">
      <img class="logo-image" src="../assets/ygo-logo.png" />
      <form class="form" @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="form.email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="form.password" />
        </div>
        <div class="d-flex justify-content-center mb-2">
          <button class="btn login-button" @click="submitLogin">Login</button>
        </div>
        <div class="d-flex justify-content-center mb-1">
          <GoogleLogin class="btn btn-sm" :callback="callback"/>
        </div>
        <div class="d-flex justify-content-center mb-2">
          <RouterLink class="btn register-button" to="register">Register</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from "pinia"
import {useIndexStore} from "../stores/index"

export default {
  name : "LoginView",
  data() {
    return {
      form : {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(useIndexStore,["login" , "handleGoogleLogin"]),

    submitLogin() {
      this.login(this.form)
    },

    callback(response) {
      this.handleGoogleLogin (response)
    }
  }
};
</script>

<style scoped>
.logo-image {
  width: 40%;
}
.login-section {
  background-image: url('../assets/login-background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  color: rgba(255, 255, 255, 1);
  font-family: 'Yu-Gi-Oh themed font', sans-serif;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form {
  max-width: 300px;
  margin: 0 auto;
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

.login-button, .register-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
}

.login-button:hover, .register-button:hover {
  background-color: #0056b3;
}
</style>
