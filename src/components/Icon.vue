<template>
<div id="rase-icon">
  <div class="icon">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <h1>Rase</h1>
</div>


</template>

<style scoped>

  #rase-icon {
    display: flex;
  }

  /* icon */

  .icon {
    width: 60px;
    text-align: center;
    padding: 4px 0 17px;
    background-color: rgb(0, 162, 255);
    border-radius: 10px;
    box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5);
    margin:30px 0 0 30px;
  }

  .icon span {
    left: 10px;
    display: block;
    height: 3px;
    margin:10px 0 0 10px;
    background-color: #fff;
  }

  .icon span:nth-of-type(1) {
    width: 20px;
    background-color: rgb(179, 179, 179);
  }
  .icon span:nth-of-type(2) {
    width: 40px;
    background-color: rgb(255, 255, 255);
  }
  .icon span:nth-of-type(3) {
    width: 10px;
    background-color: rgb(235, 235, 235);
  }

  /* company */

  #rase-icon h1{
    font-size:28px;
    color:rgb(1, 1, 238);
    margin:45px 0 0 20px;
  }

</style>