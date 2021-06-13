<template>
  <div id="Storelist">
    <div class="header-flex">
      <div class="header-icon">
        <HeaderIcon/>
      </div>
      <div class="search-box">
        <div class="search-area">
          <p>ALL area</p>
          <img src="../assets/down-arrow.png">
        </div>
        <div class="search-genre">
          <p>ALL genre</p>
          <img src="../assets/down-arrow.png">
        </div>
        <div class="search-name">
          <img src="../assets/search.png">
          <p>Search ...</p>
        </div>
      </div>
    </div>

    <div class="store-list">
      <div class="flex">
        <div class="store" v-for="(store,index) in storedata" :key="index">
          <Store :parentStore="store" />
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
/** Headerの会社ロゴのコンポーネント */
import HeaderIcon from '@/components/HeaderIcon.vue'

/** storeデータ画像のコンポーネント */
import Store from '@/components/Store.vue'



export default {
  data(){
    return{
      username:"test",
      storedata:[
      {
        id:0,
        name:"仙人",
        region:"東京都",
        genre:"寿司",
        img:require("../assets/store/0.jpg")
      },
      {
        id:1,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:2,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:3,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:4,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      }
      ,
      {
        id:5,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:6,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:7,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      }
      ,
      {
        id:8,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:9,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:10,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:11,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      }
      ,
      {
        id:12,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:13,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      },
      {
        id:14,
        name:"牛助",
        region:"大阪府",
        genre:"焼肉",
        img:require("../assets/store/1.jpg")
      }
      ]
    }
  },

  components: {
    HeaderIcon,
    Store,
  }
}
</script>

<style scoped>




#Storelist{
  width:100%;
  background-color:rgb(206, 206, 206);
}

.header-flex{
  display: flex;
  justify-content: space-between;
  width:90%;
}

.search-box{
  display: flex;
  width:50%;
  height:60px;
  background-color: white;
  margin-top:30px;
  border-radius: 5px;
  box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5);
  
}

.search-area{
  width:25%;
  height:70%;
  padding:0 5px;
  padding-right:5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:auto 0;
  border-right:2px solid rgba(0, 0, 0, 0.4) ;
}

.search-area p{
  color: black;
  margin-right:10%;
}

.search-area img{
  width:24px;
  height:24px;
  opacity:0.5;
}

.search-genre{
  width:25%;
  height:70%;
  padding:0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:auto 0;
  border-right:2px solid rgba(0, 0, 0, 0.4) ;
}

.search-genre p{
  color: black;
  margin-right:10%;
}

.search-genre img{
  width:24px;
  height:24px;
  opacity:0.5;
}

.search-name{
  width:50%;
  height:70%;
  padding-left:5px;
  display: flex;
  align-items: center;
  margin:auto 0;
}

.search-name p{
  color: black;
  margin-right:10%;
  opacity:0.3;
}

.search-name img{
  width:24px;
  height:24px;
  opacity:0.3;
  padding-right:5px;
}

.flex {
  display: flex;
  flex-wrap :wrap;
  
}

.store-list{
  width:96%;
  margin:0 auto;
  padding:30px 0;
}


.store {
  width:22%;
  margin-right:1.5%;
  padding-bottom:60px;
}



</style>