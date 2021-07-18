import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
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
