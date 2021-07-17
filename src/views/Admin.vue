<template>
  <div id="admin" v-if="$store.state.user.admin === 1">
    <HeaderIcon/>
    <div class="box">
      <div class="flex top-users">
        <h1>ID:</h1>
        <h1>ユーザー名：</h1>
        <h1>メールアドレス：</h1>
        <h1>店舗代表者権限の有無：</h1>
        <h1>店舗代表者権限の付与</h1>
      </div>
      <div class="flex users" v-for="(user,index) in usersdata" :key="index">
        <h1>{{user.id}}</h1>
        <h1>{{user.name}}</h1>
        <h1>{{user.email}}</h1>
        <h1 v-if="user.storeAdmin === 1">有</h1>
        <h1 v-if="!user.storeAdmin">無し</h1>
        <div class="storeAdmin">
          <button v-if="user.storeAdmin === 1" @click="StoreAdminDelete(user)">権限削除</button>
          <button v-if="!user.storeAdmin" @click="StoreAdminGrant(user)">権限付与</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
/** Headerの会社ロゴのコンポーネント */
import HeaderIcon from '@/components/HeaderIcon.vue'
import axios from "axios";

export default {
  
  data(){
    return{
      usersdata:"",
      sync:false,
    }
  },
  components: {
    HeaderIcon
  },
  methods: {

    /** そのままログインページへ（ここはいつか修正) */
    auth() {
      this.$router.push("/mypage");
    },

    /** ユーザーデータの取得 */
    userdatain(){
      /** 全ユーザーデータの取得 */
      axios.get(this.$store.state.host + "/api/v1/" + this.$store.state.user.email + "/users",{
        params:{
          password:this.$store.state.user.password
        }
      }).then((response) => {this.usersdata =response.data.data})
      .catch(error => {
        console.info(error.response)
      })

      // axios({
      //         method: "get",
      //         url: this.$store.state.host + "/api/v1/adminuserget/users",
      //         params: {
      //           store_id:this.parentStore.id
      //         }
      //   })

      this.sync=true
    },

    StoreAdminGrant(user){
      axios.put(this.$store.state.host + "/api/v1/storeAdminGrant/users",{
        name: user.name,
        email: user.email,
        password: user.password
      });
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },

    StoreAdminDelete(user){
      axios.put(this.$store.state.host + "/api/v1/storeAdminDelete/users",{
        name: user.name,
        email: user.email,
        password: user.password
      });
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },


  },
  created() {
    if(this.$store.state.user.admin === 1){
      this.userdatain();
    }
    
  },
}
</script>

<style scoped>




#admin{
  background-color:rgb(206, 206, 206);
  width:100%;
}

.flex {
  display: flex;
}

.box {
  display: table;
  margin:100px auto;
  padding:20px 10px;
  width:90%;
  background-color: rgba(255, 255, 255, 0.774);
  border-radius: 10px;
  border:2px solid black;
  box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5);
}

.box h1{
  text-align: center;
  color:black;
}

.top-users{
  width:90%;
  padding:10px 15px;
  /* border-bottom:2px solid black; */
}

.users{
  width:90%;
  padding:0 15px;
}

.top-users h1{
  width:20%;
  padding:10px 15px;
  border-bottom:2px solid black;
  border-right:2px solid rgb(216, 216, 216);
}

.users h1{
  width:20%;
  padding:20px 15px 10px;
  font-size:10px;
  border-bottom:2px solid rgb(189, 189, 189);
  border-right:2px solid rgb(184, 182, 182);
}

.storeAdmin{
  width:20%;
  padding:10px 15px;
  border-bottom:2px solid black;
  border-right:2px solid rgb(216, 216, 216);
}

button {
  display: table;
  width: 120px;
  text-align: center;
  padding: 2px 0 3px;
  color: #fff;
  background-color: #2f00ff;
  border-radius: 25px;
  cursor: pointer;
  margin:0 auto;
}

</style>