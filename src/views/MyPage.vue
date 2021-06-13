<template>
  <div id="Mypage">
    <div class="header-icon">
      <HeaderIcon/>
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
/** Headerの会社ロゴのコンポーネント */
import HeaderIcon from '@/components/HeaderIcon.vue'

/** storeデータ画像のコンポーネント */
import Store from '@/components/Store.vue'

/** 予約データ画像のコンポーネント */
import Reservation from '@/components/Reservation.vue'


import axios from "axios";

export default {
  data(){
    return{

      username:"test",

      storedata:[]

    }
  },

  components: {
    HeaderIcon,
    Store,
    Reservation
  },

    // --------------------- //
    //     データの取得      //
    // --------------------- //
  methods: {
    storedatain(){
      axios.get("https://limitless-shore-94245.herokuapp.com/api/v1/stores").then((response) => {this.storedata =response.data})
    }
  },


  created() {
    this.storedatain();
  },
}
</script>

<style scoped>




#Mypage{
  background-color:rgb(206, 206, 206);
  height:100vh;
  width:100%;
  
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