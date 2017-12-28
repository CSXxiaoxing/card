<template>
  <el-dialog
    :visible.sync="idMessage"
    width="80%" 
    center custom-class="mess">
    
    <img src="../../img/module_home_id1.png" height="222" width="238" alt=""></td>
    <p>迷糊的诗诗 <br> ID:755693</p>
    <i v-on:click="idMessage = false">×</i>
    
    <el-button type="success" round v-on:click="idMessage = false">更换账号</el-button>
  </el-dialog>
</template>

<style type="text/css">
    .mess{
      border-radius: 30px;
      position: relative;
      top:200px;
      height:600px;
    }
</style>

<style lang='scss' scoped>

  .mess{

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
        font-size:140px;
        color:#7A7A7A;
        right:30px;
        top:60px;
      }
    button{
      width:95%;
      height: 110px;
      font-size:60px;
      border: none;
      background: url(../../img/module_home_no2.png) no-repeat;
      background-position:center;
      position: absolute;
      bottom:100px ;
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