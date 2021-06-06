<template>
  <div id="store">
    <div class="box">
      <img :src="this.parentStore.img">
      <div class="bottom-box">
        <h1>{{this.parentStore.name}}</h1>
        <h3>#{{this.parentStore.region}} #{{this.parentStore.genre}}</h3>
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
  props: ["parentStore"],
  // data() {
  //   return {
  //     store:{
  //       id:0,
  //       name:"仙人",
  //       region:"東京都",
  //       genre:"寿司",
  //       img:require("../assets/store/1.jpg")
  //     },
  //   };
  // },
  
  methods:{
    storedetail(){
      this.$router.push({
        name: 'StoreDetail',
        params: { id: this.parentStore.id }
      })
    }
  }

}
</script>

<style scoped>

.box {
  width:100%;
  height:240px;
  background-color: white;
  border-radius: 10px;
  
}

.box img {
  width:100%;
  height:60%;

}

.bottom-box{
  background-color: white;
  height:50%;
  padding:10px 15px;
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
  width:30px;
  margin:15px;
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
  margin-top:10px;
}

.flex {
  display: flex;
  justify-content: space-between;
}


</style>