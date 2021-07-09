<template>
  <div id="StoreAdmin" v-if="sync || $store.state.user.storeAdmin === 1">
    <HeaderIcon/>
    <div class="flex">
      <div class="left-storedata">
        <h1 class="store-top">ストアの追加と更新</h1>
        <div class="storedata">
          <div class="data">
            <th>店舗名:</th>
            <td v-if="!storeAuth" class="storedatas">{{$store.state.storedata.name}}</td>
            <td>
              <input type="text" v-if="storeAuth" v-model="storedata.name" />
            </td>
          </div>
          <div class="data">
            <th>地域:</th>
            <td v-if="!storeAuth" class="storedatas">{{$store.state.storedata.region}}</td>
            <td>
              <input type="text" v-if="storeAuth" v-model="storedata.region" />
            </td>
          </div>
          <div class="data">
            <th>ジャンル:</th>
            <td v-if="!storeAuth" class="storedatas">{{$store.state.storedata.genre}}</td>
            <td>
              <input type="text" v-if="storeAuth" v-model="storedata.genre" />
            </td>
          </div>
          <div class="data">
            <th>店舗概要:</th>
            <td v-if="!storeAuth" class="storedatas">{{$store.state.storedata.overview}}</td>
            <td>
              <textarea type="text" v-if="storeAuth" v-model="storedata.overview" />
            </td>
          </div>
          <div class="flex">
            <button v-if="!storeAuth && !this.$store.state.storedata.id" @click="storeAuthOn">店舗情報登録</button>
            <button v-if="!storeAuth" @click="storeAuthOn">店舗情報更新</button>
            <button v-if="storeAuth" @click="storeAuthOff">戻る</button>
            <button v-if="storeAuth && !this.$store.state.storedata.id" @click="storeDataAdd">登録</button>
            <button v-if="storeAuth && this.$store.state.storedata.id" @click="storeDataUpdate">更新</button>
          </div>
        </div>
        
      </div>
      <div class="right-reservation">
        <h1 class="reservation-top">店舗予約情報</h1>
        <div class="reservationdata">
          <div class="reservation-store" v-for="(reservation,index) in reservationdata" :key="index">
            <Reservation :parentReservationdata="reservation" :parentReservationStoredata="$store.state.storedata" :parentIndex="index+1" :parentSwitch="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** Headerの会社ロゴのコンポーネント */
import HeaderIcon from '@/components/HeaderIcon.vue'

/** 予約データ画像のコンポーネント */
import Reservation from '@/components/Reservation.vue'

import axios from "axios";

export default {

  data(){
    return{
      storedata:{
        name:this.$store.state.storedata.name,
        region:this.$store.state.storedata.region,
        genre:this.$store.state.storedata.genre,
        overview:this.$store.state.storedata.overview
      },
      store:"",
      storeAuth:false,
      reservationdata:"",
      sync:false

    }
  },

  components: {
    HeaderIcon,
    Reservation
  },

  methods: {

    /** そのままログインページへ（ここはいつか修正) */
    storeAuthOn() {
      this.storeAuth=true;
    },

    storeAuthOff() {
      this.storeAuth=false;
    },

    async storeDataAdd(){

      await axios.post(this.$store.state.host + "/api/v1/storeAdmin/stores",{
        name: this.storedata.name,
        region: this.storedata.region,
        genre: this.storedata.genre,
        overview:this.storedata.overview
      }).then((response) => {this.$store.commit('storedata',response.data.data[0])});

      if(this.$store.state.storedata.id){
        this.storeAuth=false;
      }

    },

    async storeDataUpdate(){

      await axios.put(this.$store.state.host + "/api/v1/" + this.$store.state.storedata.id + "/storeAdmin/stores",{
        name: this.storedata.name,
        region: this.storedata.region,
        genre: this.storedata.genre,
        overview:this.storedata.overview
      }).then((response) => {this.$store.commit('storedata',response.data.data[0]),this.storeAuth=false});
    },

    async reservationdatain(){

      //  予約データの取得
      await axios.get( this.$store.state.host + "/api/v1/" + this.$store.state.storedata.id + "/storeAdmin/reservations").then((response) => {this.reservationdata =response.data.data})

      //データの取得が完了したことを確認するためのスイッチ。しかし現状エラー内容になるので一時御遺徳
      this.sync=true
    },
  },

   created() {
     if(this.$store.state.user.storeAdmin === 1){
        this.reservationdatain();
     }
    
  },

}
</script>

<style scoped>




#StoreAdmin{
  background-color:rgb(206, 206, 206);
  width:100%;
}

.flex {
  display: flex;
  flex-wrap :wrap;
}

.left-storedata{
  display: table;
  width:35%;
  margin:80px auto;
}

.store-top{
  padding-bottom:15px;
  color:black;
  border-bottom:2px solid black;
}

.storedata{
  margin:40px 15px;
}

.data{
  padding-bottom:15px;
}

.data th{
  color:black;
  width:110px;
  text-align: left;
}

.storedatas{
  padding-left:20%;
}

.data td{
  color:black;
  width:40%;
  text-align: left;
}

.data input{
  color:black;
  vertical-align:top;
}

.data textarea{
  color:black;
  padding:10px 10px;
  vertical-align:top;
}

.right-reservation{
  width:40%;
  margin:80px 0;
  padding-right:60px;
}

.reservation-top{
  padding-bottom:15px;
  color:black;
  border-bottom:2px solid black;
}

.reservationdata{
  margin:40px 15px;
}

.reservation-store {
  margin-bottom:30px;
}


button {
  display: table;
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: #2f00ff;
  border-radius: 25px;
  cursor: pointer;
  margin:60px auto 0;
}

</style>