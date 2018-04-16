var weixin_WANJI_DL_data = null;
function weixin_WANJI_DL(){
    console.log('正在发起请求')
    var auths={};
    function plusReady(){
        // 扩展API加载完毕，现在可以正常调用扩展API
        plus.oauth.getServices( function(services){
            auths = services;
            authLogin()
        }, function(e){
            console.log( "获取分享服务列表失败："+e.message+" - "+e.code );
        })
    }
    if(window.plus){
        plusReady();
    }else{
        document.addEventListener('plusready',plusReady,false);
    }
    console.log(666)

    // 登录操作
    function authLogin(){
        var s = auths[0];
        if ( !s.authResult ) {
            s.login( function(e){
                // console.log( "登录认证成功！" );
                authUserInfo()
            }, function(e){
                console.log( "登录认证失败！" );
            } );
        }else{
            console.log( "已经登录认证！" );
        }
    }
    // 获取登录用户信息操作
    function authUserInfo(){
        var s = auths[0];

        if ( !s.authResult ) {
            console.log("未登录授权！");
        } else {
            s.getUserInfo( function(e){
                console.log( "获取用户信息成功："+JSON.stringify(s.userInfo) );
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append('feifei', JSON.stringify(s.userInfo));

                xhr.open('post', GAME_ALL_URL+"/Member/wxLogin");
                //发送请求
                xhr.send(formData);
                xhr.onreadystatechange = function (e) {
                    console.log(JSON.stringify(e))
                    // 这步为判断服务器是否正确响应
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            console.log(xhr.responseText);
                            console.log(xhr.responseText);
                            weixin_WANJI_DL_data = JSON.parse(xhr.responseText)
                        }
                };
            }, function(e){
                console.log( "获取用户信息失败："+e.message+" - "+e.code );
            } );
        }
    }
    // 添加用户手机号信息
    // function addPhoneNumber(){
    //     var s = auths[0];
    //     if ( !s.authResult ) {
    //         console.log("未登录授权！");
    //     } else {
    //         s.addPhoneNumber( function(e){
    //             console.log( "添加用户手机号信息成功！");
    //             console.log(JSON.stringify(e))
    //         }, function(e){
    //             console.log( "添加用户手机号信息失败："+e.message+" - "+e.code );
    //         } );
    //     }
    // }
};