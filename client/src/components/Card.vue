<template>
    <div class="col-3 g-3" >
      <div class="card h-100">
        <div class="card-content" >
            <img :src="post.image" class="card-image">
        </div>
        <div class="card-footer">
            <div>
                <p class="card-title bold">Base price : {{ post.price }}</p>
                <p class="card-title bold">Max bid : {{ post.time }}</p>
            </div>
            <form @submit.prevent="submitBid">
              <input v-model="form.price" type="text" placeholder="Enter your bid" class="mb-2 form-price">
              <button class="btn btn-sm btn-dark font-weight-bold form-button" @click.prevent="submitBid">BID</button>           
            </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {mapState, mapActions} from 'pinia'
  import {useIndexStore} from '../stores/index'
  export default {
    methods: {
      ...mapActions(useIndexStore,['postBid']),
    },
    data() {
      return {
        form : {
            sellId : this.post.id,
            price : ''
        }
      }
    },
    computed: {
      ...mapState(useIndexStore,['access_token']),
  
      submitBid() {
        this.postBid(this.form)
      }
    },
    name: "Card",
    props:['post']
  }
  </script>
  
  <style scoped>

  .form-price, .form-button{
    width: 100%;
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    background-color: rgba(255,255,255,0.6);
  }
  
  .card-image {
    width: 100%;
    height: auto;
  }
  
  .card-footer {
    justify-content: right;
    justify-items: right;
  }
  </style>