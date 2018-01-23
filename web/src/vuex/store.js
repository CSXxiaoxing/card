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
            fen: 100000,
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
        time: {
            // 游戏初始化准备时间
            initTime: 0,
            // 游戏选择庄牌时间
            random: 1,
        }, //基础时间设置
        // 设置值
        setRoom: {},
        badDict: bad,
        // 消息记录
        txt: JSON.parse(localStorage.oxTxtAll),
        txt_idx: [],
        txt_time: [],
        // 消息传递
        obj: '',
    },
    // 属性计算
    // 使用demo ：this.$store.getters.doneTodos
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        txt: state => {
            console.log(state.txt)
            console.log(Object.values(state.txt))
            var t = Object.values(state.txt)
            // 计算时间轴
            var arrTime = [];
            var arr = [];
            var arr2de = [];
            var count = 0;
            t.forEach(function(item){
                count++;
                for(var an in item){
                    // console.log(an)
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
            // console.log(arr)
            // console.log(arr2de)
            state.txt = arr.reverse();
            state.txt_idx = arr2de.reverse();
            state.txt_time = arrTime.reverse();
        }
   },
   // 方法，mutations必须同步执行
   // 使用demo : this.$store.commit('increment')
   mutations: {
      increment (state) {
         // 变更状态
      }
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
                // localStorage.oxTxtAll[message.to] = message.data;
                var a = JSON.parse(localStorage.oxTxtAll)
                console.log(a)
                var date = new Date().getTime();
                if(a[message.from+'1']){
                    a[message.from+'1'][date] = message.data;
                } else {
                    a[message.from+'1'] = {};
                    a[message.from+'1'][date] = message.data;
                }
                self.state.txt = a;
                localStorage.oxTxtAll = JSON.stringify(a)
                // console.log(message.type)
                // console.log('Text')
                
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
            onPresence: function ( message ) {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
            onRoster: function ( message ) {
                console.log('Roster')
                console.log(message)
            },         //处理好友申请
            onInviteMessage: function ( message ) {},  //处理群组邀请
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
            onCreateGroup: function(message){},        //创建群组成功回执（需调用createGroupNew）
            onMutedMessage: function(message){}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
            });
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


