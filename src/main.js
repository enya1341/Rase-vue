import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

console.log(store.state.config)

const config = {
  // apiKey: "AIzaSyAxIIs7Cxf9NSIWJmD_U0npi_phwIabtm8",
  // authDomain: "rase-vue.firebaseapp.com",
  // databaseURL: "https://rase-vue-default-rtdb.firebaseio.com",
  // projectId: "rase-vue",
  // storageBucket: "rase-vue.appspot.com",
  // messagingSenderId: "650383339554",
  // appId: "1:650383339554:web:a30dd19bd934a3f2309a7b"
  apiKey: store.state.config.apiKey,
  authDomain: store.state.config.authDomain,
  databaseURL: store.state.config.databaseURL,
  projectId: store.state.config.projectId,
  storageBucket: store.state.config.storageBucket,
  messagingSenderId: store.state.config.messagingSenderId,
  appId: store.state.config.appId
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
