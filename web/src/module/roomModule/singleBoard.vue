<template>
<div>
  <mt-popup 
    v-model="singleBoard"
    popup-transition="popup-fade" 
    class="single" >
    

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
          <td>昵称</td> <td>分数流水</td> <td>抽水分数</td> <td>结余分数</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>迷糊的诗诗 <img src="/dist/room_water1.png"></td> <td>+100</td> <td>10</td> <td>10</td>
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
    <loading v-if='loading'></loading>
</div>
</template>

<style lang='scss' scoped>
  @import '../../utils/baseVar.scss';
//details
  
  .single{
    width: 9.555556rem;
    height:14.925926rem;
    border-radius: 0.277778rem;
    &>span:nth-of-type(1){
      display: block;
      font-size: 0.574074rem;
      width:8.87037rem;
      height:0.740741rem;
      margin-left:0.37037rem;
      line-height: 1.018519rem;
      i{
        position: absolute;
        font-size: 1.296296rem;
        color: #7A7A7A;
        right: 0.277778rem;
      }
    }
    
    table{
      width:8.925926rem;
      margin: 0.296296rem 0 0.277778rem 0.333333rem;
      text-align: center;
      background-color:white;
      border: 0.009259rem solid #BCBFB7;
      img{
        position: relative;
        top:0.092593rem;
      }
      tr{
        line-height:0.777778rem;
      }
      thead{
        color:#4D6131;
        tr{
          font-size:0.351852rem;
          background-color:#D0E7B1; 
          font-weight:bold;
        }
      }
      tbody{
        color:#5F8C25;
        font-size:0.37037rem;
        tr:nth-of-type(2n){
          background-color: #EFF8E3;

        }
        td:nth-of-type(1){
          text-align:left;
          padding-left: 0.277778rem;
          color:#499BA5;
          width:2.592593rem;
        }
        .total{
          background-color:#D0E7B1;
          td{
            padding-right: 0.277778rem;
            color:#548512;  
          }
          td:nth-of-type(2){
            text-align:right;
            padding-right:0.648148rem;
            }
        }
      }
    }
  }

  

  .down{
    width:8.685185rem;
    height:5.907407rem;
    border-radius:0.277778rem;
    i{
        position: absolute;
        font-size: 1.296296rem;
        color: #7A7A7A;
        right: 1.111111rem;
      }
    span{
      display:inline-block;
      color:red;
      width:7.37037rem;
      margin-top: 1.388889rem;
      margin-bottom: 1.388889rem;
      font-size:0.462963rem;
      text-align:left;
    }

    button{
      width:2.703704rem;
      height: 1.055556rem;
      border-radius: 0.509259rem;
      font-size:0.555556rem;
      margin:0 0.462963rem 0.277778rem 0.462963rem;
      border: 0 none;
      color: white;
     background: $chart05 no-repeat;
             background-position:center;
             background-size: 5.555556rem 1.037037rem;
    }

    button:active {
        position: relative;
        left: 0.018519rem;
        bottom: -0.046296rem;
    }
  }
</style>

<script type="es6">
  import Vue from 'vue';
  import loading from '../../components/loading/loading.vue';
  Vue.component('loading', loading)
  export default {
    data() {
      return {
        loading: false,     // loading
        singleBoard: false,
        down:false,
      };
    },
    methods:{

  }
};
</script>