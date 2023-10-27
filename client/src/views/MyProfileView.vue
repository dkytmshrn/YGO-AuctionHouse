<template>
    <div class="my-profile-view">
      <Sidebar />
      <div class="profile-content">
        <!-- Your profile content goes here -->
        <h1></h1>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue'
  export default {
    methods: {
      
    },
    components : { Sidebar }
  };
  </script>
  
  <style scoped>
  .my-profile-view {
    display: flex;
  }
  
  .profile-content {
    flex: 1;
    padding: 20px;
  }
  </style>
  