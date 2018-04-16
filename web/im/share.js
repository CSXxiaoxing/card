function share_WANJI(WANJI_TYPE){
    if(WANJI_TYPE>=2){
        weixin_WANJI_DL();
        return false;
    }
    var shares=null,share_bhref=false;
    var share_img='../img/bbb.jpg';        //分享显示图片
    var share_thumb_img='../img/bbb.jpg';  //缩略图
    var share_content='';//分享内容
    var share_href='';//分享链接
    var share_title='';//分享标题
    var bussType = '';//业务类型
    var bussId = '';//业务单号
    // UIImageJPEGRepresentation(share_img, 0.01); 
    var wrhShare = function(){
        return {
            /**
             * 初始化分享服务
             */
            init : function(){
                plus.share.getServices( function(s){
                    shares={};
                    for(var i in s){
                        var t=s[i];
                        shares[t.id]=t;
                    }

                    wrhShare.shareAction('weixin','WXSceneSession');
                }, function(e){
                    mui.toast( "获取分享服务列表失败："+e.message );
                } );

            },
            /**
             * 分享操作
             * @param {Object} id
             * @param {Object} ex
             */
            shareAction : function(id,ex){
                var s=null;
                if(!id||!(s=shares[id])){
                    mui.toast( "无效的分享服务！" );
                    return;
                }
                if ( s.authenticated ) {
                    wrhShare.shareMessage(s,ex);
                } else {
                    s.authorize( function(){
                            wrhShare.shareMessage(s,ex);
                        },function(e){
                        mui.toast( "认证授权失败："+e.code+" - "+e.message );
                    });
                }
            },
            /**
             * 发送分享消息
             * @param {Object} s  thumbs
             * @param {Object} ex
             */
            shareMessage : function(s,ex){
                // var msg={extra:{scene:ex}};
                // msg.content = share_content;
                // msg.title = share_title;
                // msg.thumbs=[share_thumb_img];
                // msg.pictures=[share_img];
                
                var msg = {
                    content: '分享-详情',
                    href: 'http://www.baidu.com',
                    title: '玩机吧',
                    content: '史上最刺激的游戏',
                    thumbs: ['http://wanji888.hamingniao.com/uploadfiles/images/121.jpeg'],
                    pictures: ['http://wanji888.hamingniao.com/uploadfiles/images/121.jpeg'],
                    extra: {
                        scene: "WXSceneSession"
                    }

                };
                
                s.send(msg, function() {
                    outLine("分享成功!");
                }, function(e) {
                    outLine("分享失败!");
                });

            }
        }
    }();
    wrhShare.init();
}
// 控制台输出日志
function outSet(msg) {
    console.log(msg);
}
// 界面弹出吐司提示
function outLine(msg) {
    mui.toast(msg);
}