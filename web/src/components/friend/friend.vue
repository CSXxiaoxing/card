<template>
    <mt-popup
      position="bottom"
      v-model="friend_VIP" id='friend'>
        <!-- 错误提示 -->
        <mt-popup 
            v-model="careTip" :modal='false'
            popup-transition="popup-fade"
            class="careTip" >
            <h3>通知</h3>
            <i @click="careTip = false"></i>
            <p>{{careTip_TEXT}}</p>
            <mt-button @click="careTip = false">
            </mt-button>
        </mt-popup>
        <!-- 删除确认 -->
        <mt-popup 
            v-model="delTip" :modal='false'
            popup-transition="popup-fade"
            class="careTip" >
            <h3>操作确认</h3>
            <i @click="delTip = false"></i>
            <p>{{delTip_TEXT}}</p>
            <mt-button @click="delTip = false">
            </mt-button>
        </mt-popup>
        <!-- 好友信息 -->
        <mt-popup 
          v-model="findFriend"  :modal='false'
          popup-transition="popup-fade"
          class="findFriend" >
          <div>
            <i v-on:click="findFriend = false"></i>
            <img src="src/img/friend1.png" alt="">
            <ul>
                <li>{{friendName}}</li>
                <li>{{findID}}</li>
            </ul>
            <mt-button @click="findFriend = false ,applyFriend() "></mt-button>
          </div>
        </mt-popup >
        <!--备注好友-->
        <mt-popup 
            v-model="markFriend"
            popup-transition="popup-fade"
            class="markFriend" >
            <input type="text" placeholder="请输入要备注的名字" v-model.number='markName' />
            <i @click="markFriend = false"></i>
            <mt-button @click="remarkFriend()">
            </mt-button>
        </mt-popup>

        <header>
            <ul>
                <li>
                    <i><a @click='addFriend ? addFriend=false : friend_VIP=false'></a></i>
                </li>
                <li>{{addFriend ? "添加好友" : "好友列表"}}</li>
                <li @click="addFriend = true">
                    <i></i>
                </li>
            </ul>
        </header>
        <div class='friMain' v-if='!addFriend'>
            <ul>
                <li @click='ConTypr(1)'>
                    <span><i></i></span>
                    <span>最新消息</span>
                    <span><i :class='arrows == 1 ? "Iup" : ""'></i></span>
                </li>

                <li  :class='arrows == 1 ? "show" : "hide"'>
                    <dl class='sys' v-for='(sys,squest) in systemMess' :key='sys.id' 
                          @touchend='[(q=-1),(k=squest),(sysSel = squest),(touchEnd)]' @click='changeTime(sys.zn_cdate)'  
                          @touchstart='touchStart'
                          @touchmove='touchMove'
                          :style="squest == k ? deleteSlider: ''">
                        <dt>
                            <span><i></i></span>
                        </dt>
                        <dd @click="show = 0,setRead(sys.id, sys.zc_title, sys.zc_content, sys.zn_cdate)" >
                            <b>[系统消息]</b>
                            <b>{{sys.zc_title}}</b>
                            <b :class='arrows == 1 ? "show" : "hide"'></b>
                            <b v-show="sys.zn_read == 1" ></b>
                        </dd>
                        <dd class="remove" ref='remove' @click="deleteApplySys"><p>删除</p></dd>
                    </dl>


                    <!--好友消息-->
                    <dl class="fri" v-for='(fri,quest) in $store.state.system.friend' :key='fri.id'
                    @touchend='[(k=-1),(q=quest),(touchEnd)]'
                    @touchstart='touchStart'
                    @touchmove='touchMove'
                    :style="quest == q ? deleteSlider: ''">
                        <dt>
                            <span><i></i></span>
                        </dt>
                        <dd>
                            <p><i>{{fri.name}}</i>请求添加你为好友</p>
                            <p @touchend='friSel = quest' @click='agreeFriend(fri.id)'>同意</p>
                        </dd>
                        <dd class="remove" ref='remove' @click='noFriend(fri.id)'><p>拒绝</p></dd>
                    </dl>
                </li>


                <li @click='ConTypr(2)'>
                    <span><i></i></span>
                    <span>最近联系</span>
                    <span><i :class='arrows == 2 ? "Iup" : ""'></i></span>
                </li>
                <li  :class='arrows == 2 ? "show" : "hide"'>
                    <dl> 
                        <dd
                         @touchend='touchEnd'
                          @touchstart='touchStart'
                          @touchmove='touchMove'
                          :style="1 == 1 ? deleteSlider: ''">

                            <img :src="$store.state.user.userImg" @touchend='friQuest = fquest'/>

                            <span>测试一号</span>
                            <span><i></i>添加</span>
                            <span class="remove" ref='remove'><p>删除</p></span>
                        </dd>
                    </dl>
                </li>

                <li @click='ConTypr(3)'>
                    <span><i></i></span>
                    <span>我的好友</span>
                    <span><i :class='arrows == 3 ? "Iup" : ""'></i></span>
                </li>
                <li  :class='arrows == 3 ? "show" : "hide"'>
                    <dl>
                        <p @click='ceshi(1)'>单聊测试口</p>
                        <p @click='ceshi(2)'>群聊测试口</p>

                        <dd v-for='(friends,fquest) in $store.state.system.friendList' 
                        :key='friends.id' 
                        @click='changeTime()'
                        @touchend='sysSel = fquest,touchEnd' 
                        @touchstart='[(k=fquest),(touchStart)]'
                        @touchmove='touchMove'
                        :style="fquest == k ? deleteSlider: ''">

                            <img :src="$store.state.user.userImg" @touchend='friQuest = fquest'/>
                            <span @touchend='friQuest = fquest' @click='liaotian(friends.fid)'>{{friends.name}}</span>
                            <span @touchend='friQuest = fquest' @click='markFriend =true'><i></i>备注</span>
                            <span class="remove" ref='remove' @click="deleteFri(friends.name)"><p>删除</p></span>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class='addHaoyou' v-if='addFriend'>
            <input type="text" placeholder='输入ID号' v-model='findID'/>
            <i></i>
            <div class='seekHaoyou'  v-show='findID.length != 0' @click='searchFriend'>
                <img src="src/image/friend006.png" alt="" />
                <p>搜索 ：<span>{{findID}}</span></p>
            </div>
        </div>

        <chartMessage ref="onchartMessageChild"></chartMessage>
        <DanLiao ref="onDanLiaoChild"></DanLiao>
        <CHATQUN ref="onQUNChild"></CHATQUN>

        <loading v-if='loading'></loading>
    </mt-popup>
</template>

<script type="text/javascript">
    import './friend.scss';
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import router from '../../router/';

    import chartMessage from '../chart/chartMessage.vue'; // 系统消息
    Vue.component('chartMessage', chartMessage)
    import DanLiao from '../chart/DanLiao.vue'; // 单聊
    Vue.component('DanLiao', DanLiao)


    import CHATQUN from '../chart/CHAT_QUN.vue'; // 群聊
    Vue.component('CHATQUN', CHATQUN)

    export default {
        data: function(){
            return {
                friend_VIP: false,       // 主页面
                loading: false,          // loading
                arrows: 0,               // 上下箭头
                careTip : false,         // 错误提示
                careTip_TEXT : false,    // 错误提示
                delTip : false,          // 删除提示
                delTip_TEXT : '',        // 删除提示

                // 数据
                friendList : [],    //好友列表
                
                findFriend: false,      // 好友申请
                markFriend: false,      // 备注好友
                addFriend : false,      // 查找好友
                findID: '',             // 要寻找的id
                friendName: '',         // 对方名字
                


                systemMess: [],  //系统信息
                friendApply :[],  //好友信息
                sysTime : '', //系统信息时间
                friSel :-1, 
                friQuest :-1,
                sysSel:-1,
                markName:'',
                pagesize : 15,
                p :1,
                friendListId : [], //好友列表id
                startX:0,   //触摸位置
                endX:0,     //结束位置
                moveX: 0,   //滑动时的位置
                disX: 0,    //移动距离
                deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
                k:-1,   // 系统消息
                q:-1,   // 好友申请
                ForZ: 0,// 庄时状态为1
            }
        },
        mounted: function(){
            // 登录环信
            this.$store.dispatch('webIM')       // 聊天配置
            this.$store.dispatch('haoyou_DL')   // 聊天登录

            var self = this;
            // 获取系统信息
            self.addDATA();
            // 获取好友
            self.haoyou();
        },
        methods: {
            // 获取系统消息
            addDATA(){
                var self = this ;
                http.post('/MemberNotice/getNotify',{
                    id : localStorage.oxUid,
                })
                .then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        self.systemMess = res.data;
                        for(let i in res.data){
                            if(res.data[i].zn_way ==2){
                                self.systemMess.push({
                                    id  :res.data[i].id, //信息id
                                    content : res.data[i].zc_content,//信息内容
                                    read : res.data[i].zn_read,//已读未读
                                    time : res.data[i].zn_cdate, //信息时间
                                    title : res.data[i].zc_title, //信息标题
                                })
                                // console.log(self.systemMess)
                            }
                        }
                    }
                })
            },
            ceshi(n){
                var self = this;
                if(n == 1){
                    self.$refs.onDanLiaoChild.DLRoom=true;
                } else if(n == 2){  // 群
                    console.log(self.$refs.onQUNChild.chatLT)
                    self.$refs.onQUNChild.chatLT=true;
                } else if(n == 3){
                    console.log('加减分')
                }
            },
            haoyou(){   // 手动刷新调用
                var self = this;
                this.$store.dispatch('get_R');
                //获取好友列表
                conn.getRoster({
                    success: function ( roster ) {
                        self.$store.state.system.friendList = roster;
                    },
                });
            },
            liaotian(id) {    // 点击好友聊天 MemberFriend/addFriend
                var self = this; 
                router.push({path: `/chartRoom/[2,10086,${id},1,"好友聊天"]`});
            },
            ConTypr(num){   // 箭头状态
                if(this.arrows == num) {
                    this.arrows = 0;
                } else {
                    this.arrows = num;
                }
            },
            //查找好友
            searchFriend(){
                var self = this;
                http.post('/MemberFriend/getFriend', {
                    id : self.findID,
                }, '' ,this)
                .then(res =>{
                    if(res.status==1){
                        self.friendName =  res.data.zc_nickname;

                        console.log(res.data.zc_nickname)
                        self.findFriend = true;
                    } else{
                        console.log(res)
                        self.careTip = true;
                        self.careTip_TEXT = res.msg;
                    }
                })
            },
            //发送申请 
            applyFriend(){
                var self = this;
                // 添加好友
                conn.subscribe({
                    to: 'hz_niuniu_'+self.findID,
                    // Demo里面接收方没有展现出来这个message，在status字段里面
                    message: localStorage.oxName+'#(h9aoyou*)',
                });
            },
            //同意申请好友
            agreeFriend(id){
                var self = this;
                /*同意添加好友操作的实现方法*/
                conn.subscribed({
                  to: id,
                  message : '[resp:true]'
                });
                // conn.subscribe({//需要反向添加对方好友
                //   to: id,
                //   message : '[resp:true]'
                // });
            },
            // 拒绝申请好友
            noFriend(id){
                /*拒绝添加好友的方法处理*/
                conn.unsubscribed({
                  to: id,
                  message : '对方拒绝添加您为好友',
                });
            },
            //删除好友申请信息
            deleteApplyFri(){
                var self = this;
                http.post('/MemberNotice/delNotify',{
                    id : self.friendApply[self.friSel].id
                })
                .then(res =>{
                    if(res.status == 1){
                        // window.location.reload();
                    }
                })
            },
            //删除系统信息
            deleteApplySys(){
                var self = this;
                http.post('/MemberNotice/delNotify',{
                    id : self.systemMess[self.sysSel].id
                })
                .then(res =>{
                    if(res.status == 1){
                        self.addDATA();
                    }
                })
            },
            //备注好友
            remarkFriend(){
                var self = this;
                console.log(self.friQuest)
                if(self.markName=''){
                    self.markFriend=false
                }else{
                    http.post('/MemberFriend/modifyMark' ,{
                        id : localStorage.oxUid,
                        friendid : Number(self.friendList[self.friQuest].fid),
                        name : self.markName,
                    })
                    .then(res =>{
                        self.markFriend=false
                        if(res.status==1){
                            self.friendList[self.friQuest].mname = self.markName;
                            self.markName = '';
                        }
                    })
                }  
            },
            //消息已读未读 点击跳转到详情页面
            setRead(xxid, title, content, time){
                var self = this; 
                http.post('/MemberNotice/setRead',{
                    id : xxid
                })
                .then(res=>{
                    if(res.status == 1){
                        var vx = {};
                        vx.time = self.timestampToTime(time);
                        vx.title = title;

                        var messyCode = /&lt;|p&gt;|\/p&gt;/g;
                        vx.content = content.replace(messyCode,'');

                        self.$refs.onchartMessageChild.msgObj=vx;
                        self.$refs.onchartMessageChild.chartMessage=true;
                    }
                })
            },
            //删除好友
            deleteFri(id){
                var self = this;
                conn.removeRoster({
                    to: id,
                    success: function () {  // 删除成功
                        conn.unsubscribed({
                            to: id
                        });
                        console.log('删除成功')
                        self.haoyou();
                    },
                    error: function () {    // 删除失败
                        alert('删除失败')
                    }
                });

            },
            //时间戳转换时间
            changeTime(time){
                var self = this;
                self.sysTime = self.timestampToTime(time);
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
            //左滑
            handleClick (v) {
                    this.$emit('msg-from-child', this.val)
                    this.deleteSlider = "transform:translateX(0rem)";
                },
            touchStart(ev){
                    this.k = ev
                    ev= ev || event
                    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                    if(ev.touches.length == 1){
                        // 记录开始位置
                        this.startX = ev.touches[0].clientX;
                }
            },
            touchMove(ev){
                    ev = ev || event;
                    //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                    let wd=2;
                    if(ev.touches.length == 1) {
                        // 滑动时距离浏览器左侧实时距离
                        this.moveX = ev.touches[0].clientX
                        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                        this.disX = this.startX - this.moveX;
                        // console.log(this.disX)
                        // 如果是向右滑动或者不滑动，不改变滑块的位置
                        if(this.disX < 0 || this.disX == 0) {
                            this.deleteSlider = "transform:translateX(0rem)";
                            // 大于0，表示左滑了，此时滑块开始滑动 
                        }else if (this.disX > 0) {
                            //具体滑动距离我取的是 手指偏移距离*5。
                            this.deleteSlider = "transform:translateX(-" + this.disX*5 + "rem)";
                            // 最大也只能等于删除按钮宽度 
                            if (this.disX*5 >=wd) {
                                this.deleteSlider = "transform:translateX(-" +wd+ "rem)";
                            }
                        }
                    }
            },
            touchEnd(ev){
                ev = ev || event;
                let wd=2;
                if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                    this.disX = this.startX - endX;
                    // console.log(this.disX)
                    //如果距离小于删除按钮1/3,强行回到起点
                    if ((this.disX*5) < (wd/3)) {
                        this.deleteSlider = "transform:translateX(0rem)";
                    }else{
                        //大于一半 滑动到最大值
                        this.deleteSlider = "transform:translateX(-"+wd+ "rem)";
                    }
                }
            }
        }
    }
</script>