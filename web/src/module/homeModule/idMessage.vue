<template>
  <mt-popup
    v-model="idMessage"
    popup-transition="popup-fade"
    class="mess">
    <img src="../../img/module_home_id1.png" height="222" width="238" alt="">
    <p>迷糊的诗诗 <br> ID:755693</p>
    <i v-on:click="idMessage = false"></i>
    <mt-button type="primary" round  @click="idMessage = false">
        更换账号
    </mt-button>
  </mt-popup>
</template>

<style lang='scss' scoped>
  .mess{
    width: 80%;
    border-radius: 30px;
    position: absolute;
    height:600px;
    margin-top: -200px;
    img{
      position:absolute;
      left: 50px;
      top:80px;
    }
    p{
      font-size:48px;
      font-weight:bold;
      line-height: 70px;
      position:absolute;
      left: 320px;
      top:130px;
    }
    i{
        position:absolute;
        display: inline-block;
        width: 57px;
        height: 57px;
        background: url(../../img/homeID.png) no-repeat;
        background-size: cover;
        background-position:center;
        right:30px;
        top:60px;
      }
    button{
      width:100%;
      height: 110px;
      font-size:60px;
      border: none;
      background: url(../../img/module_home_no2.png) no-repeat;
      background-size: cover;
      background-position:center;
      position: absolute;
      bottom: 100px ;
      left: 0;
    }
  }
</style>

<script type="es6">
  export default {
    data() {
      return {
        idMessage: false,
      };
    }
  };
</script>