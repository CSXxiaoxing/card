<template>
  <mt-popup 
    v-model="applyOn"
    popup-transition="popup-fade" 
    class="apply" >


    <span>申请上庄 <i @click="applyOn = false">×</i></span>

    <p>当前设置连庄 :<b>5局</b></p>

    <p>上庄最低分数 :<b>5000</b></p>

    <p>您是否确定申请上庄？</p>

    <mt-button @click="applyOn = false">确定</mt-button>
    
  </mt-popup >

</template>

<style lang='scss' scoped>


  .apply{
    width: 766px;
    border-radius: 30px;
    position: absolute;
    top:890px;

    &>span:nth-of-type(1){
      display: block;
      color:white;
      font-size: 70px;
      width:958px;
      height:230px;
      line-height: 195px;
      background: url("../../img/module_home_no1.png") no-repeat;
      background-position: center;
      text-align: center;
      position: relative;
      right: 94px;
      bottom: 25px;
      i{
        position: absolute;
        font-size: 140px;
        color: #028B00;
        right: 120px;
      }
    }

    p{
      line-height:20px;
      padding-bottom: 50px;
      text-align:left;
      font-size:36px;
      margin-left:230px;
      b{
        color:#209434;
      }
    }


    p:nth-of-type(3){
      font-size:44px;
      color:#FB7040;
      text-align:center;
      margin-left:0px;
      margin-top:20px;
    }

    input{
      width:254px;
      height:84px;
      border-radius:10px;
      margin-left:20px;
      font-size:26px;
    }
    
    button{
      width:357px;
      height: 105px;
      line-height:100px;
      border-radius: 55px;
      font-size:60px;
      margin:30px 0px 50px 0px;
      border: 0 none;
      color: white;
      background: url(../../img/home_all.png) -210px -150px no-repeat;
      background-size: 600px 600px;
    }
    button:active {
        position: relative;
        left: 2px;
        bottom: -5px;
    }
    div{
      text-align:left;
      padding-left: 70px;

      label{
        display:inline-block;
        font-size:48px;
        width:100%;
        margin-bottom: 50px;
        line-height:80px;
        margin-left: 100px;
        span{
          display:inline-block;
          width:60px;
          height:65px;
          background-color: #DADADA;
          border-radius:10px;
          padding:5px 5px 0px 5px;
          position:absolute;
          left:70px;
        }
        
      }
    }
  }


</style>

<script type="es6">

  export default {
    data() {
      return {
        applyOn: false,
      };
    },
    methods:{

  }
};
</script>