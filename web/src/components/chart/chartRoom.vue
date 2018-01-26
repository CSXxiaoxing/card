  <template>
    <div class='chartRoom'>
    	<header>
            <ul>
                <li>
                    <i><a @click='$store.commit("ls")'></a></i>
                </li>
                <li v-show='roomstatus != 0 && roomstatus != 3'>{{shename}}</li>
                <li v-show='roomstatus == 0'>联系客服</li>
                <li v-show='roomstatus == 3'>聊天室（{{lingth+1}}）</li>
                <li v-show='roomstatus == 3'>
                    <router-link :to="chartList" >
                    <img src="../../img/chart_Room7.png" alt="">
                    </router-link>
                </li>
                <li  v-show='roomstatus == 1'  @click = 'give == 0 ? give = 1 : give = 0'>给他＋/－分</li>
                <li v-show='(roomstatus == 1 || roomstatus == 2)&& isfriend == 0'><img src="../../img/chart_Room5.png" alt="">加友</li>
            </ul>
        </header>
        <div class='chart'  id='txtbox'>
            <ul v-if='roomstatus == 2'>
                <!-- 单聊 -->
                <li v-for="(data, idx) in (roomstatus == 2 ? $store.state.txt : '')" 
                :class="$store.state.txt_idx[idx] >=0 ? 'left' : 'right'"   :key = '$store.state.txt_time[idx]'>
                    <img src="../../img/chart_Room2.png" alt="">
                    <div class="test">
                        <span class="bot"></span>
                       {{data}}
                    </div>
                </li>
            </ul>
            
            <ul v-if='roomstatus == 3'>
                <!-- 群聊 -->
                <li v-for="(data, idx) in (roomstatus == 3 ? $store.state.txt : '')" 
                :class="$store.state.txt_idx[idx] >=0 ? 'left' : 'right'"   :key = '$store.state.txt_time[idx]'>
                    <img src="../../img/chart_Room2.png" alt="">
                    <div class="test">
                        <span class="bot"></span>
                       {{data}}
                    </div>
                </li>
            </ul>


            <div :class = '[(give == 1?"open":"close"),("control")]'>
            	<ul>
            		<li>加分 :<input type="text" placeholder="输入分数"><b @click = 'give == 0 ? give = 1 : give = 0'>确定</b></li>
            		<li>减分 :<input type="text" placeholder="输入分数"></li>
            	</ul>
            </div>
            
        </div>
        <footer>

        	<div v-if='speak == 0'>
                <img src="../../img/chart_Room1.png" @touchend='speak = 1'>
                <span>按住 说话</span>
            </div>

            <div v-if='speak == 1'>
                <img src="../../img/724876052125097875.png" @touchend='speak = 0'>
                <form action="#">
                  <input type="text" v-model='txt'/>
                  <span @click='textPush'>发送</span>
                </form>
            </div>
        </footer>
    </div>
</template>

<style lang='scss' scoped>

    @import '../../utils/baseVar.scss';

    .chartRoom {
        height: 100%;
        background: #ECEDF1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
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
                font-size:0.37037rem;
                img{
                	vertical-align: sub;
                    width:0.824074rem;
                    width:0.888889rem;
                }
                li:nth-of-type(2){
                   position:absolute;
                   left: 50%;
                   -webkit-transform: translate(-50%,-8%);
                      -moz-transform: translate(-50%,-8%);
                       -ms-transform: translate(-50%,-8%);
                        -o-transform: translate(-50%,-8%);
                           transform: translate(-50%,-8%);
                }
                li:nth-of-type(3){
                   position:absolute;
                   left:4.444444rem;
                }
                li:nth-of-type(4){
                   position:absolute;
                   left:4.074074rem;
                   font-size:0.462963rem;
                }
                li:first-child {
                    &>i {
                        display: inline-block;
                        width: 0.648148rem;
                        height: 0.509259rem;
                        background: $roomAll no-repeat;
                        background-position:-4.351852rem -1.481481rem ;
                        background-size: 5.555556rem;
                        position: relative;
                        top: 50%;
                        transform: translate(0%, -50%);
                        a {
                            padding: 0.259259rem 0.37037rem;
                        }
                    }
                }
                li:nth-of-type(6){
                	background:$chart01 no-repeat;
                    background-position:center;
                    background-size:2.388889rem 0.75rem;
                    padding-left: 0.111111rem;
                    width:2.388889rem;
                    line-height:0.740741rem;
                    position:absolute;
                    right:2rem;
                }
                
            }
        }
        
        .chart{
            flex: 1;
            width: 100%;
            background: #ECEDF1;
            padding: 0.25rem 0.37037rem;
            position: relative;
            overflow: hidden;
            font-size: 0.388889rem;
            box-sizing: border-box;
            overflow-y: auto;
            overflow-x: hidden;
            li{
                text-align: left;
                // padding-bottom: 20px;
                position:relative;
            	.test{max-width:5.555556rem; padding:0.277778rem 0.185185rem; border:0.027778rem solid #E4E3E8; position:relative;border-radius:0.185185rem;padding-left:0.185185rem;}
                .test span{width:0; height:0; font-size:0; overflow:hidden; position:absolute;}
                .test span.bot{
                    border-width:0.185185rem; 
                    border-style:solid dashed dashed; 
                }

            }
            li:before,li:after {
                content: "";
                display: block;
                clear: both;
            }
            .chart{
            	width:100%;
            }
            .left{
                img{
                    float:left;
                }
                .test{
                    background-color:white;
                    float:left;
                    left:0.462963rem;
                    top:0.277778rem;
                }
                .test span.bot{
                    border-color:transparent white transparent transparent; 
                    left:-0.37037rem;
                    bottom:0.37037rem;
                }
            }
            .right{
                color: white;
                img{
                    float:right;
                }
                .test{
                    background-color:#07AD05;
                    bottom:-0.185185rem;
                    float:right;
                    right:0.277778rem;
                }
                .test span.bot{
                    border-color:transparent  transparent transparent #07AD05; 
                    right:-0.351852rem; 
                    top:0.37037rem;
                    
                }
            }

            .control{
            	overflow:hidden;
            	box-shadow: 0.009259rem 0.009259rem 0.185185rem #A9A9AB;
            	width:100%;
            	height:0.0rem;
            	position:absolute;
            	left:0.0rem;
            	top:0.0rem;
            	background-color:white;
            	font-size:0.407407rem;
            	text-align:left;
            	li{

            		margin-top: 0.277778rem;
            		margin-left:0.574074rem;
            		font-weight:bold;
            		input{
            		height:0.722222rem;
            		line-height:0.722222rem;
            		width:3.185185rem;
            		margin-left:0.277778rem;
            		font-size:0.277778rem;
            		border:0.009259rem solid black;
            		padding-left:0.277778rem;
            		}
            		b{
            			float:right;
            			margin-right:0.333333rem;
            			color:#1C9ED9;
            			font-weight:normal;
            		}
            	}
            }
            .control.open{
            	height:2.611111rem;
            	transition: all 1s;
            }
            .control.close{
            	height:0.0rem;
            	transition: all 1s;
            }
        }
        .chart::-webkit-scrollbar {
            display: none;
        } 
        footer{
        	width: 100%;
        	height: 1.203704rem;
        	background-color: #F4F4F6;
            img{
                width:0.833333rem;
                height:0.833333rem;
            }
        	&>div{
                display: flex;
                align-items: baseline;
                flex-wrap: nowrap;
        		img{
                    height: 0.833333rem;
                    width: 0.833333rem;
        			margin:0 0.185185rem 0 0.185185rem;
        			padding-top: 0.185185rem;
        		}
                // 复用
                @mixin fuyon {
                    display:inline-block;
                    font-size:0.37037rem;
                    height:0.833333rem;
                    line-height:0.833333rem;
                    border:0.018519rem solid #DFDFE1;
                    text-align: center;
                    position:relative;
                    bottom:0.277778rem;
                    border-radius: 0.111111rem;
                    background-color:white;
                }
        		span{
        			@include fuyon;
                    flex: 1;
                    margin-right: 0.277778rem;
        		}
                form {
                    flex: 1;
                    position: relative;
                    bottom: 0.277778rem;
                    height: 0.833333rem;
                    input {
                        @include fuyon;
                        width: 75%;
                        text-align : left;
                        padding : 0 0.277778rem;
                        box-sizing: border-box;
                        bottom: 0.0rem;
                        outline: none;
                        border: none;
                    }
                    span {
                        @include fuyon;
                        bottom: 0.0rem;
                        width: 20%;
                        margin-right: 0.092593rem;
                    }
                }
                
        	}
        }
    }
</style>

<script type="text/javascript">
	import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    // [2,961109,961,0,112233] 路由数据案例
	export default {
        data: function(){
            return {
                chartList: '',      // 成员列表（群）
                lingth: 0,          // 成员人数（群）
                zn_chatid: 0,       // 群聊id（群）
                zn_name: '',        // 群名称 （群）
                speak: 1,           // 语音是0 输入是1 
                give: 0,            // 加减分
                roomstatus: 99,     // 0-客服  1-聊天（房主）  2-聊天（玩家） 3-群聊
                isfriend: 0,        // 是好友1  不是0
                roomNum: 1,         // 房间号
                roomid: 0,          // 房间id
                txt: '',            // 发送产生的文本
                id: localStorage.oxUid,   //个人id（单聊）
                sheId: 0,                 // 对方id（单聊）
                shename: '网络不好暂时无法显示',// 对方名字（单聊）
            }
        },
        beforeMount: function(){
            // 计算属性
            this.$store.getters.txt;
        },
        mounted: function(){
            var [self, id] = [this, this.id];
            this.$store.dispatch('webIM')   // 配置
            this.$store.dispatch('dl')      // 登录

            var params = JSON.parse(this.$route.params.id)  // 路由参数
            this.roomstatus = params[0];    // 状态
            if(params[0] == 3){         // 聊天室
                this.roomNum = params[1];       // 房间号
                this.roomid = params[2];        // 房间id
                this.zn_chatid = params[4];     // 群聊id
                this.chartList = `/chartList/${this.$route.params.id}`; // 群聊列表
                qunliao()

            } 

            else if(params[0] == 2){    //  个人
                if (params[1] > 99999) {    // 群聊室找群主的
                    this.roomNum = params[1];       // 房间号
                    this.zn_name = params[4];     // 房间名字
                    this.sheId = params[2];         // 房主id
                };
                
            }
            if ( params[0] == 1 || params[0] == 2 ) {   // 确定聊天位置
                self.$store.state.txt = JSON.parse(localStorage.oxTxtAll)  || '';
            }
            
            function qunliao() {
                self.list()                                 // 请求群员
                 
                var a = JSON.parse(localStorage.oxQun)
                if(!a[`${self.zn_chatid}`]){
                    a[`${self.zn_chatid}`] = {}
                }
                localStorage.oxQun = JSON.stringify(a)
                self.$store.state.txt = JSON.parse(localStorage.oxQun) || '';

                var options2 = {                        // 获取用户加入的群组列表
                    success: function (resp) {
                        console.log("Response: ", resp)
                    },
                    error: function (e) {
                        console.log(e)
                    }
                }
                conn.getGroup(options2); 

                var addGroupMembers = function () {     // 加入群聊
                    var option3 = {
                        list: ['hz_niuniu_'+localStorage.oxUid],
                        roomId: self.zn_chatid,
                    };
                    conn.addGroupMembers(option3);
                };
                addGroupMembers()   // 群聊

            }

            // 储存聊天记录
            this.$store.state.obj = {
                myId: "hz_niuniu_"+id,
                toId: "hz_niuniu_961",
                pageSize: 10,
                p: 1,
                d_q: 'chat',
                type: [{      //消息bodies 
                    "msg": "test",//消息内容
                    "type": "txt",//文本消息类型
                }],
                time: new Date().getTime(),
                msg_id: conn.getUniqueId(),
                style: 2,
                TAname: '^(*￣(oo)￣)^',
            };
            // this.$store.dispatch('webKeep')
            // this.$store.dispatch('webRecord')
            var timeD = setTimeout(function(){
                var chat = document.getElementById("txtbox");
                chat.scrollTop = chat.scrollHeight;
                clearTimeout(timeD)
            },100)

            self.$store.state.txtType = self.zn_chatid;
        },
        beforeUpdated: function(){
            console.log(this.$store.state.txt)
        },
        updated: function(){
            // 计算属性
            this.$store.getters.txt
            var chat = document.getElementById("txtbox");
            chat.scrollTop = chat.scrollHeight;
        },
        methods: {
            // 发送文本
            textPush () { 
                var self = this;
                var type = this.roomstatus;  // 0-客服  1-聊天（房主）  2-聊天（玩家） 3-群聊

                
                var sendPrivateText = function () {
                    var id = conn.getUniqueId();                  // 生成本地消息id
                    var msg = new WebIM.message('txt', id);      // 创建文本消息
                    msg.set({
                        msg: self.txt,          // 消息内容
                        to: 'hz_niuniu_962',   // 接收消息对象（用户id） 13450266666
                        roomType: false,
                        success: function (id, serverMsgId) {
                            // 本地消息储存
                            var a = JSON.parse(localStorage.oxTxtAll)
                            var date = new Date().getTime();

                            if(a["hz_niuniu_"+self.id]){
                                a["hz_niuniu_"+self.id][date] = self.txt;
                            } else {
                                a["hz_niuniu_"+self.id] = {};
                                a["hz_niuniu_"+self.id][date] = self.txt;
                            }
                            self.$store.state.txt = a;
                            localStorage.oxTxtAll = JSON.stringify(a);
                            self.txt = '';
                        },
                        fail: function(e){
                            console.log("失败回调");
                            self.txt = '';
                        }
                    });
                    msg.body.chatType = 'singleChat';
                    conn.send(msg.body);// 单聊发送文本消息
                };
                
                var sendGroupText = function () {
                    var id = conn.getUniqueId();            // 生成本地消息id
                    var msg = new WebIM.message('txt', id); // 创建文本消息
                    var option = {
                        msg: self.txt,             // 消息内容
                        to: self.zn_chatid,        // 接收消息对象(群组id)
                        roomType: false,
                        chatType: 'chatRoom',
                        success: function () {
                            self.$store.state.txtType = self.zn_chatid;
                            // 本地消息储存
                            var a = JSON.parse(localStorage.oxQun)
                            var qid = self.zn_chatid;
                            var date = new Date().getTime();

                            if(!a[qid]){
                                a[qid] = {}
                            }

                            // console.log('群聊信息发送成功');
                            if(a[qid]["hz_niuniu_"+self.id]){
                                a[qid]["hz_niuniu_"+self.id][date] = self.txt;
                            } else {
                                a[qid]["hz_niuniu_"+self.id] = {};
                                a[qid]["hz_niuniu_"+self.id][date] = self.txt;
                            }
                            self.$store.state.txt = a;
                            localStorage.oxQun = JSON.stringify(a);
                            self.txt = '';
                        },
                        fail: function () {
                            console.log('群聊信息发送失败');
                            self.txt = '';
                        }
                    };
                    msg.set(option);
                    msg.setGroup('groupchat');
                    conn.send(msg.body);// 群聊发送文本消息
                };

                if ( type == 1 || type == 2 ) {
                    this.$store.state.txt = JSON.parse(localStorage.oxTxtAll)
                    sendPrivateText()
                } else if ( type == 3 ) {
                    this.$store.state.txt = JSON.parse(localStorage.oxQun)
                    sendGroupText()
                }
                
            },
            list () {   // 玩家数量
                var self = this;
                http.post('/RoomJoin/getJoinRoomList',{
                    p: 1,
                    pagesize: 100,
                    roomid: this.roomid,
                })
                .then(res => {
                    if(res.status == 1){
                        self.lingth =  Object.values(res.data).length-1;
                    }
                })
            },
            


        }
                
            
    }
</script>