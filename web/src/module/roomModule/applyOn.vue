<template>
    <div>
    <!-- 庄 -->
    <mt-popup 
      v-model="setOwner"
      popup-transition="popup-fade" 
      class="owner" >
      
      <mt-popup
          v-model="details01"
          popup-transition="popup-fade" 
          :modal='false'
          class="details01">
          <span>选择锁定 <i @click="details01 = false">×</i></span>
          <ul>
              <li v-for='(data, player) in 50' :key='player' @click='sel = player'>
                  这里是玩家昵称 
                  <b><img v-show="sel == player" src="../../img/module_room_setOwner2.png" alt=""></b>
              </li>

          </ul>
          <mt-button @click="details01 = false">确定</mt-button>
      </mt-popup>


      <span>轮庄设置 <i @click="setOwner = false">×</i></span>
      <p>上庄最低分数：<b>9999</b></p>
      <hr/>
      <div>
          <label>
              <span @click="play = 1"><img src="../../img/varTrue.png" v-show="play" height="60" width="59" alt="" /></span>
              锁定庄家:<b>迷糊的诗诗</b> <img @click="details01 =true" class="list" src="../../img/module_room_setOwner.png" alt="">
          </label>
          <hr/>
          <label>
            <span @click="play = 0"><img src="../../img/varTrue.png" v-show="!play" height="60" width="59" alt="" /></span>
              自动轮庄
              <div :class='play == 0 ? "height":"close"'>
                <p>输入轮庄局数</p>
                <input value="500" type="text">
                <p>换庄</p>
              </div>
          </label>
        </div>
        <hr/>
        <mt-button @click="setOwner = false">确定</mt-button>
    </mt-popup >
    <!-- 普通玩家 -->
    <mt-popup 
        v-model="applyOn"
        popup-transition="popup-fade" 
        class="apply" >

        <span>申请上庄 <i @click="applyOn = false">×</i></span>

        <p>当前设置连庄 :<b>5局</b></p>

        <p>上庄最低分数 :<b>5000</b></p>

        <p>您是否确定申请上庄？</p>

        <mt-button @click="sz">确定</mt-button>
    </mt-popup >
    
    <!-- 抽水 -->
    <mt-popup
        v-model="details"
        popup-transition="popup-fade" 
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

    </div>
</template>

<style lang='scss' scoped>
  @import '../../utils/baseVar.scss';
  .apply{
    width: 7.092593rem;
    border-radius: 0.277778rem;
    position: absolute;
    top:8.240741rem;

    &>span:nth-of-type(1){
      display: block;
      color:white;
      font-size: 0.648148rem;
      width:8.87037rem;
      height:2.12963rem;
      line-height: 1.805556rem;
      background: $home08 no-repeat;
      background-position: center;
      background-size:8.87037rem 1.805556rem;
      text-align: center;
      position: relative;
      right: 0.87037rem;
      bottom: 0.231481rem;
      i{
        position: absolute;
        font-size: 1.296296rem;
        color: #028B00;
        right: 1.111111rem;
      }
    }

    p{
      line-height:0.185185rem;
      padding-bottom: 0.462963rem;
      text-align:left;
      font-size:0.333333rem;
      margin-left:2.12963rem;
      b{
        color:#209434;
      }
    }


    p:nth-of-type(3){
      font-size:0.407407rem;
      color:#FB7040;
      text-align:center;
      margin-left:0.0rem;
      margin-top:0.185185rem;
    }

    input{
      width:2.351852rem;
      height:0.777778rem;
      border-radius:0.092593rem;
      margin-left:0.185185rem;
      font-size:0.240741rem;
    }
    
    button{
      width:3.305556rem;
      height: 0.972222rem;
      line-height:0.925926rem;
      border-radius: 0.509259rem;
      font-size:0.555556rem;
      margin:0.277778rem 0.0rem 0.462963rem 0;
      border: 0 none;
      color: white;
      background: url(../../img/home_all.png) -1.944444rem -1.388889rem no-repeat;
      background-size: 5.555556rem 5.555556rem;
    }
    button:active {
        position: relative;
        left: 0.018519rem;
        bottom: -0.046296rem;
    }
    div{
      text-align:left;
      padding-left: 0.648148rem;

      label{
        display:inline-block;
        font-size:0.444444rem;
        width:100%;
        margin-bottom: 0.462963rem;
        line-height:0.740741rem;
        margin-left: 0.925926rem;
        span{
          display:inline-block;
          width:0.555556rem;
          height:0.601852rem;
          background-color: #DADADA;
          border-radius:0.092593rem;
          padding:0.046296rem 0.046296rem 0.0rem 0.046296rem;
          position:absolute;
          left:0.648148rem;
        }
        
      }
    }
  }
    .details{
      width: 7.092593rem;
      border-radius: 0.277778rem;
      position: absolute;
      top:6.574074rem;
      height: 5.740741rem;
      
      &>span:nth-of-type(1){
        display: block;
        color:white;
        font-size: 0.611111rem;
        width:8.87037rem;
        height:2.12963rem;
        line-height: 1.805556rem;
        background: $home08 no-repeat;
        background-position: center;
        background-size:8.87037rem 1.805556rem;
        text-align: center;
        position: relative;
        right: 0.87037rem;
        bottom: 0.231481rem;
        i{
          position: absolute;
          font-size: 1.388889rem;
          color: #7A7A7A;
          right: 1.111111rem;
        }
      }

      ul{
        margin-left:0.481481rem;
        position:relative;
        bottom:0.388889rem;
        font-size:0.481481rem;
        li{
          text-align:left;
          b{
            color:#3B693E;
          }
        }
      }

      button{
        width:4.018519rem;
        height: 1.037037rem;
        border-radius: 0.509259rem;
        font-size:0.555556rem;
        margin:0.092593rem 0 0.277778rem 0;
        border: 0 none;
        color: white;
        background: url(../../img/module_room_setOwner1.png) no-repeat;
        background-position:center;
        background-size: center;
      }
      button:active {
          position: relative;
          left: 0.018519rem;
          bottom: -0.046296rem;
      }

      span{
        display:inline-block;
        font-size:0.222222rem;
        width:4.574074rem;
        color:#B7B7B7;
      }
    }
    .owner{
      width: 7.092593rem;
      border-radius: 0.277778rem;
      position: absolute;
      top:8.240741rem;
      &>span:nth-of-type(1){
        display: block;
        color:white;
        font-size: 0.611111rem;
        width:8.87037rem;
        height:2.12963rem;
        line-height: 1.805556rem;
        background: $home08 no-repeat;
        background-size:8.87037rem 1.805556rem;
        background-position: center;
        text-align: center;
        position: relative;
        right: 0.87037rem;
        bottom: 0.231481rem;
        i{
          position: absolute;
          font-size: 1.296296rem;
          color: #028B00;
          right: 1.111111rem;
        }
      }

      p{
        line-height:0.185185rem;
        padding-bottom: 0.462963rem;
        text-align:left;
        font-size:0.481481rem;
        margin-left:0.462963rem;
        b{
          color:red;
          font-size:0.5rem;
          font-weight: normal;
        }
      }
      
      hr{
        width:92%;
      }
      button{
        width:5.555556rem;
        height: 1.037037rem;
        border-radius: 0.509259rem;
        font-size:0.555556rem;
        margin:0.092593rem 0.0rem 0.277778rem 0.0rem;
        border: 0 none;
        color: white;
        background: url(../../img/module_room_setOwner1.png) no-repeat;
        background-position:center;
        background-size: center;
      }
      button:active {
          position: relative;
          left: 0.018519rem;
          bottom: -0.046296rem;
      }
      div{
        text-align:left;
        label{
          display:inline-block;
          font-size:0.518519rem;
          width:100%;
          line-height:0.648148rem;
          margin-left: 1.296296rem;
          span{
            display:inline-block;
            width:0.555556rem;
            height:0.601852rem;
            background-color: #DADADA;
            border-radius:0.092593rem;
            padding:0.046296rem 5 0 0.046296rem;
            position:absolute;
            left:0.444444rem;
          }
          b{
            font-size:0.37037rem;
            color:#29A345;
            font-weight:normal;
            margin-left:0.185185rem;
          }
          .list{
            position:absolute;
            right:0.37037rem;
            top:3.240741rem;
          }
          div{
            width: 6.62963rem;
            height: 0;
            background-color:#E5E5E5;
            position:relative;
            right:1.055556rem;
            top:0.37037rem;
            margin-bottom: 0.462963rem;
            overflow: hidden;
            p:nth-of-type(1){
              text-align:center;
              margin-right:0.462963rem;
              padding-top: 0.462963rem;
            }
            input{
              width:6.259259rem;
              height:1.055556rem;
              border-radius:0.092593rem;
              border:0.018519rem solid #D4D4D4;
              margin-left:0.185185rem;
              font-size:0.740741rem;
              text-align:center;
            }
            p:nth-of-type(2){
              width:5.722222rem;
              line-height:0.833333rem;
              height:0.462963rem;
              text-align:center;
              border-radius:0.925926rem;
              border:0.027778rem solid #666B67;
              margin-top: 0.37037rem;
              font-size:0.537037rem;
            }
          }
          div.height{
              height:3.796296rem;
              transition: all 1s ;
          }
          div.close{
              height:0.0rem;
              transition: all 1s ;
          }
        }
      }
    }
    
    .details01{
      width:8.685185rem;
      height:10.185185rem;
      box-sizing: border-box;
      border-radius:0.277778rem;
      img{
        width:0.87963rem;
        height:0.925926rem;
      }
      span{
        display:inline-block;
        width:100%;
        line-height:1.388889rem;
        font-size:0.592593rem;
        text-align:center;
        i{
          position: absolute;
          font-size: 1.296296rem;
          color: #7B7B7B;
          right: 0.37037rem;
          }
        }
        ul{
          font-size:0.444444rem;
          width:8.055556rem;
          height:6.481481rem;
          overflow-y:auto;
          overflow-x:hidden;  
          li{
            border-bottom: 0.018519rem solid #D7D7D7;
            margin-left:0.555556rem;
            line-height:1.111111rem;
            b{
              display:inline-block;
              text-align:right;
              width:0.87963rem;
              height:0.925926rem;
              background:url("../../img/module_room_setOwner3.png") no-repeat; 
              background-position: center;
              background-size:cover; 
              position:relative;
              left:3.055556rem;
              top: 0.222222rem;
            }
          }
          li:nth-of-type(1){
            border-top: 0.018519rem solid #D7D7D7;
            }
        }
        button{
          width:3.305556rem;
          height: 0.972222rem;
          line-height:0.925926rem;
          border-radius: 0.509259rem;
          font-size:0.555556rem;
          margin:0.462963rem 0 0 2.685185rem;
          border: 0 none;
          color: white;
          background: url(../../img/home_all.png) -1.944444rem -1.388889rem no-repeat;
          background-size: 5.555556rem 5.555556rem;
          }
    }


    ul::-webkit-scrollbar {
        display: none;
    } 
</style>

<script type="es6">
    import { MessageBox } from 'mint-ui';
    import http from '../../utils/httpClient.js';


  export default {
    data() {
      return {
        applyOn: false,
        details:false,

        setOwner: false,
        details01:false,
        sel: -1,
        play:1,
      };
    },
    methods:{
        sz () {
            var self = this;
            http.post( '/RoomJion/applyfor', {
                        roomid: self.$store.state.idRoom.room_id,
                        id: localStorage.oxUid || 0,
                    }, '', this )
                .then(res => {
                    console.log(res)
                    if(res.status != 0){
                        self.applyOn = false;
                    }
                })
        }
    }
  };
</script>