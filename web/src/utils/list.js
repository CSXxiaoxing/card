
// console.log(123456)

// function 

onmessage = function(event){
    // 向线程创建源送回消息
    console.log(event.data)
    postMessage(event);
}