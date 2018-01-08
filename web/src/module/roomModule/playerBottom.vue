<template>
  <mt-popup 
    v-model="playerBottom"
    popup-transition="popup-fade" 
    class="player" >

    <mt-popup
        v-model="details"
        popup-transition="popup-fade" 
        :modal='false'
        class="details">
        <span>牌型赔率 <i @click="details = false">×</i></span>
        <table border="1">
          <thead>
            <tr> <td>牌型</td><td>赔率</td> </tr>
          </thead>
          <tbody>
            <tr> <td>无牛</td><td>比K</td> </tr>
            <tr> <td>牛一</td><td>X10</td> </tr>
            <tr> <td>牛二</td><td>X10</td> </tr>
            <tr> <td>牛三</td><td>X5</td> </tr>
            <tr> <td>牛四</td><td>X10</td> </tr>
            <tr> <td>牛五</td><td>X10</td> </tr>
            <tr> <td>牛六</td><td>X10</td> </tr>
            <tr> <td>牛七</td><td>X10</td> </tr>
            <tr> <td>牛八</td><td>X10</td> </tr>
            <tr> <td>牛九</td><td>X10</td> </tr>
            <tr> <td>牛牛</td><td>X10</td> </tr>
            <tr> <td>五花牛</td><td>X10</td> </tr>
          </tbody>
        </table>
    </mt-popup>

    <span>可押1~10分 <i @click="playerBottom = false">×</i></span>
    <p>输入押注分数</p>

    <p>翻倍<b @click="details = true">( 查看详情 )</b>   <input type="text" Placeholder="输入押注分数"></p>

    <p>不翻<b>(1:1比大小)</b>  <input type="text" value=" 输入押注分数"></p>

    <mt-button @click="playerBottom = false">确定</mt-button>
    
  </mt-popup >

</template>

<style lang='scss' scoped>

  .bstyle{
    font-size:34px;
    margin:10px 5px;
    font-weight:normal;

  }

  .player{
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

    p:nth-of-type(1){
      line-height:20px;
      padding-bottom: 50px;
      text-align:center;
      font-size:46px;
    }

    p:nth-of-type(2){
      font-size:48px;
      margin-bottom:50px;
      b{
          @extend .bstyle;
          color:#29A345;

        }
    }
    p:nth-of-type(3){
      font-size:48px;
      b{
          @extend .bstyle;
        }
    }
    input{
      width:254px;
      height:84px;
      border-radius:10px;
      margin-left:20px;
      font-size:26px;
      
    }
    input::-webkit-input-placeholder{color: #ccc;}
    
    button{
      width:357px;
      height: 105px;
      line-height:100px;
      border-radius: 55px;
      font-size:60px;
      margin:90px 0px 50px 0px;
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

  .details{
    width:1032px;
    height:1350px;
    box-sizing: border-box;
    border-radius:30px;
    span{
      display:inline-block;
      width:100%;
      line-height:140px;
      font-size:64px;
      text-align:center;
      i{
        position: absolute;
        font-size: 140px;
        color: #7B7B7B;
        right: 40px;
      }
    }
    table{
      width:948px;
      border:0px solid #DADADA;
      position:relative;
      right:20px;
      border-radius:5px;
      td{
        text-align:center;
      }
      thead{
        font-size:48px;
        line-height:84px;
        background-color: #D0E7B1;
      }
      tbody{
        tr:nth-of-type(2n){
          background-color:#EFF8E3;
        }
        td{
          line-height:82px;
          font-size:34px;
          color:#618F25;
        }
        td:nth-of-type(1){
          width:416px;
          font-weight: bolder;
          color:#51810C;
        }
      }
    }
  }
  
</style>

<script type="es6">

  export default {
    data() {
      return {
        playerBottom: false,
        details:false,
      };
    },
    methods:{

  }
};
</script>