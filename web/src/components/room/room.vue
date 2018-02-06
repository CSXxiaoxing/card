<template>
    <div id='room'>
        <mt-popup 
            v-model="careTip"
            popup-transition="popup-fade"
            class="care" >
            <span>通知 <i @click="careTip = false">×</i></span>
            <p>{{errorTips}}</p>
            <mt-button @click="careTip = false">  确定
            </mt-button>
        </mt-popup >
        <header>
            <ul>
                <li>
                    <i><a  @touchend='exit'></a></i>
                    <span>第<i>{{$store.state.data.juAll}}</i>局</span>
                    <p :class='init.textStyle >= 1 ? "open" : "" '>
                        <span>{{host.allType == 1 ?  "游戏中" : "暂停中"}}</span>
                        <i v-show='init.ForT == 1' @click='host.style == true ? host.style = false : host.style = true'>
                            <b></b>
                        </i>
                        <mt-popup
                            v-model="host.style"
                            :modal='false'
                            popup-transition="popup-fade"
                            class='gameStyle'>
                                <span @click='gameStyle' @touchend='host.allType=1'>游戏中</span>
                                <span @click='gameStyle' @touchend='host.allType=0'>暂停中</span>
                                <i class='triangle-up'></i>
                        </mt-popup>
                    </p>
                </li>
                <li>
                    <span @click='to(2)'><i></i>开奖记录</span>
                    <span ><i></i><router-link to="/water" >流水报表</router-link></span>
                </li>
            </ul>
            <dl>
                <!-- 个人头像 -->
                <dt :class='!this.$store.state.data.zhaoFZ[0] ? "" : "DTtips"'
                @click='liaotian'>
                    <img src="/dist/room03.png" height="155" width="149" alt="" />
                </dt>
                <dd  v-show='init.ForT == 0'>{{playersName}}</dd>
                <dd  v-show='init.ForT == 0'>

                    分数：<span>{{win.fen}}</span>
                    <span :class='win.css[0]'>{{win.cssFen[0]}}</span>

                </dd>
                <!-- 房主 -->
                <dd  v-show='init.ForT == 1'>房总分：<span>{{init.totalFen}}</span></dd>
                <dd  v-show='init.ForT == 1' @click='varRoom'><i></i>房间设置</dd>

                <dd  @click="to(1)">
                    <i></i>
                    <span>邀请好友</span>
                </dd>
                <dd>
                    <mt-swipe :show-indicators="false">
                      <mt-swipe-item>
                        <i></i><span>房主公告：{{message}}</span>
                    </mt-swipe-item>
                      <mt-swipe-item>
                        <i></i><span>房主公告：{{message}}</span>
                    </mt-swipe-item>
                      <mt-swipe-item>
                        <i></i><span>房主公告：{{message}}</span>
                    </mt-swipe-item>
                    </mt-swipe>
                </dd>
            </dl>
        </header>

        <div class='roomMain'>
            <div class='left'>
                <ul>
                    <li @click='applyOn(0)'>
                        <div>
                            <img src="/dist/roomK02.png" alt="" />
                            <img src="/dist/roomPage01.png" alt="" />
                            <span>1</span>
                            <img class='leftZhuan' src="/dist/room1.png">
                            <div class='leftImg'>
                                <img src="/dist/friend1.png" alt="" />
                                <span>{{$store.state.data.Ztype.zn_points}}</span>
                            </div>
                        </div>
                        <p>{{$store.state.data.Ztype.zn_member_name}}</p>
                    </li>

                    <li  v-for = '(data, index) in $store.state.data.Zlist' v-if='index <= 5' :key='data.zn_member_id'>
                        <div>
                            <img src="/dist/roomK03.png" alt="" />
                            <img :src="'./src/img/roomPage0'+(index <= 1 ? index+2:4)+'.png'" alt="" />
                            <span>{{index+2}}</span>
                            <div class='leftImg'>
                                <img src="/dist/friend1.png" alt="" />
                                <span>{{data.zn_points}}</span>
                            </div>
                        </div>
                        <p>{{data.zn_member_name}}</p>
                    </li>

                    <!-- <li  @click="applyOn" class='tips'>{{apply}}</li> -->
                    <li  @click="applyOn(99)" :class='[(init.ForT == 1 ? "zhuan" : ""),($store.state.data.apptype == 1 ? "win" : "")]'>
                        {{$store.state.data.apptype == 1 ? "取消上庄" : "申请上庄"}}
                    </li>

                </ul>
                <span :class='win.css[1]'>{{win.cssFen[1]}}</span>
            </div>

            <div class='center'>

                <h1>{{init.text[init.textStyle]}}

                    <span v-show='init.textStyle >= 1'>{{init.time}}秒</span>

                </h1>
                <!-- 还可下注：1090.56 -->
                <p :style='{visibility: init.textStyle == 3 ? "visible" : "hidden"}'>还可下注：{{init.pond}}</p>
                <ul>


                    <!-- li -->
                    <li v-for='(datalist,index) in 7' 
                        :class='[(init.cardFn == 7 ? "b7" : "a5"), 
                        (time.index == index ? "bgccc" : ""), 
                        (ordinary.bg ? "bg" : "")] '
                        :size = 'index'
                        v-show='init.cardFn == 5 ? index != 2 && index != 6 : true'

                         @click="[(time.index != index && cardURL.clck == -1 ? playerBottom(index) : false), (init.textStyle == 4 ? cardURL.clck=index : '')]" 
                         @touchend='ordinary.Pn = index '>

                        <img v-for='dat in 5' src="/dist/room3.png">

                        <span>
                            <!-- 出牛 -->
                            <b :class='[(init.cardFn == 7 ? "b7" : "a5"),
                            ((time.index == index && init.textStyle >= 4) || init.textStyle == 5 ? "showoff" : "")]'>

                                {{init.textStyle > 3 ? cardURL.result[ index ] : '庄'}}
                            </b>
                            <b v-show='ordinary.allPay[index]>0 && init.textStyle >= 3'>{{ordinary.allPay[index]}}</b>
                            <b v-show='ordinary.pay[index][2]>0 && init.textStyle >= 3'>{{ ordinary.pay[index][2] }}</b>
                        </span>

                        <!-- 扑克牌 -->
                        <div class='testCard' :class='[(init.cardFn == 7 ? "b7" : "a5" ), (time.index != index && gameOver.show ? "three":""), (gameOver.timeEng ? "threeEng" : "")]'>
                            <!-- 翻开卡片 -->
                            <img v-if='init.textStyle >= 4'
                            v-for='(data, idx) in 5'
                            :src="cardURL.src[1]+cardURL.card[idx+index*5]+'.png'"

                            :class='[(cardURL.c3Type[0]),(cardURL.c3Type[1]+(idx+1)),
                            (time.index == index ? cardURL.c3Type[3] : ""),
                            ("initNum"), 

                            (idx > 2 && init.textStyle == 4 
                            && cardURL.clck == index && ordinary.pay[index][2]>0
                            ? "temporary" : "temporary02")]'/>


                            <!-- 背部卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.c3Type[0]),(cardURL.c3Type[1]+(idx+1)),
                            (time.index == index ? cardURL.c3Type[2] : ""), 

                            (idx > 2 && init.textStyle == 4 
                            && cardURL.clck == index && ordinary.pay[index][2]>0
                            ? "beimian" : "beimian02")]' />



                        </div>
                    </li>
                </ul>
            </div>



            <div class='right'>
                <ul @click='speak'>
                    <li v-for='player in $store.state.data.Room["id"]' v-if='fanzhuID != player.zn_member_id' :id='player.zn_member_id'>
                        <div>
                            <img src="/dist/roomK03.png" alt="" />
                            <img src="/dist/roomPage04.png" alt="" />
                            <span>6</span>
                            <div class='leftImg'>
                                <img src="/dist/friend1.png" alt="" />
                                <span>{{player.zn_points}}</span>
                            </div>
                        </div>
                        <p>{{player.zn_member_name}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <footer>
            <ul>
                <!-- <li><router-link to="/chartList/1" >好友</router-link></li> -->

                <li><router-link to="/friend" >好友</router-link></li>

                <li @click='cardURL.test = false'>
                    <router-link :to="chartRoom" >聊天室</router-link>
                </li>
                <li v-show='init.ForT == 1'>
                    <router-link to="/message" >发布公告</router-link>
                </li>
                <li v-show='init.ForT == 0'>
                    <router-link :to="fangzhu" >联系房主</router-link>
                </li>
                <li class='roomScore' v-show='init.ForT == 1' 
                    @click="to(3)">
                    <b :class='win.css[2].length > 0 ? "a" : ""'>{{host.oxWater}}
                    <span :class='win.css[2]' v-show='win.css[2].length > 0 ? true : false'>{{win.cssFen[2]}}</span></b>
                    <b>抽水分数</b>
                </li>
            </ul>
        </footer>
        
        <toShare ref="ontoShareChild" :share='"room"'></toShare>
        <varRoom ref="onvarRoomChild" ></varRoom>
        <prize ref="onprizeChild" ></prize>
        <keep-alive>
            <applyOn ref="onapplyOnChild" ></applyOn>
        </keep-alive>
        <playerBottom ref="onplayerBottomChild" :p='ordinary.Pn' ></playerBottom>
        <singleBoard ref="onsingleBoardChild"></singleBoard>
        
        <loading v-if='loading'></loading>
    </div>
</template>

<script type="text/javascript">
    import './room.scss';
    import Vue from 'vue';
    import router from '../../router/';
    import http from '../../utils/httpClient.js';
    import { Swipe, SwipeItem } from 'mint-ui';
    // 组件
    import toShare from '../../module/shareModule/toShare.vue';
    import prize from '../../module/roomModule/openRecords.vue';
    import playerBottom from '../../module/roomModule/playerBottom.vue';
    import applyOn from '../../module/roomModule/applyOn.vue';
    import singleBoard from '../../module/roomModule/singleBoard.vue';
    import setRoom from '../../module/homeModule/varRoom.vue';

    import loading from '../loading/loading.vue';
    Vue.component('loading', loading)

    Vue.component('toShare', toShare)
    Vue.component('prize', prize)
    Vue.component('applyOn', applyOn)
    Vue.component('playerBottom', playerBottom)
    Vue.component('singleBoard', singleBoard)
    Vue.component('varRoom', setRoom)

    // 定义所有定时器 applyOn
    // 游戏中定时器(timer-N) [01准备5s, 02随机庄家, 03随机庄位置, 04押注倒计时, 05牌全开, 06-10s下一盘]
    let pageTimer = {};
    let Timeout = {};
    // 游戏状态码 {
    //      0 : 执行游戏
    // }
    export default {
        data: function(){
            return {
                loading: false,     // loading
                errorTips: '',      // 错误提示
                careTip : false,    // 提示窗
                chartRoom: '',  // 群聊路由
                fangzhu: '',    // 房主路由
                fanzhuID: '',   // 房主id
                fanzhuName: '',   // 房主名字
                message : this.$store.state.placard.message,
                init: {     // 初始化
                    ForT: this.$store.state.idRoom.ForT || 0,          // 1是房主0是普通
                    time: 0,         // 游戏时间控制
                    ju: 5,          // 游戏局数
                    juCount: 0,       // 下庄局数计算
                    id: 0,          // 房间id
                    uid: localStorage.oxUid,    // 自己的id
                    room_id: this.$store.state.idRoom.room_id,
                    cardFn: this.$store.state.idRoom.cardFn,  //几牌  
                    oxK: this.$store.state.idRoom.oxK,
                    scope: this.$store.state.idRoom.scope,  // 可下注范围
                    pond: 1,    // 设定下注池
                    text: ['游戏暂未开始', '准备开始：', '随机庄牌：', '可押注时间：', '开牌倒计时', '开牌结果'], // 游戏状态
                    textStyle : 0, // 对应状态码   [0, 1, 2, 3, 4, 5]
                    oxNumber: this.$store.state.idRoom.oxNumber,// 倍率
                    totalFen: 0,    // 房总分

                    fen: 5000, // 庄总分
                    ForZ: 0,// 庄时状态为1
                },
                
                time: {     // 时间总控
                    initTime: this.$store.state.time.initTime,
                    random: this.$store.state.time.random,
                    index: -1,      // 随机背景/庄家
                    speed: this.$store.state.time.speed,

                    endTime: this.$store.state.time.endTime,
                    countTime: this.$store.state.time.countTime,
                },
                
                win: {      // 输赢结果
                    // 个人总分
                    fen : 0,
                    // 分数中转
                    zorp: [0,0],
                    // 我/庄/房主
                    css: ['', '', ''],
                    cssFen: ['', '', ''],
                    // 中转
                    cssZZ: ['','',''],
                    cssZZF: ['','',''],
                },
                
                host: {     // 主人
                    style: false,// 游戏开始
                    allType: 0,     // 游戏总控制 1 => 游戏中 || 0 => 暂停游戏  
                    oxWater: 0,
                },
                
                ordinary: {     // 普通
                    
                    bg: false,// 背景渐变
                    
                    pond: 0,// 可下注池
                    
                    allPay: [0, 0, 0, 0, 0, 0, 0],// 总下注
                    pay: {      //自己下---翻倍/不翻倍/总下注
                        0 : [0, 0, 0],
                        1 : [0, 0, 0],
                        2 : [0, 0, 0],
                        3 : [0, 0, 0],
                        4 : [0, 0, 0],
                        5 : [0, 0, 0],
                        6 : [0, 0, 0],
                        7 : [0, 0, 0],
                    },
                    Pn: -1,     // 第几个下注框
                },
                // 扑克牌黑桃(spade)红心（heart）梅花（clubs）方块（dianmond） 
                cardURL: {
                    color : ['spade', 'heart', 'clubs', 'dianmond'],  // 花色、牌称
                    nickname : ['没牛', '牛一', '牛二', '牛三', '牛四',
                               '牛五', '牛六', '牛七', '牛八', '牛九', 
                               '牛牛', '五花牛', 'J大', 'Q大', 'K大'],
                    src : ["./src/img/z999.png", "./src/img/cardPlus/"],
                    c3Type : ["", "", "", ""],  // c3状态控制[ 0卡牌出现, 1发牌效果, 2翻牌动效, 3翻牌2]
                    clck : -1, // 点击翻转

                    cardEnd : [],   // 7副牌数字
                    card : [],      // 牌型 --
                    result : [],    // 牛几 --
                    resultNum : [], // 牛几（数字提取）--
                    maxVal : [],    // 权重 --
                    end : [],       // 结果
                    dataT: 0,       // 时间相差三秒内可继续游戏
                    zhuang: 0,      // 庄的结果
                },
                // 游戏结果处理
                gameOver: {
                    show: false,        // 出现
                    timeEng: false,     // 倒计时结束
                },
                players: [],        // 右边玩家
                playersName: '',    // 右边玩家姓名
                TTT: {},    // 牌型中转
                count: 0,  // 轮庄计算
            }
        },
        mounted: function(){
            let self = this;
            // if(self.$store.state.self.addtype == 1){    // 更新分数
            //     self.list() 
            //     console.log(self.$store.state.self.addtype)
            // }
            // init/Room/getRoom
            http.post('/Room/getRooms',{
                    number: self.$route.params.id,
                })
                .then(res => {
                    // console.log(res)
                    if(res.status == 1) {
                        
                        var data = res.data;
                        var bl = JSON.parse(data.zc_rate);
                        var vx = this.$store.state.idRoom;

                        if(data.zn_member_id == localStorage.oxUid){
                            self.init.ForT = 1;
                            vx.ForT = 1;
                        } else {
                            self.init.ForT = 0;
                            vx.ForT = 0;
                        }

                        self.fangzhu = `/chartRoom/[2,${data.zc_number},${data.zn_member_id},${self.init.ForT},${JSON.stringify(data.zc_title)}]`;
                        self.chartRoom = `/chartRoom/[3,${data.zc_number},${data.id},${self.init.ForT},${data.zn_chatid}]`;

                        self.fanzhuID = data.zn_member_id;
                        vx.room_id = data.zc_number;

                        vx.zn_chatid = data.zn_chatid;
                        vx.ju = data.zn_maker_number;
                        vx.id = data.id;
                        self.init.id = data.id;
                        vx.oxK = bl[12];
                        bl.splice(12,1)
                        vx.oxNumber = bl;
                        vx.roomName = data.zc_title;
                        vx.scope[0] = data.zn_bet_between_s;
                        vx.scope[1] = data.zn_bet_between_e;
                        vx.time  = data.zn_bet_time;
                        vx.scale = data.zn_extract;
                        vx.open = data.zn_room_type == 1 ? true : false; 
                        vx.newMan = data.zn_confirm == 1 ? true : false;
                        vx.cardFn = data.zn_play_type == 1 ? 5 : 7;
                        self.init.cardFn = data.zn_play_type == 1 ? 5 : 7;
                        vx.room = data.zn_pay_type == 1 ? 'bell' : 'day'
                        vx.minGrade = data.zn_min_score;
                        self.init.id = res.data.id
                        self.list()
                        initType()
                        self.applyList()
                        self.gameResult(data.id) // 查询游戏结果
                        
                    }
                })
            
            // 状态跟随 -- 初次进入状态
            function initType(){
                if(self.init.ForT == 0){
                http.post('/Room/getRoomStatus',{
                    roomid: self.init.id,
                })
                .then(res => {
                    if(res.status == 1){
                        var val = res.data.zn_status;
                        if(val >= 2 && val < 10){
                            self.init.text[0] = '游戏已经开始,请您耐心等候下一盘'
                        } else if(val == 1 || val == 10){
                            self.init.textStyle == 0;
                            self.init.text[0] = '游戏暂未开始'
                        }
                    }
                })
                }
            }

            var socket = io(socketURL);
            var uid = localStorage.oxUid;
            socket.on('connect', function () {
                socket.emit('login', uid);
            });

            socket.on('new_msg', function (data) { 
                  // socket实时消息
                if(JSON.parse(data)){
                    var data = JSON.parse(data)
                }
                switch(Number(data.type)){
                    case 1 :                            // 通知有人加入
                        console.log(data)
                        self.list()  // 更新成员
                        break;
                    case 2 :                            // 通知房主有人加入
                        console.log(data)
                        break;
                    case 4 :                            // 通知房间已解散
                        console.log(data)
                        router.push({name: 'home'});
                        break;
                    case 5 :                            // 通知有人分数变化
                        console.log(data)
                        self.init.totalFen = data.totalPoints;
                        self.list()  // 更新分数
                        break;
                    case 6 :                            // 通知有人退出房间
                        console.log(data)
                        self.list()  // 退出房间
                        break;
                    case 7 :                            // 通知有人成为庄家
                        console.log(data)
                        self.list()  // 新庄家
                        self.applyList ()
                        break;
                    case 8 :                            // 通知有人申请上庄
                        console.log(data)
                        self.applyList ()
                        break;
                    case 9 :                            // 压分
                        console.log(data)
                        self.ordinary.allPay[(data.few)*1] += (data.score)*1; // 项和
                        self.init.pond -=  (data.score)*(data.maxmag)   // 分池
                        if(self.init.ForT == 1 || self.init.ForZ == 1 || data.id == localStorage.oxUid){
                            var i = 1;
                            if(data.maxmag > 1){    // 翻倍
                                i = 0;
                            }
                            self.ordinary.pay[`${data.few}`][2] += (data.score)*1
                            self.ordinary.pay[`${data.few}`][i] += (data.score)*1
                        }
                        
                        break;
                    case 10: 
                        console.log(data)
                        self.message = data.content;
                        // 公告
                        break;
                    case 11:                            // 重新开局
                        console.log(data)
                        self.list()  // 新庄家
                        self.applyList ()
                        break;
                    case 12:                            // 发牌中
                        self.TTT = JSON.parse(data.data);
                        break;
                    case 13:                            // 房主开始游戏
                        self.host.allType = 1;
                        self.init.textStyle == 0;
                        self.K ()
                        break;
                    case 14:                            // 房主暂停游戏
                        self.host.allType = 0;
                        self.init.textStyle == 0;
                        self.init.text[0] = '游戏暂未开始'
                        break;
                    case 15:                            // 中止下注
                        console.log(data)
                        break;
                    case 16:                            // 更新房间信息
                        console.log(data)
                        self.initGame()
                        break;
                }    
            });
        },
        methods: {
            varRoom(){          // 房间设置
                if(this.host.allType == 0){   // 游戏暂停方可打开
                    this.$refs.onvarRoomChild.initType = 1;
                    this.$refs.onvarRoomChild.imgState = this.$store.state.idRoom;
                    this.$refs.onvarRoomChild.boxState.CvarRoom=true;
                    this.$refs.onvarRoomChild.noModal();
                } else if(this.host.allType == 1){
                    this.errorTips = '请在游戏暂停时重置房间配置';
                    this.careTip = true;
                }
            },
            to(n){              // 弹框控制
                switch (n) {
                    case 1 :    // 邀请
                        this.$refs.ontoShareChild.toShare=true;
                        break;
                    case 2 :    // 开奖记录
                        this.$refs.onprizeChild.onprize=true;
                        this.gameResult(this.$store.state.idRoom.id)
                        break;
                    case 3 :    // 抽水分数999
                        this.$refs.onapplyOnChild.details=true;
                        this.$refs.onapplyOnChild.allFen = this.init.totalFen;
                        this.$refs.onapplyOnChild.allWater= this.host.oxWater; // 抽水分数
                        break;
                }
            },
            applyOn(i){         // 申请上庄or选择做庄
                let init = this.init;
                if(init.ForT == 1 && i == 0) {  // 庄
                    this.$refs.onapplyOnChild.setOwner=true;
                } else if(init.ForT == 0 && i == 99 && init.ForZ != 1){   // 普通玩家
                    this.$refs.onapplyOnChild.applyOn = true;
                }
            },
            playerBottom(){     // 压分
                let [init, self] = [this.init, this];

                if(init.ForT == 1 || init.ForZ == 1) {  //房主和庄家不参与游戏
                    return false;
                }
                if(init.textStyle == 3 && this.ordinary.pond > init.scope[0]){
                    this.$refs.onplayerBottomChild.playerBottom=true; 
                }
                if(init.textStyle == 4){
                    clearTimeout(Timeout['setT1']);
                    Timeout['setT1'] = setTimeout(function(){
                        self.cardURL.clck = -1;
                        clearTimeout(Timeout['setT1']);
                    }, 2300)
                }
            },
            gameStyle(){       // 游戏执行--开始
                let Etxt = this.host.allType;
                this.host.style = false;
                if(Number(this.$store.state.data.Ztype.zn_points) > Number(this.$store.state.idRoom.minGrade) && Etxt == 1){
                        this.roomStyle(2);        // 游戏状态储存--开始
                        
                } else if(Number(this.$store.state.data.Ztype.zn_points) < Number(this.$store.state.idRoom.minGrade)){
                    this.roomStyle(1);      // 游戏暂停
                    self.errorTips = '庄家分数低于最低上分数要求,游戏暂停。';
                    self.careTip = true;
                }
                if(Etxt == 0){
                    this.roomStyle(1);      // 游戏暂停
                }
                
            },
            K (){   // 游戏开始控制状态中转
                this.init.textStyle = 1;
                this.init.pond = (this.$store.state.idRoom.minGrade)*1;
                this.clearStyle()               // 定时器清空
                this.clearStyle()               // 定时器清空
                this.clearGameStyle()            
                if(this.host.allType == 1){     // 游戏状态允许
                    this.gameStart(1);         // 执行游戏
                }
            },
            clearStyle(){       // 清除游戏余留状态
                for(var each in pageTimer) {    // 清除所有定时器
                    clearInterval(pageTimer[each])
                }
                for(var each in Timeout) {    // 清除所有延时器
                    clearTimeout(Timeout[each])
                }
            },
            clearGameStyle () { // 游戏状态清零
                let game = this.gameOver;
                this.cardURL.c3Type = ["", "", "", ""];
                this.cardURL.result = [];
                this.cardURL.clck = -1;
                this.init.textStyle = 1;
                this.ordinary.bg = game.show = game.timeEng = false;
                this.ordinary.pay = {   // 押注清0
                    0 : [0, 0, 0],
                    1 : [0, 0, 0],
                    2 : [0, 0, 0],
                    3 : [0, 0, 0],
                    4 : [0, 0, 0],
                    5 : [0, 0, 0],
                    6 : [0, 0, 0],
                    7 : [0, 0, 0],     
                }
                this.win.css = ['', '', ''];
                this.win.cssFen = ['', '', ''];
            },
            algorithm () {      // 牛牛计算-权重输赢
                let resultNum = this.cardURL.resultNum;
                let color = this.cardURL.color;
                let card = this.cardURL.card;
                let OXcard = this.cardURL.cardEnd;
                let nickname = this.cardURL.nickname;
                // 所有数字/存花色/权重辅助/牛几出结果
                let [cardEnd, huase, maxVal, oxArr] = [[], [], [], []];
                // 大小判断--输赢权重 数字越大权重越高
                //      J/Q/K  == 1 2 3 4 / 5 6 7 8 / 9 10 11 12
                //      牛1~10 == 20~32 40~52 ... 200~212
                //      五花牛 == 999
                // 递归算牛
                ! function result () {
                    var ResNum = Math.random()*13+1>>0;
                    var colorSe = color[Math.random()*4>>0];
                    var Res = colorSe + `${ResNum}`;
                    card.indexOf(Res) < 0 ? card.push(Res)
                     && cardEnd.push(ResNum)
                     && huase.push(colorSe)
                     && result () : 
                    card.length < 35 ? result () : false;
                } ()
                
                // 数组分离
                for(var i=0; i<7; i++){
                    OXcard.push([])
                    for(var o=0; o<5; o++){
                        // OXcard[i].push(cardEnd[i*5 + o])
                        OXcard[i].push(cardEnd[i*5 + o])
                    }
                }
                
                // 牛几计算
                for(var Q=0; Q<7; Q++) {
                    let [count, suanOX, maxNum] = [0,0,0];
                    oxIS(0,1,2)
                    // 结果
                    function oxIS (i,j,o) {
                        count++;
                        var iox = OXcard[Q][i] > 10 ? 10 : OXcard[Q][i];
                        var jox = OXcard[Q][j] > 10 ? 10 : OXcard[Q][j];
                        var oox = OXcard[Q][o] > 10 ? 10 : OXcard[Q][o];
                        if(((iox + jox + oox) / 10)%1 === 0){

                            var arr = [0, 1, 2, 3, 4];
                            var arrNum = 0;
                            arr.forEach(item=>{
                                if(item != i && item != j && item != o) {
                                    arrNum += OXcard[Q][item] > 10 ? 10 : OXcard[Q][item];
                                } 
                            })
                            arrNum = arrNum%10;

                            if(arrNum > maxNum && arrNum != 0){
                                maxNum = arrNum;
                            } else if(arrNum == 0){
                                maxNum = 10;
                            }
                        }
                        o++;
                        if(o > 4) { j++; o = 3; }
                        if(j > 3) { i++; j = 2; }
                        i >= j ? j=i+1 : false;
                        j >= o ? o=j+1 : false;

                        if(count >= 10) {
                            return false;
                        } else {
                            oxIS (i,j,o)
                        }
                    }
                    if(maxNum <= 0){
                        oxArr.push(nickname[0])
                        maxVal.push(0)
                        resultNum.push(0)

                    } else {
                        oxArr.push(nickname[maxNum])
                        maxVal.push(maxNum)
                        resultNum.push(maxNum)
                        // maxVal.push(20+Number(maxNum))
                    }

                    // 五花牛算法
                    var wuhuaOX = 0;
                    for(var i=0; i<5; i++){
                        OXcard[Q][i] > 10 ? wuhuaOX++ : false;
                    }
                    if(wuhuaOX >= 5){
                        oxArr.splice(Q, 1, nickname[11]);
                        maxVal.splice(Q, 1, 999);
                        resultNum.splice(Q, 1, 11);
                    }
                }
                // 权重算法
                for(var i=0; i<7; i++){
                    ox(i)
                }
                function  ox(idx){
                    // 数组中最大数值
                    var oxMax = Math.max.apply( Math, OXcard[idx] );
                    // 算重
                    if( (oxMax > 10 || oxArr[idx] != nickname[0]) && maxVal[idx] != 999) {
                        var [maxDouble, q, oxse] = [ [], 0, '' ];

                        OXcard[idx].map(function(item){
                            if(item == oxMax){
                                maxDouble.push(q)
                            }
                            q++;
                        })

                        var a00 = huase[(idx+1)*5-(5-maxDouble[0])];
                        var shu = 0;
                        shu = oxMax == 12 ? 4 : oxMax == 13 ? 8 : 0;
                        if( oxArr[idx] != nickname[0] ) {
                            shu += 20*maxVal[idx]
                        } 

                        if(maxDouble.length > 1) {
                            var a01 = huase[(idx+1)*5-(5-maxDouble[1])];
                            if(color.indexOf(a00) > color.indexOf(a01)){
                                oxse = a01;
                            } else {
                                oxse = a00;
                            }
                        } else {
                            oxse = a00
                        }
                        if(oxMax > 10){
                            switch (oxse) {
                                case 'spade' :
                                    maxVal.splice(idx, 1, 4+Number(shu))
                                    break;
                                case 'heart' :
                                    maxVal.splice(idx, 1, 3+Number(shu))
                                    break;
                                case 'clubs' :
                                    maxVal.splice(idx, 1, 2+Number(shu))
                                    break;
                                default :
                                    maxVal.splice(idx, 1, 1+Number(shu))
                            }
                        } else {
                            maxVal.splice(idx, 1, Number(shu))
                        }
                    }
                }
                this.cardURL.result = oxArr;
                this.cardURL.maxVal = maxVal;

                let num = this.init.cardFn;
                this.cardURL.zhuang = Math.random()*num>>0 // 庄牌位置

                this.roomStyle(4)   // 牛牛牌型、权重、庄位发送
            },
            gameStart(type) {       // 游戏流程入口
                this.ordinary.pond = this.init.pond;
                if(this.$store.state.data.Ztype['zn_room_id'] == this.$store.state.idRoom.id){
                    this.host.allType = 1;  // 进入游戏状态
                } else {
                    this.host.allType = 0;  // 无庄不能开
                }
                this.ordinary.allPay = [0, 0, 0, 0, 0, 0, 0]

                if(this.init.ForT == 1){    // 房主进行牛牛计算
                    this.algorithm();
                }
                switch (type) {
                    case 1 :
                        this.daoTime ()     // 倒计时
                        this.init.juCount++;  // 庄局数
                        this.$store.state.data.juAll++; // 总局数累加
                        if(this.$store.state.idRoom == 1){
                            this.$store.state.data.juAll--;
                        }
                    break;
                    case 2 :
                        this.bank ()        // 随机选庄
                    break;
                    case 3 :
                        this.countDown ()   // 发牌以及倒计
                    break;
                    case 4 :
                        this.FZ ()          // 翻转
                    break;
                    case 5 :
                        this.settlement ()  // 单局结算等待
                    break;
                }
            },
            daoTime () {        // 1、准备开始倒计时
                
                let self = this;

                var $idRoom = self.$store.state.idRoom;
                this.init.time = this.time.initTime;
                
                
                self.roomStyle(6)       // 游戏状态储存--准备开始
                pageTimer["timer01"] = setInterval( ()=> {
                    self.init.time--;
                    if(self.init.time < 0) {
                        self.bank()
                        clearInterval(pageTimer["timer01"])
                    }
                },1000)
            },
            bank () {           // 2、随机选庄家牌
                let self = this;
                self.cardURL.zhuang = self.TTT.zhuang     // 庄位置
                let num = this.init.cardFn;
                let arrZ = num == 5 ? [0, 1, 3, 4, 5] : [0,1,2,3,4,5,6];
                this.init.textStyle = 2;
                self.roomStyle(7)   // 游戏状态储存--随机庄牌
                self.init.time = self.time.random;
                pageTimer["timer02"] = setInterval( ()=> {
                    self.init.time--;
                    if(self.init.time < 0) {    

                        self.time.index = arrZ[self.cardURL.zhuang]; // 庄的位置

                        self.ordinary.bg = true;
                        self.countDown();
                        clearInterval(pageTimer["timer03"])
                        clearInterval(pageTimer["timer02"])
                    }
                },1000)
                let i = self.time.index;

                pageTimer["timer03"] = setInterval(function(){
                    i++;
                    if(num == 7){
                        i >= 7 ? i=0 : false; 
                        self.time.index = i; 
                    } else if(num == 5){
                         i >= 5 ? i=0 : false; 
                        self.time.index = arrZ[i];
                    }
                },self.time.speed)
            },
            countDown () {          // 3、发牌以及倒计时
                let self = this;
                if(self.$store.state.idRoom.ForT == 0){     // 普通玩家
                    self.cardURL = self.TTT     // 上牌型
                }
                self.roomStyle(8)   // 游戏状态储存--可押注开始
                self.init.textStyle = 3;
                self.init.time = self.$store.state.idRoom.time;
                self.cardURL.c3Type[0] = 'start' ;
                self.cardURL.c3Type[1] = 'card0' ;
                
                // 延时器-发完牌后 -- 押注倒计时
                Timeout['setT2'] = setTimeout( ()=>{
                    pageTimer['timer04'] = setInterval( ()=> {
                        if(self.init.time >= 1){
                            self.init.time-- ;
                        } else {
                            self.cardURL.c3Type[2] = 'reversal';
                            self.cardURL.c3Type[3] = 'reveEnd';
                            self.FZ();
                            clearInterval(pageTimer['timer04']);
                        }
                        if(self.init.time == 1){    // 中止下注 
                            self.roomStyle(3)
                        }
                    } , 1000);
                } , 800 );
            },
            FZ () {                 // 4、翻转FZ 算输赢
                let self = this;
                try{this.$refs.onplayerBottomChild['playerBottom']=false;}catch(e){};
               
                self.gameOver.show=true;
                // 算输赢/发送胜负请求
                self.sfEng ()
                // 翻转剩下的牌
                Timeout['setT3'] = setTimeout(()=>{
                    self.roomStyle(9) 
                    self.init.textStyle = 4;
                    self.init.time = self.time.countTime;

                    pageTimer["timer05"] = setInterval( ()=> {
                        if(self.init.time >= 1){
                            self.init.time-- ;
                        } else {
                            self.gameOver.timeEng = true;
                            self.init.time = self.time.endTime;
                            
                            self.settlement()
                            clearInterval(pageTimer["timer05"]);
                        }
                    } , 1000);

                }, 250)
            },
            settlement () {        // 5、单局结算等待时间
                let self = this;
                self.roomStyle(10)
                self.init.textStyle = 5;

                self.win.css = self.win.cssZZ
                self.win.cssFen = self.win.cssZZF
                this.win.fen += Number(self.win.zorp[1])      // 个人分数
                var f = this.$store.state.data.Ztype.zn_points;
                this.$store.state.data.Ztype.zn_points = Number(f)+Number(self.win.zorp[0]);   // 庄分数


                pageTimer["timer06"] = setInterval(()=>{
                    if(self.init.time == 2){
                        var ju = self.$store.state.idRoom.ju
                        if(ju != null && ju >= 0 && Number(self.init.juCount) >= Number(ju)){ // 庄家局数够时
                            self.host.allType = 0;
                            self.init.juCount = 0;  // 当场游戏局数清0
                            if(self.$store.state.data.Zlist[0] != undefined && self.$store.state.idRoom.ForT == 1){
                                self.shangZ()
                            } // 庄列表查询，有人则自动切换
                        }
                    }
                    if(self.init.time >= 1){
                        self.init.time-- ;
                    } else {
                        self.gameStyle ();
                        self.list()
                        if(self.host.allType == 0) {   // 手动停止
                            self.clearGameStyle()
                            self.init.textStyle = 0;
                            self.roomStyle(1)
                        }

                        clearInterval(pageTimer["timer06"]);
                    }

                    
                }, 1000)
            },
            shangZ () {
                var self = this;
                http.post( '/RoomJoin/setMakers', { // 直接下一个上庄
                            roomid: self.$store.state.idRoom.id,
                            id: self.$store.state.data.Zlist[0].zn_member_id || 0,
                            type: 1,  // 1为设置庄家，2为下庄
                        })
                    .then(res => {
                        if(res.status == 0){
                            self.shangZ()
                        } else if(res.status == 1){
                            self.roomStyle(2); 
                        }
                    })
            },
            sfEng () {                 // 输赢结果
                let maxVal = this.cardURL.maxVal;   // 权重
                let ox = this.cardURL.resultNum    // 牛结果数字化
                let idx = this.time.index;        // 庄位置
                let ya = this.ordinary.pay;      // 押注分数
                let db = this.$store.state.idRoom.oxNumber;  // 投注倍率
                let oxK = this.init.oxK;       // 比什么
                let maxValEng = [];           // 最终结果
                // 输赢计算
                ki(idx)
                function ki(i){
                    var DYval = 0;
                    switch (oxK) {
                        case '比Q' : 
                            DYval = 4
                            break;
                        case '比K' : 
                            DYval = 8
                            break;
                        case '无牛关机 (庄赢)' :
                            DYval = 12
                            break;
                    }
                    maxValEng[i] = 99;
                    maxVal.map(function(k,index){
                        if(index != i && Math.abs(maxVal[i]-k) > DYval ){
                            maxVal[i] > k ? maxValEng[index] = 0 :
                            maxValEng[index] = 1;
                        } else if(index != i){
                            maxValEng[index] = 0
                        }
                    })
                }
                this.cardURL.end = maxValEng;      // 发送输赢结果==========================================
                // 根据压什么计算加减分
                // console.log(ox)
                // console.log(db)
                // console.log(ya)
                // console.log(maxValEng)
                // 输赢计算 --------普通玩家
                var water = this.$store.state.idRoom.scale; // 抽水比例
                var zFenAll = 0;    // 庄的输赢总分
                var fenAll = 0;     // 普通玩家输赢总分
                var yapai = []; // 压第几副牌
                for(var i=0; i<7; i++) {
                    if(ya[i][2] > 0){
                        yapai.push(i+1)
                        fenAll += ya[i][2]
                        if(maxValEng[i] == 1){
                            fenAll += (ya[i][1])*1 + (ya[i][0])*(db[ox[i]*1]*1)     // 闲赢
                            zFenAll -= (ya[i][1])*1 + (ya[i][0])*(db[ox[i]*1]*1);    // 庄输
                            // 普赢庄输
                            // this.win.cssZZ = ['yin',  'shu',  'yin']
                            // this.win.cssZZF = [`+${fenAll}`, `-${ZfenAll}`, '+0']

                        } else {    // 亏了多少分
                            fenAll -= ((ya[i][1])*1 + (ya[i][0])*(db[ox[idx]*1]*1)) // 闲输
                            zFenAll += ((ya[i][1])*1 + (ya[i][0])*(db[ox[idx]*1]*1)); // 庄赢
                            // 庄赢
                            // this.win.cssZZ = ['shu', 'yim', 'yin']
                            // this.win.cssZZF = [`-${fenAll}`, `+${ZfenAll}`, `+${ZfenAll}`]
                        }
                    }
                }
                var obj = {}    // 资料储存
                obj["yapai"] = yapai.join("");
                obj['fen'] = this.win.fen // 自己的分数
                obj['syfen'] = fenAll // 这轮输赢的分数
                obj['zfen'] = zFenAll // 庄这轮的输赢分数
                var pu = 'yin'; // 普通玩家
                var puF = fenAll; // 普通玩家的分
                var z = 'shu'; // 庄家
                var zF = zFenAll; // 庄家的分
                var sF = 0; // 抽水分数的分
                if(zFenAll > 0){    // 中转计算
                    sF = zFenAll*water/100 
                    obj['sF'] = Number(sF)
                    this.host.oxWater += Number(sF)
                    z = 'yin'
                    zFenAll -= Number(sF)
                    zF = `+${zFenAll}`
                } else if(zFenAll < 0){
                    zF = `${zFenAll}`
                }
                if(fenAll >= 0){
                    puF = `+${fenAll}`
                } else if(fenAll < 0){
                    pu = 'shu';
                    puF = `${fenAll}`
                }
                this.win.cssZZ = [pu, z, 'yin']
                this.win.cssZZF = [puF, zF, `+${sF}`]
                console.log(this.win.cssZZF)
                // console.log(zFenAll)
                // console.log(fenAll)
                this.win.zorp = [zFenAll, fenAll];
                if(this.$store.state.idRoom.ForT == 0){ // 房主不参与游戏
                    this.gameO(obj)
                }
                   // 发送输赢分数=============================================
                   // 返回总分  //(zn_points)
            },
            gameO (obj) {   // 存储游戏结果
                var self = this;
                var ox = this.cardURL.resultNum.slice(0,7)    // 牛结果数字化
                var idRoom = this.$store.state.idRoom
                ox.push(self.cardURL.zhuang)    // 添加
                // console.log(ox)
                http.post('/GameLog/createGameLog',{
                    zn_member_id: localStorage.oxUid,   // 用户id
                    zn_points_total: 0,     // 房间总分
                    zn_room_id: idRoom.id,  // 房间id
                    zc_is_boss: self.init.ForZ == 1 ? 1 : 2,    // 是否为庄
                    zn_number: self.$store.state.data.juAll,     // 总游戏局数
                    zn_points_give: self.init.ForZ == 1 ? obj.sF : 0,     // 抽水分数
                    zn_points_left: self.init.ForZ == 1 ? Number(obj.fen)+Number(obj.zfen) : Number(obj.fen)+Number(obj.syfen),  // 结余分数
                    zc_result: JSON.stringify(ox), // 压牌结果
                    zn_few: obj.yapai,  // 第几副牌ox.join("")
                    zc_name: localStorage.oxName,   // 用户昵称
                    zn_process: self.init.ForZ == 1 ? obj.zfen : obj.syfen, // 流水分数
                })
                .then(res => {
                })
            },
            orderPower(online){    // br-高分排列
                delete online['count'];
                var [self,fanid] = [this,this.$store.state.idRoom.id];
                var height = [];
                var typeCount = 0;  // 计算有无庄
                self.init.totalFen = 0; // 计算总分前清零
                for(var i in online){
                    self.init.totalFen += Number(online[i].zn_points)    // 房总分计算
                    if(!self.$store.state.data.Room[fanid+'id']){
                        self.$store.state.data.Room[fanid+'id'] = [];
                    }
                    if(self.$store.state.data.Room[fanid+'id'].indexOf(online[i].zn_member_id)<0){
                        self.$store.state.data.Room[fanid+'id'].push(online[i].zn_member_id)
                    }   // 申请加分聊天辅助

                    if(online[i].zn_makers == 1){   // 庄的数据
                        self.$store.state.data.Ztype = online[i];
                        typeCount++;
                    }

                    if(online[i].zn_member_id == localStorage.oxUid){   // 自己的姓名分数
                        self.playersName = online[i].zn_member_name;
                        self.win.fen = online[i].zn_points;
                        if(online[i].zn_makers == 1){   // 自己是庄
                            self.init.ForZ = 1;
                        } else {
                            self.init.ForZ = 0;
                        }
                    }
                    if(i==0){   // 启动
                        height.push(online[i])
                    }
                    for(var j=0; j<height.length && i != 0; j++){   // 排序
                        if(Number(online[i].zn_points) >= Number(height[j].zn_points)){
                            height.splice(j,0,online[i]);
                            break;
                        }
                    }
                    if(height.indexOf(online[i]) < 0){  // 低分插入
                        height.push(online[i])
                    }
                }
                if(typeCount == 0){   // 无庄
                    self.$store.state.data.Ztype = {};
                }
                this.players = height
                self.$store.state.data.Room["id"] = height;    // 房间数据缓存
            },
            list () {               // 玩家列表
                var self = this;
                var roomData = self.$store.state.data.Room;
                self.$store.state.self.addtype = 0
                http.post('/RoomJoin/getJoinRoomList',{
                    p: 1,
                    pagesize: 100,
                    roomid: this.init.id,
                })
                .then(res => {
                    if(res.status == 1){
                        if(!roomData[`${self.init.id}`]){   // 首次进入存储
                            roomData[`${self.init.id}`] = [];
                            self.$store.state.data.Room = roomData;
                        }
                        self.orderPower(res.data)
                    }
                })
            },
            roomStyle (type) {      // 游戏状态
                var self = this;
                if(self.$store.state.idRoom.ForT == 1){
                    var dataArr= this.cardURL;
                    dataArr = JSON.stringify(dataArr)
                    // console.log(dataArr)
                    http.post('/Room/setRoomStatus',{
                        zn_room_id: this.init.id,
                        zn_status: type,
                        zn_text: dataArr,
                    })
                    .then(res => {
                        console.log(res)
                    })
                }
            },
            liaotian () {   // 找房主的人
                if(!!this.$store.state.data.zhaoFZ[0]) {    // 有人等待的时候
                    var zid = this.$store.state.data.zhaoFZ[0]
                    router.push({path: `/chartRoom/[1,${this.$store.state.idRoom.room_id},${zid},1,"找房主的人",${this.$store.state.idRoom.id}]`});
                    this.$store.state.data.zhaoFZ.shift()
                }
            },
            speak (e) {   // 点击加减分
                let Etar = e.target;
                var self=this;
                var Tar = () => {
                    var EtarName = Etar.nodeName.toLowerCase();
                    if(EtarName == 'li'){
                        var nodeValue = Etar.attributes["id"].nodeValue;
                        if(self.$store.state.idRoom.ForT == 1) {    // 房主才可以
                            router.push({path: `/chartRoom/[1,${self.$store.state.idRoom.room_id},${nodeValue},1,"找房主的人",${self.$store.state.idRoom.id}]`});
                        }
                        return false;
                    } else if(EtarName == 'body'){
                        return false;
                    } else {
                        Etar = Etar.parentElement;
                        Tar();
                    }
                };
                Tar();              
            },
            applyList () {  // 庄申请人列表
                var self = this;
                http.post('/RoomJoin/getMakerList',{
                    roomid: self.$store.state.idRoom.id, // 房间idZtype
                })
                .then(res => {
                    if(res.status == 1){
                        var [zCount,zi,data,res,id] = [0,-1,self.$store.state.data,res.data,this.init.uid];
                        data.Zlist=res
                        res.forEach((item,idx)=>{
                            item.zn_member_id == id ? zCount++ : -1;
                            item.zn_makers == 1 ? zi = idx : -1;
                        })
                        zCount == 0 ? data.apptype = 0 : data.apptype = 1;
                        zi >= 0 ? data.Zlist.splice(zi,1) : -1;
                    }
                })
            },
            exit () {   // 退出房间
                if(this.$store.state.idRoom.ForT == 0){     // 普通玩家退出
                    http.post('/RoomJoin/closeRoom',{
                        roomid: this.init.id, // 房间id
                        id: this.init.uid,
                    })
                    .then(res => {})
                }
                router.push({name: 'home'});
            },
            initGame () {
                var self = this;
                http.post('/Room/getRooms',{
                        number: self.$route.params.id,
                    })
                    .then(res => {
                        if(res.status == 1) {
                            
                            var data = res.data;
                            var bl = JSON.parse(data.zc_rate);
                            var vx = this.$store.state.idRoom;

                            if(data.zn_member_id == localStorage.oxUid){
                                self.init.ForT = 1;
                                vx.ForT = 1;
                            } else {
                                self.init.ForT = 0;
                                vx.ForT = 0;
                            }

                            self.fangzhu = `/chartRoom/[2,${data.zc_number},${data.zn_member_id},${self.init.ForT},${JSON.stringify(data.zc_title)}]`;
                            self.chartRoom = `/chartRoom/[3,${data.zc_number},${data.id},${self.init.ForT},${data.zn_chatid}]`;

                            self.fanzhuID = data.zn_member_id;
                            
                            vx.room_id = data.zc_number;
                            vx.zn_chatid = data.zn_chatid;
                            vx.ju = data.zn_maker_number;
                            vx.id = data.id;
                            self.init.id = data.id;
                            vx.oxK = bl[12];
                            bl.splice(12,1)
                            vx.oxNumber = bl;
                            vx.roomName = data.zc_title;
                            vx.scope[0] = data.zn_bet_between_s;
                            vx.scope[1] = data.zn_bet_between_e;
                            vx.time  = data.zn_bet_time;
                            vx.scale = data.zn_extract;
                            vx.open = data.zn_room_type == 1 ? true : false; 
                            vx.newMan = data.zn_confirm == 1 ? true : false;
                            vx.cardFn = data.zn_play_type == 1 ? 5 : 7;
                            self.init.cardFn = data.zn_play_type == 1 ? 5 : 7;
                            vx.room = data.zn_pay_type == 1 ? 'bell' : 'day'
                            vx.minGrade = data.zn_min_score;
                            self.init.id = res.data.id;
                        }
                    })  // 更新房间刷新数据
            },
            gameResult (id) { // 先获取一波所有的游戏结果
                var self = this;
                var ForT = this.$store.state.idRoom.ForT;
                http.post( '/GameLog/getData', {
                            roomid: id,
                        })
                    .then(res => {
                        console.log(res.data)
                        if(res.status == 1){
                            var zWater = 0; // 庄总分
                            
                            self.$store.state.data.juAll = res.data.length;
                            
                            self.$store.state.data.listOver = [];

                            res.data.forEach((item,idx)=>{
                                var countEnd = 0; // 有无压判断
                                if(ForT == 1){  // 房主的开牛记录
                                    countEnd++;
                                    console.log(JSON.parse(item.DRs[0].zc_result))
                                    console.log(JSON.parse(item.DRs[0].zc_result)[7])
                                    self.$store.state.data.listOver.push({
                                        ox : JSON.parse(item.DRs[0].zc_result),
                                        few: 0,    // 房主不需要
                                        zzz: JSON.parse(item.DRs[0].zc_result)[7],
                                    })
                                }
                                item.DRs.forEach(xitem=>{
                                    if(ForT == 0 && xitem.zn_member_id == localStorage.oxUid){  // 普通玩家
                                        countEnd++;
                                        self.$store.state.data.listOver.push({
                                            ox : JSON.parse(xitem.zc_result),
                                            few: xitem.zn_few.split(''),
                                            zzz: JSON.parse(xitem.zc_result)[7],
                                        })
                                    }
                                    if(xitem.zc_is_boss == 1){
                                        zWater += Number(xitem.zn_points_give)
                                    }
                                })

                                if(countEnd <= 0 && ForT == 0){   // 没有押注
                                    self.$store.state.data.listOver.push({
                                        ox : JSON.parse(item.DRs[0].zc_result),
                                        few: 0,    // 不需要
                                        zzz: JSON.parse(item.DRs[0].zc_result)[7],
                                    })
                                }
                            })
                            self.$store.state.data.listOver = (self.$store.state.data.listOver).reverse();
                            console.log(self.$store.state.data.listOver) // 5牌的时候去掉下标3和6的数据
                            self.host.oxWater = zWater; // 总抽水
                        }
                    })
            },
    },
}
</script>