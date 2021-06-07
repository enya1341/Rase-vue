<template>
  <div id="storedetail">

    <HeaderIcon class="Icon"/>

    <div class="flex">

      <div class="storedata">
        <div class="store-top flex">
          <img src="../assets/next.png" style="transform: scale(-1, 1);" @click="back">
          <h1>{{this.storedata[$route.params.id].name}}</h1>
        </div>
        <img class="store-img" :src="this.storedata[$route.params.id].img">
        <p class="store-tag">
          #{{this.storedata[$route.params.id].region}} #{{this.storedata[$route.params.id].genre}}
        </p>
        <p class="store-contact">
          {{this.storedata[$route.params.id].content}}
        </p>
      </div>



      <div class="reservation">
        <h1>予約</h1>
        <input type="date" v-model="reservationData.date" />
        <input class = "long-input" type="text" v-model="reservationData.time" />
        <input class = "long-input" type="text" v-model="reservationData.number" />
        <div class="reservation-data">
          <div class="data">
            <tr>
              <th>Shop</th>
              <td>{{this.storedata[$route.params.id].name}}</td>
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

export default {
  data(){
    return{

      reservationData:{
        date:"",
        time:"",
        number:""
      },

      storedata:[
      {
        id:0,
        name:"仙人",
        region:"東京都",
        genre:"寿司",
        img:require("../assets/store/0.jpg"),
        content:"料理長厳選の食材から作る寿司を用いたコースをぜひお楽しみください。食材・味・価格、お客様の満足度を徹底的に追及したお店です。特別な日のお食事、ビジネス接待まで気軽に使用することができます。"
      },
      {
        id:1,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg"),
        content:"焼肉業界で20年間経験を積み、肉を熟知したマスターによる実力派焼肉店。長年の実績とお付き合いをもとに、なかなか食べられない希少部位も仕入れております。また、ゆったりとくつろげる空間はお仕事終わりの一杯や女子会にぴったりです。"
      },
      ]

    }
  },
  methods:{

    /** 企業一覧ページに戻る */
    back(){
      this.$router.push({
        name: 'StoreList'
      })
    },

    /** 予約完了ページに戻る */
    reservation(){
      this.$router.push({
        name: 'ReservationCompletion',
      })
    }
  },
  
  components: {
    HeaderIcon
  }
}
</script>

<style scoped>

#storedetail{
  background-color:rgb(206, 206, 206);
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
  color:black;
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