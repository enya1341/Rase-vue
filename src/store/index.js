import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({

  /** vuex-persistedstateでstateを永続化*/
  plugins: [createPersistedState()],

  state: {
    auth: false,
    user: {
      id: "",
      name: "",
      email: "",
      password:""
    },

  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
    changeUserData(state, payload) {
      state.user.profile = payload;
    },
  },
  actions: {

    /** ログインの処理*/
    async login({ commit }, { email, password }) {
      // ログインの処理を行う
      const responseLogin = await axios.post(
        "https://limitless-shore-94245.herokuapp.com/api/v1/users/login",
        {
            email,
            password
        }
      );
      // userのデータをログイン時に取得
      const responseUser = await axios.get(
        "https://limitless-shore-94245.herokuapp.com/api/v1/users" ,
        {
          params: {
            email,
          }
        }
      );

      commit('auth', responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);

      router.replace('/mypage');

    },
    
    /** ログアウトの処理（ログアウト画面はまだ未実装)*/
    logout({ commit }) {
      axios
        .post("https://limitless-shore-94245.herokuapp.com/api/v1/users/logout", {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
});