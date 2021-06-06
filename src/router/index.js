import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import MyPage from '../views/MyPage.vue'
import Register from '../views/Register.vue'
import Thankyou from '../views/Thankyou.vue'
import Reservation from '../views/Reservation.vue'
import StoreDetail from '../views/StoreDetail.vue'
import StoreList from '../views/StoreList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/thankyou',
    name: 'Thankyou',
    component: Thankyou
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation
  },
  {
    path: '/storedetail/:id',
    name: 'StoreDetail',
    component: StoreDetail
  },
  {
    path: '/storelist',
    name: 'StoreList',
    component: StoreList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
