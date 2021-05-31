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
    width: 70px;
    text-align: center;
    padding: 30px 0 35px;
    background-color: rgb(0, 162, 255);
    border-radius: 10px;
    box-shadow: 3px 3px 0 0 rrgba(0, 34, 97, 0.5)
  }

  .icon span {
    position: absolute;
    left: 10px;
    display: block;
    height: 2px;
    background-color: #fff;
  }

  .icon span:nth-of-type(1) {
    width: 20px;
    top: 15px;
    background-color: rgb(179, 179, 179);
  }
  .icon span:nth-of-type(2) {
    width: 40px;
    top: 30px;
    background-color: rgb(255, 255, 255);
  }
  .icon span:nth-of-type(3) {
    width: 10px;
    top: 45px;
    background-color: rgb(235, 235, 235);
  }

  /* company */

  #rase-icon h1{
    font-size:32px;
    color:rgb(1, 1, 238);
    margin:20px 0 0 25px;
  }

</style>