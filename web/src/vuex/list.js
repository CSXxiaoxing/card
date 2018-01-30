
// console.log(123456)

// function applyList () {  // 庄申请人列表
//     var self = this;
//     http.post('/RoomJoin/getMakerList',{
//         roomid: self.$store.state.idRoom.id, // 房间id
//     })
//     .then(res => {
//         self.$store.state.data.Zlist=res.data
//     })
// }

onmessage = function(event){
    var num = event.data;
    var result = 0;
    for(var i=0; i<num; i++){
        result += i;
    }
    console.log(111)
    // 向线程创建源送回消息
    postMessage(result);
}