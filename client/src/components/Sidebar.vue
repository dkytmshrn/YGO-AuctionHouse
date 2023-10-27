<template>
  <div class="sidebar">
        <ul>
          <li><router-link to="/"><img src="../assets/ygo-logo.png" class="title-image mb-5" /></router-link></li>
          <li><router-link class="sidebar-item" to="myprofile">My Profile</router-link></li>
          <li><router-link class="sidebar-item" to="changemypassword">Change Password</router-link></li>
          <li><router-link class="sidebar-item" to="mybid">Check Bid Offers</router-link></li>
          <li><router-link class="sidebar-item" to="mypost">Check Auction Posts</router-link></li>
          <li class="sidebar-item" @click.prevent="logout">Logout</li>
        </ul>
      </div>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useIndexStore} from '../stores/index'

export default {
    name: "Sidebar",
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

<style scoped>
.title-image {
    width: 100%;
}
 
.sidebar-item {
    text-decoration: none;
    color: white;
    transition: background-color 0.3s;
}
  .sidebar {
    width: 200px;
    position: fixed;
    z-index: 1;
    background-color: rgba(0,0,0,0.6);
    padding: 10px;
    height: 100vh;
  }

  .sidebar-item:hover {
  background-color: white;
  color: black; 
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
    cursor: pointer;
  }
</style>