<template>
    <div class='chartList'>
        <!-- 房间成员 -->
        <mt-popup 
          v-model="putRoom"
          popup-transition="popup-fade" 
          class="tip" >
          <span>退出房间</span>
          <p>退出房间分数将会清零，你是否要退出房间？</p>
          <mt-button @click="go" >  确定
          </mt-button>
          <mt-button @click="putRoom = false">  取消
          </mt-button>
        </mt-popup >

        <!-- 解散房间 -->
        <mt-popup 
          v-model="dissolveRoom"
          popup-transition="popup-fade" 
          class="diss" >
          <span>解散房间</span>
          <p>房间玩家分数未清零你是否确定要解散房间？</p>
          <mt-button @click="delRoom">  确定
          </mt-button>
          <mt-button @click="dissolveRoom = false">  取消
          </mt-button>
        </mt-popup >

    	<header>
            <ul>
                <li>
                    <i><a  @click='$store.commit("ls")'></a></i>
                </li>
                <li>房间成员</li>
                <li>➕添加</li>
            </ul>
        </header>
        <div class='list'>
            <ul>
                <!-- 测试中 datalist ==> 5 -->
            	<li v-for='(data, key) in datalist' :key='data.id' v-if='key != "count"' 
                :class='data.zn_member_id == cli ? "click" : ""' @touchend='cli = data.zn_member_id'>
                    
            		<img src="../../img/chart_Room2.png" alt="">
                    <b>{{data.zn_member_name}}</b>
                    <span v-if='false'><img src="../../img/chart_List1.png" alt="">加友</span>
            	</li>

            </ul>
        </div>

        <footer>
            <mt-button v-show = 'a == 1' type="primary"  @click="dissolveRoom = true">
                    解散房间
            </mt-button>
            <mt-button v-show = 'a == 1' type="primary"  @click="idMessage = false">
                    删除成员
            </mt-button>
        	<mt-button v-show = 'a == 0' type="primary"  @click="putRoom = true">
                    退出房间
            </mt-button>
        </footer>
    </div>
</template>

<style lang='scss' scoped>

    @import '../../utils/baseVar.scss';

    .mut{
        width: 7.092593rem;
        border-radius: 0.277778rem;
        position: absolute;
        top:8.240741rem;
        span{
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
          bottom: 0.462963rem;
        }

        p{
          height:1.666667rem;
          line-height:0.740741rem;
          font-size:0.462963rem;
          width:5.611111rem;
          position:relative;
          left:0.740741rem;
          bottom:0.462963rem;
          text-align:left;
        }
        button{
          width:2.777778rem;
          height: 1.0rem;
          line-height:0.925926rem;
          border-radius: 0.509259rem;
          font-size:0.555556rem;
          margin-bottom:0.462963rem;
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
    }

    .chartList {
        height: 100%;
        background: #ECEDF1;
        
        header {
            height: 1.87037rem;
            padding: 1.018519rem 0.277778rem 0.0rem;
            box-sizing: border-box;
            background: #2F2E34;
            color: #fff;
            ul {
                height: 0.796296rem;
                line-height: 0.796296rem;
                display: flex;
                justify-content: space-between;
                font-size:0.462963rem;
                li:nth-of-type(2){
                    text-align: center;
                }
                li:first-child {
                    &>i {
                        display: inline-block;
                        width: 0.648148rem;
                        height: 0.509259rem;
                        background: $roomAll -4.351852rem -1.481481rem no-repeat;
                        background-size: 5.555556rem;
                        position: relative;
                        top: 50%;
                        transform: translate(0, -50%);
                        a {
                            padding: 0.259259rem 0.37037rem;
                        }
                    }
                }
            }
        }
        
        .list{
            width: 100%;
            height:14.240741rem;
            overflow-y:auto;
            overflow-x:hidden;
            background:white;
            font-size:0.388889rem;
            li{
                height:1.759259rem;
                text-align:left;
                border-bottom: 0.018519rem solid #E6F0E6;
                img{
                    margin:0.092593rem 0.185185rem 0 0.092593rem;
                    width:1.407407rem;
                    height:1.481481rem;
                }
                b{
                    display:inline-block;
                    min-width:2.962963rem;
                    min-height: 1.194444rem;
                    line-height:1.203704rem;
                    background-position: center;
                    background-size:cover;
                    position:relative;
                    bottom:0.462963rem;
                    font-weight: normal;
                }
                span{
                     width:1.833333rem;
                     height:0.833333rem;
                     border:0.027778rem solid #CDE9CC;
                     border-radius:0.925926rem;
                     float:right;
                     position:relative;
                     top:0.462963rem;
                     right:0.462963rem;
                     color:#13BD11;
                     font-size:0.407407rem;
                     line-height: 0.555556rem;
                     padding-right: 0.185185rem;
                     img{
                        position:relative;
                        display:inline-block;
                        vertical-align: sub;
                        top:0.074074rem;
                        margin-left:0.203704rem;
                        width:0.583333rem;
                        height:0.574074rem;
                     }
                }
            }
            li.click{
                background-color:#E3FFE3;
            }
            .clear{
                clear: both;
                height:0;
            }
        }
        .list::-webkit-scrollbar {
            display: none;
        } 

        footer{
            width:100%;
            button{
                  width:4.111111rem;
                  height:1.037037rem;
                  line-height: 0.925926rem;
                  font-size:0.555556rem;
                  border: none;
                  background:$chart03  no-repeat;
                  background-position:center;
                  background-size:4.231481rem 1.231481rem;
                  margin-top: 0.277778rem;
                }
            button:active {
                    position: relative;
                    left: 0.018519rem;
                    bottom: -0.046296rem;
            }
            button:nth-of-type(1){
                background: $chart04 no-repeat;
                background-size:4.231481rem 1.231481rem;
                background-position:center;
            }
        }
    }

    .tip{
      @extend .mut;
      p{
        color:red;
      }
    }

    .diss{
      @extend .mut;
        button:nth-of-type(2){
            background: url(../../img/chart_list3.png) no-repeat;
            background-position:center;
        }
    }
</style>

<script type="text/javascript">
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import router from '../../router/';

    export default {
        data: function(){
            return {
                a: 99,       // 0普通  1房主
                roomid: 0,  // 房间id
                datalist: '',   // 成员列表
                cli: -1,         // 选中
                putRoom: false,
                dissolveRoom: false,
            }
        },

        mounted: function(){
            var self = this;
            var params = JSON.parse(this.$route.params.id);
            this.a = params[3];
            this.roomid = params[2];
            this.list()               // 玩家列表
        },

        methods: {
            delRoom () {        // 解散房间
                http.post('/Room/dissolveRoom',{
                    roomid: this.roomid,
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 1){
                        this.dissolveRoom = false;
                    }
                })
            },
            delPerson () {      // 删除成员
                var self = this;
                var data = self.datalist;
                var cli = self.cli;
                if(this.a == 1 && self.cli != -1) {
                    http.post('/RoomJoin/closeRoom',{
                        id: data.cli.id,
                        roomid: this.roomid,
                    })
                    .then(res => {
                        console.log(res)
                        if(res.status == 1){
                            self.list()
                        }
                    })
                }
            },
            list () {       // 玩家列表
                var self = this;
                http.post('/RoomJoin/getJoinRoomList',{
                    p: 1,
                    pagesize: 100,
                    roomid: this.roomid,
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 1){
                        self.datalist = res.data;
                    }
                })
            },
            go () {     // 退出房间
                var self= this;
                http.post('/RoomJoin/closeRoom',{
                    id: localStorage.oxUid, // 
                    roomid: this.roomid,
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 1){
                        self.list()
                        self.putRoom = false
                        router.push({path: `/home`});
                    }
                })
            },
            
        }
    }
</script>