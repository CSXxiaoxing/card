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