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


