import axios from 'axios'
import { defineStore } from 'pinia'

const baseUrl = "http://localhost:3000"
export const useIndexStore = defineStore('index', {
  state: () => ({
    username : localStorage.userName,
    access_token : localStorage.access_token,
    allPost : [],
    post : [],
    bid : [],
    card_data : [],
    myPost : [],
    myBid : []

  }),

  actions: {
    async register(input) {
      try {
        await axios({
          method: "post",
          url: baseUrl + "/register",
          data: input
        })

        this.router.push({name:"login"})

        Swal.fire(
          'REGISTER SUCCESS',
          'you are registered now!',
          'success'
        )
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        })
      }
    },

    async login(input) {
      try {
        const {data} = await axios({
          method: "post",
          url: baseUrl + "/login",
          data: input,
        })
        
        localStorage.access_token = data.access_token
        this.access_token = data.access_token
        this.username = data.username
        localStorage.userId = data.userId
        localStorage.username = data.username
        
        Swal.fire(
          'LOGIN SUCCESS',
          'you are loged in now!',
          'success'
        )

        this.router.push({name: "home"})
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },
    
    logout() {
      localStorage.clear()
      this.username = null
      this.access_token = null
      this.router.push({name:"login"})
    },

    async handleGoogleLogin(response) {
      try {
        const { data } = await axios.post(
          baseUrl + "/auth/google-sign-in",
          null,
          {
            headers: {
              google_token: response.credential,
            },
          }
        );

        localStorage.access_token = data.access_token
        this.access_token = data.access_token
        this.username = data.email
        localStorage.userId = data.userId
        localStorage.username = data.email
        localStorage.email = data.email
        localStorage.goauth = true

        Swal.fire(
          'LOGIN SUCCESS',
          'you are loged in now!',
          'success'
        )

        this.router.push({name: "home"})
      } catch (error) {
        console.log(error);
      }
    },

    async changePassword (input) {
      try {
        await axios ({
          method: "put",
          url: baseUrl + "/password",
          headers: {
            access_token: this.access_token
          },
          data: input
        })
        
        Swal.fire(
          'YOUR PASSWORD HAS CHANGED!',
          'Please re-login!',
          'success'
        )

        this.logout()
        this.router.push({name: "login"})
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async fetchCardData() {
      try {
        const {data} = await axios({
          method: "get",
          url: baseUrl + "/cards",
          headers: {
            access_token: this.access_token
          }
        })
        this.card_data = data
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async fetchUserPost() {
      try {
        const {data} = await axios({
          method: "get",
          url: baseUrl + "/sells/myPost",
          headers: {
            access_token: this.access_token
          }
        })
        this.myPost = data
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async postNewItem(input) {
      try {
        await axios({
          method: "post",
          url: baseUrl + "/sells",
          headers: {
            access_token: this.access_token
          },
          data : input
        })
        
        Swal.fire(
          'YOUR ITEM HAS BEEN POSTED',
          'please check your profile!',
          'success'
        )
        
        this.router.push({name: "home"})

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async showPost() {
      try {
        const {data} = await axios({
          method: "get",
          url: baseUrl + "/sells",
          headers: {
            access_token: this.access_token
          }
        })
        this.allPost = data
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async fetchUserBid() {
      try {
        const {data} = await axios({
          method: "get",
          url: baseUrl + "/bids/myBids",
          headers: {
            access_token: this.access_token
          }
        })
        this.myBid = data
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async postBid(input) {
      try {
        const {data} = await axios({
          method: "post",
          url: baseUrl + "/bids",
          headers: {
            access_token: this.access_token
          },
          data : input
        })
        
        this.showPost()
        Swal.fire(
          'BIDDING SUCCESS',
          'check it on your profile!',
          'success'
        )
          
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async buyItem(input) {
      try {
        const {data} = await axios({
          method: "post",
          url: baseUrl + "/items",
          headers: {
            access_token: this.access_token
          },
          data : {
            id : input.sellId
          }
        })
        Swal.fire(
          'BIDDING SUCCESS',
          'check it on your profile!',
          'success'
        )
          
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oh no....",
          text: error.response.data.message,
        });
      }
    },

    async midtransPayment(input){
      try {
        const { data } = await axios({
          url: baseUrl + '/payment',
          method: 'post',
          headers: {
            access_token: this.access_token
          },
          data: input
        })

        const cb = ()=>this.buyItem(input)
        const profile = ()=>this.router.push('/myprofile')

        window.snap.pay(data.token, {
          onSuccess: function(result){
            console.log(result);
            cb()
            profile()
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {

  }
})
