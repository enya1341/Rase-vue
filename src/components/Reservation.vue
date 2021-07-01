<template>
  <div>
    <div class="box" >

      <div class="head flex">
        <div class="leftflex">
          <img src="../assets/clock.png">
          <h1>予約{{this.parentIndex}}</h1>
        </div>
        <img src="../assets/close.png" @click="reservationClose">
      </div>

      <div class="reservation-data" v-if="!(this.QRauth)">
        <div class="data">
          <th>Shop</th>
          <td>{{this.parentReservationStoredata.name}}</td>
        </div>
        <div class="data">
          <th>Date</th>
          <td>{{this.parentReservationdata.date}}</td>
        </div>
        <div class="data">
          <th>Time</th>
          <td>{{this.parentReservationdata.time}}</td>
        </div>
        <div class="data">
          <th>Number</th>
          <td>{{this.parentReservationdata.reservations.number}}人</td>
        </div>
        <div class="data">
          <th>評価</th>
          <td>
            <select class="value-select" v-model="value">
              <option disabled value="">評価をきめてください</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <button @click="valuedata">送信</button>
          </td>
        </div>
        <div class="data">
          <th>QRコード:</th>
          <td>
            <button v-if="!(this.QRauth)" @click="QRopen">表示</button>
          </td>
        </div>
        <div>
          <th>{{this.errordata.message}}</th>
        </div>
      </div>

      <div class="reservation-data" v-if="this.QRauth">
        <VueQrcode class = "QRcode" v-if="this.QRauth" :value="this.parentReservationdata.reservations.QRcodeData" :options="option" tag="img"/>

        <button class = "QR-button" v-if="this.QRauth" @click="QRclose">閉じる</button>

      </div>

    </div>
    
  </div>
</template>

<script>

import axios from "axios";

import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  
  props: ["parentReservationdata","parentReservationStoredata","parentIndex"],

  components: {
    VueQrcode
  },

  data(){
    return{
      value:"",
      errordata:"",
      QRauth:null
    }
  },
  
  methods:{
    
    /** 予約取り消し。とりあえず手動のみ*/
     async reservationClose(){
       await axios({
              method: "delete",
              url: this.$store.state.host + "/api/v1/"+this.$store.state.user.id+"/reservations",
              data: {
                reservation_id: this.parentReservationdata.reservations.id
              }
        })
        this.$router.go()
    },

    valuedata(){
      axios.post(this.$store.state.host + "/api/v1/" + this.parentReservationStoredata.id + "/values",{
        user_id: this.$store.state.user.id,
        value:this.value
      }).then((response) => {this.errordata =response.data});
    },

    QRopen() {
      this.QRauth = true;
    },

    QRclose() {
      this.QRauth = false;
    }

  }

}
</script>

<style scoped>



.box {
  width:400px;
  height:320px;
  background-color: rgb(0, 106, 245);
  border-radius: 10px;
  box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5)
}

.head {
  display: table;
  width:80%;
  margin:0 auto;
  padding-top:10px;
}

img{
  width:30px;
  height:30px;
}

.leftflex{
  display:flex;
}

.leftflex img{
  margin-right:30px;
}

.leftflex h1{
  margin:10px auto;
}



.flex {
  display: flex;
  justify-content: space-between;
}

.reservation-data{
  display: table;
  width:80%;
  margin:10px auto;
}

.data{
  margin:20px 0 10px;
}

.data th{
  width:190px;
  text-align: left;
}

.QRcode{
  display: table;
  margin:15px auto;
  width:50%;
  height:50%;
}

.QR-button{
  display: table;
  margin:0 auto;
}



.value-select{
  color:black;
  width:40%;
  
}

.value-select option{
  color:black;
}

.value-flex{
  display: flex;
 
}

button {
  width: 60px;
  height:30px;
  text-align: center;
  padding: 4px 0 10px;
  color: #fff;
  background-color: #2f00ff;
  border-radius: 10px;
  cursor: pointer;
  margin-left:10px;
}




</style>