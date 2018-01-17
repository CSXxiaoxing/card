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

        <mt-button @click="applyOn = false">确定</mt-button>
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
        text-align:left;
        font-size:52px;
        margin-left:50px;
        b{
          color:red;
          font-size:54px;
          font-weight: normal;
        }
      }
      
      hr{
        width:92%;
      }
      button{
        width:600px;
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
      div{
        text-align:left;
        label{
          display:inline-block;
          font-size:56px;
          width:100%;
          line-height:70px;
          margin-left: 140px;
          span{
            display:inline-block;
            width:60px;
            height:65px;
            background-color: #DADADA;
            border-radius:10px;
            padding:5px 5px 0px 5px;
            position:absolute;
            left:48px;
          }
          b{
            font-size:40px;
            color:#29A345;
            font-weight:normal;
            margin-left:20px;
          }
          .list{
            position:absolute;
            right:40px;
            top:350px;
          }
          div{
            width: 716px;
            height: 0px;
            background-color:#E5E5E5;
            position:relative;
            right:114px;
            top:40px;
            margin-bottom: 50px;
            overflow: hidden;
            p:nth-of-type(1){
              text-align:center;
              margin-right:50px;
              padding-top: 50px;
            }
            input{
              width:676px;
              height:114px;
              border-radius:10px;
              border:2px solid #D4D4D4;
              margin-left:20px;
              font-size:80px;
              text-align:center;
            }
            p:nth-of-type(2){
              width:618px;
              line-height:90px;
              height:50px;
              text-align:center;
              border-radius:100px;
              border:3px solid #666B67;
              margin-top: 40px;
              font-size:58px;
            }
          }
          div.height{
              height:410px;
              transition: all 1s ;
          }
          div.close{
              height:0px;
              transition: all 1s ;
          }
        }
      }
    }
    
    .details01{
      width:938px;
      height:1100px;
      box-sizing: border-box;
      border-radius:30px;
      span{
        display:inline-block;
        width:100%;
        line-height:150px;
        font-size:64px;
        text-align:center;
        i{
          position: absolute;
          font-size: 140px;
          color: #7B7B7B;
          right: 40px;
          }
        }
        ul{
          font-size:48px;
          width:870px;
          height:700px;
          overflow-y:auto;
          overflow-x:hidden;  
          li{
            border-bottom: 2px solid #D7D7D7;
            margin-left:60px;
            line-height:120px;
            b{
              display:inline-block;
              text-align:right;
              width:95px;
              height:100px;
              background:url("../../img/module_room_setOwner3.png") no-repeat; 
              background-position: center;
              background-size:cover; 
              position:relative;
              left:330px;
              top: 24px;
            }
          }
          li:nth-of-type(1){
            border-top: 2px solid #D7D7D7;
            }
        }
        button{
          width:357px;
          height: 105px;
          line-height:100px;
          border-radius: 55px;
          font-size:60px;
          margin:50px 0px 0px 290px;
          border: 0 none;
          color: white;
          background: url(../../img/home_all.png) -210px -150px no-repeat;
          background-size: 600px 600px;
          }
    }


    ul::-webkit-scrollbar {
        display: none;
    } 
</style>

<script type="es6">
    import { MessageBox } from 'mint-ui';
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
        
    }
  };
</script>