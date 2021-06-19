import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import MyPage from '../views/MyPage.vue'
import Register from '../views/Register.vue'
import Thankyou from '../views/Thankyou.vue'
import ReservationCompletion from '../views/ReservationCompletion.vue'
import StoreDetail from '../views/StoreDetail.vue'
import StoreList from '../views/StoreList.vue'
import store from "../store/index";

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
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/thankyou',
    name: 'Thankyou',
    component: Thankyou,
  },
  {
    path: '/reservation',
    name: 'ReservationCompletion',
    component: ReservationCompletion,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/storedetail/:id',
    name: 'StoreDetail',
    component: StoreDetail,
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: '/storelist',
    name: 'StoreList',
    component: StoreList,
    meta: {
      requiresAuth: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/** ナビゲーションガード*/
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router
