<template>
    <mt-popup
        v-model="myRoom"
        popup-transition="popup-fade" 
        class="mine">
        <p></p>
        <h3>
            我的房间 
            <i @click="myRoom = false">
            </i>
        </h3>
        <div class="select" >
            <div>
                <img  :class ='sel == 0 ? "left":"right"' src="../../img/module_home_myRoom1.png" alt="">
                <button @click='sel = 0'>我开的房间</button>
                <button @click='sel = 1'>加入的房间</button>
            </div>
        </div>

        <div class="room"> 
            <p>你还没有创建/加入房间，快去创建/加入</p>
            <ul @click='openS'>
                <li v-for='(dataRoom) in datagrid' :key='dataRoom.key' :openState='dataRoom.open'>
                    <b v-if='dataRoom.open == "true"'></b>
                    <i></i>
                    <h4>大战牛群</h4>
                    <div>
                        <h5>{{dataRoom.roomName}}</h5>
                        <p>
                        <span v-show='dataRoom.open == "false"'>
                        <strong class="roomNum">{{dataRoom.number}}</strong>人</span>
                        <span v-show='dataRoom.open == "true"'>
                        <strong class="roomNum">{{dataRoom.number}}</strong>人</span>
                        <span v-if='dataRoom.open == "true"' id="roomNumber">房号：{{dataRoom.roomNumber}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>

    </mt-popup>
</template>

<style  lang='scss' scoped>
   

    .mine{
        width:770px;
        border-radius: 28px;
        p{height: 180px; width: 100%;}
        h3{
          padding: 0;
          margin: 0;
          width: 908px;
          color:#5B3F0D;
          height: 180px;
          text-align: center;
          font-size: 76px;
          line-height: 140px;
          background: url('../../img/JoinTOP.png') no-repeat;
          position: absolute;
          left: 50%;
          top: 0;
          -webkit-transform: translate(-50%,-10%);
             -moz-transform: translate(-50%,-10%);
              -ms-transform: translate(-50%,-10%);
               -o-transform: translate(-50%,-10%);
                  transform: translate(-50%,-10%);
                    i{
                        position: absolute;
                        right:90px;
                        top: 30px;
                        background: url(../../img/home_all.png) -420px -260px no-repeat;
                        background-size: 600px 600px;
                        width: 60px;
                        height: 60px;
                    }     
        }

        .select{
          margin-left:80px;
          margin-bottom:28px;
          padding:0px 30px;
          width:560px;
          height:90px;
          line-height:94px;
          border-radius:50px;
          background-color:white;
          border:5px solid #E1DFE0;
          div{
            height:90px;
            button{
                font-size: 45px;
                border: none;
                background-color: transparent;
                position: relative;
                border: none;
                outline: none;
                -webkit-tap-highlight-color: #000000;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                //z-index: 999;
            }
            button:nth-of-type(1){
                // color:white;
                margin-right:60px; 
            }
            img{
              width:320px;
              height:102px;
              position:absolute;
              left:80px;
              top:180px;
            }
            img.right{
              position:absolute;
              left:400px;
              top:180px;
              transition:all 1s;
            }
            img.left{
              position:absolute;
              left:80px;
              top:180px;
               transition:all 1s;
            }
        }

          // @-webkit-keyframes mymove /*Safari and Chrome*/
          // {
          // from {left:120px;}
          // to {left:420px;}
          // }
        }

        .room{
        flex: 1;
        // border: 1px solid #000;
        overflow-y: auto;
        overflow-x: hidden;
        height:965px;
        margin-bottom: 26px;
        background:url('../../img/module_home_myRoom4.png') no-repeat;
        background-size: cover;
        background-position:center;
        p{
          font-size:48px;
          color: #9B9A98;
          width:638px;
          margin:60px auto;
        }
        ul{
            padding: 1%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            
            li{
                // width: 342px;
                width: 32.2%;
                height: 218px;
                // margin-right: 15px;
                margin-top: 18px;
                background: url('../../img/module_home_myRoom3.png') no-repeat;
                background-size: cover;
                background-position:center;
                background-size: 242px 220px;
                b{
                    display: block;
                   background: url('../../img/home_all.png') -300px 0px no-repeat;
                    background-size: 600px 600px;
                    height: 90px;
                    width: 94px;
                    float: right;
                    position: relative;
                    bottom:3px;
                    left:6px;
                }
                i{
                    display:block;
                    height: 100px;
                    width: 126px;
                    background: url('../../img/home_all.png') -80px -130px no-repeat;
                    background-size: 600px 600px;
                    position: relative;
                    left: 50%;
                    bottom:6px;
                    transform: translate(-50%,0);
                }
                h4{
                    color: #fff;
                    font-size: 28px;
                }
                div{
                    height:100px;
                    padding: 0px 18px 0px;
                    position: relative;
                    bottom: 0;
                    border-radius:20px;
                    h5{
                        color: #fff;
                        font-size: 28px;
                        padding-top:5px;
                        margin: 0;
                    }
                    p{
                        height:24px;
                        color: #C4C4C4;
                        display: flex;
                        justify-content: space-between;
                        span{
                            font-size: 24px;
                            text-align: right;
                            padding: 2px 0px;
                            height:24px;
                        }
                        span:nth-of-type(1){
                            flex: 1;
                            text-align: center;
                        }
                        span:nth-of-type(2){
                            flex: 1;
                            text-align: left;
                        }
                    }
                    .roomNum{color: #2FAB51;}
                }
            }
            // li:nth-of-type(3n){
            //     margin: 0;
            //     margin-top: 18px;
            // }
            // li:nth-of-type(1),li:nth-of-type(2),li:nth-of-type(3){
            //     margin-top: 0;
            // }
        }
    }
    .room::-webkit-scrollbar {
        display: none;
    } 
}

</style>
  
<script>
    import http from '../../utils/httpClient.js';

    export default {
        data() {
        return {
            myRoom: false,
            val: '',
            tabPosition: 'top',
            datagrid: '',
            sel:0,

        };
        },
          // mounted: function(){
          //   var self = this;
          //   http.post({
          //         url: 'sel',vm:this
          //     }).then(res => {
          //           self.datagrid = res.data;
          //           console.log(res.data)
          //       })
          // },
        methods: {
            openS(e){
              let Etar = e.target;
              var Tar = () => {
                var EtarName = Etar.nodeName.toLowerCase();
                if(EtarName == 'li'){
                  console.log(this.$refs)
                  Etar.attributes["openState"].nodeValue == 'false' ? 
                  this.$refs.onOpenChild._data.onOpenRoom=true : false;
                  return false;
                } else if(EtarName == 'body'){
                  return false;
                } else {
                  Etar = Etar.parentElement;
                  Tar();
                }
              };
              Tar();
            },
            generateToolBar: function(obj){
              //动态生成按钮
              
            },
            removeright(){
              
            }
          }
    };
</script>