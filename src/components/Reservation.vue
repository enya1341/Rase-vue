<template>
  <div>
    <div class="box">

      <div class="head flex">
        <div class="leftflex">
          <img src="../assets/clock.png">
          <h1>予約1</h1>
        </div>
        <img src="../assets/close.png">
      </div>

      <div class="reservation-data">
        <div class="data" v-for="(data,index) in storedata" :key="index">
          <th>{{data.title}}</th>
          <td>{{data.storedata}}</td>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
      storedata:[
        {
          title:"Shop",
          storedata:"仙人"
        },
        {
          title:"Date",
          storedata:"2021-04-01"
        },
        {
          title:"Time",
          storedata:"17:00"
        },
        {
          title:"Number",
          storedata:"１人"
        }
      ]
    };
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