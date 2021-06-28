import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import MyPage from '../views/MyPage.vue'
import Register from '../views/Register.vue'
import Thankyou from '../views/Thankyou.vue'
import ReservationCompletion from '../views/ReservationCompletion.vue'
import StoreDetail from '../views/StoreDetail.vue'
import StoreList from '../views/StoreList.vue'
import firebase from 'firebase'
// /** storeデータ画像のコンポーネント */
import store from '../store/index'

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
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true,
    },
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
    props: true,
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
    to.matched.some((record) => record.meta.requiresAuth)
  ) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user  && store.state.auth) {
        next()
      } else {
        // 認証されていない場合、認証画面へ
        next(
          {
            name: 'Login', query: { redirect: to.fullPath, }
          }
        )
      }
    })
  } else {
    next();
  }
});

export default router
