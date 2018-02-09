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
              <li v-for='(data, player) in $store.state.data.Zlist' :key='data.zn_member_id' @click='sel = player'>
                  {{data.zn_member_name}} 
                  <b><img v-show="sel == player" src="src/img/module_room_setOwner2.png" alt=""></b>
              </li>

          </ul>
          <mt-button @click="know0">确定</mt-button>
      </mt-popup>

      <span>轮庄设置 <i @click="setOwner = false">×</i></span>
      <p>上庄最低分数：<b>{{$store.state.idRoom.minGrade}}</b></p>
      <hr/>
      <div>
          <label>
              <span @click="play = 1"><img src="src/img/varTrue.png" v-show="play" height="60" width="59" alt="" /></span>
              锁定庄家:<b>{{zhuanList[0]}}</b> <img @click="suo" class="list" src="src/img/module_room_setOwner.png" alt="">
          </label>
          <hr/>
          <label>
            <span @click="play = 0"><img src="src/img/varTrue.png" v-show="!play" height="60" width="59" alt="" /></span>
              自动轮庄
              <div :class='play == 0 ? "height":"close"'>
                <p>输入轮庄局数</p>
                <input v-model='zhuanNum' type="text">
                <p>更新轮庄局数</p>
              </div>
          </label>
        </div>
        <hr/>
        <mt-button @click="zhuan">确定</mt-button>
    </mt-popup >

    <!-- 普通玩家 -->
    <mt-popup 
        v-model="applyOn"
        popup-transition="popup-fade" 
        class="apply" >

        <span>{{this.$store.state.data.apptype == 0 ? "申请上庄" : "取消上庄"}}<i @click="applyOn = false">×</i></span>

        <p>当前设置连庄 :
            <b>{{this.$store.state.idRoom.ju > 0 ? this.$store.state.idRoom.ju+"局" : "暂未设定局数"}}</b>
        </p>

        <p>上庄最低分数 :<b>{{this.$store.state.idRoom.minGrade}}</b></p>

        <p>您是否确定{{$store.state.data.apptype == 0 ? "申请上庄" : "取消上庄"}}？</p>

        <mt-button @click="sz">确定</mt-button>
    </mt-popup >
    
    <!-- 抽水 -->
    <mt-popup
        v-model="details"
        popup-transition="popup-fade" 
        class="details">
        <span>奖金分数 <i @click="details = false"></i></span>

        <ul>
            <li>
                房间成员总分数  ：{{allFen}}
            </li>
            <li>
                房主抽水分数 &nbsp &nbsp &nbsp: <b>{{allWater}}</b>
            </li>
        </ul>
        <mt-button @click="newRoom">重新开局</mt-button>
        <p>( 重新开始，房间局数，开奖记录，流水报表和抽水分数都将清零。房间成员分数保持不变)</p>
    </mt-popup>
    <loading v-if='loading'></loading>
    </div>
</template>

<style lang='scss' scoped>
  @import '../../utils/baseVar.scss';

  // display: flex; 
  .apply{
    width: 7.092593rem;
    @include border-radius(0.277778rem);
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
      margin-left:1.52963rem;
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
       @include border-radius(0.092593rem);
      margin-left:0.185185rem;
      font-size:0.240741rem;
    }
    
    button{
      width:3.305556rem;
      height: 0.972222rem;
      line-height:0.925926rem;
       @include border-radius(0.509259rem);
      font-size:0.555556rem;
      margin:0.277778rem 0.0rem 0.462963rem 0;
      border: 0 none;
      color: white;
      background: $homeAll -1.944444rem -1.388889rem no-repeat;
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
           @include border-radius(0.092593rem);
          padding:0.046296rem 0.046296rem 0.0rem 0.046296rem;
          position:absolute;
          left:0.648148rem;
        }
        
      }
    }
  }
    .details{
      width: 7.092593rem;
       @include border-radius(0.277778rem);
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
                position:absolute;
                display: inline-block;
                top:0.644444rem;
                right:1.177778rem;
                width: 0.527778rem;
                height: 0.527778rem;
                background: $homeAll -0.925926rem -2.314815rem no-repeat;
                background-size: 5.555556rem;
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
            @include border-radius(0.509259rem);
            position: absolute;
            left: 50%;
            bottom: -0.292593rem;
            -webkit-transform: translate(-50%, -54%);
               -moz-transform: translate(-50%, -54%);
                -ms-transform: translate(-50%, -54%);
                 -o-transform: translate(-50%, -54%);
                    transform: translate(-50%, -54%);
            font-size:0.555556rem;
            border: 0 none;
            color: white;
            background: $chart05 no-repeat;
            background-position:center;
            background-size: 4.018519rem 1.037037rem;
        }
        button:active {
            position: absolute;
            left: 50%;
            bottom: 0;
            -webkit-transform: translate(-50%, -50%);
               -moz-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                 -o-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
        }

      p{
        // position: absolute;
        font-size: 0.282222rem;
        width: 90%;
        color: red;
        // left: 0.046296rem;
        // transform: translate(0%, -50%);
        display: block;
        word-wrap: break-word;
        word-break:break-all;
        white-space: pre-wrap;
        padding:0.0rem 0.392593rem;
        // width: 4.574074rem;
      }
    }
    .owner{
      width: 7.092593rem;
       @include border-radius(0.277778rem);
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
          color: red;
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
         @include border-radius(0.509259rem);
        font-size:0.555556rem;
        margin:0.092593rem 0.0rem 0.277778rem 0.0rem;
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
      div{
        text-align:left;
        label{
          display:inline-block;
          font-size:0.518519rem;
          width:100%;
          line-height:0.648148rem;
          padding-left: 1.296296rem;
          position: relative;
          box-sizing: border-box;
            span{
                display:inline-block;
                width:0.555556rem;
                height:0.601852rem;
                background-color: #DADADA;
                @include border-radius(0.092593rem);
                padding:0.046296rem 5 0 0.046296rem;
                position:absolute;
                left:0.444444rem; 
                img{
                    width: 0.546296rem;
                    height: 0.555556rem;
                }
            }
          b{
            font-size: 0.35rem;
            color: #29A345;
            font-weight: normal;
            margin-left:0.08rem;
          }
          .list{
            position: absolute;
            right: 0.3rem;
            width: 0.805556rem;
            height: 0.722222rem;
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
               @include border-radius(0.092593rem);
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
               @include border-radius(0.925926rem);
              border:0.027778rem solid #666B67;
              margin-top: 0.37037rem;
              font-size:0.537037rem;
            }
          }
          div.height{
              height:3.796296rem;
              @include transition(all,1s);

          }
          div.close{
              height:0.0rem;
              @include transition(all,1s);
          }
        }
      }
    }
    
    .details01{
      width:8.685185rem;
      height:10.185185rem;
      @include box-sizing();
       @include border-radius(0.277778rem);
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
            position: relative;
            b{
              display:inline-block;

              width:0.87963rem;
              height:0.925926rem;
              background: $chart02 no-repeat; 
              background-position: center;
              background-size: 0.87963rem 0.925926rem; 
              position: absolute;
              right: 0.092593rem;
              top: 50%;
              -webkit-transform: translate(0,-50%);
                 -moz-transform: translate(0,-50%);
                  -ms-transform: translate(0,-50%);
                   -o-transform: translate(0,-50%);
                      transform: translate(0,-50%);
              img{
                height: 0.925926rem;
                width: 0.87963rem;
              }
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
           @include border-radius(0.509259rem);
          font-size:0.555556rem;
          margin:0.462963rem 0 0 2.685185rem;
          border: 0 none;
          color: white;
          background: $homeAll -1.944444rem -1.388889rem no-repeat;
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
    import Vue from 'vue';
    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)

  export default {
    data() {
      return {
        loading: false,     // loading
        applyOn: false,
        details:false,

        setOwner: false,
        details01:false,
        sel: 0,
        play: 1,    // 1锁定 0自动
        zhuanNum: 5,     // 轮庄数
        zhuanList: ['', ''],  // 申请上庄的人的列表-默认
        allFen: 0,  // 房间总分
        allWater: 0,  // 抽水分数
      };
    },
    methods:{
        sz () {
            var self = this;
            if(self.$store.state.data.apptype == 0){ // 申请上庄
                http.post( '/RoomJoin/applyfor', {
                            roomid: self.$store.state.idRoom.id,
                            id: localStorage.oxUid || 0,
                        })
                    .then(res => {
                        if(res.status == 1){
                            self.$store.state.data.apptype = 1;
                        }
                        else if(res.status == 0){    //  错误
                            self.$parent.errorTips = res.msg;
                            self.$parent.careTip = true;
                            // console.log(self.$parent)
                        }
                    })
            } else {        // 取消上庄
                http.post( '/RoomJoin/setMakers', {
                            id: localStorage.oxUid || 0,
                            roomid: self.$store.state.idRoom.id,
                            type: 2,
                        })
                    .then(res => {
                        console.log(res)
                        if(res.status == 1){
                            self.$store.state.data.apptype = 0;
                        }
                    })
            }
            
            self.applyOn = false;   // 申请上庄下庄
        },
        zhuan () {  // 庄模式设置
            var self = this;
            if(self.zhuanList[1] == '' && self.play == 1){
                self.$parent.errorTips = '请指定庄家';
                self.$parent.careTip = true;
                return false;
            }
            self.setOwner = false;
            if(self.play == 1){     // 指定谁上庄
                http.post('/RoomJoin/setMakers',{
                    roomid: self.$store.state.idRoom.id, // 房间id
                    type: 1,  // 1为设置庄家，2为下庄
                    id: self.zhuanList[1],  // 用户id
                })
                .then(res => {
                    if(res.status == 0){
                        self.$parent.errorTips = '锁定庄家'+res.msg;
                        self.$parent.careTip = true;
                    } else if(res.status == 1){
                        self.$parent.list()
                    }
                })
            }
            http.post('/Room/setRoomMakers',{
                roomid: self.$store.state.idRoom.id, // 房间id
                maker: self.play == 1 ? 1 : 2,   // 庄家模式 1，指定，2轮庄
                makernumber: self.zhuanNum,  // 轮庄局数
            })
            .then(res => {
                console.log(res)
                if(res.status == 0){
                    self.$parent.errorTips = res.msg;
                    self.$parent.careTip = true;
                }
            })
            // this.setOwner = false
        },
        suo () {      // 锁定庄家--获取申请上庄玩家列表
            var self = this;
            self.details01 = true
            if(!self.$store.state.data.Zlist[0]){
                http.post('/RoomJoin/getMakerList',{
                    roomid: self.$store.state.idRoom.id, // 房间id
                }, '',this)
                .then(res => {
                    if(res.status == 1){
                        self.$store.state.data.Zlist=res.data
                    }
                })
            }
        },
        know0 () {   // 上庄列表锁定人员
            if(this.sel >= 0){
                this.zhuanList[0] = this.$store.state.data.Zlist[this.sel]['zn_member_name'];
                this.zhuanList[1] = this.$store.state.data.Zlist[this.sel]['zn_member_id'];
            }
            this.details01 = false
        },
        newRoom () {    // 重新开局
            var self = this;
            var id = self.$store.state.idRoom.id;
            http.post('/Room/reGame',{
                roomid: id, // 房间id
            })
            .then(res => {
                console.log(res)
                if(res.status == 0){
                    self.$parent.errorTips = res.msg;
                    self.$parent.careTip = true;
                } else if(res.status == 1){
                    self.$parent.gameResult(id);
                }
            })
            self.details = false;
            self.details = false;
        },
    }
  };
</script>