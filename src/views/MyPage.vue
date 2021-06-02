<template>
  <div id="Mypage">
    <div class="header-icon">
      <Icon/>
    </div>
    <div class="flex">
      <div class="left-mypage">
        <p>予約状況</p>
        <Reservation/>
      </div>
      <div class="right-mypage">
        <h1>{{this.username}}さん</h1>
        <p>お気に入り店舗</p>
        <div class="flex">
          <div class="store" v-for="(store,index) in storedata" :key="index">
          <Store :parentStore="store"/>
        </div>
        </div>

        
      </div>
    </div>
   
    
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Icon.vue'
import Store from '@/components/Store.vue'
import Reservation from '@/components/Reservation.vue'

export default {
  data(){
    return{
      username:"test",
      storedata:[
      {
        id:0,
        name:"仙人",
        region:"東京都",
        genre:"寿司",
        img:require("../assets/store/0.jpg")
      },
      {
        id:1,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      }
      ]
    }
  },

  components: {
    Icon,
    Store,
    Reservation
  }
}
</script>

<style scoped>




#Mypage{
  background-color:rgb(206, 206, 206);
  height:100vh;
  width:100%;
  
}

.header-icon{
  position: absolute;
  top:30px;
  left:30px;
}

.flex {
  display: flex;
}

.left-mypage{
  display: table;
  width:40%;
  margin:250px auto;
}

.left-mypage p{
  color:black;
  padding-bottom:30px;
  size:22px;
  font-weight:bold;
}

.right-mypage{
  width:40%;
  margin-top:180px;
  padding-right:150px;
}

.right-mypage h1{
  color:black;
  padding-bottom:30px;
  font-size:32px;
  font-weight:bold;
}

.right-mypage p{
  color:black;
  padding-bottom:30px;
  size:22px;
  font-weight:bold;
}

.store {
  margin-right:30px;
}

</style>