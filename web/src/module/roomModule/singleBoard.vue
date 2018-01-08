<template>
  <mt-popup 
    v-model="singleBoard"
    popup-transition="popup-fade" 
    class="single" >
    <mt-popup
        v-model="details"
        popup-transition="popup-fade" 
        :modal='false'
        class="details">
        <span>抽水分数 <i @click="details = false">×</i></span>
        <ul>
            <li>
                房间成员总分数  ：888
            </li>
            <li>
                房 主 抽 水 分 数 : <b>120</b>
            </li>
        </ul>
        <mt-button @click="details = false">重新开局</mt-button>
        <span>( 重新开始，房间局数，开奖记录。流水报表和抽水分数都将清零。房间成员分数保持不变)</span>
    </mt-popup>

    <mt-popup
        v-model="down"
        popup-transition="popup-fade" 
        :modal='false'
        class="down">
        <i @click="singleBoard = false">×</i>
        <span>您的分数已低于上庄分数，如想继续坐庄，请联系房主加分。如不想继续，请点击下注。</span>
        <mt-button @click="down = false">联系房主</mt-button>
        <mt-button @click="down = false">下庄</mt-button>
    </mt-popup>

    <span @click="down = true">单局结算 <i @click="singleBoard = false">×</i></span>
    <table border="1" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <td>昵称</td> <td>分数流水</td> <td @click="details = true">抽水分数</td> <td>结余分数</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>迷糊的诗诗 <img src="../../img/room_water1.png"></td> <td>+100</td> <td>10</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr>
          <td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
        </tr>
        <tr class="total" >
          <td>房间余剩分数</td> <td colspan="3">+20</td>
        </tr>
        
      </tbody>
    </table>
  </mt-popup >



</template>

<style lang='scss' scoped>

  .single{
    width: 1032px;
    height:1612px;
    border-radius: 30px;
    &>span:nth-of-type(1){
      display: block;
      font-size: 62px;
      width:958px;
      height:80px;
      margin-left:40px;
      line-height: 110px;
      i{
        position: absolute;
        font-size: 140px;
        color: #7A7A7A;
        right: 30px;
      }
    }
    
    table{
      width:964px;
      margin: 32px 0px 30px 36px;
      text-align: center;
      background-color:white;
      border: 1px solid #BCBFB7;
      img{
        position: relative;
        top:10px;
      }
      tr{
        line-height:84px;
      }
      thead{
        color:#4D6131;
        tr{
          font-size:38px;
          background-color:#D0E7B1; 
          font-weight:bold;
        }
      }
      tbody{
        color:#5F8C25;
        font-size:40px;
        tr:nth-of-type(2n){
          background-color: #EFF8E3;

        }
        td:nth-of-type(1){
          text-align:left;
          padding-left: 30px;
          color:#499BA5;
          width:280px;
        }
        .total{
          background-color:#D0E7B1;
          td{
            padding-right: 30px;
            color:#548512;  
          }
          td:nth-of-type(2){
            text-align:right;
            padding-right:70px;
            }
        }
      }
    }
  }

  .details{
    width: 766px;
    border-radius: 30px;
    position: absolute;
    top:710px;
    height: 620px;
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
        font-size: 150px;
        color: #7A7A7A;
        right: 120px;
      }
    }

    ul{
      margin-left:52px;
      position:relative;
      bottom:42px;
      font-size:52px;
      li{
        text-align:left;
        b{
          color:#3B693E;
        }
      }
    }

    button{
      width:434px;
      height: 112px;
      border-radius: 55px;
      font-size:60px;
      margin:10px 0px 30px 0px;
      border: 0 none;
      color: white;
      background: url(../../img/module_room_setOwner1.png) no-repeat;
      background-position:center;
      background-size: center;
    }
    button:active {
        position: relative;
        left: 2px;
        bottom: -5px;
    }

    span{
      display:inline-block;
      font-size:24px;
      width:494px;
      color:#B7B7B7;
    }
  }

  .down{
    width:938px;
    height:638px;
    border-radius:30px;
    i{
        position: absolute;
        font-size: 140px;
        color: #7A7A7A;
        right: 120px;
      }
    span{
      display:inline-block;
      color:red;
      width:796px;
      margin-top: 150px;
      margin-bottom: 150px;
      font-size:50px;
      text-align:left;
    }

    button{
      width:292px;
      height: 114px;
      border-radius: 55px;
      font-size:60px;
      margin:0px 50px 30px 50px;
      border: 0 none;
      color: white;
      background: url(../../img/module_room_setOwner1.png) no-repeat;
      background-position:center;
      background-size: center;
    }

    button:active {
        position: relative;
        left: 2px;
        bottom: -5px;
    }
  }

</style>

<script type="es6">
  import Vue from 'vue';

  export default {
    data() {
      return {
        singleBoard: false,
        details:false,
        down:false,
      };
    },
    methods:{

  }
};
</script>