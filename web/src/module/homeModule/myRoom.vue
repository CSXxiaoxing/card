<template>
    <div>
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
                <img  :class ='sel == 0 ? "left":"right"' src="/dist/module_home_myRoom1.png" alt="">
                <button @click='sel = 0 '>我开的房间</button>
                <button @click='sel = 1 '>加入的房间</button>
            </div>
        </div>

        <div class="room"> 
            
            <ul @click='openS'>
                <p v-show = '(!$store.state.data.MYkai[0] && sel == 0) || (!$store.state.data.MYjoin[0] && sel ==1)'>你还没有创建/加入房间，快去创建/加入</p>

                <li v-show = 'sel==0' v-for='(dataRoom) in this.$store.state.data.MYkai' :key='"my"+dataRoom.key' :openState='`${dataRoom.open}`' :roomid = 'dataRoom.roomNumber'>
                    <b v-if='dataRoom.open'></b>
                    <i></i>
                    <h4>大战牛群</h4>
                    <div>
                        <h5>{{dataRoom.roomName}}</h5>
                        <p>
                        <span v-show='dataRoom.open == "false"'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
                            <span v-show='dataRoom.open'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
                            <span v-show='dataRoom.open' id="roomNumber">房号：{{dataRoom.roomNumber}}</span>
                        </p>
                    </div>
                </li>

                <li v-show = 'sel==1' v-for='(dataRoom) in this.$store.state.data.MYjoin' :key='dataRoom.key' :openState='`${dataRoom.open}`' :roomid = 'dataRoom.roomNumber'>
                    <b v-if='dataRoom.open'></b>
                    <i></i>
                    <h4>大战牛群</h4>
                    <div>
                        <h5>{{dataRoom.roomName}}</h5>
                        <p>
                        <span v-show='dataRoom.open == "false"'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
                            <span v-show='dataRoom.open'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
                            <span v-show='dataRoom.open' id="roomNumber">房号：{{dataRoom.roomNumber}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </mt-popup>
        <loading v-if='loading'></loading>
    </div>
</template> 

<style  lang='scss' scoped>
   @import '../../utils/baseVar.scss';
    
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
          background: $home04 no-repeat;
          background-size:8.45rem 1.666667rem;
          position: absolute;
          left: 50%;
          top: 1%;
          -webkit-transform: translate(-50%,-10%);
             -moz-transform: translate(-50%,-10%);
              -ms-transform: translate(-50%,-10%);
               -o-transform: translate(-50%,-10%);
                  transform: translate(-50%,-10%);
                    i{
                        position: absolute;
                        right:0.833333rem;
                        top: 0.277778rem;
                        background: $homeAll -3.888889rem -2.407407rem no-repeat;
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
            width:5rem;
            height:0.8rem;
            button{
                font-size:0.388889rem;
                text-align:center;
                width:2.4rem;
                height:0.6rem;
                font-size: 0.416667rem;
                border: none;
                background-color: transparent;
                position: relative;
                border: none;
                outline: none;
                position:relative;
                bottom:0.074074rem;
                -webkit-tap-highlight-color: #000000;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                //z-index: 999;
            }
            button:nth-of-type(1){
                // color:white;
               padding-right:0.1rem;
            }
            button:nth-of-type(2){
                // color:white;
                left:0.3rem; 
                position:relative;
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
        }

        .room{
            flex: 1;
            // border: 1px solid #000;
            overflow-y: auto;
            overflow-x: hidden;
            height:8.935185rem;
            background:$home06 no-repeat;
            background-size: cover;
            background-position:center;
            border-radius: 0.259259rem;
            p{
              font-size:0.444444rem;
              color: #9B9A98;
              width:5.907407rem;
              margin:0.555556rem auto;
            }
            ul{
                padding: 1%;
                display: flex;
                justify-content: flex-start;
                flex-direction:row;
                flex-wrap: wrap;
                li{
                    // width: 342px;
                    width: 32.2%;
                    height: 2.018519rem;
                    // margin-right: 15px;
                    margin-top: 0.166667rem;
                    background: $home07 no-repeat;
                    background-size: cover;
                    background-position:center;
                    background-size: 2.240741rem 2.037037rem;
                    margin-right:0.075rem;
                    b{
                        display: block;
                        background: $homeAll -2.777778rem 0.0rem no-repeat;
                        background-size: 5.555556rem 5.555556rem;
                        height: 0.833333rem;
                        width: 0.87037rem;
                        float: right;
                        position: relative;
                        bottom:0.027778rem;
                        left:0.13rem;
                    }
                    i{
                        display:block;
                        height: 0.925926rem;
                        width: 1.166667rem;
                        background: $homeAll -0.740741rem -1.203704rem no-repeat;
                        background-size: 5.555556rem 5.555556rem;
                        position: relative;
                        left: 50%;
                        bottom:0.055556rem;
                        -webkit-transform: translate(-50%,0);
                           -moz-transform: translate(-50%,0);
                            -ms-transform: translate(-50%,0);
                             -o-transform: translate(-50%,0);
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
                            width:1.981481rem;
                            height:0.222222rem;
                            color: #C4C4C4;
                            display: flex;
                            justify-content: space-between;
                            span{
                                position:relative;
                                bottom:0.5rem;
                                font-size: 0.222222rem;
                                text-align: right;
                                height:0.222222rem;
                            }
                            span:nth-of-type(1){
                                flex: 1;
                                text-align: right;
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
    import router from '../../router/';
    import Vue from 'vue';
    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)

    export default {
        data() {
            return {
                loading: false,     // loading
                myRoom: false,
                val: '',
                tabPosition: 'top', 
                datagrid: [],
                datajoin: [],
                sel:0,
                MYpagesize: 100,
                type :2 ,
                p: 1 ,
                status:0,
            };
        },
        mounted: function(){       
            if(localStorage.oxToken && localStorage.oxUid){
                this.id = localStorage.oxUid
                this.name = localStorage.getItem('oxName')
                // 房间请求
                this.$store.dispatch('webIM')
                var self = this;

                http.post('/Room/getRoomList' ,
                {
                    token: localStorage.oxToken,
                    pagesize : self.MYpagesize,
                    type : self.type,
                    p : self.p,
                }, '')
                .then(res => {
                    if(res.status == 1){
                    var arrK = [];

                    for(var i = 0 ; i < res.data.length ; i++){
                        var kaiid = self.$store.state.data.MYkaiid;
                        if(kaiid.indexOf(res.data[i].id) < 0){
                            arrK.push({
                                key : res.data[i].id ,
                                open : res.data[i].zn_room_type == 1 ? true : false,
                                roomName : res.data[i].zc_title,
                                roomNumber : res.data[i].zc_number,
                                number : res.data[i].pernumber,
                            })
                            self.$store.state.data.MYkaiid.push(res.data[i].id)
                        }
                    }

                    var arrK01 = self.$store.state.data.MYkai;  // 合并数据
                    if(!arrK01){
                        self.$store.state.data.MYkai = arrK01.concat(arrK);
                    } else {
                        self.$store.state.data.MYkai = arrK;
                    }
                    }
                })


                 http.post('/Room/joinRoomList' ,
                    {
                       id : localStorage.oxUid,
                    }, '')
                    .then(res => {

                        if(res.status == 1){
                            var arrJ = [];

                        for(var i = 0 ; i < res.data.length ; i++){
                            var joinid = self.$store.state.data.MYjoinid;
                            if(joinid.indexOf(res.data[i].id) < 0){
                                arrJ.push({
                                    key : res.data[i].id ,
                                    open : res.data[i].zn_room_type == 1 ? true : false,
                                    roomName : res.data[i].zc_title,
                                    roomNumber : res.data[i].zc_number,
                                    number : res.data[i].pernumber,
                                })
                                self.$store.state.data.MYjoinid.push(res.data[i].id)
                            }
                        }

                        var arrJ01 = self.$store.state.data.MYjoin;  // 合并数据
                        if(!arrJ01){
                            self.$store.state.data.MYjoin = arrJ01.concat(arrJ);
                        } else {
                            self.$store.state.data.MYjoin = arrJ;
                        }
                        }
                    })

            } else {
                // 跳回登录页
                router.push({name: '/'});
            }
        },
        methods: {
            openS(e){
                var self = this;
              let Etar = e.target;
              var Tar = () => {
               var EtarName = Etar.nodeName.toLowerCase();
                        if(EtarName == 'li'){
                          var nodeValue = Etar.attributes["openState"].nodeValue;

                          nodeValue == 'false' ? this.$refs.onOpenChild.onOpenRoom =
                          ++[[]][+[]]+[+[]] == 10 : 0.1+0.2 ==0.3;

                          if(nodeValue == 'true'){
                            this.sendId = Etar.attributes["roomid"].nodeValue
                            console.log(Etar.attributes["roomid"].nodeValue)
                            http.post('/Room/getRooms',{
                                          number: this.sendId,
                                      })
                            .then(res => {
                                if(res.status == 1) {
                                    http.post('/Room/joinRoom' ,
                                    {
                                        zn_room_id : res.data.id,
                                    }, '' ,this)
                                    .then(res => {
                                    console.log(res)
                                    if( res.status == 3 ){
                                    router.push({path: `room/${Etar.attributes["roomid"].nodeValue}`});
                                        // alert('房间号码不存在')
                                    } else if( res.status == 1 ){
                                        router.push({path: `room/${res.data.zc_number}`});
                                    } else if( res.status == 0 ){
                                        self.$parent.errorTips = '你已在房间内，请退出当前房间';
                                        self.$parent.careTip = true;
                                    }
                                })
                                }
                            })
                          }
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
            loadRoom(){
              var self = this;
              http.post( '/Room/getRoomList',{
                  pagesize : self.MYpagesize,
                  type : self.type,
                  p : self.p,
              }, '' ,this)
              .then(res => {
                console.log(res)
              })
            },
        }
  }
</script>