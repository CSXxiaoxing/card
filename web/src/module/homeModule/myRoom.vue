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
        width:7.12963rem;
        border-radius: 0.259259rem;
        p{height: 1.666667rem; width: 100%;}
        h3{
          padding: 0;
          margin: 0;
          width: 8.407407rem;
          color:#5B3F0D;
          height: 1.666667rem;
          text-align: center;
          font-size: 0.703704rem;
          line-height: 1.296296rem;
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
                        right:0.833333rem;
                        top: 0.277778rem;
                        background: url(../../img/home_all.png) -3.888889rem -2.407407rem no-repeat;
                        background-size: 5.555556rem 5.555556rem;
                        width: 0.555556rem;
                        height: 0.555556rem;
                    }     
        }

        .select{
          margin-left:0.740741rem;
          margin-bottom:0.259259rem;
          padding:0.0rem 0.277778rem;
          width:5.185185rem;
          height:0.833333rem;
          line-height:0.87037rem;
          border-radius:0.462963rem;
          background-color:white;
          border:0.046296rem solid #E1DFE0;
          div{
            height:0.833333rem;
            button{
                font-size: 0.416667rem;
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
                margin-right:0.555556rem; 
            }
            img{
              width:2.962963rem;
              height:0.944444rem;
              position:absolute;
              left:0.740741rem;
              top:1.666667rem;
            }
            img.right{
              position:absolute;
              left:3.703704rem;
              top:1.666667rem;
              transition:all 1s;
            }
            img.left{
              position:absolute;
              left:0.740741rem;
              top:1.666667rem;
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
        height:8.935185rem;
        margin-bottom: 0.240741rem;
        background:url('../../img/module_home_myRoom4.png') no-repeat;
        background-size: cover;
        background-position:center;
        p{
          font-size:0.444444rem;
          color: #9B9A98;
          width:5.907407rem;
          margin:0.555556rem auto;
        }
        ul{
            padding: 1%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            
            li{
                // width: 342px;
                width: 32.2%;
                height: 2.018519rem;
                // margin-right: 15px;
                margin-top: 0.166667rem;
                background: url('../../img/module_home_myRoom3.png') no-repeat;
                background-size: cover;
                background-position:center;
                background-size: 2.240741rem 2.037037rem;
                b{
                    display: block;
                   background: url('../../img/home_all.png') -2.777778rem 0.0rem no-repeat;
                    background-size: 5.555556rem 5.555556rem;
                    height: 0.833333rem;
                    width: 0.87037rem;
                    float: right;
                    position: relative;
                    bottom:0.027778rem;
                    left:0.055556rem;
                }
                i{
                    display:block;
                    height: 0.925926rem;
                    width: 1.166667rem;
                    background: url('../../img/home_all.png') -0.740741rem -1.203704rem no-repeat;
                    background-size: 5.555556rem 5.555556rem;
                    position: relative;
                    left: 50%;
                    bottom:0.055556rem;
                    transform: translate(-50%,0);
                }
                h4{
                    color: #fff;
                    font-size: 0.259259rem;
                }
                div{
                    height:0.925926rem;
                    padding: 0.0rem 0.166667rem 0.0rem;
                    position: relative;
                    bottom: 0;
                    border-radius:0.185185rem;
                    h5{
                        color: #fff;
                        font-size: 0.259259rem;
                        padding-top:0.046296rem;
                        margin: 0;
                    }
                    p{
                        height:0.222222rem;
                        color: #C4C4C4;
                        display: flex;
                        justify-content: space-between;
                        span{
                            font-size: 0.222222rem;
                            text-align: right;
                            padding: 0.018519rem 0.0rem;
                            height:0.222222rem;
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