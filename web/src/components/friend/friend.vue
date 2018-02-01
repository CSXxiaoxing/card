<template>
    <div id='friend'>

        <mt-popup 
            v-model="careTip"
            popup-transition="popup-fade" :modal='false'
            class="care" >
            <span>通知 <i @click="careTip = false">×</i></span>
            <p>找不到该用户</p>
            <mt-button @click="careTip = false">  确定
            </mt-button>
        </mt-popup >

        
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
          <mt-button @click="searchFriend()">  搜索
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
                <li>{{friendName}}</li>
                <li> id : {{friendId}}</li>
            </ul>
          </div>
          <mt-button @click="findFriend = false ,applyFriend() ">  添加
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
        
        <!--备注好友-->
        <mt-popup 
            v-model="markFriend"
            popup-transition="popup-fade" :modal='false'
            class="addFriend" >
              <span>备注</span>
              <p><input type="text" placeholder="请输入要备注的名字" v-model.number='markName'></input>
              </p>
              <mt-button @click="remarkFriend(),markFriend=false">  确定
              </mt-button>
              <mt-button @click="markFriend = false">  取消
              </mt-button>
              
        </mt-popup>
        <!--删除好友-->
        <mt-popup 
            v-model="deleFriend"
            popup-transition="popup-fade" :modal='false'
            class="sendFriend" >
              <span>删除好友</span>
              <p>是否确认删除此好友</input>
              </p>
              <mt-button @click="deleteFri(),deleFriend=false">  确定
              </mt-button>
              <mt-button @click="deleFriend = false">  取消
              </mt-button>
              
        </mt-popup>

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
                    <!--系统消息-->
                    <dl class='sys' v-for='(sys,squest) in systemMess' :key='squest' @touchend='sysSel = squest' @click='setRead(),changeTime()'>
                        <dt>
                            <span><i></i></span>
                        </dt>
                        <dd @click="show = 0">
                            <b>[系统消息]</b>
                            <b>{{sys.title}}</b>
                            <b :class='arrows == 1 ? "show" : "hide"'></b>
                            <b v-show="sys.read == 1" >●</b>
                        </dd>
                    </dl>
                    <!--好友消息-->
                    <dl class="fri" v-for='(fri,quest) in friendApply' :key='quest'
                        >
                        <dt>
                            <span><i></i></span>
                        </dt>
                        <dd>
                            <p><i>{{fri.name}}</i>要求添加你为好友</p>
                            <p @touchend='friSel = quest' @click='agreeFriend()'>同意</p>
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
                        <dd v-for='(friends,fquest) in friendList' :key='fquest'>
                            <span @touchend='friQuest = fquest' @click='deleFriend = true'><i></i></span>
                            <span>{{friends.mname}}</span>
                            <span @touchend='friQuest = fquest' @click='markFriend =true'><i></i>备注</span>
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
    import router from '../../router/';

    export default {
        data: function(){
            return {
                loading: false,     // loading
                arrows: 0,  // 上下箭头
                addFriend : false,    //  查找好友
                findFriend: false,
                sendFriend: false,
                markFriend: false,
                deleFriend : false,
                findID: '',  // 要寻找的id
                careTip : false,
                friendId : 0,   //对方id
                friendName: '',  //对方名字
                systemMess: [],  //系统信息
                friendApply :[],  //好友信息
                sysTime : '', //系统信息时间
                friSel :-1, 
                friQuest :-1,
                sysSel:-1,
                markName:'',
                pagesize : 15,
                p :1,
                friendList : [], //好友列表
                friendListId : [], //好友列表id
            }
        },
        mounted: function(){
            // 登录环信
            this.$store.dispatch('webIM')
            this.$store.dispatch('dl')

            //获取系统信息
            var self = this ;
                http.post('/MemberNotice/getNotify',{
                    id : localStorage.oxUid,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        for(let i in res.data){
                            if(res.data[i].zn_way ==2){
                                self.friendApply.push({
                                    name :res.data[i].zc_content,
                                    id  :res.data[i].id, //信息id
                                    mid :res.data[i].zn_mid, //对方id

                                })
                            }else{
                                self.systemMess.push({
                                    id  :res.data[i].id, //信息id
                                    content : res.data[i].zc_content,//信息内容
                                    read : res.data[i].zn_read,//已读未读
                                    time : res.data[i].zn_cdate, //信息时间
                                    title : res.data[i].zc_title, //信息标题
                                })
                            }
                        }
                        console.log(self.friendApply)
                        console.log(self.systemMess)
                    }
                }),


                //获取好友列表
                http.post('/MemberFriend/getFrientList',{
                    pagesize : self.pagesize,
                    p        : self.p,
                    id : localStorage.oxUid,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        for(let i in res.data){
                            self.friendList.push({
                                id  :res.data[i].id, //信息id
                                mid :res.data[i].zn_mid, //对方id
                                mname : res.data[i].zc_remark,  //对方名字
                            })
                            self.friendListId.push({
                                id  :res.data[i].id, //信息id
                            })
                        }
                        console.log(self.friendList)
                        console.log(self.friendListId)
                    }
                })

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
            },
            //查找好友
            searchFriend(){
                var self = this;
                http.post('/MemberFriend/getFriend', {
                    id : self.findID,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status==1){
                        self.friendId = res.data.id;
                        self.friendName =  res.data.zc_nickname;
                        console.log(res.data.id)
                        console.log(res.data.zc_nickname)
                        self.findFriend = true;
                    }else{
                        self.careTip = true;
                    }
                })
            },
            //发送申请
            applyFriend(){
                var self = this;
                http.post('/MemberNotice/applyFriend' , {
                    zn_mid : self.friendId,
                    zc_content : self.friendName,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        self.sendFriend = true;
                    }
                })
            },
            //同意申请好友
            agreeFriend(){
                var self = this;
                console.log(self.friSel)    
                http.post('/MemberFriend/addFriend' ,{
                    zn_friend_id : Number( self.friendApply[self.friSel].mid),
                    zc_remark : self.friendApply[self.friSel].name,
                    zn_way  : 1,
                    zn_mid : localStorage.oxUid,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status==1 || res.status ==2){
                        self.deleteApplyFri();
                    }
                })
            },
            //删除好友申请信息
            deleteApplyFri(){
                var self = this;
                http.post('/MemberNotice/delNotify',{
                    id : Number( self.friendApply[self.friSel].id),
                })
                .then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        window.location.reload();
                    }
                })
            },
            //删除系统信息
            deleteApplyFri(){
                var self = this;
                http.post('/MemberNotice/delNotify',{
                    id : Number( self.systemMess[self.sysSel].id),
                })
                .then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        window.location.reload();
                    }
                })
            },
            //备注好友
            remarkFriend(){
                var self = this;
                console.log(self.friQuest)
                http.post('/MemberFriend/modifyMark' ,{
                    id : localStorage.oxUid,
                    friendid : Number( self.friendList[self.friQuest].mid),
                    name : self.markName,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status==1){
                        self.friendList[self.friQuest].mname = self.markName;
                        self.markName = '';
                    }
                })
            },
            //消息已读未读
            setRead(){
                var self = this;
                console.log(self.sysSel)   
                http.post('/MemberNotice/setRead',{
                    id : Number( self.systemMess[self.sysSel].id)
                })
                .then(res=>{
                    console.log(res)
                    if(res.status == 1){
                        var vx = this.$store.state.systemMess;
                        vx.time = self.sysTime;
                        vx.title = self.systemMess[self.sysSel].title;
                        vx.content = self.systemMess[self.sysSel].content;
                        router.push({name: 'chartMessage'});
                    }
                })
            },
            //删除好友
            deleteFri(){
                var self = this;
                console.log(self.friQuest)
                http.post('/MemberFriend/delFriend',{
                    id : localStorage.oxUid,
                    friendid : Number( self.friendList[self.friQuest].mid),
                })
                .then(res=>{
                    console.log(res)
                    if(res.status==1){
                        window.location.reload();
                    }
                })
            },
            //时间戳转换时间
            changeTime(){
                var self = this;
                self.sysTime = self.timestampToTime(self.systemMess[self.sysSel].time);
                console.log(self.sysTime)
            },
            timestampToTime(timestamp) {
                    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() + ':';
                    var m = date.getMinutes() + ':';
                    var s = date.getSeconds();
                    return Y+M+D+h+m+s;
            },
        }
    }
</script>