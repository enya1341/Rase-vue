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
          <input placeholder="Username" type="username" v-model="username" />
        </div>        
        <div class="form flex">
          <img src="../assets/mail.png" width="32px">
          <input placeholder="Email" type="email" v-model="email" />
        </div>
        <div class="form flex">
          <img src="../assets/password.png" width="32px">
          <input placeholder="Password" type="password" v-model="password" />
        </div>
        <button @click="auth">ログイン</button>
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
      username: "",
      email: "",
      password: ""
    };
  },
  components: {
    HeaderIcon
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

</style>