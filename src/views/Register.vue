<template>
  <div id="login">
    <HeaderIcon/>
    <div class="box">

      <div class="top-box">
        <h1>Registertion</h1>
      </div>

      <div class="buttom-box">
        <div class="form flex">
          <img src="../assets/user.png" width="32px">
          <input placeholder="Username" type="text" v-model="name" />
        </div>        
        <div class="form flex">
          <img src="../assets/mail.png" width="32px">
          <input placeholder="Email" type="email" v-model="email" />
        </div>
        <div class="form flex">
          <img src="../assets/password.png" width="32px">
          <input placeholder="Password" type="password" v-model="password" />
        </div>
        <button @click="auth">登録</button>
        <p v-if="error" class="errorLog">このメールアドレスは有効ではありません</p>
      </div>

    </div>
  </div>
</template>

<script>

/** Headerの会社ロゴのコンポーネント */
import HeaderIcon from '@/components/HeaderIcon.vue'

import axios from "axios";

export default {


  data() {
    return {
      name: "",
      email: "",
      password: "",
      check:false,
      error:false
    };
  },


  components: {
    HeaderIcon
  },


  methods: {

    /** 会員登録の処理 */
    auth() {
      if(this.check===true){
        axios
        .post(this.$store.state.host + "/api/v1/users/registration", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          this.$router.push("/thankyou");
        })
        .catch(error => {
          alert(error);
        });
      }else{
        this.error=true;
      }

    }


  },
  watch: {
    email: function () {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(this.email)){
        return this.check=true;
      }else{
        return this.check=false;
      }
      
    },
  },
}

</script>

<style scoped>




#login{
  background-color:rgb(206, 206, 206);
  height:100vh;
  width:100%;
}

.flex {
  display: flex;
}

.box {
  display: table;
  margin:200px auto 0;
}

.top-box{
  width:400px;
  height:25%;
  background-color: #2f00ff;
  padding:20px 20px;
  color:white;
}

.buttom-box{
  width:440px;
  height:75%;
  padding-top:20px;
  background-color:white;
  color:black;
}

.form{
  width:80%;
  margin:0 auto 15px;
}

.form p{
  color:black;
  margin-right:15px;
}

.form img{
  margin-right:10px;
}

input {
  width:80%;
  border:none;
  outline:none;
  color:black;
  border-bottom:2px solid black;
}


button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: #2f00ff;
  border-radius: 25px;
  cursor: pointer;
  margin:30px 70% 30px;
}

.errorLog{
  color: rgb(243, 0, 0);
  text-align: center;
  padding-bottom:30px;
}

</style>