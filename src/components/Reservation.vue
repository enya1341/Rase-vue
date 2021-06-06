<template>
  <div>
    <div class="box">
      <div class="head flex">
        <div class="leftflex">
          <img src="../assets/clock.png" alt="">
          <h1>予約1</h1>
        </div>
        <img src="../assets/close.png" alt="">
      </div>
      <div class="reservation-data">
        <div class="data" v-for="(data,index) in title" :key="index">
          <th>{{data.shop}}</th>
          <td>{{data.title}}</td>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  data(){
    return{
      title:[
        {
          shop:"Shop",
          title:"仙人"
        },
        {
          shop:"Date",
          title:"2021-04-01"
        },
        {
          shop:"Time",
          title:"17:00"
        },
        {
          shop:"Number",
          title:"１人"
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
  padding-top:30px;
}

img{
  width:50px;
  height:50px;
}

.leftflex{
  display:flex;
}

.leftflex img{
  margin-right:30px;
}

.leftflex h1{
  margin:20px auto;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.reservation-data{
  display: table;
  width:75%;
  margin:30px auto;
}

.data{
  margin:30px 0;
}

.data th{
  width:190px;
  text-align: left;
}



</style>