<template> 
    <keep-alive>
    <div id='room'>
        <img :src='srcImg' :style='"position:absolute;"+srcImgStyle+"transform:translate(-50%,-50%);width:1.2rem;height:1.2rem;"'/>
        <mt-popup 
            v-model="careTip"
            popup-transition="popup-fade"
            class="care" >
            <span>通知 <i @click="careTip = false">×</i></span>
            <p>{{errorTips}}</p>
            <mt-button @click="careTip = false">  确定
            </mt-button>
        </mt-popup >

        <!-- 头部 -->
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
                                <span @click='gameStyle(1)' >游戏中</span>
                                <span @click='gameStyle(2)' >暂停中</span>
                                <i class='triangle-up'></i>
                        </mt-popup>
                    </p>
                </li>
                <li>
                    <span @click='to(2)'><i></i>开奖记录</span>
                    <span @click='$refs.onWater.water=true'><i></i><a>流水报表</a></span>
                </li>
            </ul>


            <dl>
                <!-- 个人头像 -->
                <dt :class='!this.$store.state.data.zhaoFZ[0] ? "" : "DTtips"'
                @click='liaotian'>
                    <img @click='logic_ox' :src='$store.state.user.userImg' height="155" width="149" alt="" />
                </dt>
                
                <!-- 房主 -->
                <dd>
                    {{user.type == 1 ? "房总分：": "分数："}}
                    <span>{{init.ForT == 1 ? init.totalFen: win.fen}}</span>
                     &nbsp;&nbsp;&nbsp; 
                    房号：<span>{{user.number}}</span>
                </dd>
                
                <dd  @click='user.type == 1 ? varRoom() : 0'><i></i></dd>

                <dd  @click="$refs.ontoShareChild.toShare=true;">
                    <i></i>
                    <span>邀请好友</span>
                </dd>
                <dd>
                    <i></i>
                    <mt-swipe :show-indicators="false" :speed="800" :auto="5000">
                      
                        <mt-swipe-item><span>房主公告：{{message}}</span></mt-swipe-item>
                      
                        <mt-swipe-item><span>房主公告：{{message}}</span></mt-swipe-item>

                        <mt-swipe-item><span>房主公告：{{message}}</span></mt-swipe-item>
                    </mt-swipe>
                </dd>
            </dl>
        </header>
        <!-- 游戏主体 -->
        <div class='roomMain'>
            <!-- 左 -->
            <div class='left'>
                <ul>
                    <li @click='applyOn(0),chat(2,$store.state.data.Ztype.zn_member_id)'>
                        <div v-show='$store.state.data.Ztype["zn_points"] == null' class='konwei'>
                        </div>

                        <div v-show='$store.state.data.Ztype["zn_points"] == !null'>
                            <img src="src/image/room_left02.png" alt="" />
                            <img src="src/image/room_left01.png" />
                            <img class='leftZhuan' src="src/image/room002.png">
                            
                            <div class='leftImg'>
                                <img src="src/img/friend1.png" alt="" />
                                <span>{{$store.state.data.Ztype.zn_points}}999</span>
                            </div>
                        </div>
                        <p v-show='$store.state.data.Ztype["zn_points"] == !null'>{{$store.state.data.Ztype.zn_member_name}}</p>
                    </li>

                    <li  
                    v-for = '(data, index) in (dataList.pd[0]=="" ? 4 : dataList.pd)' 
                    @click='chat(2)' :key='data'>
                        <div>
                            <img src="src/img/roomK03.png" alt="" />
                            <img :src="'./src/img/roomPage0'+(index <= 1 ? index+2:4)+'.png'" alt="" />
                            <span>{{index+2}}</span>
                            <div class='leftImg'>
                                <img :src="dataList.dz[data].img" alt="" />
                                <span>{{dataList.dz[data].dian}}</span>
                            </div>
                        </div>
                        <p>{{dataList.dz[data].name}}</p>
                    </li>

                    <li v-for = 'num in (4-dataList.pd.length)'>
                        <div class='konwei'>
                        </div>
                    </li>

                </ul>
                <span :class='win.css[1]'>{{win.cssFen[1]}}</span>
            </div>
            <!-- 中间 -->
            <div class='center'>
                <!-- 移动用 -->
                <img src="src/image/card/bei.png" v-for='(num,idx) in main.cardNum*5' class='static_K' :style='move.trans[idx]'/>

                <div class="center_top">
                    <h1 @click='c3test'>{{init.text[init.textStyle]}}
                        <span v-show='init.textStyle >= 1'>{{init.time}}秒</span>
                    </h1>
                    <p>还可下注：{{init.pond}}</p>
                </div>
                <ul :class='$store.state.room.cardNum == 7 ? "ka7" :""' id='room_UL'>
                    <li 
                    v-for='(data,index) in $store.state.room.cardNum' 
                    :class='liType == index ? "hover":""' >
                    <!-- 牌 -->
                    <div class='pai'>
                        <img :src="`src/image/card/${logic.oxImg[index*5+0]}.png`" />
                        <img :src="`src/image/card/${logic.oxImg[index*5+1]}.png`" />
                        <img :src="`src/image/card/${logic.oxImg[index*5+2]}.png`" />
                        <img :src="`src/image/card/${logic.oxImg[index*5+3]}.png`" />
                        <img :src="`src/image/card/${logic.oxImg[index*5+4]}.png`" />
                    </div>

                    <!-- 筹码以及分数 -->
                    <div class="chou_fen">
                        <div class="not_zhuang" v-if='1'>
                            <img src="src/image/cc00.png" />
                            <p>999</p>
                            <p>10</p>
                        </div>
                        <img src="src/image/room002.png" v-if='0'/>
                    </div>
                    </li>
                </ul>
            </div>
            <!-- 右 -->
            <div class='right'>
                <span>
                    <img src="src/image/room009.png" alt="" />
                    <img src="src/image/room010.png"  @click='$store.state.Music.autoplay = !$store.state.Music.autoplay'/>
                </span>

                <ul>
                    <li
                    v-for='player in dataList.zz' 
                    @click='chat(2,player.zn_member_id)'
                    :key='player.uid'>
                        
                        <div>
                            <img src="src/img/roomK03.png" alt="" />
                            
                            <div class='leftImg'>
                                <img :src="player.img" />
                                <span>{{player.dian}}</span>
                            </div>
                        </div>
                        <p>{{player.name}}</p>
                    </li>

                    <li v-for='a in 5-dataList.zzNum'>
                        <div class='konwei'></div>
                    </li>

                </ul>
            </div>
        </div>
        <!-- 控制器 -->
        <div class='control'>
            <!-- 上下庄 -->
            <span @click="applyOn(99)" :class='[(user.type == 1 ? "zhuan" : ""),($store.state.data.apptype == 1 ? "win" : ""),("control_left")]'>
                {{user.type == 1 ? "申请上庄" : ""}}
            </span>
            <!-- 筹码 -->
            <span class='control_center' @touchend='liType = -1,srcImgStyle="z-index:-999;"'>
                <img :src="`src/image/c${true ? 'c' : 'h'}01.png`"  @touchmove='true ? moveK() : false'/>
                <img :src="`src/image/c${true ? 'c' : 'h'}02.png`"  @touchmove='true ? moveK() : false'/>
                <img :src="`src/image/c${true ? 'c' : 'h'}03.png`"  @touchmove='true ? moveK() : false'/>
                <img :src="`src/image/c${true ? 'c' : 'h'}04.png`"  @touchmove='true ? moveK() : false'/>
                <img :src="`src/image/c${false ? 'c' : 'h'}05.png`" @touchmove='false ? moveK() : false'/>
            </span>
            <span class='control_right'>
                <img :src="`src/image/room006${bei? '':'6'}.png`" alt="" @click='bei=1'/>
                <img :src="`src/image/room007${bei? '':'7'}.png`" alt="" @click='bei=0'/>
            </span>
        </div>
        <!-- 尾部 -->
        <footer>
            <ul>
                <li @click='$refs.onfriendVIPChild.friend_VIP=true'>
                    好友<span class='dot'>999</span>
                </li>
                <li @click='chat(3)'>
                    聊天室<span class='dot' v-show='$store.state.system.Q_amount[`${user.qid}`] >0'>{{$store.state.system.Q_amount[`${user.qid}`]}}</span>
                </li>
                <li v-show='init.ForT == 1' @click='$refs.onMessage.message=true'>
                    <a>发布公告</a>
                </li>
                <li v-show='init.ForT == 0' @click='chat(2,user.fid)'>
                    联系房主
                </li>
                <li class='roomScore' v-show='init.ForT == 1' 
                    @click="to(3)">
                    <b :class='win.css[2].length > 0 ? "a" : ""'>{{host.oxWater}}
                    <span :class='win.css[2]' v-show='win.css[2].length > 0 ? true : false'>{{win.cssFen[2]}}</span></b>
                    <b>奖金分数</b>
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
        <friendVIP ref="onfriendVIPChild"></friendVIP>
        <waterReport ref="onWater"></waterReport>
        <message ref="onMessage"></message>
        
        <loading v-if='loading'></loading>
    </div>
    </keep-alive>
</template>

<script type="text/javascript">
    import './room.scss';
    import Vue from 'vue';
    import router from '../../router/';
    import http from '../../utils/httpClient.js';
    import { Swipe, SwipeItem } from 'mint-ui';
    // 组件
    import toShare from '../../module/shareModule/toShare.vue'; // 邀请
    Vue.component('toShare', toShare)
    import setRoom from '../../module/homeModule/varRoom.vue';  // 修改房间设置
    Vue.component('varRoom', setRoom)

    import prize from '../../module/roomModule/openRecords.vue';
    import playerBottom from '../../module/roomModule/playerBottom.vue';
    import applyOn from '../../module/roomModule/applyOn.vue';
    import singleBoard from '../../module/roomModule/singleBoard.vue';

    import loading from '../loading/loading.vue';
    Vue.component('loading', loading)
    import friendVIP from '../friend/friend.vue'; // 原好友
    Vue.component('friendVIP', friendVIP)
    import waterReport from './waterReport.vue';  // 原流水报表
    Vue.component('waterReport', waterReport)
    import message from '../message/message.vue'; // 原房主公告
    Vue.component('message', message)

    Vue.component('prize', prize)
    Vue.component('applyOn', applyOn)
    Vue.component('playerBottom', playerBottom)
    Vue.component('singleBoard', singleBoard)

    // 定义所有定时器
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
                errorTips: '',      // 提示内容
                careTip : false,    // 提示窗

                user : {       // 房间初始化数据
                    rid: 0,          // 房间id
                    fid: 0,         // 房主id
                    qid: 0,         // 群聊id
                    number: 0,      // 房间号码
                    type: 0,        // 当前房间状态 1-房主 2-庄 3-普通玩家
                },
                dataList : {        // 房间内玩家数据
                    z : {},           // 庄的数据
                    pd: [],           // 排队顺序
                    dz: {},           // 等待上庄人员的数据
                    zz: {},           // 其余成员的数据
                    zzNum: 0,        // 3状态人数
                    dict:{},          // 字典--匹配
                },

                header : {        // 头部中的功能模块
                },
                main : {        // 主体游戏流程代码
                    cardNum : 5,        // 扑克牌数
                    minFen  : 0,        // 最低上庄分数
                    minYa   : 0,        // 下注范围
                    maxYa   : 0,        // 下注范围
                },
                logic : {       // 主体逻辑代码
                    oxImg : [],         // 牛牛路径

                },
                move : {        // 卡牌动效控制
                    trans: [],      // 背面移动位置
                    bei_s : 0.6,    // 背面移动速度

                },




                CHAT_QUN: '',  // 群聊路由
                fangzhu: '',    // 房主路由

                fanzhuID: '',   // 房主id
                fanzhuName: '',   // 房主名字
                liType: -1,     // 手指移动到哪个li上面
                liInit: false,     // 手指移动到哪个li上面禁止与开始
                srcImg: '',     // 移动筹码的img
                srcImgStyle: '',    // xy位置
                allType: 0,

                bei: 0, // 选择有倍无倍
                message : this.$store.state.placard.message,
                roomData999: [],  // 房间数据列表
                Ztype: {},      // 庄的数据

                init: {     // 初始化
                    ForT: this.$store.state.idRoom.ForT || 0,  // 1是房主0是普通
                    time: 0,         // 游戏时间控制
                    ju: 5,          // 游戏局数
                    juCount: 0,       // 下庄局数计算
                    id: 0,          // 房间id
                    uid: localStorage.oxUid,    // 自己的id
                    room_id: this.$store.state.idRoom.room_id,
                    cardFn: this.$store.state.idRoom.cardFn,  //几牌  
                    oxK: this.$store.state.idRoom.oxK,
                    scope: this.$store.state.idRoom.scope,  // 可下注范围
                    pond: 0,    // 设定下注池
                    text: ['游戏暂未开始', '准备开始：', '随机庄牌：', '可押注时间：', '开牌倒计时', '开牌结果'], // 游戏状态
                    textStyle : 0, // 对应状态码   [0, 1, 2, 3, 4, 5]
                    oxNumber: this.$store.state.idRoom.oxNumber,// 倍率
                    totalFen: 0,    // 房总分

                    fen: 5000, // 庄总分
                    ForZ: 0,// 庄时状态为1
                    juAll: 0, // 游戏总局数
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
                    src : ["src/img/Z999.png", "src/img/cardPlus/"],
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
            let self = this ;
            self.initAllData();
            self.newData()  ;
            
        },
        methods: {
            c3test: function(){ // 发牌动作
                var self = this;
                var pai = document.getElementsByClassName('pai');
                var kaNum = this.main.cardNum;          // 玩几牌的
                var s = this.move.bei_s;     // 背牌移动速度
                self.move.trans = [];   // 测试用-清除数据
                
                pai_mover(0,0,0);
                function pai_mover(i,n,o){
                    if(o == kaNum*5){
                        return false;
                        // i=0;n=0;o=0;
                        // self.move.trans = [];
                    }
                    var pai2 = document.getElementsByClassName('static_K')[o].getBoundingClientRect();
                    var imgs= pai[i].children[n].getBoundingClientRect();
                    self.move.trans.push("transform:translate(-"+(pai2.x-imgs.x)+"px,"+(imgs.y-pai2.y)+"px);transition:transform "+s+"s ease;z-index:1"+n);
                    setTimeout(function(){
                        if(i==kaNum-1){
                            i=-1;n++;
                        }
                        pai_mover(++i,n,++o);
                    },s*1000)
                    
                }

            },
            chat(n,sheId){  // n=个人状态,sheId=要联系人的id,
                var obj = {
                    rank : this.user.type,      // 在房间的状态
                    sheId,      // 联系人id

                    qid  : this.user.qid,       // 群id
                    rid  : this.user.rid,        // 房间id
                    rnum : this.user.number,    // 房间Num
                    type : n,                   // 对应聊天状态
                }
                this.$refs.onfriendVIPChild.friend_VIP=true;
                this.$refs.onfriendVIPChild.inlet(obj)

                if(n==1){    // 选择人聊天

                }
                else if(n==2){ // 加减分
                    
                }
                else if(n==3) { // 群聊
                    // 清除未读条数显示
                    this.$store.state.system.Q_amount[`${this.user.qid}`]=0;
                    this.$store.state.system.t=0;
                }

                
                
            },
            goeasy(goEasy_ID){
                goEasy.subscribe({
                    channel: 'room_' + goEasy_ID,
                    onMessage: function(message){
                        console.log('接收到消息:'+JSON.parse(message.content))
                        console.log(message)
                        console.log(JSON.parse(message.content))
                        var data = JSON.parse(message.content);
                        var type = data.type;
                        switch(type){
                        case 1 :                            // 通知有人加入
                            if(data.zn_member_id == localStorage.oxUid){
                                return false;
                            }
                            console.log(data)
                            self.list()  // 更新成员
                            break;
                        case 2 :                            // 通知房主有人加入
                            console.log(data)
                            break;
                        case 4 :                            // 通知房间已解散
                            alert('房间已被房主解散')
                            router.push({name: 'home'});
                            break;
                        case 5 :// 已做修改                 // 通知有人分数变化
                            console.log(data)
                            if(self.init.ForT == 1){
                                self.init.totalFen = data.totalPoints;
                            }
                            self.list()  // 更新分数
                            break;
                        case 6 :                            // 通知有人退出房间
                            console.log(data)
                            self.list()  // 更新列表
                            self.applyList()
                            break;
                        case 7 :                            // 通知有人成为庄家
                            console.log(data)
                            self.list()  // 更新列表
                            self.applyList()
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
                        case 10:   // 房主公告
                            console.log(data)
                            self.message = data.content;
                            // 公告
                            break;
                        case 11:                            // 重新开局
                            console.log(data)
                            // self.list()         // 新庄家
                            // self.applyList ()
                            break;
                        case 12:                            // 发牌中
                            self.TTT = JSON.parse(data.data);
                            break;
                        case 13:                            // 房主开始游戏

                            self.host.allType = 1;
                            self.init.textStyle = 0;
                            self.K ();
                            self.gameResult(self.$store.state.idRoom.id);
                            break;
                        case 14:                            // 房主暂停游戏
                            self.host.allType = 0;
                            // self.init.textStyle = 0;
                            // self.init.text[0] = '游戏暂未开始';
                            break;
                        case 15:                            // 中止下注
                            console.log(data)
                            break;
                        case 16:                            // 更新房间信息
                            console.log(data)
                            self.initGame()
                            break;
                        }
                        
                    }
                }); // 注册goeasy
            },
            moveK(ev){   // 拖动筹码
                var mainBody = this.main;

                ev = ev || event;
                var a = document.getElementById('room_UL');
                var aleft = document.getElementsByClassName('left')[0].getBoundingClientRect().width;
                var b = a.childNodes[0];
                
                var kaNum = mainBody.cardNum;          // 玩几牌的
                var ul_H = a.getBoundingClientRect().height;          // ul总高度
                var ul_W = a.getBoundingClientRect().width;          // ul总高度
                var li_H = a.getBoundingClientRect().height/kaNum;    // 小盒子所占高度
                var li_W = b.getBoundingClientRect().width;          // 小盒子所占宽度
                var offsetW = (ul_W - li_W)/2 + aleft;             // 左边固定距离
                var offsetH=a.offsetTop;    // 顶部固定距离

                getTop(b)
                function getTop(e){
                  offsetH=e.offsetTop;
                  if(e.offsetParent!=null) offsetH+=getTop(e.offsetParent);
                  return offsetH;
                }
                
                if (ev.changedTouches.length == 1) {    // 只有一个手指触摸
                    var touX = ev.changedTouches[0].pageX;
                    var touY = ev.changedTouches[0].pageY;
                    this.srcImg = ev.target.src;
                    this.srcImgStyle = `left:${touX}px;top:${touY}px;z-index:999;`;
                    // 不在ul内
                    if(touY < offsetH || touY > offsetH+ul_H || touX < offsetW || touX > offsetW+li_W){  
                        this.liType = -1;
                        return false;
                    }
                    this.liType = Math.floor((touY - offsetH)/li_H);    // 向下取整
                }
            },
            newData: function(){    // 初始化数据
                var main = this.main;   // 游戏主体数据
                var user = this.user;   // 用户初始数据
                var self = this;

                http.post('/Room/getRooms',{
                    number: self.$route.params.id,
                })
                .then(res => {
                    if(res.status == 1){
                        console.log(res)
                        var data = res.data;
                        var room = this.$store.state.room;  // 初始数据

                        user.rid = data.id;  // 房间id
                        user.fid= data.zn_member_id; // 房主id
                        user.qid= data.zn_chatid; // 群聊id
                        user.number = data.zc_number;  // 房间Num
                        data.zn_member_id == localStorage.oxUid ? // 是否庄
                        user.type=1:user.type=3;
     

                        main.cardNum = data.zn_play_type == 1 ? 5 : 7;  // 几牌
                        main.minFen = data.zn_min_score;  // 最低上庄分数
                        main.minYa = data.zn_bet_between_s;  // 押注范围
                        main.maxYa = data.zn_bet_between_e;  // 押注范围


                        this.goeasy(data.id)    // 注册goEasy
                        this.list() // 获取字典以及数据


                        this.$store.dispatch('webIM')       // 聊天配置
                        this.$store.dispatch('dl')         // 聊天登录
                        var addGroupMembers = function () {     // 加入群聊
                            var option3 = {
                                list: ['hz_niuniu_'+localStorage.oxUid],
                                roomId: user.qid,
                            };
                            conn.addGroupMembers(option3);
                        };
                        addGroupMembers()   // 群聊

                    }
                })
            },
            // dataList : {        // 房间内玩家数据
            //     z : {},           // 庄的数据
            //     dz: {},           // 等待上庄人员的数据
            //     zz: {},           // 其余成员的数据
            //     dict:{},          // 字典--匹配
            // },
            list () {           // 玩家列表
                var self = this;
                var dict = this.dataList.dict;  // 字典
                var z = this.dataList.z;        // 庄
                var dz = this.dataList.dz;      // sz
                var zz = this.dataList.zz;      // 普通玩家
                var count = 0;  // 计算


                http.post('/RoomJoin/getJoinMessage',{ // zn_maker_status
                    roomid: this.user.rid,
                })
                .then(res=>{
                    var data = res.msg;
                    if(res.status==1){
                        console.log(data)

                        for(var i=0; i<data.length; i++){
                            var datum = {
                                img : GAME_ALL_URL+data[i].zc_headimg,
                                name: data[i].zn_member_name,
                                dian: data[i].zn_points,
                                uid : data[i].zn_member_id,
                            }
                            dict[data[i].zn_member_id]=datum;   // 字典

                            if(data[i].zn_makers==1){ // 庄
                                z[data[i].zn_member_id]=datum;
                            } else if(data[i].zn_maker_status==1){ // 申请列表
                                dz[data[i].zn_member_id]=datum;
                            } else {
                                count++;
                                zz[data[i].zn_member_id]=datum;  // 普通玩家
                                this.dataList.zzNum=count;  // 计算人数
                            }
                        }
                    }
                })

                http.post('/RoomJoin/getMakerList',{
                    roomid: this.user.rid,
                })
                .then(res => {
                    if(res.status == 1){
                        console.log(res)
                        var data = res.data;
                        for(var i=0;i<data.length;i++){
                            this.$set(this.dataList.pd, i, this.dataList.pd[i]=data[i].zn_member_id);
                        }
                    }
                })
                

                for(var i in dict){
                    // dict[i].
                }

                console.log(zz)
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
                        console.log(online[i])
                        self.Ztype = online[i];
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
                self.roomData999 = height;    // 房间数据缓存
            },
            applyList () {  // 庄申请人列表
                var self = this;
                
            },
            logic_ox : function(){
                let oxImg = this.logic.oxImg;
                oxImg = [];
                var cardNum = this.main.cardNum;    // 几牌？

                // 递归算牛
                ! function result () {
                    var ResNum = Math.random()*13+1>>0;     // 1~13
                    var colorSe = ['a','b','c','d'][Math.random()*4>>0];// a~d
                    var Res = colorSe+ResNum;
                    oxImg.indexOf(Res) >= 0 ? result() : oxImg.push(Res) && 
                    oxImg.length < cardNum*5 ? result() : 0;
                } ()
                console.log(oxImg)
                this.logic.oxImg = oxImg;   // 反向赋值

            },




            initType(){   // 状态跟随 -- 初次进入状态
                var self = this;
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
            },
            initAllData(){
                var self = this;
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
                            self.init.pond = data.zn_min_score;     // 最小上分池

                            // 房主入口
                            self.fangzhu = `/CHAT_QUN/[2,${data.zc_number},${data.zn_member_id},${self.init.ForT},${JSON.stringify(data.zc_title)}]`;

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
                            // self.list()
                            self.initType()
                            self.applyList()
                            self.gameResult(data.id) // 查询游戏结果
                        }
                    })
            },
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
            playerBottom(index){     // 压分
                let [init, self] = [this.init, this];

                if(init.ForT == 1 || init.ForZ == 1) {  //房主和庄家不参与游戏
                    return false;
                }
                // if(init.textStyle == 3 && this.ordinary.pond > init.scope[0]){
                if(init.textStyle == 3){
                    console.log(index)
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
            gameStyle(n){       // 游戏流程--开始(1)
                var mainBody = this.main;   // 游戏主体数据
                var minFen = mainBody.minFen; // 最低上庄分数

                if( n=1 ){
                    this.roomStyle(2);   // 游戏开始
                }
                else if(n=2){
                    this.roomStyle(1);      // 游戏暂停
                }
                

                // var [self,Etxt,zPoints] = [this,this.host.allType,this.Ztype.zn_points];
                // this.host.style = false;

                // if(Etxt == 1){
                //     if(zPoints == undefined){
                //         noZ('请检查有无庄家')
                //     } else if(Number(zPoints) < minFen){
                //         this.roomStyle(1);      // 游戏暂停
                //         noZ('庄家分数低于最低上分数要求!');
                //     } else {
                //         this.roomStyle(2);   // 游戏开始
                //     }
                // } else {
                //     
                // }
                // function noZ(text){     // 错误报告
                //     self.host.allType = 0;
                //     self.errorTips = text;
                //     self.careTip = true;
                // }
            },
            K : function(){   // 游戏流程--socket开局(2)
                this.init.textStyle = 1;
                this.init.pond = this.$store.state.idRoom.minGrade;
                this.clearStyle()               // 定时器清空
                this.clearGameStyle()            
                this.gameStart(1);         // 执行游戏
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
            
            gameStart(type) {       // 游戏流程入口
                this.clearStyle()   // 清除所有状态
                this.ordinary.pond = this.init.pond;
                if(this.$store.state.data.Ztype['zn_room_id'] == this.$store.state.idRoom.id){
                    this.host.allType = 1;  // 进入游戏状态
                } else {
                    this.host.allType = 0;  // 无庄不能开
                }
                this.ordinary.allPay = [0, 0, 0, 0, 0, 0, 0];

                if(this.init.ForT == 1){    // 房主进行牛牛计算
                    this.algorithm();
                }
                switch (type) {
                    case 1 :
                        this.daoTime ()     // 倒计时
                        this.init.juCount++;  // 庄局数
                        Number(this.$store.state.data.juAll)+1; // 总局数累加
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
            countDown () {          // 3、发牌以及倒计时 reversal
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
                            maxValEng[index] = 0;
                        }
                    })
                }
                this.cardURL.end = maxValEng;      // 发送输赢结果======// 根据压什么计算加减分
                
                // 输赢计算 --------普通玩家
                var water = this.$store.state.idRoom.scale; // 抽水比例
                var zFenAll = 0;    // 庄的输赢总分
                var fenAll = 0;     // 普通玩家输赢总分
                var yapai = [];     // 压第几副牌
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
                    zn_number: Number(self.init.juAll)+1,     // 总游戏局数
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
            
            
            roomStyle (type) {      // 游戏状态
                var self = this;

                if(self.$store.state.idRoom.ForT == 1){
                    var dataArr= this.cardURL;
                    dataArr = JSON.stringify(dataArr)

                    http.post('/Room/setRoomStatus',{
                        zn_room_id: this.init.id,
                        zn_status: type,
                        zn_text: dataArr,
                    })
                    .then(res => {
                        if(res.status != 1){
                            self.errorTips = res.msg;
                            self.careTip = true;
                        }

                    })
                }
            },
            liaotian () {   // 找房主的人
                if(!!this.$store.state.data.zhaoFZ[0]) {    // 有人等待的时候
                    var zid = this.$store.state.data.zhaoFZ[0]
                    router.push({path: `/CHAT_QUN/[1,${this.$store.state.idRoom.room_id},${zid},1,"找房主的人",${this.$store.state.idRoom.id}]`});
                    this.$store.state.data.zhaoFZ.shift()
                }
            },
            
            
            exit () {   // 退出房间
                if(this.$store.state.idRoom.ForT == 0){     // 普通玩家退出
                    http.post('/RoomJoin/closeRoom',{
                        roomid: this.init.id, // 房间id
                        id: this.init.uid,
                    })
                    .then(res => {})
                }
                router.push({name: 'oxCrowd'});
            },
            initGame () {
                var self = this;

                http.post('/Room/getRooms',{
                        number: self.$route.params.id,
                    })
                    .then(res => {
                        console.log(res)
                        if(res.status == 1) {
                            
                            var data = res.data;
                            console.log(data)
                            var bl = JSON.parse(data.zc_rate);
                            var vx = this.$store.state.idRoom;

                            if(data.zn_member_id == localStorage.oxUid){
                                self.init.ForT = 1;
                                vx.ForT = 1;
                            } else {
                                self.init.ForT = 0;
                                vx.ForT = 0;
                            }

                            self.fangzhu = `/CHAT_QUN/[2,${data.zc_number},${data.zn_member_id},${self.init.ForT},${JSON.stringify(data.zc_title)}]`;
                            self.CHAT_QUN = `/CHAT_QUN/[3,${data.zc_number},${data.id},${self.init.ForT},${data.zn_chatid}]`;

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
                        // console.log(res.data)
                        if(res.status == 1){
                            var zWater = 0; // 庄总分
                            
                            self.$store.state.data.juAll = res.data.length;
                            self.init.juAll = res.data.length;
                            
                            self.$store.state.data.listOver = [];

                            res.data.forEach((item,idx)=>{
                                var countEnd = 0; // 有无压判断
                                if(ForT == 1){  // 房主的开牛记录
                                    countEnd++;
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
                                if(self.$store.state.idRoom.cardFn == 5){
                                    self.$store.state.data.listOver[idx]['ox'].splice(3,1);
                                    self.$store.state.data.listOver[idx]['ox'].splice(5,1);
                                    self.$store.state.data.listOver[idx]['ox'].pop();
                                }
                            })

                            self.$store.state.data.listOver = (self.$store.state.data.listOver).reverse();
                            // console.log(self.$store.state.data.listOver) // 5牌的时候去掉下标3和6的数据
                            self.host.oxWater = zWater; // 总抽水
                        }
                    })
            },
    },
}
</script>