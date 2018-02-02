import Vue from 'vue';
import Vuex from 'vuex';
import http from '../utils/httpClient.js';
import bad from './badDict.js';

Vue.use(Vuex);

export default new Vuex.Store({
    // 字符串数据存储
    // 使用demo : this.$store.state.initRoom.oxK
    state: {
        name:666,
        // 用户信息
        self: {
            userName: '',
            userID: '',
            userImg: '',
            addtype: 0, // 加分状态
        },
        // 默认数据
        initRoom: {
            ox: ['牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花牛'],
            radioValue: ['比J', '比Q', '比K', '无牛关机 (庄赢)'],
            oxK: '比Q',
            time: [30, 60, 120, 180, 300, 480],
            miss: ['秒', '分钟'],
            oxNumber: [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 5, 10],
            // 一个中文两个字节
            nameLenth: 16,
            // 最低上分数
            minG: 5000,
        },
        idRoom: {
            id: 0,              // 房间id
            room_id: 0,         // 房间number
            roomName: '',       // 房间名字
            oxK: '',            // 比什么
            scope: [1,100],     // 下注范围
            oxNumber: [],       // 倍率
            time: 30,           // 押注时间  
            open: false,        // 是否开放
            newMan: false,      // 新人确认
            cardFn: 0,          // 玩法（几副牌）
            room: 'bell',       // 房间计费方式
            scale: 1,           // 抽水比例
            minGrade: 100,      // 最小上庄分数
            zn_chatid: 0,       // 群聊号码
            ju: '',              // 上庄局数
            ForT: 0,            // 是否房主
            message:'',             //房间公告
        },
        placard:{
             message:'健康游戏，请勿赌博，谢谢合作',             //房间公告
        },
        time: {
            initTime: 6,    // 游戏初始化准备时间
            random: 3,      // 游戏选择庄牌时间
            speed: 80,      // 随机背景的速度
            endTime: 5,     // 庄开牌后等待时间
            countTime: 10,  // 剩下全开倒计时
        }, //基础时间设置
        // 设置值
        setRoom: {},
        badDict: bad,
        // 聊天辅助
        txt: '',
        txtType: 0,     // 聊天分类头
        txt_idx: [],
        txt_time: [],
        // 消息传递
        obj: '',
        data: {
            DT: [],     // 大厅数据
            DTtime: 0,  // 大厅数据存放时间
            DTtimeos: 2000,// 延迟时间，防止到底后无限请求
            DTpage: 1,      // 大厅页数
            DTid: [],    // 房间id,防重复ID
            MYkai: [],   // 我开过的房间
            MYkaiid: [],  // id,防止重复渲染
            MYjoin: [],     // 我进过的房间
            MYjoinid: [], // id,防止重复渲染
            zhaoFZ: [],     // 找房主聊天的人，排队盒子

            Room: {},      // 房间数据
            Ztype : {},     // 房间内，庄的数据

            Zlist: [],     // 申请庄的列表
            apptype: 0,     // 1 上庄成功 0 没上庄

            listOver: [],   // 所有游戏结果
            juAll: 0,      // 房间总局数
        },   // 存放各种数据避免重复请求
        systemMess:{
            title :'', //信息标题
            content : '', //信息内容
            time :'', //信息时间
        }
    },
    // 属性计算
    // 使用demo ：this.$store.getters.doneTodos
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        txt: state => {
            if(localStorage.oxTxtAll){
                var [t, arrTime, arr, arr2de, count, tCount]=[[], [], [], [], 0, 0];
                var type = state.txtType;
                // console.log(state.txt)
                var txt = state.txt[type];      // 筛选要搞的东西
                
                var woid = 'hz_niuniu_'+localStorage.oxUid;
                for(var and in txt){
                    if(and == woid){
                        t[0] = txt[and];
                    } else {
                        tCount++;
                        t[tCount] = txt[and];
                    }
                }
                // 计算时间轴
                t.forEach(function(item){
                    count++;
                    for(var an in item){
                        if(arrTime.length == 0){
                            arrTime.push(an)
                            arr.push(item[an])
                            arr2de.push(-1)
                        } else {
                            var i = 0;
                            ! function duibi(){
                                if(an <= arrTime[i]){
                                    i++;
                                    duibi()
                                } else if(an > arrTime[i]){
                                    var a = count >= 2 ? i : -1; // i是对方，-1是自己right
                                    arrTime.splice(i, 0, an)
                                    arr.splice(i, 0, item[an])
                                    arr2de.splice(i, 0, a)
                                }
                            } ()
                        }
                    }
                })
                state.txt = arr.reverse();
                // console.log(state.txt)
                state.txt_idx = arr2de.reverse();
                state.txt_time = arrTime.reverse();
            }
        }
    },
    // 方法，mutations必须同步执行 onCreateGroup
    // 使用demo : this.$store.commit('increment')
    mutations: {
        increment (state) {
            // 变更状态
        },
        ls () {   // 历史history
            history.back()
        },
    },
    // 这里的方法可异步执行
    // 使用demo : this.$store.dispatch('aaa')
    actions: {
        increment ( { commit } ) {
            setTimeout(() => {
                // commit('increment')
                console.log('异步成功')
            }, 1000)
        },
        aaa () {
            var obj = this.state.obj;
            console.log(obj)
            console.log(a)
        },
        webIM () {
            var self = this;
            conn.listen({
            onOpened: function ( message ) {            
                // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
                // 则无需调用conn.setPresence();
                console.log('%c [opened] 已经成功建立连接', 'color: green')
            },  //连接成功回调
            onClosed: function ( message ) {},//连接关闭回调
            onTextMessage: function ( message ) { 
                //在这里接收和处理信息，根据message.type区分消息来源，私信或者群聊或聊天室
                console.log(message)
                console.log(message.type)
                if(message.sourceMsg == ""){
                    return false;
                }
                if (message.type == 'groupchat') {  // 群聊
                    var qunid = message.to;         // 群id
                    var an = JSON.parse(localStorage.oxQun)
                    
                    if(!an[qunid]){
                        an[qunid] = {}
                    }
                    
                    // var a = an[qunid];
                    var date = new Date().getTime();
                    if(an[qunid][message.from]){
                        an[qunid][message.from][date] = message.data;
                    } else {
                        an[qunid][message.from] = {};
                        an[qunid][message.from][date] = message.data;
                    }
                    self.state.txt = an;
                    localStorage.oxQun = JSON.stringify(an)
                } 


                else if (message.type == 'chat' ){      // 单聊
                    
                    var fanid = self.state.idRoom.id;
                    var a = JSON.parse(localStorage.oxTxtAll)
                    var o = message.from    // 来自谁
                    var date = new Date().getTime();
                    if(!a[o]){
                        a[o] = {}
                    }
                    if(a[o][message.from]){
                        a[o][message.from][date] = message.data;
                    } else {
                        a[o][message.from] = {};
                        a[o][message.from][date] = message.data;
                    }
                    self.state.txt = a;
                    // console.log(a)
                    localStorage.oxTxtAll = JSON.stringify(a)

                    if(self.state.idRoom.ForT == 1){    // 只有是房主
                        var nu = o.slice(10)
                        if(self.state.data.Room[fanid+'id'].indexOf(nu) >= 0){  // 在房间内
                            if(self.state.data.zhaoFZ.indexOf(nu) < 0){
                                self.state.data.zhaoFZ.push(nu) // 呼叫房主等待页面
                            }
                        }
                    }
                }


                
            },//收到文本消息
            onEmojiMessage: function ( message ) {
                console.log('Emoji')
                let data = message.data;
                for (let i = 0; i < data.length; i++ ) {
                    console.log(data[i])
                }
            },   //收到表情消息
            onPictureMessage: function ( message ) {
                console.log('Picture')
                let options = { url: message.url }
                options.onFileDownloadComplete = function () {
                    //图片下载成功
                    console.log('image download complete!')
                }
                options.onFileDownloadError = function () {
                    //图片下载成功
                    console.log('Image download failen!')
                }
                Vue.prototype.$WebIM.utils.download.call(Vue.prototype.$imConn, options)
            }, //收到图片消息
            onCmdMessage: function ( message ) {},     //收到命令消息
            onAudioMessage: function ( message ) {},   //收到音频消息
            onLocationMessage: function ( message ) {},//收到位置消息
            onFileMessage: function ( message ) {},    //收到文件消息

            onVideoMessage: function (message) {
                var node = document.getElementById('privateVideo');
                var option = {
                    url: message.url,
                    headers: {
                      'Accept': 'audio/mp4'
                    },
                    onFileDownloadComplete: function (response) {
                        var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                        node.src = objectURL;
                    },
                    onFileDownloadError: function () {
                        console.log('File down load error.')
                    }
                };
                WebIM.utils.download.call(conn, option);
            },   //收到视频消息
            onPresence: function ( message ) {
                // console.log(message)
            },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
            onRoster: function ( message ) {
                console.log('Roster')
                console.log(message)
            },         //处理好友申请
            onInviteMessage: function ( message ) {
                console.log(message)
            },  //处理群组邀请
            onOnline: function () {},                  //本机网络连接成功
            onOffline: function () {},                 //本机网络掉线
            onError: function ( message ) {},          //失败回调
            onBlacklistUpdate: function (list) {       //黑名单变动
                // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                console.log(list);
            },
            onReceivedMessage: function(message){},    //收到消息送达服务器回执
            onDeliveredMessage: function(message){},   //收到消息送达客户端回执
            onReadMessage: function(message){},        //收到消息已读回执
            onCreateGroup: function(message){
                console.log('%c [opened] 群组创建成功', 'color: yellow')
            },        //创建群组成功回执（需调用createGroupNew）
            onMutedMessage: function(message){}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
            });
        },
        dl () {
            var dlCount = 0;
            var id = localStorage.oxUid || 0
            var options = {         // 自动登录
                apiUrl: WebIM.config.apiURL,
                user: 'hz_niuniu_'+id,
                pwd: '123456',
                appKey: WebIM.config.appkey,
                success: function () {
                    // console.log('登录成功')
                },
                error: function (aa) {
                    dlCount++;
                    console.log('登录失败')
                    if(dlCount < 5){
                        var time = setTimeout(function(){
                            conn.open(options);
                            clearTimeout(time)
                        },2000)
                    } else {
                        alert('网络状态差,无法连接')
                    }
                }
            };
            conn.open(options);
        },
        // 调取用户聊天记录 page分页数 p当前页
        // {myId, toId, page, p}
        webRecord () {
            var obj = this.state.obj;
            http.post( '/Chat/getChatList', {
                        formid: obj.myId,
                        toid: obj.toId,
                        pagesize: obj.pageSize,
                        p: obj.p,
                    }, '', this )
                .then(res => {
                    console.log(res)
            })
        },
        // 保存聊天记录
        //chat: 单聊；groupchat: 群聊
        // type:
        //[{      //消息bodies 
        //     "msg":"hello from test2",//消息内容
        //     "type":"txt"//文本消息类型
        // }],
        webKeep () {
            var obj = this.state.obj;
            console.log(obj)
            http.post( '/Chat/createChat', {
                        zc_from: obj.myId, // 自己的id
                        zc_to: obj.toId, // 聊天对象id
                        zc_chat_type: obj.d_q,//单聊
                        zc_bodies: obj.type, 
                        zn_timestamp: obj.time,// 消息时间
                        zc_msg_id: obj.msg_id, // 消息id
                        zn_way: obj.style, // 方式 1 接收， 0 发送
                        zn_toname: obj.TAname,
                    }, '', this )
                .then(res => {
                    console.log(res)
            })
        },
      

      
   },
   // module看文档，数据繁杂时使用。
})


