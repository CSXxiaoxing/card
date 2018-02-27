  <!-- 群聊 -->
  <template>
    <div class='chartRoom'> 
        <!-- 消息通知 -->
        <mt-popup  
            v-model="careTip"
            popup-transition="popup-fade"
            class="care" >
            <span>通知 <i @click="careTip = false">×</i></span>
            <p>{{errorTips}}</p>
            <mt-button @click="careTip = false">  确定
            </mt-button>
        </mt-popup >

    	<header>
            <ul>
                <li>
                    <i><a @click='$store.commit("ls")'></a></i>
                </li>
                <li>聊天室（{{lingth*1+1}}）</li>
                <li>
                    <router-link :to="chartList" >
                    <img src="src/img/chart_Room7.png" alt="">
                    </router-link>
                </li>
            </ul>
        </header>
        <div class='chart'  id='txtbox'>
            <ul v-if='roomstatus == 3'>
                <!-- 群聊 -->
                <li v-for="(data, idx) in (roomstatus == 3 ? $store.state.txt : '')" 
                :class="$store.state.txt_idx[idx] >=0 ? 'left' : 'right'"   :key = '$store.state.txt_time[idx]' v-if='data != ""'>
                    <img :src="$store.state.txt_idx[idx] >=0 ? 'src/img/home_head.png' : 'src/img/room03.png'">
                    <div class="test">
                        <span class="bot"></span>
                       {{data}}
                    </div>
                </li>
            </ul>
        </div>

        <footer>
        	<div v-if='speak == 0'>
                <img src="src/img/chart_Room1.png" @touchend='speak = 1'>
                <span @touchstart='audio(1)' @touchend='audio(0)'>按住 说话</span>
            </div>
            <div v-if='speak == 1'>
                <img src="src/img/724876052125097875.png" @touchend='speak = 0'>
                <form action="#">
                  <input type="text" v-model='txt'/>
                  <span @click='textPush'>发送</span>
                </form>
            </div>
        </footer>
        <loading v-if='loading'></loading>
    </div>
</template>

<style lang='scss' scoped>

    @import '../../utils/baseVar.scss';

    .chartRoom {
        height: 100%;
        width: 100%;
        position:fixed;
        left:0;
        top:0;
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
                font-size:0.4rem;
                position: relative;
                img{
                	vertical-align: sub;
                    width:0.824074rem;
                    width:0.888889rem;
                }
                li:nth-of-type(2) {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    -webkit-transform: translate(-50%,-50%);
                       -moz-transform: translate(-50%,-50%);
                        -ms-transform: translate(-50%,-50%);
                         -o-transform: translate(-50%,-50%);
                            transform: translate(-50%,-50%);
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
                        top: 0.402963rem;
                        -webkit-transform: translate(0%, -50%);
                           -moz-transform: translate(0%, -50%);
                            -ms-transform: translate(0%, -50%);
                             -o-transform: translate(0%, -50%);
                                transform: translate(0%, -50%);
                        a {
                            padding: 0.259259rem 0.37037rem;
                        }
                    }
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
                position: relative;
            }
            .left{
                img{
                    float: left;
                    width: 1.388889rem;
                    height: 1.435185rem;
                }
                .test{
                    background-color:white;
                    float: left;
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
                    float: right;
                    width: 1.388889rem;
                    height: 1.435185rem;
                }
                .test{
                    background-color:#07AD05;
                    bottom:-0.185185rem;
                    float: right;
                    right:0.277778rem;
                }
                .test span.bot{
                    border-color:transparent  transparent transparent #07AD05; 
                    right:-0.351852rem; 
                    top:0.37037rem;
                    
                }
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

    .addFriend{
        width: 7.092593rem;
        @include border-radius(0.277778rem);
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
          background-size:8.87037rem 1.805556rem;
          background-position: center;
          text-align: center;
          position: relative;
          right: 0.87037rem;
          bottom: 0.4rem;
        }

        p{
          input{
              @include border-radius(0.092593rem);
              height:0.925926rem;
              line-height:0.740741rem;
              font-size:0.462963rem;
              width:4.62963rem;
              position:relative;
              padding-left:0.185185rem;
              bottom:0.5rem;
              text-align: left;
          }
          
        }
        button{
          width:2.777778rem;
          height: 1.0rem;
          line-height:0.925926rem;
          @include border-radius(0.509259rem);
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
</style>

<script type="text/javascript">
	import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import loading from '../loading/loading.vue';
    Vue.component('loading', loading)
    // [2,961109,961,0,112233] 路由数据案例 // open
	export default {
        data: function(){
            return {
                loading: false,     // loading
                careTip : false,    // 提示窗
                errorTips: '',      // 错误提示

                chartList: '',      // 成员列表（群）
                lingth: 0,          // 成员人数（群）
                zn_chatid: 0,       // 群聊id（群）
                zn_name: '',        // 群名称 （群）
                speak: 1,           // 语音是0 输入是1 

                roomstatus: 99,     // -------群聊
                isfriend: 0,        // 是好友1  不是0
                roomNum: 1,         // 房间号
                roomid: 0,          // 房间id
                txt: '',            // 发送产生的文本
                id: localStorage.oxUid,   //个人id（单聊）
                sheId: 0,                 // 对方id（单聊）

                toid: 0,                        // 对方的uid
            }
        },
        beforeMount: function(){
            this.$store.getters.txt;    // 计算属性
        },
        mounted: function(){
            var [self, id] = [this, this.id];
            this.$store.dispatch('webIM')   // 配置
            this.$store.dispatch('dl')      // 登录

            console.log(HTML_R)
            console.log(as)

            var params = JSON.parse(this.$route.params.id)  // 路由参数
            
            if(params[0] == 3){         // 聊天室
                this.roomNum = params[1];       // 房间号
                this.roomid = params[2];        // 房间id
                this.zn_chatid = params[4];     // 群聊id
                this.chartList = `/chartList/${this.$route.params.id}`; // 群聊列表
                qunliao()
            }
            else if(params[0] == 2 || params[0] == 1){    //  个人
                if (params[1] > 12345 || params[1] == 10086) {    // 群聊室找群主的或者玩家之间
                    this.roomNum = params[1];       // 房间号
                    this.zn_name = params[4];     // 房间名字
                    this.sheId = params[2];         // 房主id or 玩家聊天

                    http.post('/MemberFriend/getFriend',{
                        id : params[2],
                    })
                    .then(res => {
                        if(res.status == 1){
                            self.shename = res.data.zc_nickname
                        }
                        self.$store.state.txtType = "hz_niuniu_"+self.sheId;     // 聊天状态头
                        self.textPush() // 先发送一波
                    })
                }
            }
            if ( params[0] == 1 || params[0] == 2 ) {   // 确定聊天位置
                self.$store.state.txt = JSON.parse(localStorage.oxTxtAll)  || '';
            }
            
            function qunliao() {
                self.list()                                 // 请求群员
                var a = JSON.parse(localStorage.oxQun)
                if(!a[`${self.zn_chatid}`]){
                    a[`${self.zn_chatid}`] = {}
                    self.textPush() // 先发送一波
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

                self.$store.state.txtType = self.zn_chatid; // 聊天状态头
            }

            // 储存聊天记录
            this.$store.state.obj = {
                myId: "hz_niuniu_"+id,
                toId: "hz_niuniu_"+self.sheId,
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
            },200)
        },
        beforeUpdated: function(){
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
                // 群聊发送文本消息
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
                    conn.send(msg.body);
                };

                // 群聊发送音频消息
                var sendPrivateAudio = function () {
                    var id = conn.getUniqueId();                   // 生成本地消息id
                    var msg = new WebIM.message('audio', id);      // 创建音频消息
                    var input = document.getElementById('audio');  // 选择音频的input
                    var file = WebIM.utils.getFileUrl(input);      // 将音频转化为二进制文件
                    var allowType = {
                        'mp3': true,
                        'amr': true,
                        'wmv': true
                    };
                    if (file.filetype.toLowerCase() in allowType) {
                        var option = {
                            apiUrl: WebIM.config.apiURL,
                            file: file,
                            to: self.zn_chatid,                   // 接收消息群组
                            roomType: false,
                            chatType: 'singleChat',
                            onFileUploadError: function () {      // 消息上传失败
                                console.log('onFileUploadError');
                            },
                            onFileUploadComplete: function () {   // 消息上传成功
                                console.log('onFileUploadComplete');
                            },
                            success: function () {                // 消息发送成功
                                console.log('Success');
                            },
                            flashUpload: WebIM.flashUpload
                        };
                        msg.set(option);
                        conn.send(msg.body);
                    }
                };

                this.$store.state.txt = JSON.parse(localStorage.oxQun)
                sendGroupText()
            },
            startRecord: function(AUDIO_TYPE){
                // 开始录音
                var r = HTML_R;
                if ( r == null ) {
                    alert( '录音对象未获取' );
                    return;
                }
                r.record( {filename:"./_doc/audio/"}, function (p) {
                    // alert( "Audio record success!" );
                    console.log(p)
                    // r.stop();
                }, function ( e ) {
                    console.log(JSON.stringify(e))
                    console.log(e.message)
                    alert( "Audio record failed: " + e.message );
                    // r.stop(); 
                } );
            },
            audio: function(AUDIO_TYPE){
                
                function startRecord() {
                    if ( r == null ) {
                        alert( '录音对象未获取' );
                        return;
                    }
                    r.record( {filename:"./_doc/audio/"}, function (p) {
                        // alert( "Audio record success!" );
                        console.log(p)
                        // r.stop();
                    }, function ( e ) {
                        console.log(JSON.stringify(e))
                        console.log(e.message)
                        alert( "Audio record failed: " + e.message );
                        // r.stop(); 
                    } );
                }
                function stopRecord() {
                    r.stop(); 
                }
                
                // type判断
                if(AUDIO_TYPE == 1){
                    startRecord()
                    console.log("点击")
                } else if(AUDIO_TYPE == 0){
                    stopRecord()
                    console.log("离开")
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
                        self.lingth =  res.data.count;
                    }
                })
            },
        }
                
            
    }
</script>