<template>
  <div class="storedetail">

    <HeaderIcon class="Icon"/>

    <div class="flex">

      <div class="storedata">
        <div class="store-top flex">
          <img src="../assets/next.png" style="transform: scale(-1, 1);" @click="back">
          <h1>{{this.storedata.name}}</h1>
        </div>
        <img class="store-img" :src="Storeimage(this.storedata.image)">
        <p class="store-tag">
          #{{this.storedata.region}} #{{this.storedata.genre}}
        </p>
        <p class="store-contact">
          {{this.storedata.overview}}
        </p>
      </div>



      <div class="reservation">
        <h1>予約</h1>
        <input type="date" v-model="reservationData.date" />
        <input class = "long-input" type="time" v-model="reservationData.time" />
        <input class = "long-input" type="text" v-model="reservationData.number" />
        <div class="reservation-data">
          <div class="data">
            <tr>
              <th>Shop</th>
              <td>{{this.storedata.name}}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{{this.reservationData.date}}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{{this.reservationData.time}}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{{this.reservationData.number}}人</td>
            </tr>
          </div>
        </div>
        <div class="reservation-button" @click="reservation">
          <p>予約する</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
/** Headerの会社ロゴのコンポーネント */
import HeaderIcon from '@/components/HeaderIcon.vue'

import axios from "axios";



export default {
  
  data(){
    return{

      reservationData:{
        date:"",
        time:"",
        number:"",
      },

      day:"",

      storedata:""

    }
  },
  methods:{
  
    /** ストアの詳細データを取得 */
    storedatain(){
      axios.get(this.$store.state.host  + "/api/v1/" + this.$route.params.id + "/stores").then((response) => {this.storedata =response.data.data[0]})

    },

    /** 企業一覧ページに戻る */
    back(){
      this.$router.push({
        name: 'StoreList'
      })
    },

    /** 動的にrequireを機能させるための関数*/
    Storeimage(imgURL){
      return require(`../../public/store/${imgURL}`)
    },

    /** 予約完了ページに戻る */
    reservation(){
      const day = this.reservationData.date + " " + this.reservationData.time + ":00";

      axios.put(this.$store.state.host + "/api/v1/" + this.$route.params.id + "/reservations",{
        user_id: this.$store.state.user.id,
        day: day,
        number:this.reservationData.number
      }),

      this.$router.push({
        name: 'ReservationCompletion',
      })
    },

  },
  
  components: {
    HeaderIcon
  },

  created() {
    this.storedatain();
  }
}
</script>

<style scoped>

.storedetail{
  background-color:rgb(216, 216, 216);
  height:100vh;
  width:100%;
}

.Icon{
  position: absolute;
}

.flex {
  display: flex;
}

.storedata{
  width:45%;
  margin:150px 30px 0;
}

.store-img{
  width:95%;
}

.store-top{
  margin-bottom:15px;
}

.store-top h1{
  font-size:28px;
  margin:18px 0 0 10px;
  color:rgb(0, 0, 0);
}

.store-tag{
  color:black;
  margin:30px 0;
}

.store-contact{
  color:black;
  width:95%;
}

.reservation{
  height:90vh;
  width:45%;
  background-color: rgb(0, 106, 245);
  border-radius: 10px;
  box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5);
  margin-top:50px;
}

.reservation h1{
  font-size:28px;
  margin:30px;
}

.reservation input{
  display:block;
  border-radius: 5px;
  margin:15px 30px;
  color:black;
}

.long-input{
  width:80%;
}

.reservation-data{
  background-color: rgb(94, 142, 245);
  width:80%;
  margin:0 30px;
  border-radius: 5px;
}

.data{
  padding:30px;
}

.data th{
  width:190px;
  padding-bottom:15px;
  text-align: left;
}

.reservation-button{
  position: absolute;
  width:45%;
  height:60px;
  bottom: 30px;
  border-radius: 5px;
  background-color: rgb(0, 75, 238);
}

.reservation-button p{
  font-size:28px;
  text-align: center;
  line-height:60px;
  cursor: pointer;
}

</style>