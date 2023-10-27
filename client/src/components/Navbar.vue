<template>
  <div class="home-navbar">
        <RouterLink to="/" class="home-title"><img src="../assets/ygo-logo.png" class="title-image" /></RouterLink>
        <div class="home-user">
          <RouterLink v-if="isLogin" to="/postauction" class="home-username">Post Item</RouterLink>
          <RouterLink v-if="isLogin" to="/myprofile" class="home-username">{{username}}</RouterLink>
          <div v-if="isLogin">
              <i @click="logout" class="bi bi-power"></i>
          </div>
          <div v-if="!isLogin">
            <RouterLink to="/login" class="home-username"><i class="bi bi-box-arrow-in-right"></i></RouterLink>
          </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useIndexStore} from '../stores/index'
export default {
    name: "Navbar",
    methods: {
        ...mapActions(useIndexStore, ['logout'])
    },
    computed: {
        ...mapState(useIndexStore,["access_token"]),

        username() {
          return localStorage.username || "";
        },

        isLogin() {
          return this.access_token ? true: false
        }
    }
}
</script>

<style>
.home-navbar {
  display: flex;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: fixed; 
}

.title-image {
  width: 15%; 
  height: auto; 
  margin-right: 10px; 
}

.home-title {
  font-size: 40px;
  text-align: center;
  text-decoration: none;
  color: white;
}

.home-user {
  text-align: center;
  position: absolute;
  right: 30px;
  font-size: 25px;
  display: flex;
  align-items: center;
}

.home-username {
  margin-right: 10px;
  font-size: 20px;
  color: white;
  text-decoration: none;
}

.home-navitem {
  text-align: center;
  position: absolute;
  left: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.home-close {
  margin-right: 10px;
  font-size: 20px;
  color: white;
  text-decoration: none;
}
</style>