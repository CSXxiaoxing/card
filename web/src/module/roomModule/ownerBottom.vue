<template>
  <mt-popup 
    v-model="ownerBottom"
    popup-transition="popup-fade" 
    class="owner" >
    
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


    <span>可押1~10分 <i @click="ownerBottom = false">×</i></span>
    <p>输入押注分数</p>
    <input type="text">
    <mt-button @click="ownerBottom = false">确定</mt-button>
    <hr/>
    <div>
        <label @click="sel = 1">
            <span><img src="../../img/varTrue.png" v-show="sel" height="60" width="59" alt="" /></span>
            有倍（最高10倍） <b @click="details = true">查看详情</b>   
        </label>
        <label @click="sel = 0">
          <span><img src="../../img/varTrue.png" v-show="!sel" height="60" width="59" alt="" /></span>
            无倍（1:1比大小）

        </label>

      </div>
  </mt-popup >

</template>

<style lang='scss' scoped>

  .owner{
    width: 766px;
    border-radius: 30px;
    position: absolute;
    top:890px;
    &>span:nth-of-type(1){
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
      text-align:center;
      font-size:46px;
    }
    input{
      width:648px;
      height:115px;
      border-radius:10px;
      border:3px solid #D3D3D3;
      color:#09BA07;
      text-align:center;
      font-size:78px;
    }
    hr{
      width:90%;
    }
    button{
      width:357px;
      height: 105px;
      line-height:100px;
      border-radius: 55px;
      font-size:60px;
      margin:50px 0px;
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
        b{
          font-size:36px;
          color:#29A345;
          text-decoration: underline;
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
  import Vue from 'vue';

  export default {
    data() {
      return {
        ownerBottom: false,
        details:false,
        sel: 0,
      };
    },
    methods:{

  }
};
</script>