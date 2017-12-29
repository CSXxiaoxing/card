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
    width: 71%;
    border-radius: 30px;
    position: absolute;
    top:300px;
    span{
      display: block;
      color:white;
      font-size: 80px;
      width:958px;
      height:230px;
      line-height: 195px;
      background: url("../../img/module_home_no1.png") no-repeat;
      background-position: center;
      text-align: center;
      position: relative;
      right: 121px;
      bottom: 50px;
      
      i{
        position: absolute;
        font-size: 140px;
        color: #028B00;
        right: 120px;
      }
    }

    p{
      height:200px;
      line-height:100px;
      text-align:center;
      font-size:60px;
      font-weight: bold;
    }

    button{

      width:690px;
      height: 110px;
      font-size:60px;
      border: none;
      background: url(../../img/module_home_no2.png) no-repeat;
      background-position:center;
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