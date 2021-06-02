<template>
  <div id="Mypage">
     <Icon/>
    <div class="flex">
      <div class="left-mypage">
        <Reservation/>
      </div>
      <div class="right-mypage">
        <h1>{{this.username}}さん</h1>
        <Store/>
      </div>
    </div>
   
    
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Icon.vue'
import Store from '@/components/Store.vue'
import Reservation from '@/components/Reservation.vue'

export default {
  data(){
    return{
      username:"test"
    }
  },

  components: {
    Icon,
    Store,
    Reservation
  }
}
</script>

<style scoped>




#Mypage{
  background-color:rgb(206, 206, 206);
  height:100vh;
  width:100%;
}

.flex {
  display: flex;
}

.left-mypage{
  display: table;
  width:30%;
  margin:0 auto;
  padding-top:100px;
}



</style>