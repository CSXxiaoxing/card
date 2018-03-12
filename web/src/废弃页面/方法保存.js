// 一个计算对象length的方法，适用于少量的数据 JSON Date
var a = '对象';
function length(o) {
    var count = 0;
    for(var i in o){
        count ++;
    }
    return count;
};
console.log(length(a));

/* @mixin time01    {   
    transition-duration: .6s;
    transition-timing-function: cubic-bezier(.68,-.55,.265,1.55); 
    transition-delay: 0s;
}
@mixin time02    {   
    transition-duration: .6s;
    transition-timing-function: cubic-bezier(.68,-.55,.265,1.55); 
    transition-delay: .2s;
}
@mixin time03    {   
    transition-duration: .6s;
    transition-timing-function: cubic-bezier(.68,-.55,.265,1.55); 
    transition-delay: .4s;
}
@mixin time01    {   
    transition-duration: .6s;
    transition-timing-function: cubic-bezier(.68,-.55,.265,1.55); 
    transition-delay: .6s;
}
@mixin time01    {   
    transition-duration: .6s;
    transition-timing-function: cubic-bezier(.68,-.55,.265,1.55); 
    transition-delay: .8s;
} */
// GET/POST请求
http.post( '/Chat/createChat', {
            zc_from: obj.myId, // 自己的id
        }, '', this )
    .then(res => {
        console.log(res)
})

http.get({
            url: ''
        ,vm:this}).then(res => {
            self.dataset = res.data
        })

// 事件委托
target.nodeName.toLowerCase() == 'li'

// 消除浮动
<div class="clear"></div>
.clear{
    clear:both;
}

// css三角形
.triangle_border_down{
    width:0;
    height:0;
    border-width:20px 10px 0;
    border-style:solid;
    border-color:#333 transparent transparent;/*灰 透明 透明 */
    margin:40px auto;
    position:relative;
}

// 雪碧图
background: url(../../img/home_all.png) -210px -150px no-repeat;
      background-size: 600px 600px;
      background-position: center;

// 1~13随机整数
Math.random()*13+1>>0

// 清除滚动条
::-webkit-scrollbar {
    display: none;
} 

// 计算字符长度
'字符串'.replace(/[\u0391-\uFFE5]/g,"aa").length

// 原生ajax
//创建异步对象  
var xhr = new XMLHttpRequest();
//设置请求的类型及url
//post请求一定要添加请求头才行不然会报错
// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.open('post', 'http://192.168.31.142:3000/Member/test' );
//发送请求
xhr.send('name=fox&age=18');
xhr.onreadystatechange = function () {
    // 这步为判断服务器是否正确响应
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
      }
};

// placeholder占位符样式
input::-webkit-input-placeholder{color: #ccc;}

// 颜色console.log
console.log('%c [opened] 已经成功建立连接', 'color: green')

// localstorage  or sessionStorage
window.localStorage.setItem("c",9)       // 添加
window.localStorage.clear();            // 清空
window.localStorage.removeItem("a");   // 删除某个
window.localStorage.getItem(key);     // 获取某个
window.localStorage.c                // 直接获取

// 聊天信息储存转换
var a = JSON.parse(localStorage.oxTxtAll)
if(a["hz_niuniu_"+localStorage.oxUid]){
    a["hz_niuniu_"+localStorage.oxUid].push(self.txt)
} else {
    a["hz_niuniu_"+localStorage.oxUid] = [];
    a["hz_niuniu_"+localStorage.oxUid].push(self.txt)
}
localStorage.oxTxtAll = JSON.stringify(a)

// 输入框为搜素字样
 9 <body>
10     <form id="myform" action="" onsubmit="return false;">
11     <input id="myinput" type="search">
12     </form>
13 </body>
14 <script>
15 //这两种都能用, 一个是在form上加id 一个是在input元素加id
16 //对于苹果手机添加一个form元素是必要的,否则只能实现功能但是键盘的文字不能变成搜索字样
17 //  $('#myform').bind('search', function () {
18 //      //coding
19 //      alert(1);
20 //  });
21     $('#myinput').bind('search', function () {
22         //coding
23         alert(1);
24     });
25 </script>

// 状态跟随
var num = Number(res.data.zn_status);
var jsontxt = res.data.zn_text
if(num >5){
    num -= 5;
    self.clearStyle()         //清除
    self.cardURL = JSON.parse(jsontxt);
    self.gameStart(num)       // 进入游戏阶段
}

// 调取聊天记录
this.$store.state.obj = {
    myId: "hz_niuniu_"+id,
    toId: "hz_niuniu_961",
    pageSize: 10,
    p: 1,
};
this.$store.dispatch('webRecord')

// 对象转数组
 Object.values('对象') // 不推荐

 // 房间公告
 http.post('/RoomJoin/placard',{
     content: '本房间即将解散',
     roomid: 36,    // 房间id
 })
 .then(res => {
     console.log(res)
     console.log(995)
 })

// 简
for(let i in data)

// 等值
10000000 = 1e7

// 错误提示
self.$parent.errorTips = res.msg;
self.$parent.careTip = true;
self.errorTips = res.msg;
self.careTip = true;


created: function() {
    this.oxOpen = this.$store.state.initRoom;
    this.boxState.radio = this.oxOpen.oxK;
},

// 隐藏滚动条ios
-webkit-overflow-scrolling: touch;

// 文字超出隐藏
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

// 透明兼容
filter:alpha(opacity=0);  
-moz-opacity:0;  
-khtml-opacity: 0;  
opacity: 0;

src/img/

// socket心跳包
var countSocket = 0;    // 心跳包
var countSocket02 = 0;
socket.emit('test_io', 10086);
socket.on('answer', function (data) {
    countSocket++
});
setInterval(()=>{
    countSocket02++
    if(countSocket02 > countSocket){    // 重连
        var socket = io(socketURL);
        var uid = localStorage.oxUid;
        socket.on('connect', function () {
            socket.emit('login', uid);
        });
    } else {
        countSocket02 = countSocket
    }
},2e4)


// 第三方socket
<script type="text/javascript" src="https://cdn.goeasy.io/goeasy.js"></script>

<script type="text/javascript">

    var goEasy = new GoEasy({
        appkey: 'BC-963a48f23d5b45f983c2407907a406c3',
        onConnected: function () {
            console.log("成功连接GoEasy。");
        },
        onDisconnected: function () {
            console.log("与GoEasy连接断开。");
        },
        onConnectFailed: function (error) {
            console.log("与GoEasy连接失败，错误编码："+error.code+"错误信息："+error.content);
        }
    });

    // 房间 room_  私人 user_
    goEasy.subscribe({
        channel: '123',
        onMessage: function(message){
            console.log('接收到消息:'+message.content);//拿到了信息之后，你可以做你任何想做的事
        }
    });
</script>


