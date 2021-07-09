<template>
  <div id="login">
    <HeaderIcon/>
    <div class="box">

      <div class="top-box flex">
        <h1>Login</h1>
        <p @click='change' class="change">環境切り替え</p>
      </div>

      <div class="buttom-box">
        <div class="form flex">
          <img src="../assets/mail.png" width="32px">
          <input placeholder="Email" type="email" v-model="email" />
        </div>

        <div class="form flex">
          <img src="../assets/password.png" width="32px">
          <input placeholder="Password" type="password" v-model="password" />
        </div>

        <div class="buttonflex">
          <button @click="register">新規登録</button>
          <button @click="auth">ログイン</button>
        </div>
        <p v-if="emailError" class="errorLog">このメールアドレスは有効ではありません</p>
        <p v-if="passwordError" class="errorLog">パスワードが6文字以下です</p>
        <p v-if="this.$store.state.loginErrorMessage" class="errorLog">ログインに失敗しました</p>
      </div>

    </div>
  </div>
</template>

<script>

/** Headerの会社ロゴのコンポーネント */
import HeaderIcon from '@/components/HeaderIcon.vue'

export default {
  data() {
    return {
      email: "",
      password: "",
      check:false,
      emailError:false,
      passwordError:false
    };
  },
  components: {
    HeaderIcon
  },
  methods: {

    /** storeに用意していたログイン処理を実行 */
    auth() {
      if(this.check===true){
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        this.emailError=false;
      }else{
        this.emailError=true;
      }  
    },

    register() {
      this.$router.push({
        name: 'Register'
      })
    },

    change(){
      this.$store.commit('hostChange')
    }


  },
  created() {
    this.change();
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
    password: function(){
      if(this.password.length<7){
        return this.passwordError=true;
      }else{
        return this.passwordError=false;
      }
    }
  }
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

.change{
  margin-left:30px;
  cursor: pointer;
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

.buttonflex{
  display: flex;
  justify-content: space-between;
}

button {
  width: 90px;
  text-align: center;
  padding: 8px 10px;
  color: #fff;
  background-color: #2f00ff;
  border-radius: 25px;
  cursor: pointer;
  margin:30px 70px 30px 60px;
}

.errorLog{
  color: rgb(243, 0, 0);
  text-align: center;
  padding-bottom:30px;
}

</style>