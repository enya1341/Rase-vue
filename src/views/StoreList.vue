<template>
  <div v-if = "sync" id="Storelist">

    <div class="header-flex">
      <div class="header-icon flex">
        <HeaderIcon/>
        <p @click="mypage">マイページへ</p>
      </div>
      <div class="search-box">
          <div class="search-area">
            <input type="text" v-model="searchAreaModel" @click="Area">
            <img src="../assets/down-arrow.png" @click="Area">
          </div> 
        <div class="search-genre">
          <input type="text" v-model="searchGenreModel" @click="Genre">
          <img src="../assets/down-arrow.png" @click="Genre">
        </div>
        <div class="search-name">
          <img src="../assets/search.png" @click="Name">
          <input type="text" v-model="searchNameModel" placeholder="Search ..." @click="Name">
        </div>
      </div>
    </div>
      <div class="bottom-search-box">
        <div class="bottom-search-area" v-if="this.areaAuth">
          <table class="areaTable">
            <tr v-for="(area,index) in filteredArea" :key="index" @click="SearchArea(area)">
              <td>{{index+1}}.</td>
              <td>{{area}}</td>
            </tr>
          </table>
        </div>
        <div class="bottom-search-genre" v-if="this.genreAuth">
          <table class="genreTable">
            <tr v-for="(genre,index) in filteredGenre" :key="index" @click="SearchGenre(genre)">
              <td>{{index+1}}.</td>
              <td>{{genre}}</td>
            </tr>
          </table>
        </div>
        <div class="bottom-search-name" v-if="this.nameAuth">
          <table class="nameTable">
            <tr v-for="(name,index) in filteredName" :key="index" @click="SearchName(name)">
              <td>{{index+1}}.</td>
              <td>{{name}}</td>
            </tr>
          </table>
        </div>    
      </div>
      

    <div class="store-list">
      <div class="flex">
        <div class="store" v-for="(store,index) in filteredStoredata" :key="index">
          <Store :parentStore="store" :parentFavorite="favoritedata"  />
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

import axios from "axios";

export default {


  data(){
    return{

      favoritedata:"",
      username:"test",
      storedata:"",
      sync:false,
      storeAuth:false,

      searchAreaModel:"ALL area",
      areaAuth:false,
      areaSearchAuth:false,
      searcharea:[
        {
          area:"東京都"
        },
        {
          area:"大阪府"
        },
        {
          area:"福岡県"
        }
      ],


      searchGenreModel:"ALL genre",
      genreAuth:false,
      genreSearchAuth:false,
      searchgenre:[
        {
          genre:"寿司"
        },
        {
          genre:"焼肉"
        },
        {
          genre:"居酒屋"
        },
        {
          genre:"イタリアン"
        },
        {
          genre:"ラーメン"
        },
      ],

      searchNameModel:"",
      nameAuth:false,
      nameSearchAuth:false,
      
      
    }
  },


  components: {
    HeaderIcon,
    Store,
  },


  methods: {

    /** ストアデータの取得 */
     storedatain(){
       /** 全ストアデータの取得 */
       axios.get(this.$store.state.host + "/api/v1/stores").then((response) => {this.storedata =response.data.data})
       /** お気に入りデータを取得 */
       axios.get(this.$store.state.host + "/api/v1/" + this.$store.state.user.id + "/favorites").then((response) => {this.favoritedata =response.data.data})

        this.sync=true
      },
    /** ストア詳細ページに遷移*/
      mypage(){
        this.$router.push({
        name: 'MyPage'
        })
      },

    /** 検索機能*/
      Area(){
        if(this.areaAuth===false){
          this.searchAreaModel=""
          this.areaAuth=true
          this.genreAuth=false
          this.nameAuth=false
          this.searchGenreModel="ALL genre"
          this.searchNameModel=""
        }else{
          this.searchAreaModel="ALL area"
          this.areaAuth=false
        }
      },

      SearchArea(area){
        this.searchAreaModel=area;
      },


      Genre(){
        if(this.genreAuth===false){
          this.searchGenreModel=""
          this.genreAuth=true
          this.areaAuth=false
          this.nameAuth=false
          this.searchAreaModel="ALL area"
          this.searchNameModel=""
        }else{
          this.searchGenreModel="ALL genre"
          this.genreAuth=false
        }
      },

      SearchGenre(genre){
        this.searchGenreModel=genre;
      },

      Name(){
        if(this.nameAuth===false){
          this.nameAuth=true
          this.genreAuth=false
          this.areaAuth=false
          this.searchGenreModel="ALL genre"
          this.searchAreaModel="ALL area"
        }else{
          this.nameAuth=false
          this.searchNameModel=""
        }
      },

      SearchName(name){
        this.searchNameModel=name;
      },


  },

  /** 検索機能*/
  computed: {

    filteredArea() {
      const areaArray = [];
      for (const i in this.searcharea) {
        const areadata = this.searcharea[i];
        if (areadata.area.indexOf(this.searchAreaModel) !== -1) {
          areaArray.push(areadata.area);
        }
      }
      return areaArray;
    },

    filteredGenre() {
      const genreArray = [];
      for (const i in this.searchgenre) {
        const genredata = this.searchgenre[i];
        if (genredata.genre.indexOf(this.searchGenreModel) !== -1) {
          genreArray.push(genredata.genre);
        }
      }
      return genreArray;
    },

    filteredName() {
      const nameArray = [];
      for (const i in this.storedata) {
        const namedata = this.storedata[i];
        if (namedata.name.indexOf(this.searchNameModel) !== -1) {
          nameArray.push(namedata.name);
        }
      }
      return nameArray;
    },

    filteredStoredata() {
      const storedataArray = [];
      for (const i in this.storedata) {
        const store = this.storedata[i];
        if (store.region === this.searchAreaModel || store.genre===this.searchGenreModel || store.name===this.searchNameModel) {
          storedataArray.push(store);
        }else if(!this.storeAuth){
          storedataArray.push(store);
        }
      }
      return storedataArray;
    }

  },

/** 検索機能*/
  watch: {

    searchAreaModel: function () {
      if(this.searchAreaModel === "ALL area"|| this.searchAreaModel === ""){
        this.storeAuth=false;
      }else{
        this.storeAuth=true;
      }
    },

    searchGenreModel: function () {
      if(this.searchGenreModel === "ALL genre" || this.searchGenreModel === ""){
        this.storeAuth=false;
      }else{
        this.storeAuth=true;
      }
    },

    searchNameModel: function () {
      if(this.searchNameModel === ""){
        this.storeAuth=false;
      }else{
        this.storeAuth=true;
      }
    }

  },


  created() {
    this.storedatain();
  },


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

.bottom-search-box{
  display: flex;
  width:45%;
  margin-left:45%;
}



.header-icon p{
  margin-top:55px;
  margin-left:60px;
  font-size:18px;
  cursor: pointer;
  color:yellow;
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

.search-area input{
  width:70%;
  height:100%;
  color: black;
  margin-right:10%;
  border: none;
  outline:none
}

.search-area img{
  width:24px;
  height:24px;
  opacity:0.5;
}

.bottom-search-area{
  width:25%;
  padding-right:5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border:2px solid #9c9c9c;
  background-color: white;
  padding:10px 0;
}

.areaTable{
  color:rgb(0, 0, 0);
}

.areaTable tr{
  cursor: pointer;
  padding-bottom:15px;
  border-bottom:2px solid #e0e0e0;
}

.areaTable td{
  padding:5px 0;
  color:rgb(0, 0, 0);
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

.search-genre input{
  width:70%;
  height:100%;
  color: black;
  margin-right:10%;
  border: none;
  outline:none
}

.search-genre img{
  width:24px;
  height:24px;
  opacity:0.5;
}

.bottom-search-genre{
  width:25%;
  padding-right:5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border:2px solid #9c9c9c;
  background-color: white;
  padding:10px 0;
  margin-left:25%;
}

.genreTable{
  color:rgb(0, 0, 0);
}

.genreTable tr{
  cursor: pointer;
  padding-bottom:15px;
  border-bottom:2px solid #e0e0e0;
}

.genreTable td{
  padding:5px 0;
  color:rgb(0, 0, 0);
}

.search-name{
  width:50%;
  height:70%;
  padding-left:5px;
  display: flex;
  align-items: center;
  margin:auto 0;
}

.search-name input{
  width:70%;
  height:100%;
  color: black;
  margin-right:10%;
  border: none;
  /* opacity:0.3; */
  outline:none
}

.search-name img{
  width:24px;
  height:24px;
  opacity:0.3;
  padding-right:5px;
}

.bottom-search-name{
  width:50%;
  padding-right:5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border:2px solid #9c9c9c;
  background-color: white;
  padding:10px 0;
  margin-left:50%;
}

.nameTable{
  color:rgb(0, 0, 0);
}

.nameTable tr{
  cursor: pointer;
  padding-bottom:15px;
  border-bottom:2px solid #e0e0e0;
}

.nameTable td{
  padding:5px 0;
  color:rgb(0, 0, 0);
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

.store{
  width:22%;
  margin-right:1.5%;
  padding-bottom:60px;
}



</style>