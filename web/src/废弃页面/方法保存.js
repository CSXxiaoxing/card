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