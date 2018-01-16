<template>
    <div id='friend'>

        <mt-popup 
          v-model="addFriend"
          popup-transition="popup-fade" 
          class="addFriend" >
          <span>查找好友</span>
          <p><input type="text" placeholder="请输入要查找的ID"></input>
          </p>
          <mt-button @click="addFriend = false">  取消
          </mt-button>
          <mt-button @click="findFriend = true , addFriend = false ">  搜索
          </mt-button>
        </mt-popup >

        <mt-popup 
          v-model="findFriend"
          popup-transition="popup-fade" 
          class="findFriend" >
          <div>
             <i v-on:click="findFriend = false">×</i>
            <img src="../../img/friend1.png" alt="">
            <ul>
                <li>咔咔</li>
                <li>9577655189</li>
            </ul>
          </div>
          <mt-button @click="findFriend = false , sendFriend = true ">  添加
          </mt-button>
        </mt-popup >

        <mt-popup 
          v-model="sendFriend"
          popup-transition="popup-fade" 
          class="sendFriend" >
          <span>查找好友</span>

          <p>添加好友请求已发送</p>

          <mt-button @click="sendFriend = false"> 确定
          </mt-button>
        </mt-popup >

        <header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>好友列表</li>
                <li @click="addFriend = true">
                    <i></i>
                </li>
            </ul>
        </header>
        <div class='friMain'>
            <ul>
                <li @touchend='newWord'>
                    <span><i></i></span>
                    <span>最新消息</span>
                    <span><i :class='arrows == 1 ? "Iup" : ""'></i></span>
                </li>
                <li  :class='arrows == 1 ? "show" : "hide"'>
                    <dl>
                        <dt>
                            <span><i></i></span>
                        </dt>
                        <dd>
                            <b>[系统消息]</b>
                            <b>您已被清除房间，ID74543...</b>
                            <b :class='arrows == 1 ? "show" : "hide"'></b>
                            <b>●</b>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span><i></i></span>
                        </dt>
                        <dd>
                            <b>[系统消息]</b>
                            <b>昨天：17：00您的房卡不足，您的.....</b>
                            <b  :class='arrows == 1 ? "show" : "hide"'></b>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span><i></i></span>
                        </dt>
                        <dd>
                            <p><i>寂寞的心</i>要求添加你为好友</p>
                            <p>同意</p>
                        </dd>
                    </dl>
                </li>


                <li @touchend='near'>
                    <span><i></i></span>
                    <span>最近联系</span>
                    <span><i :class='arrows == 2 ? "Iup" : ""'></i></span>
                </li>
                <li :class='arrows == 2 ? "show" : "hide"'>
                    <dl>
                        <dd>
                            <span><i></i></span>
                            <span>测试一号</span>
                            <span><i></i>备注</span>
                        </dd>
                        <dd>
                            <span><i></i></span>
                            <span>测试二号</span>
                            <span><i></i>备注</span>
                        </dd>
                    </dl>
                </li>
                <li @touchend='myFriend'>
                    <span><i></i></span>
                    <span>我的好友</span>
                    <span><i :class='arrows == 3 ? "Iup" : ""'></i></span>
                </li>
                <li :class='arrows == 3 ? "show" : "hide"'>
                    <dl>
                        <dd v-for='a in 6'>
                            <span><i></i></span>
                            <span>测试一号</span>
                            <span><i></i>备注</span>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>

    </div>
</template>

<script type="text/javascript">
    import './friend.scss';

    export default {
        data: function(){
            return {
                // 上下箭头
                arrows: 0,
                addFriend:false,
                findFriend:false,
                sendFriend:false,
            }
        },
        methods: {
            newWord() {
                if(this.arrows == 1) {
                    this.arrows = 0;
                } else {
                    this.arrows = 1;
                }

            },
            near() {
                if(this.arrows == 2) {
                    this.arrows = 0;
                } else {
                    this.arrows = 2;
                }
            },
            myFriend() {
                if(this.arrows == 3) {
                    this.arrows = 0;
                } else {
                    this.arrows = 3;
                }
            }
        }
    }
</script>