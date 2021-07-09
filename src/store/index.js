import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";
import firebase from 'firebase'


Vue.use(Vuex);

export default new Vuex.Store({

  /** vuex-persistedstateでstateを永続化*/
  plugins: [createPersistedState()],

  state: {
    auth: false,
    loginErrorMessage: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      admin: null,
      storeAdmin:null
    },
    storedata: {
      id: "",
      name: "",
      region:"",
      genre: "",
      overview: "",
      image:""
    },
    config: {
        apiKey: process.env.VUE_APP_NOTLOCAL_APIKEY,
        authDomain: "rase-vue-production.firebaseapp.com",
        projectId: "rase-vue-production",
        storageBucket: "rase-vue-production.appspot.com",
        messagingSenderId: "296728946619",
        appId: "1:296728946619:web:b0763b8bf1829348f1469e"
    },


    host: 'https://whispering-retreat-97645.herokuapp.com',
    // localhost:'http://127.0.0.1:8000' heroku:'https://whispering-retreat-97645.herokuapp.com',
    
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    password(state, payload) {
      state.user.password = payload;
    },
    storedata(state, payload) {
      state.storedata.id = payload.id;
      state.storedata.name = payload.name;
      state.storedata.region = payload.region;
      state.storedata.genre = payload.genre;
      state.storedata.overview = payload.overview;
      state.storedata.image = payload.image;
    },
    logout(state, payload) {
      state.auth = payload;
    },
    host(state, payload) {
      state.host = payload;
    },
    changeUserData(state, payload) {
      state.user.profile = payload;
    },
    hostChange(state) {
      if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
        state.host = 'http://127.0.0.1:8000',
        state.config = {
          apiKey: process.env.VUE_APP_LOCAL_APIKEY,
          authDomain: "rase-vue.firebaseapp.com",
          databaseURL: "https://rase-vue-default-rtdb.firebaseio.com",
          projectId: "rase-vue",
          storageBucket: "rase-vue.appspot.com",
          messagingSenderId: "650383339554",
          appId: "1:650383339554:web:a30dd19bd934a3f2309a7b"
          }
        console.log("localもしくは開発環境です")
      } else if(process.env.NODE_ENV ==='production'){
        state.host = 'https://whispering-retreat-97645.herokuapp.com'
        state.config = {
          apiKey: process.env.VUE_APP_NOTLOCAL_APIKEY,
          authDomain: "rase-vue-production.firebaseapp.com",
          projectId: "rase-vue-production",
          storageBucket: "rase-vue-production.appspot.com",
          messagingSenderId: "296728946619",
          appId: "1:296728946619:web:b0763b8bf1829348f1469e"
        };
        console.log("本番環境です")
      }  
    }
  },
  actions: {

    /** ログインの処理*/
    async login({ commit }, { email, password }) {
      // ログインの処理を行う
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          alert('ログインに成功しました'),
          commit('auth', true),
          this.state.loginErrorMessage = false
        )
        .catch(error => {
          // エラー時の処理 
          alert(error);
          commit('auth', false);
          this.state.loginErrorMessage = true
        })
      
      // userのデータをログイン時に取得
      const responseUser = await axios.get(
        this.state.host + "/api/v1/users" ,
        {
          params: {
            email,
          }
        }
      );

      commit("user", responseUser.data.data[0]);
      commit("password", password);
      router.replace('/mypage');

    },
    
    /** ログアウトの処理*/
    logout({ commit }) {

      // // ログアウトの処理(api)
      // axios
      //   .post(this.state.host + "/api/v1/users/logout")
      //   .then((response) => {
      //     console.log(response);
      //     commit("logout", response.data.auth);
      //     router.replace("/");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      
      // ログアウトの処理(firebase)
      firebase.auth().signOut()
      .then(
        alert('ログアウトに成功しました'),
        commit('auth', false),
        router.replace("/")
      )
      .catch(error => {
        alert(error),
        commit('auth', true)
      })

    },
  },
});