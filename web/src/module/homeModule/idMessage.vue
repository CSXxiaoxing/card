<template>
  <mt-popup
    v-model="idMessage"
    popup-transition="popup-fade"
    class="mess">
    <img src="../../img/module_home_id1.png" height="222" width="238" alt="">
    <p>迷糊的诗诗<br>ID:755693</p>
    <i v-on:click="idMessage = false"></i>
    <mt-button type="primary"  @click="idMessage = false">
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
      left:60px;
      top:80px;
    }
    p{
      font-size:44px;
      line-height: 70px;
      position:absolute;
      left: 322px;
      top:118px;
    }
    i{
        position:absolute;
        display: inline-block;
        width: 57px;
        height: 57px;
        background: url(../../img/homeID.png) no-repeat;
        background-size: cover;
        background-position: center;
        right:30px;
        top:48px;
      }
    button{
      width:380px;
      height: 110px;
      line-height: 100px;
      font-size:60px;
      border: none;
      margin-left:250px;
      background: url(../../img/home_all.png) -210px -150px no-repeat;
      background-size: 600px 600px;
      position: absolute;
      bottom: 100px ;
      left: 0;
    }
    button:active {
        position: absolute;
        left: 0px;
        bottom: 92px;
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