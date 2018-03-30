<template> 
    <keep-alive>
    <div id='room'>
        <img v-for='(a,idx) in move.imgNum'  :src='move.srcImg[idx]' 
        :class='[(move.bounce[idx]!=undefined ? "bounce":""),("imgOne")]'  
        :style='"position:absolute;"+move.srcImgStyle[idx]+"transform:translate(-50%,-50%);width:1.2rem;height:1.2rem;"' />
        <mt-popup 
            v-model="careTip"
            popup-transition="popup-fade"
            class="care" >
            <span>通知 <i @click="careTip = false">×</i></span>
            <p>{{errorTips}}</p>
            <mt-button @click="careTip = false">  确定
            </mt-button>
        </mt-popup >

        <mt-popup 
            v-model="cuopai"
            popup-transition="popup-fade"
            class="cuopai" >
            <div>
                <div class='fourCard'>
                    <img v-for='idx in 4' :src="`src/image/card/${logic.oxImg[ka.index*5+idx-1]}.png`"/>
                </div>
                <div class='cuopaiCard' @touchstart='cuoinit' @touchmove='cuoka' @touchend='cuoEnd' :style='ka.heziType' >
                    <img src="src/image/cardPlus/bei.png" alt="" />
                    <img :src="`src/image/cardPlus/${logic.oxImg[ka.index*5+4]}.png`" alt="" :style='ka.img02'/>
                    <!-- <img src="src/image/cardPlus/bei.png" alt="" /> -->
                </div>
            </div>
        </mt-popup >

        <!-- 头部 -->
        <header>
            <ul>
                <li>
                    <i><a  @touchend='exit'></a></i>
                    <span>第<i>{{user.ju}}</i>局</span>
                    <p :class='user.initType >= 1 ? "open" : "" '>
                        <span>{{user.initType >= 1 ?  "游戏中" : "暂停中"}}</span>

                        <i v-show='user.type == 1' @click='user.ON_OFF=!user.ON_OFF'>
                            <b></b>
                        </i>
                        <mt-popup
                            v-model="user.ON_OFF"
                            :modal='false'
                            popup-transition="popup-fade"
                            class='gameStyle'>
                                <span @click='gameStyle(1),user.ON_OFF=false' >游戏中</span>
                                <span @click='gameStyle(2),user.ON_OFF=false' >暂停中</span>
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
                <dt :class='!this.$store.state.data.zhaoFZ[0] ? "" : "DTtips"'>
                    <img @click='logic_ox' :src='$store.state.user.userImg' height="155" width="149" alt="" />
                </dt>
                
                <!-- 房主 -->
                <dd>
                    {{user.type == 1 ? "房总分：": "分数："}}
                    <span>{{user.type == 1 ? user.allFen : user.myFen}}</span>
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
                    <li>
                        <div v-show='dataList.z.dian == undefined' class='konwei'>
                        </div>

                        <div v-show='Number(dataList.z.uid) >= 0'>
                            <img src="src/image/room_left02.png" 
                             @click='applyOn(0),chat(2,dataList.z.uid)'  />
                            <img src="src/image/room_left01.png" />
                            <img class='leftZhuan' src="src/image/room002.png" 
                            @click='user.type==1?$refs.onapplyOnChild.setOwner=true:0'>
                            
                            <div class='leftImg'>
                                <img :src="dataList.z.img" alt="" />
                                <span>{{dataList.z.dian}}</span>
                            </div>
                        </div>
                        <p v-show='Number(dataList.z.uid) >= 0'>{{dataList.z.name}}</p>
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
                <!-- .yin.shu -->
                <span :class='win.css[1]'>{{win.cssFen[1]}}</span>
            </div>
            <!-- 中间 -->
            <div class='center'>
                <!-- 移动用 -->
                <img src="src/image/card/bei.png" 
                v-for='(num,idx) in main.cardNum*5' class='static_K' 
                :style='"visibility:hidden;"+move.trans[idx]' />

                <div class="center_top">
                    <h1 @click='c3test'>{{user.initTxt[user.initType]}}
                        <span v-show='user.initType >= 2&&user.initType!=4'>{{time.time_x}}秒</span>
                    </h1>
                    <p>还可下注：{{main.minFen_x}}</p>
                </div>

                <ul :class='$store.state.room.cardNum == 7 ? "ka7" :""' id='room_UL'>
                    <li 
                    v-for='(data,index) in $store.state.room.cardNum' 
                    :class='move.liType == index ? (index==logic.z_index &&user.initType==5 ? "hover_no":"hover"):""' >
                    <!-- 牌 -->
                    <div class='pai'>
                        <img :src="`src/image/card/${logic.oxImg[index*5+0]}.png`" :style='"visibility:hidden;"+logic.imgStyle' />
                        <img :src="`src/image/card/${logic.oxImg[index*5+1]}.png`" :style='"visibility:hidden;"+logic.imgStyle'/>
                        <img :src="`src/image/card/${logic.oxImg[index*5+2]}.png`" :style='"visibility:hidden;"+logic.imgStyle'/>
                        <img :src="`src/image/card/${logic.oxImg[index*5+3]}.png`" :style='"visibility:hidden;"+logic.imgStyle'/>
                        <img :src="`src/image/card/${logic.oxImg[index*5+4]}.png`" :style='"visibility:hidden;"+logic.imgStyle'/>
                        <span v-if='user.initType==7'><img :src="`src/image/${logic.oxji[index]}.png`" /></span>
                    </div>
                    
                    <!-- 筹码以及分数 -->
                    <div class="chou_fen">
                        <div class="not_zhuang" v-if='main.z_type==1&&index!=logic.z_index'>
                            <img src="src/image/cc00.png" />
                            <p>{{logic.liAll_F[index]}}</p>
                            <p>{{logic.liMy_All[index]}}</p>
                        </div>
                        <img src="src/image/room002.png" v-if='main.z_type==1&&index==logic.z_index'/>
                        <img src="src/image/cuopai.png"
                         v-if='logic.liMy_All[index]>0&&user.initType==6' @click='cuopai=true,ka.index=index,ka.img02=""' class='cuopai_anniu'/>



                         <p v-if='user.initType<=7 && chenji.myfen[index]==0' :class='chenji.myfen[index] < 0 ? "yin":"shu"' >{{chenji.myfen[index] < 0 ? chenji.myfen[index] : "+"+chenji.myfen[index]}}</p>

                    </div>
                    </li>
                </ul>
                <p :class='user.initType==7?"jieguo":""' >{{chenji.allfen < 0 ? chenji.allfen : "+"+chenji.allfen}}</p>
                <p :class='user.initType==7?"jieguo":""' >{{chenji.allfen < 0 ? chenji.allfen : "+"+chenji.allfen}}</p>
            </div>
            <!-- 右 -->
            <div class='right'>
                <span>
                    <img src="src/image/room009.png" alt="" />
                    <img src="src/image/room010.png"  @click='$store.state.Music.autoplay = !$store.state.Music.autoplay'/>
                </span>

                <ul>
                    <li
                    v-if='dataList.px[0]!="undefined"'
                    v-for='player in dataList.px' 
                    @click='chat(2,dataList.zz[player].uid)'
                    :key='dataList.zz[player].uid'>
                        
                        <div>
                            <img src="src/img/roomK03.png" alt="" />
                            
                            <div class='leftImg'>
                                <img :src="dataList.zz[player].img" />
                                <span>{{dataList.zz[player].dian}}</span>
                            </div>
                        </div>
                        <p>{{dataList.zz[player].name}}</p>
                    </li>

                    <li v-for='a in 5-dataList.px.length'>
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
            <!-- 筹码 ,move.srcImgStyle="z-index:-999;"-->
            <span class='control_center' @touchend='move.liType = -1'>
                <img :src="`src/image/c${main.minFen_x>=1 ? 'c' : 'h'}01.png`"  @touchmove='main.minFen_x>=1 ? moveK() : false' 
                @touchend='main.minFen_x>=1 ? moveEnd() : 0'  :fen='"1"'/>

                <img :src="`src/image/c${main.minFen_x>=5 ? 'c' : 'h'}02.png`"  @touchmove='main.minFen_x>=5 ? moveK() : false'  @touchend='main.minFen_x>=5 ? moveEnd():0'  :fen='"5"'/>
                <img :src="`src/image/c${main.minFen_x>=10 ? 'c' : 'h'}03.png`"  @touchmove='main.minFen_x>=10 ? moveK() : false'  @touchend='main.minFen_x>=10 ? moveEnd():0'  :fen='"10"'/>
                <img :src="`src/image/c${main.minFen_x>=50 ? 'c' : 'h'}04.png`"  @touchmove='main.minFen_x>=50 ? moveK() : false'  @touchend='main.minFen_x>=50 ? moveEnd():0'  :fen='"50"'/>
                <img :src="`src/image/c${main.minFen_x>=100 ? 'c' : 'h'}05.png`" @touchmove='main.minFen_x>=100 ? moveK() : false'  @touchend='main.minFen_x>=100 ? moveEnd():0'  :fen='"100"'/>
            </span>
            <span class='control_right'>
                <img :src="`src/image/room006${main.bei? '':'6'}.png`" alt="" @click='bei_KZ(1)'/>
                <img :src="`src/image/room007${main.bei? '':'7'}.png`" alt="" @click='bei_KZ(0)'/>
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
    import applyOn from '../../module/roomModule/applyOn.vue';
    import singleBoard from '../../module/roomModule/singleBoard.vue';

    import loading from '../loading/loading.vue';   // loading
    Vue.component('loading', loading)
    import friendVIP from '../friend/friend.vue'; // 原好友
    Vue.component('friendVIP', friendVIP)
    import waterReport from './waterReport.vue';  // 原流水报表
    Vue.component('waterReport', waterReport)
    import message from '../message/message.vue'; // 原房主公告
    Vue.component('message', message)

    Vue.component('prize', prize)   // 开奖记录
    Vue.component('applyOn', applyOn)
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
                cuopai: false,      // 搓牌

                user : {     // 房间初始化数据
                    rid: 0,          // 房间id
                    fid: 0,         // 房主id
                    qid: 0,         // 群聊id
                    uid: localStorage.oxUid, // 自己的id
                    ON_OFF: false,  // 游戏开始按钮是否显示
                    number: 0,      // 房间号码
                    type: 0,        // 当前房间状态 1-房主 2-庄 3-普通玩家
                    auto: true,    // true自动轮庄- -false指定庄家
                    allFen: 0,      // 房间总分
                    myFen: 0,       // 自己的分
                    initTxt: ['游戏暂未开始', '正在初始化游戏资源','准备开始：', '随机庄位：', '发牌中', '可押注时间：', '开牌倒计时：', '开牌结果'],
                    initType: 0,    // 游戏阶段
                    ju: 0,          // 游戏局数
                },
                dataList : {        // 房间内玩家数据
                    z : {},           // 庄的数据
                    dz: {},           // 等待上庄人员的数据
                    pd: [],           // 排队顺序
                    zz: {},           // 其余成员的数据
                    px: [],           // 人员分数排序
                    dict:{},          // 字典--匹配
                },
                main : {        // 主体游戏流程代码
                    cardNum : 5,        // 扑克牌数
                    minFen  : 0,        // 最低上庄分数
                    minFen_j: 0,        // 最低上庄分数_计算用
                    minFen_x: 0,        // 最低上庄分数_显示用
                    maxBei  : 0,        // 单局最大倍数
                    beilv   : [],       // 倍率
                    bidui   : 0,        // 比什么
                    minYa   : 0,        // 下注范围
                    maxYa   : 0,        // 下注范围
                    bei     : 0,        // 选择有倍无倍
                    z_type  : 0,       // 庄以及筹码的显示
                },
                logic : {       // 主体逻辑代码
                    z_index: -1,        // 庄所在的位置
                    oxImg  : [],         // 牛牛路径
                    imgStyle: '',        // 卡牌是否显示
                    oxji   : [],         // 牛几
                    sy     : [],         // 输赢判断
                    status : 0,          // 游戏当前状态
                    liAll_F: [0,0,0,0,0,0,0],         // 当前总压分
                    liMy_All: [0,0,0,0,0,0,0],       // 当前个人压分_所有的压分
                    liMy_Ff: [0,0,0,0,0,0,0],         // 当前个人压分_翻倍
                    liMy_Fn: [0,0,0,0,0,0,0],         // 当前个人压分_不翻倍
                },
                logic_fz:{    // 房主端为下一盘做准备的数据代码
                    z_index: -1,        // 庄所在的位置
                    oxImg  : [],         // 牛牛路径
                    oxji   : [],         // 牛几
                    sy     : [],         // 输赢判断
                    status : 0,          // 游戏当前状态
                },
                time : {        // 游戏时间控制
                    time_x  : 0,    // 显示用—时间
                    downTime: 10,   // 倒计时时间
                    random  : 3,    // 倒计时
                    speed   : 80,   // 随机速度
                    $Time: 0,       // 可下注时间
                    $openCard: 10,  // 开牌倒计时
                },
                move : {        // 卡牌动效控制
                    trans: [],      // 背面移动位置
                    bei_s : 4,    // 背面移动速度
                    liType: -1,     // 手指移动到哪个li上面
                    srcImgStyle: [],// xy位置
                    srcImg: [],     // 移动筹码的img
                    
                    
                    bounce: [],     // 弹跳c3
                    imgNum: 1,  // 移动用img的数量
                },
                ka:{    // 搓牌临时
                    initY: 0,   // 开始的y
                    cardH: 0,   // 牌的高度
                    heziType:'',// 盒子的style
                    img02: '',  // img的高度
                    type: 0,    // 阶段判断
                    index: 0,   // 所点开的卡牌所在组
                },
                chenji:{    // 分数成绩
                    allfen: 0,  // 单局总分数波动
                    zfen: 0,    // 庄的分数波动
                    myfen: [0,0,0,0,0,0,0], // 个人押注输赢总分
                },




                message : this.$store.state.placard.message,

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
                    allType: 0,     // 游戏总控制 1 => 游戏中 || 0 => 暂停游戏  
                    oxWater: 0,
                },
                

            }
        },
        mounted: function(){
            let self = this ;
            this.$store.state.oxCrowd.z = {};   // 清除初始值

            self.initAllData();
            self.newData()  ;
            
        },
        methods: {
            cuoinit(ev){  // 搓牌开始
                var hezi =document.getElementsByClassName('cuopaiCard')[0];
                this.ka.type=0;
                this.ka.initY=0;
                this.ka.cardH=0;
                this.ka.heziType='';

                if (ev.changedTouches.length == 1) {    // 只有一个手指触摸
                    var touY = ev.changedTouches[0].pageY;
                    this.ka.cardH = hezi.getBoundingClientRect().height;
                    this.ka.initY = touY;
                }
            },
            cuoka(ev){    // 搓牌实现
                // console.log(ev.clientY)
                var img1_H=document.getElementsByClassName('cuopaiCard')[0].children[0].getBoundingClientRect().height;
                var img1_W=document.getElementsByClassName('cuopaiCard')[0].children[0].getBoundingClientRect().width;

                var img2=document.getElementsByClassName('cuopaiCard')[0].children[1];
                var init_touY = this.ka.initY;
                var init_H    = this.ka.cardH;
                var touY = ev.changedTouches[0].pageY;
                if (ev.changedTouches.length == 1 && touY<init_touY) {    // 只有一个手指触摸
                    // var touX = ev.changedTouches[0].pageX;
                    // transform: translate(-50%, 0%);
                    // console.log(init_touY-touY)
                    // console.log(init_H)
                    var y = init_touY-touY;
                    this.ka.heziType = 'height:'+(init_H-y)+'px;';
                    this.ka.img02 = 'transform: translate(-50%, -'+(y*2)+'px);z-index: 50;';
                    // console.log(y)
                    // console.log(init_H/2)
                    if(y>=img1_H/2){
                        // console.log(999)    // 这时候来一个动效
                        this.ka.type = 1;
                        this.ka.heziType = 'height:'+(this.ka.cardH)+'px;';
                        this.ka.img02 = 'height:'+img1_H+'px;width:'+img1_W+'px;top: 0;transform: translate(-50%,0.3rem); transition: all 0.3s; z-index: 50;';
                    }
                }
            },
            cuoEnd(){
                // console.log(this.ka.type)
                if(this.ka.type == 0){
                    this.ka.heziType = 'height:'+(this.ka.cardH)+'px;';
                    this.ka.img02 = 'transform: translate(-50%, 0px);z-index: 50;';
                }
            },
            bei_KZ(n){   // 倍数控制
                this.main.bei=n;
                if(n==0){   // 无倍
                    this.main.minFen_x = this.main.minFen_j;
                } else if(n==1){
                    this.main.minFen_x = this.main.minFen_j/this.main.maxBei;
                }
            },
            c3test: function(){ // 发牌动作
                var self = this;
                self.move.trans = [];   // 测试用-清除数据
                var pai = document.getElementsByClassName('pai');
                var kaNum = this.main.cardNum;          // 玩几牌的
                var s = this.move.bei_s/(kaNum*5);     // 背牌移动速度
                var setTime = null;

                pai_mover(0,0,0);
                function pai_mover(i,n,o){
                    if(o == kaNum*5){
                        return false;
                    }
                    var pai2 = document.getElementsByClassName('static_K')[o].getBoundingClientRect();
                    var imgs= pai[i].children[n].getBoundingClientRect();
                    // var x = pai2.x-imgs.x>=0? pai2.x-imgs.x:imgs.x-pai2.x;

                    self.move.trans.push("visibility:visible;transform:translate(-"+(pai2.x-imgs.x)+"px,"+(imgs.y-pai2.y)+"px);transition:transform "+s+"s ease;z-index:1"+n);
                    setTime = setTimeout(function(){
                        if(i==kaNum-1){
                            i=-1;n++;
                        }
                        if(self.move.trans.length == kaNum*5){
                            self.countDown();
                            clearTimeout(setTime)
                        }
                        pai_mover(++i,n,++o);
                    },s*1000)
                }
            },
            chat(n,sheId){  // n=个人状态,sheId=要联系人的id,
                var obj = {
                    rank : this.user.type,      // 在房间的状态
                    sheId,                      // 联系人id
                    qid  : this.user.qid,       // 群id
                    rid  : this.user.rid,       // 房间id
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
                var self = this;
                goEasy.subscribe({
                    channel: 'room_' + goEasy_ID,
                    onMessage: function(message){
                        // console.log('接收到消息:'+JSON.parse(message.content))
                        console.log(JSON.parse(message.content))

                        var data = JSON.parse(message.content);
                        var status = data.status;
                        var type = data.type;
                        switch(status){
                        case 1 :                        // 房主开始游戏
                            self.user.initType = 2;
                            self.user.ju+=1;
                            self.logic = data;
                            self.main.minFen_j = self.main.minFen; // 压庄总分
                            // console.log('进入成功')
                            self.K ();  // 开始游戏
                            break;
                        case 2 :                        // 房主暂停游戏
                            break;
                        case 3 :                        // 通知房间已解散
                            alert('房间:'+self.user.number+',已被房主解散')
                            router.push({name: 'oxCrowd'});
                            break;
                        }

                        switch(type){
                        case 9 :                            // 压分-完美
                            // console.log(data)
                            var few = Number(data.few);  // 所压的组
                            var fen = Number(data.score);// 所压的分数
                            var bei = Number(data.maxmag)>=1?true:false;// 有无倍数
                            self.logic.liAll_F[few]+=fen;
                            if(bei){
                                self.main.minFen_j-=(fen*Number(data.maxmag));
                                if(data.id==self.user.uid){
                                    self.logic.liMy_Ff[few]+=fen;
                                    self.logic.liMy_All[few]+=fen;
                                }
                            }else{
                                self.main.minFen_j-=fen;
                                if(data.id==self.user.uid){
                                    self.logic.liMy_Fn[few]+=fen;
                                    self.logic.liMy_All[few]+=fen;
                                }
                            }
                            self.bei_KZ(self.main.bei);
                            break;
                        case 5 :                    // 通知有人分数变化--完成
                            // console.log(data)
                            self.list()  // 更新分数
                            break;


                        case 1 :                            // 通知有人加入
                            if(data.zn_member_id == localStorage.oxUid){
                                return false;
                            }
                            self.list()  // 更新成员
                            break;
                        case 2 :                            // 通知房主有人加入
                            console.log(data)
                            break;
                        
                        case 6 :                            // 通知有人退出房间
                            console.log(data)
                            self.list()  // 更新列表
                            break;
                        case 7 :                            // 通知有人成为庄家
                            console.log(data)
                            self.list()  // 更新列表
                            break;
                        case 8 :                            // 通知有人申请上庄
                            console.log(data)
                            break;
                        
                        case 10:   // 房主公告
                            console.log(data)
                            self.message = data.content;    // 公告
                            break;
                        case 11:                            // 重新开局
                            console.log(data)
                            // self.list()         // 新庄家
                            break;
                        case 12:                            // 发牌中

                            break;


                        case 14:                            // 房主暂停游戏
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
            // moveStar
            moveK(ev){   // 拖动筹码
                var mainBody = this.main;
                let [user, self] = [this.user, this];
                // if(user.type == 1 || user.type == 2 || user.initType != 5){  //房主和庄家不参与游戏
                //     return false;
                // }
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

                var imgOnes = document.getElementsByClassName('imgOne');

                getTop(b)
                function getTop(e){
                    offsetH=e.offsetTop;
                    if(e.offsetParent!=null) offsetH+=getTop(e.offsetParent);
                    return offsetH;
                }
                // console.log(imgOnes)
                if (ev.changedTouches.length == 1) {    // 只有一个手指触摸
                    var touX = ev.changedTouches[0].pageX;
                    var touY = ev.changedTouches[0].pageY;
                    var idx = imgOnes.length;
                    // console.log(idx)
                    this.move.srcImg[idx-1] = ev.target.src;


                    self.$set(this.move.srcImgStyle, idx-1 ,`left:${touX}px;top:${touY}px;z-index:999;`);
                    // this.move.srcImgStyle[imgOnes.length-1] = `left:${touX}px;top:${touY}px;z-index:999;`;
                    
                    // 不在ul内
                    if(touY < offsetH || touY > offsetH+ul_H || touX < offsetW || touX > offsetW+li_W){  
                        this.move.liType = -1;
                        return false;
                    }
                    this.move.liType = Math.floor((touY - offsetH)/li_H);    // 向下取整
                }
            },
            moveEnd(ev){
                var mainBody = this.main;
                let [user, self] = [this.user, this]; // bounce
                if(user.type == 1 || user.type == 2 || user.initType != 5) {  //房主和庄家不参与游戏
                    return false;
                }

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
                var z_index = this.logic.z_index;    // 庄所在的index

                this.move.liType = Math.floor((touY - offsetH)/li_H);    // 向下取整
                // 范围计算
                
                


                var imgOnes = document.getElementsByClassName('imgOne');

                getTop(b)
                function getTop(e){
                    offsetH=e.offsetTop;
                    if(e.offsetParent!=null) offsetH+=getTop(e.offsetParent);
                    return offsetH;
                }
                // console.log(imgOnes)
                if (ev.changedTouches.length == 1) {    // 只有一个手指触摸
                    var touX = ev.changedTouches[0].pageX;
                    var touY = ev.changedTouches[0].pageY;
                    var idx = this.move.bounce.length;
                    this.move.bounce[idx] = 6;
                    this.move.imgNum += 1;

                    var z_yTop = (z_index+1)*li_H;  // 庄位置判断
                    var z_yBottom = z_yTop-li_H;
                    var fen=ev.target.attributes["fen"].nodeValue*1;// 分
                    var maxBel = '';
                    if(this.main.bei==1){
                        maxBel = this.main.maxBei;  // 最大倍率
                    }
                    
                    if( touX > offsetW && touX < offsetW+li_W && ((touY > offsetH && touY < offsetH+z_yBottom)||(touY > offsetH+z_yTop && touY < offsetH+ul_H)) ){
                        console.log('可下注范围')
                        var li = Math.floor((touY-offsetH)/li_H);
                        // 发起请求-把数据传给后台
                        http.post('/RoomJoin/chargePoints',{
                            id: this.user.uid,     // 个人uid
                            roomid: this.user.rid, // 房间id
                            score: fen,   // 压分分数
                            few: li,         // 第几副牌
                            maxmag: maxBel,          // 倍率
                        })
                        .then(res => {
                            console.log(res)
                            if(res.status != 1){
                                self.errorTips = res.msg;
                                self.careTip = true;
                            }
                        })

                    }else{
                        console.log('不可下注位置')
                        self.$set(this.move.srcImgStyle, imgOnes.length-1 ,``);
                        this.move.bounce.pop();
                        this.move.imgNum -= 1;
                        this.move.srcImg[idx] = '';
                    }

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

                        user.rid = data.id;  // 房间id
                        user.fid= data.zn_member_id; // 房主id
                        user.qid= data.zn_chatid; // 群聊id
                        user.number = data.zc_number;  // 房间Num
                        data.zn_member_id == localStorage.oxUid ? // 是否庄
                        user.type=1:user.type=3;

                        main.cardNum = data.zn_play_type == 1 ? 5 : 7;  // 几牌
                        main.minFen = Number(data.zn_min_score);  // 最低上庄分数
                        main.minFen_x = Number(data.zn_min_score);  // 最低上庄分数_显示用
                        main.minFen_j = Number(data.zn_min_score);  // 最低上庄分数_计算用
                        main.maxBei = JSON.parse(data.zc_rate)[11];  // 最大倍数     
                        main.beilv = JSON.parse(data.zc_rate) // 倍率
                        main.bidui = JSON.parse(data.zc_rate)[12];  // 比什么     
                        main.minYa = data.zn_bet_between_s;  // 押注范围
                        main.maxYa = data.zn_bet_between_e;  // 押注范围 
                        this.time.$Time = data.zn_bet_time;      // 可押注时间 


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
            list () {           // 玩家列表
                var self = this;
                var dict = this.dataList.dict;  // 字典
                var dz = this.dataList.dz;      // sz
                var zz = this.dataList.zz;      // 普通玩家
                var zzpx = this.dataList.px;      // 普通玩家
                var z_type = 0;
                this.user.allFen = 0;

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
                            self.user.allFen+=Number(datum.dian);// 房总分
                            if(datum.uid==localStorage.oxUid){
                                self.user.myFen = Number(datum.dian)
                            }
                            dict[data[i].zn_member_id]=datum;   // 字典
                            if(data[i].zn_makers==1){ // 庄
                                self.dataList.z=datum;
                            } else if(data[i].zn_maker_status==1){ // 庄申请列表
                                dz[data[i].zn_member_id]=datum;
                            } else {
                                zz[data[i].zn_member_id]=datum;  // 普通玩家
                                var len = this.dataList.px.length;
                                len == 0 ? zzpx.push(data[i].zn_member_id) : 
                                zzpx(Number(data[i].zn_points),len,data[i].zn_member_id);

                            }
                        }
                        z_type+=1;
                        z_type==2 ? host():0;

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
                        z_type+=1;
                        z_type==2 ? host():0;
                    }
                })
                function zzpx(d,o,uid){     // 排序
                    var dian = zz[zzpx[o]].dian;
                    if(dian>d){
                        zzpx.splice(o,0,uid);
                    } else {
                        zzpx(d,o-1,uid);
                    }
                }
                function host(){
                    if(self.dataList.z.dian==undefined && self.user.auto){
                    http.post( '/RoomJoin/setMakers', {
                                roomid: self.user.rid,
                                type: 1,
                                id: dz[self.dataList.pd[0]].uid,
                            })
                        .then(res => {
                            if(res.status == 1){
                                self.dataList.z=dz[self.dataList.pd[0]];
                                dz[self.dataList.pd[0]]=null;
                                self.dataList.pd.splice(0,1);
                            }
                            else if(res.status != 1){    //  错误
                                self.errorTips = res.msg;
                                self.careTip = true;
                            }
                        })
                    }
                }
                
                this.$set(this.dataList, 'px', zzpx)
                console.log(this.dataList.px)
            },
            logic_ox : function(){
                let oxImg = this.logic.oxImg;
                var self = this;
                oxImg = [];
                var cardNum = this.main.cardNum;    // 几牌？
                var bidui = this.main.bidui;    // 比什么
                // 庄的位置
                this.logic.z_index = Math.random()*cardNum>>0;

                // 递归算牛
                ! function result () {
                    var ResNum = Math.random()*13+1>>0;     // 1~13
                    var colorSe = ['a','b','c','d'][Math.random()*4>>0];// a~d
                    var Res = colorSe+ResNum;
                    oxImg.indexOf(Res) >= 0 ? result() : oxImg.push(Res) && 
                    oxImg.length < cardNum*5 ? result() : 0;
                } ()
                console.log(oxImg)
                this.logic.oxImg = oxImg;   // 反向赋值-牛

                // 牛几计算
                var oxji = [];  // 牛几
                var impor = []; // 权重
                for(var Q=0; Q<cardNum; Q++){
                    var arr = [
                        Number(oxImg[Q*5+0].substr(1)),
                        Number(oxImg[Q*5+1].substr(1)),
                        Number(oxImg[Q*5+2].substr(1)),
                        Number(oxImg[Q*5+3].substr(1)),
                        Number(oxImg[Q*5+4].substr(1))
                    ];
                    var arr2 = [
                        Math.floor(Number(oxImg[Q*5+0].substr(1))),
                        Math.floor(Number(oxImg[Q*5+1].substr(1))),
                        Math.floor(Number(oxImg[Q*5+2].substr(1))),
                        Math.floor(Number(oxImg[Q*5+3].substr(1))),
                        Math.floor(Number(oxImg[Q*5+4].substr(1)))
                    ];
                    oxji[Q] = 0;
                    var maxCard = Math.max.apply(null,arr);
                    var zm = {
                        'a': 40000,
                        'b': 30000,
                        'c': 20000,
                        'd': 10000,
                    };
                    impor[Q] = zm[oxImg[Q*5+arr.indexOf(maxCard)].substr(0,1)]+maxCard*100;
                    
                    if(eval(arr2.join("+")) == 50){   // 五花牛
                        oxji[Q]  = 99999;
                        impor[Q] = 99999;
                    } else{
                        var count = 0;
                        oxIS(0,1,2);
                    }
                    function oxIS (i,j,o) {
                        count++;
                        var iox = arr[i] > 10 ? 10 : arr[i];
                        var jox = arr[j] > 10 ? 10 : arr[j];
                        var oox = arr[o] > 10 ? 10 : arr[o];

                        if(((iox + jox + oox) / 10)%1 === 0){
                            var arr_i = [0, 1, 2, 3, 4];
                            var arrNum = 0;
                            arr_i.forEach(item=>{
                                if(item != i && item != j && item != o) {
                                    arrNum += arr[item] > 10 ? 10 : arr[item];
                                }
                            })
                            arrNum = arrNum%10;
                            if(arrNum == 0){
                                oxji[Q] = 10;
                            } else{
                                oxji[Q] = oxji[Q]>arrNum && oxji[Q]!=10 ? oxji[Q] : arrNum;
                            }

                        }
                        o++;
                        if(o > 4) { j++; o = 3; }
                        if(j > 3) { i++; j = 2; }
                        i >= j ? j=i+1 : false;
                        j >= o ? o=j+1 : false;

                        if(count < 10) {
                            oxIS (i,j,o)
                        }
                    }
                    impor[Q]+=oxji[Q];
                }

                // 输赢计算
                var sy = [];
                var z_idx = this.logic.z_index;
                for(var i=0;i<5;i++){
                    if(i==z_idx){
                        sy[i]=99;
                    } else{
                        sy[i] = oxji[i] > oxji[z_idx] ? 1 : 0;
                        switch(bidui){
                            case '比K':
                            if(oxji[i] == oxji[z_idx]){
                                if(impor[i].slice(0,1)==4){
                                    sy[i] = impor[i] > impor[z_idx] ? 1 : 0;
                                }
                            }
                            break;
                            case '比Q':
                            if(oxji[i] == oxji[z_idx]){
                                if(impor[i].slice(0,1)>=3){
                                    sy[i] = impor[i] > impor[z_idx] ? 1 : 0;
                                }
                            }
                            break;
                            case '比J':
                            if(oxji[i] == oxji[z_idx]){
                                if(impor[i].slice(0,1)>=2){
                                    sy[i] = impor[i] > impor[z_idx] ? 1 : 0;
                                }
                            }
                            break;
                        }
                    }
                }

                console.log(oxji)
                console.log(impor)
                console.log(sy)

                this.logic.oxji = oxji; // 牛几
                this.logic.sy = sy;     // 输赢
                var obj = this.logic;   
                obj.status = 1;         // 游戏开始

                goEasy.publish({  // 发送文本
                    channel:  'room_' + self.user.rid,
                    message: JSON.stringify(obj),
                    onSuccess:function(){
                        console.log('消息发送成功')
                    },
                    onFailed: function(err){
                        console.log('消息发送错误，错误信息：'+err)
                    }
                });
            },
            exit () {   // 退出房间
                if(this.user.type == 3){     // 普通玩家退出
                    http.post('/RoomJoin/closeRoom',{
                        roomid: this.user.fid, // 房间id
                        id: this.user.uid,
                    })
                    .then(res => {})
                }
                router.push({name: 'oxCrowd'});
            },
            gameStyle(n){       // 游戏流程--开始(1)
                var mainBody = this.main;   // 游戏主体数据
                var minFen = mainBody.minFen; // 最低上庄分数
                var dian = Number(this.dataList.z.dian); // 庄当前分数
                var self = this;

                if( n=1 ){
                    if(dian > minFen){  // 庄分数大于最低上庄分数
                        this.user.initType=1;
                        
                        var i=0;
                        // pageTimer["css"] = setInterval(function(){
                        //     i++;
                        //     if(i>3){
                        //         i=1;
                        //         self.user.initTxt[1] = self.user.initTxt[1].replace('...','');
                        //     }
                        //     if(i<=3){
                        //         self.$set(self.user.initTxt, 1,self.user.initTxt[1]+='.');
                        //     }
                        // },800)
                        self.logic_ox() // 发送数据
                        
                    } else {
                        this.errorTips = '庄家参数异常，请检查有无庄或者庄的分数';
                        this.careTip = true;
                    }
                }
                else if(n=2){
                    this.roomStyle(1);      // 游戏暂停
                }
            },
            K : function(){   // 游戏流程--回调开局(2)
                this.bei_KZ(this.main.bei); // 控制当前状态下的下注分数
                // 清除游戏余留状态
                for(var each in pageTimer) {    // 清除所有定时器
                    clearInterval(pageTimer[each])
                }
                for(var each in Timeout) {    // 清除所有延时器
                    clearTimeout(Timeout[each])
                }
                this.gameStart(1);       // 执行游戏
            },
            gameStart(type) {       // 游戏流程入口
                let self = this;
                switch (type) {
                    case 1 :  // 倒计时
                                this.bank()
                                // self.countDown();
                        // this.time.time_x = this.time.downTime; // 时间赋值
                        
                        // pageTimer["timer01"] = setInterval( ()=> {
                        //     this.time.time_x--;
                        //     if(this.time.time_x <= 0) {
                        //         this.bank()
                        //         clearInterval(pageTimer["timer01"])
                        //     }
                        // },1000)
                    break;


                    case 2 :
                        this.bank ()        // 随机选庄
                    break;
                    case 3 :
                        this.countDown ()   // 发牌以及倒计
                    break;
                    case 4 :
                        // this.FZ ()          // 翻转
                    break;
                    case 5 :
                        // this.settlement ()  // 单局结算等待
                    break;
                }
            },
            bank () {           // 2、随机选庄家牌
                let self = this;
                let num = this.main.cardNum; // 几牌
                let zhuan = this.logic.z_index;
                this.user.initType = 3;
                this.time.time_x = this.time.random; // 时间赋值
                
                // this.init.textStyle = 2;

                pageTimer["timer02"] = setInterval( ()=> {
                    self.time.time_x--;

                    if(self.time.time_x < 0) {    
                        this.time.time_x = '';
                        this.user.initType = 4;     // 文字-->发牌中
                        clearInterval(pageTimer["timer03"])
                        this.move.liType = -1;
                        this.main.z_type = 1;
                        this.c3test();  // 发牌      
                        clearInterval(pageTimer["timer02"])
                    }
                },1000)

                let i = self.move.liType;
                pageTimer["timer03"] = setInterval(function(){
                    i++;
                    if(i>=num){
                        i=0;
                    }
                    self.move.liType = i;
                },self.time.speed)
            },
            countDown () {          // 3、可押注时间倒计时
                let self = this;
                this.user.initType = 5;
                this.time.time_x = this.time.$Time;

                // 延时器-发完牌后 -- 押注倒计时
                pageTimer['timer04'] = setInterval( ()=> {
                    if(this.time.time_x >= 1){
                        this.time.time_x-- ;
                    } else {
                        self.careTip = false;
                        self.openCard();
                        clearInterval(pageTimer['timer04']);
                    }
                    // if(self.init.time == 1){    // 中止下注 
                    //     self.roomStyle(3)
                    // }
                } , 1000);
            },
            openCard () {                 // 4、开牌--算输赢
                let self = this;
                var cardNum = this.main.cardNum;    // 牌数
                var z_index = this.logic.z_index;   // 庄的位置
                this.logic.imgStyle = "visibility:visible;"

                var o =0;
                pageTimer["timer05"] = setInterval( ()=> {
                    for(var i=0;i<cardNum;i++){
                        this.$set(this.move.trans,i+o,this.move.trans[i+o].replace('px)','px) rotateY(90deg)'));
                    }
                    o+=cardNum;
                    if(o==cardNum*4){
                        this.move.trans[cardNum*4+z_index]="";
                        this.user.initType=6;
                        this.time.time_x = this.time.$openCard;
                        pageTimer["timer06"] = setInterval( ()=> {
                            if(this.time.time_x == this.time.$openCard){
                                // 算胜负计算分数
                                this.countFen();
                            }
                            if(this.time.time_x >= 1){
                                this.time.time_x-- ;
                            } else {
                                self.cuopai=false;
                                for(var i=0;i<cardNum;i++){
                                    this.$set(this.move.trans,i+o,this.move.trans[i+o].replace('px)','px) rotateY(90deg)'));
                                }
                                this.user.initType=7;
                                clearInterval(pageTimer['timer06']);
                            }
                        },1000)

                        clearInterval(pageTimer["timer05"]);
                    }
                },500)
                
            },
            // chenji:{    // 分数成绩
            //     allfen: 0,  // 单局总分数波动
            //     zfen: 0,    // 庄的分数波动
            //     myfen: [0,0,0,0,0,0,0], // 个人押注输赢总分
            // }
            countFen(){    // 分数计算
                var beilv = this.main.beilv;   // 倍率
                var oxsy  = this.logic.sy;     // 输赢
                var oxji  = this.logic.oxji;   // 牛几
                var fbei = this.logic.liMy_Ff; // 当前个人压分_翻倍
                var nbei = this.logic.liMy_Fn; // 当前个人压分_不翻
                var myFen= this.user.myFrm;    // 自己分数
                var chenji = this.chenji;   // 分数计算
                for(var i=0; i<7; i++) {
                    // 翻倍
                    if(fbei[i]>0 && oxsy[i]==1){  // 有压翻倍且赢
                        chenji.myfen[i]+=fbei[i]*beilv[oxji[i]];
                    } else if(fbei[i]>0 && oxsy[i]==0){ // 有压翻倍且输
                        chenji.myfen[i]-=fbei[i]*beilv[oxji[i]];
                    } else if(fbei[i]>0 && oxsy[i]==99999){// 五花牛
                        chenji.myfen[i]+=fbei[i]*beilv[oxji[10]];
                    }
                    // 不翻倍
                    if(nbei[i]>0 && oxsy[i]>=1){// 有压不翻且赢
                        chenji.myfen[i]+=nbei[i];
                    } else if(nbei[i]>0 && oxsy[i]==0){ // 有压不翻且输
                        chenji.myfen[i]-=nbei[i];
                    }
                }
                chenji.allfen = eval(chenji.myfen.join("+"));
                console.log( this.chenji )
            },


            gameO (obj) {   // 存储游戏结果
                var self = this;

                var idRoom = this.$store.state.idRoom
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


            remove(){   // 一局结束需要清零的数据
                this.main.z_type = 0;
                this.logic = {};
                this.move = {        // 卡牌动效控制
                    trans: [],      // 背面移动位置
                    bei_s : 4,    // 背面移动速度
                    liType: -1,     // 手指移动到哪个li上面
                    srcImgStyle: [],// xy位置
                    srcImg: [],     // 移动筹码的img
                    bounce: [],     // 弹跳c3
                    imgNum: 1,  // 移动用img的数量
                }
            },
            roomStyle (type,dataArr) {      // 游戏状态
                var self = this;

                if(this.user.type == 1){    // 庄家发起控制
                    dataArr = JSON.stringify(dataArr)
                    http.post('/Room/setRoomStatus',{
                        zn_room_id: this.user.rid,
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
            to(n){              // 弹框控制
                switch (n) {
                    case 2 :    // 开奖记录
                        this.$refs.onprizeChild.onprize=true;
                        this.gameResult(this.user.rid)
                        break;
                    case 3 :    // 抽水分数999
                        this.$refs.onapplyOnChild.details=true;
                        this.$refs.onapplyOnChild.allFen = this.user.allFen;

                        this.$refs.onapplyOnChild.allWater= this.host.oxWater; // 抽水分数
                        break;
                }
            },
            varRoom(){          // 房间设置
                var set = this.user.initType;
                console.log(set)
                if(set<1){   // 游戏暂停方可打开
                    this.$refs.onvarRoomChild.initType = 1;
                    this.$refs.onvarRoomChild.imgState = this.$store.state.idRoom;
                    this.$refs.onvarRoomChild.boxState.CvarRoom=true;
                    this.$refs.onvarRoomChild.noModal();
                } else {
                    this.errorTips = '请在游戏暂停时重置房间配置';
                    this.careTip = true;
                }
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
                            self.init.text[0] = '游戏正在进行'
                        } else if(val == 1 || val == 10){
                            self.init.textStyle == 0;
                            self.init.text[0] = '游戏暂未开始'
                        }
                    }
                })
                }
            },
            
            applyOn(i){         // 申请上庄or选择做庄
                let init = this.init;
                if(init.ForT == 1 && i == 0) {  // 庄
                                        
                } else if(init.ForT == 0 && i == 99 && init.ForZ != 1){   // 普通玩家
                    this.$refs.onapplyOnChild.applyOn = true;
                }
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
            
            
            
            
            initAllData(){
                var self = this;
                http.post('/Room/getRooms',{
                        number: self.$route.params.id,
                    })
                    .then(res => {
                        console.log(res)
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

                            // 群聊路由 cardFn
                            self.CHAT_QUN = `/CHAT_QUN/[${data.zc_number},${data.id},${self.init.ForT},${data.zn_chatid}]`;

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
                            self.initType()
                            self.gameResult(data.id) // 查询游戏结果
                        }
                    })
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