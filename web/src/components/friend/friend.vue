<template>
    <div id='friend'>
        
        <!-- 查找好友 -->
        <mt-popup 
          v-model="addFriend"
          popup-transition="popup-fade" 
          class="addFriend" >
          <span>查找好友</span>
          <p><input type="text" placeholder="请输入要查找的ID" v-model.number='findID'></input>
          </p>
          <mt-button @click="addFriend = false">  取消
          </mt-button>
          <mt-button @click="Friend">  搜索
          </mt-button>
        </mt-popup >

        <!-- 好友信息 -->
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

        <!-- 请求已经发送 -->
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
                    <i><a @click='$store.commit("ls")'></a></i>
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
                        <dd @click="show = 0">
                            <b>[系统消息]</b>
                            <b>您已被清除房间，ID74543...</b>
                            <b :class='arrows == 1 ? "show" : "hide"'></b>
                            <b v-show="show == 1" >●</b>
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
                            <span><i></i>添加</span>
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
        <loading v-if='loading'></loading>
    </div>
</template>

<script type="text/javascript">
    import './friend.scss';
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';

    export default {
        data: function(){
            return {
                loading: false,     // loading
                arrows: 0,  // 上下箭头
                addFriend : false,    //  查找好友
                findFriend: false,
                sendFriend: false,
                show:1, //1新消息  0 点击后
                findID: '',  // 要寻找的id
            }
        },
        mounted: function(){
            // 登录环信
            this.$store.dispatch('webIM')
            this.$store.dispatch('dl')
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
            },
            Friend(){   // 添加好友
                var self = this;
                self.findFriend = true ;
                self.addFriend  = false;
                // http.post('/MemberNotice/applyFriend',{     
                //     zn_mid: self.findID,
                // })
                // .then(res => {
                //     console.log(res)
                // })
            }
        }
    }
</script>