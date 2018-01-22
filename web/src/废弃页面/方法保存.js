// 一个计算对象length的方法，适用于少量的数据
var a = '对象';
function length(o) {
    var count = 0;
    for(var i in o){
        count ++;
    }
    return count;
};
console.log(length(a));

// GET/POST请求
http.post({
            url: ''''
        ,vm:this}).then(res => {
            self.datagrid = res.data;
            console.log(res.data)
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



// 临时放这里
var msgId = message.id;
var data = message.data;
var formId = message.from;
var toId =message.to;
var time = Date.parse(new Date());
var ext = message.ext;
$("#side2 li.current").data("toUser",ext);//设置对方信息
var userData= $('.personConLeftHeadText').data("uesrData");
isAgree(msgId,userData);
var json ={
    "messageId":msgId,
    "toUserId":formId,
    "myUserId":toId,
    "target":1,
    "time":time,
    "type":"txt",
    "message":data,
    "bodies":JSON.stringify({"type":"txt","msg":data}),
    "ext":JSON.stringify(ext),
    "state":0,
}
console.log(message)
ajaxPackage(url+"/job/signPower/submitMessage",json)
    .done(function (data) {
        // console.log(data);
    });