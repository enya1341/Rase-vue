<template>
  <div id="StoreAdmin" v-if="sync || $store.state.user.storeAdmin === 1">

    <div class="header-icon flex">
      <HeaderIcon/>
      <p @click="mypage">マイページへ</p>
    </div>

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
          <div class="data flex" v-if="storeAuth">
            <th>
              <label for="imageIn">ファイル選択:</label>
            </th>
            <form>
              <input type="file" id="imageIn" ref="file" name="imageIn" accept="image/jpeg, image/png, image/jpg" @change="onChangeImage">
            </form>
          </div>
          <div class="data">
            <th>店舗画像:</th>
            <td v-if="storedata.image">
              <img v-if="!storeAuth" :src="Storeimage(this.$store.state.storedata.image)" width="200px">
              <img v-if="storeAuth" :src="this.imagedata.image" width="200px">
            </td>
          </div>
          <div class="flex">
            <button v-if="!storeAuth && !this.$store.state.user.storeAdmin_store_id" @click="storeAuthOn">店舗情報登録</button>
            <button v-if="!storeAuth" @click="storeAuthOn">店舗情報更新</button>
            <button v-if="storeAuth" @click="storeAuthOff">戻る</button>
            <button v-if="storeAuth && !this.$store.state.user.storeAdmin_store_id" @click="storeDataAdd">登録</button>
            <button v-if="storeAuth && this.$store.state.user.storeAdmin_store_id" @click="storeDataUpdate">更新</button>
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
        overview:this.$store.state.storedata.overview,
        image:this.$store.state.storedata.image
      },
      store:"",
      storeAuth:false,
      reservationdata:"",
      sync:false,
      image:"",
      imagedata:{
        image:"",
        name:"",
      }

    }
  },

  components: {
    HeaderIcon,
    Reservation
  },

  methods: {

    /** マイページに戻る */
    mypage() {
      this.$router.push("/mypage");
    },

    /** 店舗登録か更新をする際の画面切り替え用 開く*/
    storeAuthOn() {
      this.storeAuth=true;
    },

    /** 店舗登録か更新をする際の画面切り替え用 閉じる*/
    storeAuthOff() {
      this.storeAuth=false;
    },

    /** DBから取ってきたパスから画像呼び出せるように溶接する関数。S3から取得*/
    Storeimage(imgURL){
      return `https://rase-enya.s3.ap-northeast-1.amazonaws.com/${imgURL}`
    },

    /**画像データが入った際に画像データを入れる*/
    onChangeImage: function(event) {
      const files = this.$refs.file;
      const fileImg = files.files[0];
      this.storedata.image = event.target.files[0];
      if (fileImg.type.startsWith("image/")) {
        this.imagedata.image = window.URL.createObjectURL(fileImg);
        this.imagedata.name = fileImg.name;
        this.imagedata.type = fileImg.type;
      }
    },

    /**ストアを作成する*/
    async storeDataAdd(){

      // 画像を送れるように型を作る
      const imagedata = new FormData();
      imagedata.append("image", this.storedata.image);
      const config = {headers: {'content-type': 'multipart/form-data'}}

      // ストアデータの送信。ユーザーデータにストアIDを送る Post
      await axios.post(this.$store.state.host + "/api/v1/storeAdmin/stores",{
        name: this.storedata.name,
        region: this.storedata.region,
        genre: this.storedata.genre,
        overview:this.storedata.overview,
        email:this.$store.state.user.email
      }).then((response) => {this.$store.commit('storedata',response.data.data[0]),this.$store.commit('user_store_id',response.data.storedata)});

      // 画像データをS3に送信してパスをDBにいれる Post
      await axios.post(this.$store.state.host + "/api/v1/" + this.$store.state.user.storeAdmin_store_id + "/storeAdmin/stores/image",imagedata,config).then((response) => {this.$store.commit('image',response.data.data)})

      //データを入れられたらリロード
      if(this.$store.state.user.storeAdmin_store_id){
        this.storeAuth=false;
        this.$router.go({path: this.$router.currentRoute.path, force: true})
      }
    },

    /**ストアを更新する*/
    async storeDataUpdate(){

      // 画像を送れるように型を作る
      const imagedata = new FormData();
      imagedata.append("image", this.storedata.image);
      const config = {headers: {'content-type': 'multipart/form-data'}};

      // ストアデータの更新 Put
      await axios.put(this.$store.state.host + "/api/v1/" + this.$store.state.storedata.id + "/storeAdmin/stores",{
        name: this.storedata.name,
        region: this.storedata.region,
        genre: this.storedata.genre,
        overview:this.storedata.overview,
      }).then((response) => {this.$store.commit('storedata',response.data.data[0])});

      // 画像データをS3に送信してパスをDBにいれる Post
      await axios.post(this.$store.state.host + "/api/v1/" + this.$store.state.user.storeAdmin_store_id + "/storeAdmin/stores/image",imagedata,config).then((response) => {this.$store.commit('image',response.data.data),this.storeAuth=false})
    },

    async reservationdatain(){

      //  予約データの取得 Get
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

.header-icon p{
  margin-top:55px;
  margin-left:60px;
  font-size:18px;
  cursor: pointer;
  color:yellow;
  text-shadow:1px 2px 3px #f00000;
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
  vertical-align:top;
}


.data label{
  color:black;
  font-size:16px;
}

.storedatas{
  padding-left:20%;
}

.data td{
  color:black;
  width:40%;
  text-align: left;
}

.data form{
  color:black;
  width:40%;
  margin-left:60px;
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