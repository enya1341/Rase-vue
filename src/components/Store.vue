<template>
  <div id="store">
    <div class="box">
      <img :src="this.store.img" alt="">
      <div class="bottom-box">
        <h1>{{this.store.name}}</h1>
        <h3>#{{this.store.region}} #{{this.store.genre}}</h3>
        <div class="flex">
          <button @click="storedetail">詳しくみる</button>
          <img src="../assets/heartin.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      store:{
        id:0,
        name:"仙人",
        region:"東京都",
        genre:"寿司",
        img:require("../assets/store/1.jpg")
      },
    };
  },
  
  methods:{
    storedetail(){
      this.$router.push({
        name: 'StoreDetail',
        params: { id: this.store.id }
      })
    }
  }

}
</script>

<style scoped>

.box {
  width:400px;
  height:400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5)
}

.box img {
  width:100%;
  height:50%;
  border-radius: 10px;
}

.bottom-box{
  background-color: white;
  padding:20px 30px;
  color:black;
}

.bottom-box h1{
  font-weight: bold;
  margin-bottom:15px;
  color:black;
}

.bottom-box h3{
  margin-bottom:15px;
  color:black;
}

.bottom-box img{
  width:50px;
  margin:20px;
}

button {
  width: 100px;
  height:45px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: #2f00ff;
  border-radius: 10px;
  cursor: pointer;
  margin-top:30px;
}

.flex {
  display: flex;
  justify-content: space-between;
}


</style>