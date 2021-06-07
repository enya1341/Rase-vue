<template>
<div id="rase-icon">
  <div class="RaseIcon">
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
    padding:30px 0 0 30px;
  }

  /* RaseIcon */

  .RaseIcon {
    width: 60px;
    background-color: rgb(0, 162, 255);
    border-radius: 10px;
    box-shadow: 3px 3px 0 0 rgba(0, 34, 97, 0.5)
  }

  .RaseIcon span {
    display: block;
    height: 3px;
    background-color: #fff;
    margin:12px 10px;
  }

  .RaseIcon span:nth-of-type(1) {
    width: 20px;
    background-color: rgb(179, 179, 179);
  }
  .RaseIconspan:nth-of-type(2) {
    width: 40px;
    background-color: rgb(255, 255, 255);
  }
  .RaseIcon span:nth-of-type(3) {
    width: 10px;
    background-color: rgb(235, 235, 235);
  }

  /* company */

  #rase-icon h1{
    font-size:28px;
    color:rgb(1, 1, 238);
    margin:17px 0 0 25px;
  }

</style>