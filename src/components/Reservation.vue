<template>
  <div>
    <div class="box">

      <div class="head flex">
        <div class="leftflex">
          <img src="../assets/clock.png">
          <h1>予約{{this.parentIndex}}</h1>
        </div>
        <img src="../assets/close.png" @click="reservationClose">
      </div>

      <div class="reservation-data">
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
      </div>

    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  
  props: ["parentReservationdata","parentReservationStoredata","parentIndex"],

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

  }

}
</script>

<style scoped>



.box {
  width:400px;
  height:250px;
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
  margin:20px 0;
}

.data th{
  width:190px;
  text-align: left;
}



</style>