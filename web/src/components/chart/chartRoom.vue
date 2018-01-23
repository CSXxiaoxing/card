  <template>
    <div class='chartRoom'>
    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li v-show='roomstatus == 1 || roomstatus == 2'>{{$store.state.test}}</li>
                <li v-show='roomstatus == 0'>联系客服</li>
                <li v-show='roomstatus == 3'>聊天室（5）</li>
                <li v-show='roomstatus == 3'><img src="../../img/chart_Room7.png" alt=""></li>
                <li  v-show='roomstatus == 1 && a == 1'  @click = 'give == 0 ? give = 1 : give = 0'>给他＋/－分</li>
                <li v-show='(roomstatus == 1 || roomstatus == 2)&& isfriend == 0'><img src="../../img/chart_Room5.png" alt="">加友</li>
            </ul>
        </header>
        <div class='chart'  id='txtbox'>
            <ul>
                <!-- 对方 -->
                <li  v-for="(data, idx) in $store.state.txt" 
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
    .chartRoom {
        height: 100%;
        background: #ECEDF1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        header {
            height: 202px;
            padding: 110px 30px 0px;
            box-sizing: border-box;
            background: #2F2E34;
            color: #fff;
            ul {
                height: 86px;
                line-height: 86px;
                display: flex;
                justify-content: space-between;
                font-size:40px;
                img{
                	vertical-align: sub;
                }
                li:nth-of-type(2){
                   position:absolute;
                   left:150px;
                }
                li:nth-of-type(3){
                   position:absolute;
                   left:480px;
                }
                li:nth-of-type(4){
                   position:absolute;
                   left:440px;
                   font-size:50px;
                }
                li:first-child {
                    &>i {
                        display: inline-block;
                        width: 70px;
                        height: 55px;
                        background: url('../../img/room_all.png') -470px -160px no-repeat;
                        background-size: 600px;
                        position: relative;
                        top: 50%;
                        transform: translate(0%, -50%);
                        a {
                            padding: 28px 40px;
                        }
                    }
                }
                li:nth-of-type(6){
                	background:url('../../img/chart_Room6.png') no-repeat;
                    background-position:center;
                    padding-left: 12px;
                    width:258px;
                    line-height:80px;
                    position:absolute;
                    right:180px;
                }
                
            }
        }
        
        .chart{
            flex: 1;
            width: 100%;
            background: #ECEDF1;
            padding: 27px 40px;
            position: relative;
            overflow: hidden;
            font-size: 42px;
            box-sizing: border-box;
            overflow-y: auto;
            overflow-x: hidden;
            li{
                text-align: left;
                // padding-bottom: 20px;
                position:relative;
            	.test{max-width:600px; padding:30px 20px; border:3px solid #E4E3E8; position:relative;border-radius:20px;padding-left:20px;}
                .test span{width:0; height:0; font-size:0; overflow:hidden; position:absolute;}
                .test span.bot{
                    border-width:20px; 
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
                    left:50px;
                    top:30px;
                }
                .test span.bot{
                    border-color:transparent white transparent transparent; 
                    left:-40px;
                    bottom:40px;
                }
            }
            .right{
                color: white;
                img{
                    float:right;
                }
                .test{
                    background-color:#07AD05;
                    bottom:-20px;
                    float:right;
                    right:30px;
                }
                .test span.bot{
                    border-color:transparent  transparent transparent #07AD05; 
                    right:-38px; 
                    top:40px;
                    
                }
            }

            .control{
            	overflow:hidden;
            	box-shadow: 1px 1px 20px #A9A9AB;
            	width:100%;
            	height:0px;
            	position:absolute;
            	left:0px;
            	top:0px;
            	background-color:white;
            	font-size:44px;
            	text-align:left;
            	li{

            		margin-top: 30px;
            		margin-left:62px;
            		font-weight:bold;
            		input{
            		height:78px;
            		line-height:78px;
            		width:344px;
            		margin-left:30px;
            		font-size:30px;
            		border:1px solid black;
            		padding-left:30px;
            		}
            		b{
            			float:right;
            			margin-right:36px;
            			color:#1C9ED9;
            			font-weight:normal;
            		}
            	}
            }
            .control.open{
            	height:282px;
            	transition: all 1s;
            }
            .control.close{
            	height:0px;
            	transition: all 1s;
            }
        }
        .chart::-webkit-scrollbar {
            display: none;
        } 
        footer{
        	width: 100%;
        	height: 130px;
        	background-color: #F4F4F6;
        	&>div{
                display: flex;
                align-items: baseline;
                flex-wrap: nowrap;
        		img{
                    height: 90px;
                    width: 90px;
        			margin:0px 20px 0px 20px;
        			padding-top: 20px;
        		}
                // 复用
                @mixin fuyon {
                    display:inline-block;
                    font-size:40px;
                    height:90px;
                    line-height:90px;
                    border:2px solid #DFDFE1;
                    text-align: center;
                    position:relative;
                    bottom:30px;
                    border-radius: 12px;
                    background-color:white;
                }
        		span{
        			@include fuyon;
                    flex: 1;
                    margin-right: 30px;
        		}
                form {
                    flex: 1;
                    position: relative;
                    bottom: 30px;
                    height: 90px;
                    input {
                        @include fuyon;
                        width: 75%;
                        text-align : left;
                        padding : 0 30px;
                        box-sizing: border-box;
                        bottom: 0px;
                        outline: none;
                        border: none;
                    }
                    span {
                        @include fuyon;
                        bottom: 0px;
                        width: 20%;
                        margin-right: 10px;
                    }
                }
                
        	}
        }
    }
</style>

<script type="text/javascript">
	import Vue from 'vue';
    import http from '../../utils/httpClient.js';

	export default {
        data: function(){
            return {
            	a: this.$route.params.id,
                speak: 1,         // 语音是0 输入是1 
            	give: 0,         // 加减分
                roomstatus:1,   // 客服0  聊天（房主）1  聊天（玩家）2 群聊3
                isfriend:0,    // 是好友1  不是0
                txt: '',      //发送产生的文本
                id: localStorage.oxUid,   //个人id
            }
        },
        beforeMount: function(){
            // 计算属性
            this.$store.getters.txt;
        },
        mounted: function(){
            let id = this.id;
            this.$store.dispatch('webIM')

            // 自动登录
            var options = { 
                apiUrl: WebIM.config.apiURL,
                user: 'hz_niuniu_'+id,
                pwd: '123456',
                appKey: WebIM.config.appkey,
                success: function () {
                    console.log('登录成功')
                },
                error: function (aa) {
                    console.log('登录失败')
                    var time = setTimeout(function(){
                        conn.open(options);
                        clearTimeout(time)
                    },2000)
                }
            };
            conn.open(options);
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
                let self = this;
                // 单聊发送文本消息
                var sendPrivateText = function () {
                    var id = conn.getUniqueId();                  // 生成本地消息id
                    var msg = new WebIM.message('txt', id);      // 创建文本消息

                    msg.set({
                        msg: self.txt,          // 消息内容
                        to: 'hz_niuniu_961',   // 接收消息对象（用户id） 13450266666
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
                            localStorage.oxTxtAll = JSON.stringify(a)
                            self.txt = '';
                        },
                        fail: function(e){
                            console.log("失败回调");
                            self.txt = '';
                        }
                    });
                    msg.body.chatType = 'singleChat';
                    conn.send(msg.body);
                };
                sendPrivateText()
            },



        }
                
            
    }
</script>