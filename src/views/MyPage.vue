<template>
  <div v-if="sync && sync2" id="Mypage">
    <div class="header-icon header-flex">
      <HeaderIcon/>
      <div class ="header-link flex">
        <p @click="StoreList" class="storelist">ストア一覧</p>
        <p @click="Logout" class="logout">ログアウト</p>
      </div>
    </div>
    <div class="flex">
      <div class="left-mypage">
        <p>予約状況</p>
        <div class="mypage-store" v-for="(reservation,index) in reservationdata" :key="index">
          <Reservation :parentReservationdata="reservation" :parentReservationStoredata="reservationStoredata[index]" :parentIndex="index+1"/>
        </div>
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
      reservationStoredata:[],
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
      await axios.get( this.$store.state.host + "/api/v1/" + this.$store.state.user.id + "/favorites").then((response) => {this.favoritedata =response.data.data})
      console.log('お気に入りデータが入れられました')

      //  取得したお気に入りデータからストアデータを取得
      for(let n = 0; n < this.favoritedata.length; n++){
        await axios.get(this.$store.state.host + "/api/v1/" + this.favoritedata[n].store_id + "/stores").then((response) => {this.storedata[n] =response.data.data[0]})
        console.log(this.storedata[n])
      }
      //  データの取得が完了したことを確認するためのスイッチ
      this.sync=true
      
    },

    /** 予約機能のデータ取得 */
    async reservationdatain(){

      //  予約データの取得
      await axios.get( this.$store.state.host + "/api/v1/" + this.$store.state.user.id + "/reservations").then((response) => {this.reservationdata =response.data.data})

      //  取得した予約データからストアデータを取得
      for(let i = 0; i < this.reservationdata.length; i++){
        await axios.get(this.$store.state.host + "/api/v1/" + this.reservationdata[i].reservations.store_id + "/stores").then((response) => {this.reservationStoredata[i] =response.data.data[0]})
      }
      //データの取得が完了したことを確認するためのスイッチ。しかし現状エラー内容になるので一時御遺徳
      this.sync2=true
    },

    /** ストア詳細ページに遷移*/
    StoreList(){
      this.$router.push({
        name: 'StoreList'
      })
    },

    /** ストア詳細ページに遷移*/
    Logout(){
      this.$router.push({
        name: 'Logout'
      })
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


.header-flex {
  display: flex;
  justify-content: space-between;
  width:90%;
}

.header-link{
  margin-top:65px;
}

.header-link p{
  font-size:18px;
  margin-right:25px;
  cursor: pointer;
}

.storelist{
  color:blue;
}

.logout{
  color:red;
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
  margin:180px 0 276px;
  padding-right:60px;
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
  width:200px;
  margin:0 30px 45px 0;
}

</style>