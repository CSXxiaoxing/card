<template>
  <el-dialog :visible.sync="buyRoom" width="80%" center custom-class="buy">

    <el-dialog
      width="71%"
      :visible.sync="moreCard"
      append-to-body center custom-class="more">

    <span>购买房卡 <d v-on:click="moreCard = false">×</d></span>
    <p>N张以上，几折优惠</p>
    <p>请输入购买的房卡数量</p>
    <input  class="num" ></input>
    <el-button type="success" round v-on:click="moreCard = false">确定</el-button>

    </el-dialog>


    <h1>购买房卡 <i v-on:click="buyRoom = false">×</i></h1>

    <ul>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td>
            <td>房卡X5</td>
          </tr>
          <tr>
            <td>RMB：10元</td>
          </tr>
          <tr>
            <td><button>购买</button></td>
          </tr>
        </table>
      </li>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td></td>
            <td>房卡X5</td>
          </tr>
          <tr>
            <td>RMB：10元</td>
          </tr>
          <tr>
            <td><button>购买</button></td>
          </tr>
        </table>
      </li>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td></td>
            <td>房卡X5</td>
          </tr>
          <tr>
            <td>RMB：10元</td>
          </tr>
          <tr>
            <td><button>购买</button></td>
          </tr>
        </table>
      </li>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td></td>
            <td class="more">更多房卡</td>
          </tr>
          <tr>
            <td>7折优惠</td>
          </tr>
          <tr>
            <td><el-button type="primary" @click="moreCard = true">去填写数量</el-button></td>
          </tr>
        </table>
      </li>
    </ul>

  </el-dialog>
</template>




<style type="text/css">
    .buy{
      background: url(../../img/module_home_buy1.png) no-repeat;
      width: 879px;
      height: 1489px;
      position: relative;
      bottom: 100px;
    }
    
</style>

<style lang='scss' scoped>

  .buy{

      h1{
        margin: 65px 0px 140px 60px;
        font-size:60px;
        font-weight:bolder;
        color: #5E4205;
        text-align:center;

        i{
          position:absolute;
          line-height:100px;
          font-size:120px;
          font-weight:lighter;
          color:white;
          right:20px;
          top:60px;
          background-color:#BA3C16;
          width:90px;
          height:100px;
          border-radius:100%;
          padding-right:10px;
        }
      }

      table{
        font-size:42px;
        background-color: white;
        width:660px;
        height: 270px;
        border-radius:30px;
        margin: 20px 0px 20px 90px;

        button{
          width:300px;
          height:88px;
          border:none;
          color:white;
          font-size:41px;
          background: url(../../img/module_home_buy3.png) no-repeat;
          background-position:center;
        }

         tr:nth-of-type(1){
          td:nth-of-type(2){
            padding-top:40px;
            padding-left: 30px;
          }

        }

        tr:nth-of-type(2){
          color:#149824;
          td{
            padding-top:10px;
            padding-left: 30px;
          }

        }

        .more{
          color:#3B87C5;
        }

      }
  }
  
  
.more{
      
      border-radius:20px;
      span{
        display: block;
        color:white;
        font-size: 80px;
        width:958px;
        height:195px;
        line-height: 145px;
        background: url("../../img/module_home_buy4.png") no-repeat;
        background-position: center;
        text-align: center;
        position: relative;
        right: 121px;
        bottom: 30px;
        
          d{
            position:absolute;
            font-size:100px;
            font-weight:900;
            color:#028B00;
            right:100px;
          }
      }

      p:nth-of-type(1){
        padding-bottom: 20px;
        color:red;
        text-align:center;
        font-size:55px;
        font-weight: bold;
        margin-bottom:40px;
      }
      p:nth-of-type(2){
        margin-bottom: 20px;
        margin-left: 55px; 
        font-size:35px;
        font-weight: bold;
      }

      .num{
        width:85%;
        height:120px;
        font-size:90px;
        text-align:center;
        margin: 10px 0px 0px 50px;
        border-radius:15px;
        border:3px solid #D4D4D4; 
        color:#0BBA05;
      }

      button{
        width:690px;
        height: 190px;
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
        buyRoom: false,
        moreCard: false
      };
    }
  };
</script>