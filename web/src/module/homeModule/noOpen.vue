<template>
  <mt-popup 
    v-model="onOpenRoom"
    popup-transition="popup-fade" 
    class="tip" >
    <span>提示 <i @click="onOpenRoom = false">×</i></span>
    <p>该房间尚未公开</p>
    <mt-button @click="onOpenRoom = false">  确定
    </mt-button>
  </mt-popup >
</template>

<style lang='scss' scoped>
  .tip{
    width: 766px;
    border-radius: 30px;
    position: absolute;
    top:890px;
    span{
      display: block;
      color:white;
      font-size: 66px;
      width:958px;
      height:230px;
      line-height: 195px;
      background: url("../../img/module_home_no1.png") no-repeat;
      background-position: center;
      text-align: center;
      position: relative;
      right: 94px;
      bottom: 50px;
      
      i{
        position: absolute;
        font-size: 140px;
        color: #028B00;
        right: 120px;
      }
    }

    p{
      height:180px;
      line-height:100px;
      text-align:center;
      font-size:50px;
    }
    button{
      width:360px;
      height: 110px;
      border-radius: 55px;
      font-size:60px;
      margin-bottom:50px;
      border: 0 none;
      color: white;
      background: url(../../img/module_home_no2.png) no-repeat;
      background-position: center;
    }
    button:active {
        position: relative;
        left: 2px;
        bottom: -5px;
    }
  }


</style>

<script type="es6">
  export default {
    data() {
      return {
        onOpenRoom: false
      };


    }
  };
</script>