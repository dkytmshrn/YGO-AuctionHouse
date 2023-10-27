<template>
    <div class="my-profile-view">
      <Sidebar />
      <div class="profile-content " >
        <div class="row container all-card">
          <div class="col-6 g-4 d-flex justify-content-end" v-for="post in myPost" :key="post.id">
            <div class="card d-flex card-each">
              <div class="container d-flex justify-content-end">
                <img class="post-image" :src="post.image">
              </div>
              <div class="d-flex justify-content-center">
                <div class="post-bid">HIGHEST BID : {{ post.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {mapState, mapActions} from "pinia"
  import {useIndexStore} from "../stores/index"
  import Sidebar from '../components/Sidebar.vue'

  export default {
    name : "MyPostView",
    methods: {
      ...mapActions(useIndexStore,['fetchUserPost']),
    },
    components : { Sidebar },
    computed: {
      ...mapState(useIndexStore,['access_token', 'myPost']),
    },

    created () {
      this.fetchUserPost()
    }
  };
  </script>
  
  <style scoped>
  .my-profile-view {
    display: flex;
  }
  
  .card-each {
    background-color: rgba(0,0,0,0.5);
  }
  .all-card {
    margin-left: 10%;
  }
  .post-bid {
    color: rgba(255,255,255,1);
    font-size: 20px;
    font-weight: bolder;
  }
  .profile-content {
    flex: 1;
    padding: 20px;
  }
 
  </style>
  