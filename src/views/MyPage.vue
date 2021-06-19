<template>
  <div v-if="sync && sync2" id="Mypage">
    <div class="header-icon">
      <HeaderIcon/>
    </div>
    <div class="flex">
      <div class="left-mypage">
        <p>予約状況</p>
          <Reservation :parentReservationdata="reservationdata" :parentReservationStoredata="reservationStoredata"/>
      </div>
      <div class="right-mypage">
        <h1>{{this.$store.state.user.name}}さん</h1>
        <p>お気に入りの店舗</p>
        <div class="flex">
          <div class="mypage-store" v-for="(store,index) in storedata" :key="index">
            <Store :parentStore="store" :parentFavorite="favoritedata"/>
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
      storedata:[],
      favoritedata:[],
      reservationdata:"",
      reservationStoredata:"",
      sync:false,
      sync2:false
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

    /** お気に入り機能のデータ取得 */
     async favoritesStoredatain(){

      //  お気に入りデータの取得
      await axios.get("https://limitless-shore-94245.herokuapp.com/api/v1/" + this.$store.state.user.id + "/favorites").then((response) => {this.favoritedata =response.data.data})
      console.log('お気に入りデータが入れられました')

      //  取得したお気に入りデータからストアデータを取得
      for(let n = 0; n < this.favoritedata.length; n++){
        await axios.get("https://limitless-shore-94245.herokuapp.com/api/v1/" + this.favoritedata[n].store_id + "/stores").then((response) => {this.storedata[n] =response.data.data[0]})
        console.log(this.storedata[n])
      }

      //  データの取得が完了したことを確認するためのスイッチ
      this.sync=true
      
    },

    /** 予約機能のデータ取得 */
    async reservationdatain(){

      //  予約データの取得
      await axios.get("https://limitless-shore-94245.herokuapp.com/api/v1/" + this.$store.state.user.id + "/reservations").then((response) => {this.reservationdata =response.data.data})

      //  取得した予約データからストアデータを取得
      await axios.get("https://limitless-shore-94245.herokuapp.com/api/v1/" + this.reservationdata.reservations.store_id + "/stores").then((response) => {this.reservationStoredata =response.data})

       //  データの取得が完了したことを確認するためのスイッチ
      this.sync2=true
    },

  },

  /** データ取得の確認 */
  watch: {
    favoritedata: function () {
      console.log('お気に入りデータが入れられました 監視')
    },
    reservationdata: function () {
      console.log('予約データが入れられました　監視')
    },
  },

 created() {
    this.reservationdatain();
    this.favoritesStoredatain();
  },

}
</script>

<style scoped>




#Mypage{
  width:100%;
  background-color:rgb(206, 206, 206);
}


.flex {
  display: flex;
  flex-wrap :wrap;
}

.left-mypage{
  display: table;
  width:40%;
  margin:250px auto;
}

.left-mypage p{
  color:black;
  margin-bottom:30px;
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
  margin-bottom:30px;
  font-size:32px;
  font-weight:bold;
}

.right-mypage p{
  color:black;
  margin-bottom:30px;
  size:22px;
  font-weight:bold;
}

.mypage-store {
  margin:0 30px 30px 0;
}

</style>