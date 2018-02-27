//链接环信
var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true,
});

// 地址管理
// var socketURL = 'http://192.168.31.142:2120';
// var socketURL = 'http://www.wanjiba888.com:2120';
var socketURL = 'http://game.hengpukj.com:2120';
var GAME_ALL_URL = 'http://game.hengpukj.com';
// const GAME_ALL_URL = 'http://www.wanjiba888.com';
// const GAME_ALL_URL = 'http://192.168.31.142:3000';


// 连接io服务端
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

// rem控制代码
// 把尺寸放大N倍（N是window.devicePixelRatio）
var wdaaachen = document.documentElement.clientWidth*window.devicePixelRatio/10;
//物理像素*设备像素比=真实像素
document.getElementsByTagName("html")[0].style.fontSize = wdaaachen + "px";
// 把屏幕的倍率缩小到N分之一（N是window.devicePixelRatio）
var scale = 1/window.devicePixelRatio;
var mstr = 'initial-scale='+ scale +', maximum-scale='+ scale +', minimum-scale='+ scale +', user-scalable=no';
document.getElementById("vp").content = mstr;
