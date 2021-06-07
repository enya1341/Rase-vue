<template>
  <div id="thankyou">
    <Icon/>
    <div class="box">
      <h1>ご予約ありがとうございます</h1>
      <button @click="back">戻る</button>
    </div>
  </div>
</template>

<script>

import Icon from '@/components/HeaderIcon.vue'

export default {
  components: {
    Icon
  },
  methods:{
    back(){
      this.$router.push({
        name: 'StoreList',
      })
    }
  }
}
</script>

<style scoped>




#thankyou{
  background-color:rgb(206, 206, 206);
  height:100vh;
  width:100%;
}

.box {
  display: table;
  margin:200px auto 0;
  width:400px;
  height:250px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5)
}

.box h1{
  text-align: center;
  margin-top:80px;
  color:black;
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