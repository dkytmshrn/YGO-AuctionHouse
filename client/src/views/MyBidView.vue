<template>
    <div class="my-profile-view">
      <Sidebar />
      <div class="profile-content " >
        <div class="row container all-card">
          <div class="col-6 g-4 d-flex justify-content-end" v-for="bid in myBid" :key="bid.id">
            <div class="card d-flex card-each">
              <div class="container d-flex justify-content-end">
                <img class="post-image" :src="bid.Sell.image">
              </div>
              <div class="d-flex justify-content-around">
                <div class="post-bid">AUCTION ID : {{ bid.SellId }}</div>
                <div class="post-bid">MY BID : {{ bid.Sell.time }}</div>
              </div>
              <div class="d-flex justify-content-center" @click.prevent="getPayment(bid.SellId)">
                <div class="post-bid">PAY NOW</div>
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
    name : "MyBidView",
    data() {
    return {
        form : {
            buyerId: localStorage.userId,
        }
        };
    },
    methods: {
      ...mapActions(useIndexStore,['fetchUserBid', 'midtransPayment']),

      getPayment(input) {
        this.form.sellId = input
        this.midtransPayment(this.form)
      }
    },
    components : { Sidebar },
    computed: {
      ...mapState(useIndexStore,['access_token', 'myBid']),
      
    },

    created () {
      this.fetchUserBid(this.form)
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
    font-size: 15px;
    font-weight: bold;
  }
  .profile-content {
    flex: 1;
    padding: 20px;
  }
 
  </style>
  