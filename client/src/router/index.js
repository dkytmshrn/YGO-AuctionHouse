import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostSellForm from '../views/PostSellForm.vue'
import MyProfileView from '../views/MyProfileView.vue'
import MyPostView from '../views/MyPostView.vue'
import MyBidView from '../views/MyBidView.vue'
import ChangeMyPassword from '../views/ChangeMyPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/postauction',
      name: 'postauction',
      component: PostSellForm
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: MyProfileView
    },
    {
      path: '/mypost',
      name: 'mypost',
      component: MyPostView
    },
    {
      path: '/mybid',
      name: 'mybid',
      component: MyBidView
    },
    {
      path: '/changemypassword',
      name: 'changemypassword',
      component: ChangeMyPassword
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.name == 'register' && localStorage.access_token){
    next({name:"home"})
  }
  else if (to.name == 'login' && localStorage.access_token) {
    next({name: "home"})
  }
  else if (to.name !== 'login' && to.name !== 'register' && !localStorage.access_token){
    next({ name: 'login' })
  }
  else{
    next()
  }
})

export default router
