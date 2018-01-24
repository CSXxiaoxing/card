<template>
    <div id='room'>
        <header>
            <ul>
                <li>
                    <i><router-link to="/home" ></router-link></i>
                    <span>第<i>20</i>局</span>
                    <p :class='init.textStyle >= 1 ? "open" : "" '>
                        <span>{{host.styleName}}</span>
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
                    <span @click='prize'><i></i>开奖记录</span>
                    <span ><i></i><router-link to="/water" >流水报表</router-link></span>
                </li>
            </ul>
            <dl>
                <dt>
                    <img src="../../img/room03.png" height="155" width="149" alt="" />
                </dt>
                <dd  v-show='init.ForT == 0'>迷迷糊糊</dd>
                <dd  v-show='init.ForT == 0'>

                    分数：<span>{{win.fen}}</span>
                    <span :class='win.css[0]'>{{win.cssFen[0]}}</span>

                </dd>
                <!-- 房主 -->
                <dd  v-show='init.ForT == 1'>房总分：<span>71666</span></dd>
                <dd  v-show='init.ForT == 1' @click='varRoom'><i></i>房间设置</dd>

                <dd  @click="toShare">
                    <i></i>
                    <span>邀请好友</span>
                </dd>
                <dd>
                    <mt-swipe :show-indicators="false">
                      <mt-swipe-item>
                        <i></i><span>房主公告：健康游戏，请勿赌博，谢谢合作。</span>
                    </mt-swipe-item>
                      <mt-swipe-item>
                        <i></i><span>房主公告：健康游戏，请勿赌博，谢谢合作。</span>
                    </mt-swipe-item>
                      <mt-swipe-item>
                        <i></i><span>房主公告：健康游戏，请勿赌博，谢谢合作。</span>
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
                            <img src="../../img/roomK02.png" alt="" />
                            <img src="../../img/roomPage01.png" alt="" />
                            <span>1</span>
                            <img class='leftZhuan' src="../../img/room1.png">
                            <div class='leftImg'>
                                <img src="../../img/friend1.png" alt="" />
                                <span>{{init.fen}}</span>
                            </div>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <img src="../../img/roomK03.png" alt="" />
                            <img src="../../img/roomPage02.png" alt="" />
                            <span>2</span>
                            <div class='leftImg'>
                                <img src="../../img/friend1.png" alt="" />
                                <span>76000</span>
                            </div>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <img src="../../img/roomK03.png" alt="" />
                            <img src="../../img/roomPage03.png" alt="" />
                            <span>3</span>
                            <div class='leftImg'>
                                <img src="../../img/friend1.png" alt="" />
                                <span>76000</span>
                            </div>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <img src="../../img/roomK03.png" alt="" />
                            <img src="../../img/roomPage04.png" alt="" />
                            <span>4</span>
                            <div class='leftImg'>
                                <img src="../../img/friend1.png" alt="" />
                                <span>76000</span>
                            </div>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <img src="../../img/roomK03.png" alt="" />
                            <img src="../../img/roomPage04.png" alt="" />
                            <span>5</span>
                            <div class='leftImg'>
                                <img src="../../img/friend1.png" alt="" />
                                <span>76000</span>
                            </div>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <img src="../../img/roomK03.png" alt="" />
                            <img src="../../img/roomPage04.png" alt="" />
                            <span>6</span>
                            <div class='leftImg'>
                                <img src="../../img/friend1.png" alt="" />
                                <span>76000</span>
                            </div>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <!-- <li  @click="applyOn" class='tips'>{{apply}}</li> -->
                    <li  @click="applyOn(99)" >{{apply}}</li>
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
                        :size = index
                        v-show='init.cardFn == 5 ? index != 2 && index != 6 : true'

                         @click="[(time.index != index && cardURL.clck == -1 ? playerBottom(index) : false), (init.textStyle == 4 ? cardURL.clck=index : '')]" 
                         @touchend='ordinary.Pn = index '>

                        <img v-for='dat in 5' src="../../img/room3.png">

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

                            :class='[(cardURL.start),(cardURL.move+(idx+1)),
                            (time.index == index ? cardURL.reveEnd : ""),
                            ("initNum"), 

                            (idx > 2 && init.textStyle == 4 
                            && cardURL.clck == index && ordinary.pay[index][2]>0
                            ? "temporary" : "temporary02")]'/>


                            <!-- 背部卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),
                            (time.index == index ? cardURL.reversal : ""), 

                            (idx > 2 && init.textStyle == 4 
                            && cardURL.clck == index && ordinary.pay[index][2]>0
                            ? "beimian" : "beimian02")]' />





                        </div>
                    </li>
                </ul>
            </div>



            <div class='right'>
                <ul>
                    <li v-for='player in players '>
                        <div>
                            <img src="../../img/roomK03.png" alt="" />
                            <img src="../../img/roomPage04.png" alt="" />
                            <span>6</span>
                            <div class='leftImg'>
                                <img src="../../img/friend1.png" alt="" />
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
                <li v-show='init.ForT == 0'>联系房主</li>
                <li class='roomScore' v-show='init.ForT == 1' 
                    @click="$refs.onapplyOnChild.details=true;">
                    <b :class='win.css[2].length > 0 ? "a" : ""'>{{host.gainNum}}
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

    </div>
</template>

<script type="text/javascript">
    import './room.scss';
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import { Swipe, SwipeItem } from 'mint-ui';
    // 组件
    import toShare from '../../module/shareModule/toShare.vue';
    import prize from '../../module/roomModule/openRecords.vue';
    import playerBottom from '../../module/roomModule/playerBottom.vue';
    import applyOn from '../../module/roomModule/applyOn.vue';
    import singleBoard from '../../module/roomModule/singleBoard.vue';
    import setRoom from '../../module/homeModule/varRoom.vue';
    Vue.component('toShare', toShare)
    Vue.component('prize', prize)
    Vue.component('applyOn', applyOn)
    Vue.component('playerBottom', playerBottom)
    Vue.component('singleBoard', singleBoard)
    Vue.component('varRoom', setRoom)

    // 定义所有定时器 applyOn
    // 游戏中定时器(timer-N) [01准备5s, 02随机庄家, 03随机庄位置, 04押注倒计时, 05牌全开, 06-10s下一盘]
    let pageTimer = {};
    // 游戏状态码 {
    //      0 : 执行游戏
    //      
    // }
    export default {
        data: function(){
            return {
                chartRoom: '',
                // 初始化
                init: {
                    ForT: 0,          // 1是房主0是普通
                    time: 0,         // 游戏时间控制
                    ju: 20,         // 游戏局数
                    id: 0,          // 房间id
                    room_id: this.$store.state.idRoom.room_id,
                    cardFn: this.$store.state.idRoom.cardFn,  //几牌  
                    oxK: this.$store.state.idRoom.oxK,
                    scope: this.$store.state.idRoom.scope,  // 可下注范围
                    pond: this.$store.state.idRoom.minGrade,    // 设定可下注池
                    text: ['游戏暂未开始', '准备开始：', '随机庄牌：', '可押注时间：', '开牌倒计时', '开牌结果'], // 游戏状态
                    textStyle : 0, // 对应状态码   [0, 1, 2, 3, 4, 5]
                    oxNumber: this.$store.state.idRoom.oxNumber,// 倍率
                    fen: 5000000, // 庄总分
                    ForZ: 0,// 庄时状态为1
                },
                // 时间总控
                time: {
                    initTime: this.$store.state.time.initTime,
                    random: this.$store.state.time.random,
                    index: -1,      // 随机背景/庄家
                    speed: this.$store.state.time.speed,
                    timeAll:  this.$store.state.idRoom.time,
                    endTime: this.$store.state.time.endTime,
                    countTime: this.$store.state.time.countTime,
                },
                // 输赢结果
                win: {
                    // 个人总分
                    fen : 0,
                    // 分数中转
                    zorp: [0,0],
                    // 我/庄/房主
                    css: ['shu', 'shu', 'yin'],
                    cssFen: ['-1000', '-5000', '+0'],
                    // 中转
                    cssZZ: ['','',''],
                    cssZZF: ['','',''],
                },
                // 主人
                host: {
                    // 游戏开始
                    styleName: '暂停中',
                    style: false,
                    gainNum: 150000,
                    // 游戏总控制 1 => 游戏中 0 => 暂停游戏   
                    allType: 0,
                },
                // 普通
                ordinary: {
                    // 背景渐变
                    bg: false,
                    // 可下注池
                    pond: 0,
                    // 总下注
                    allPay: [999, 888, 777, 666, 555, 0, 333],
                    //自己下---翻倍/不翻倍/总下注
                    pay: {
                        0 : [0, 0, 0],
                        1 : [0, 0, 0],
                        2 : [0, 0, 0],
                        3 : [0, 0, 0],
                        4 : [0, 0, 0],
                        5 : [0, 0, 0],
                        6 : [0, 0, 0],
                        7 : [0, 0, 0],
                    },
                    // 第几个下注框
                    Pn: -1,
                },
                // 扑克牌黑桃(spade)红心（heart）梅花（clubs）方块（dianmond） 
                cardURL: {
                    // 花色、牌称
                    color: ['spade', 'heart', 'clubs', 'dianmond'],
                    nickname: ['没牛', '牛一', '牛二', '牛三', '牛四',
                               '牛五', '牛六', '牛七', '牛八', '牛九', 
                               '牛牛', '五花牛', 'J大', 'Q大', 'K大'],
                    src: ["./src/img/z999.png", "./src/img/cardPlus/"],
                    start: "",
                    move: "",
                    reversal: "",
                    reveEnd: "",
                    // 牌-号码-分离
                    card: [],
                    cardEnd: [[],[],[],[],[],[],[]],
                    result: [],
                    // 数字牛几
                    resultNum: [],
                    // 点击翻转
                    clck: -1,
                    // 权重
                    maxVal: [],
                    // 结果
                    end: [],
                },
                // 游戏结果处理
                gameOver: {
                    // 出现
                    show: false,
                    bet: false,
                    // 倒计时结束
                    timeEng: false,
                },
                // { name: '4', power: 5000 ,status:1}, 
                players:[],        // 右边玩家
                datagrid : '',
                apply: '申请上庄',

            }
        },
        mounted: function(){
            let self = this;
            // init
            http.post('/Room/getRooms',{
                    number: self.$route.params.id,
                })
                .then(res => {
                    if(res.status == 1) {
                        console.log(res.data)
                        var data = res.data;
                        var bl = JSON.parse(data.zc_rate);
                        var vx = this.$store.state.idRoom;

                        if(data.zn_member_id == localStorage.oxUid){
                            self.init.ForT = 1;
                        } else {
                            self.init.ForT = 0;
                        }
                        self.chartRoom = `/chartRoom/[3,${data.zc_number},${data.id},${self.init.ForT}]`,
                        vx.room_id = data.zc_number;
                        vx.id = data.id;
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
                        vx.room = data.zn_pay_type == 1 ? 'bell' : 'day'
                        vx.minGrade = data.zn_min_score;
                        self.init.id = res.data.id
                        self.list()
                    }
                })
        },
        methods: {
            // 房间设置
            varRoom(){
                // console.log(this.init)
                this.$refs.onvarRoomChild.imgState = this.$store.state.idRoom;
                this.$refs.onvarRoomChild.boxState.CvarRoom=true;
                this.$refs.onvarRoomChild.noModal();
            },
            toShare(){
                this.$refs.ontoShareChild.toShare=true;
            },
            prize(){
                this.$refs.onprizeChild.onprize=true;
            },
            playerBottom(index){
                let init = this.init;
                let self = this;
                if(this.init.ForT == 1 || this.init.ForZ == 1) { 
                //房主和庄家不参与游戏
                    return false;
                }
                if(init.textStyle == 3 && this.ordinary.pond > init.scope[0]){
                    this.$refs.onplayerBottomChild.playerBottom=true; 
                }
                if(init.textStyle == 4){
                    let temporary;
                    clearTimeout(temporary);
                    temporary = setTimeout(function(){
                        self.cardURL.clck = -1;
                        clearTimeout(temporary);
                    }, 2300)
                }
            },
            applyOn(i){
                let init = this.init;
                if(init.ForT == 1 && i == 0) {  // 庄
                    this.$refs.onapplyOnChild.setOwner=true;
                } else if(init.ForT == 0 && i == 99){   // 普通玩家
                    this.$refs.onapplyOnChild.applyOn = true;

                }
            },
            gameStyle(e){
                let [Host, Etxt] = [this.host, e.target.innerText];
                Host.style = false;
                Host.styleName = Etxt;
                switch (Etxt) {
                    case '游戏中' :
                        this.init.textStyle = 1;
                        this.gameType(0);
                        break;
                    default :
                        // this.init.textStyle = 0;/Room/getRooms
                }
            },
            // 游戏开始控制状态中转
            gameType(n) {
                // 清除所有定时器
                for(var each in pageTimer) {
                    clearInterval(pageTimer[each])
                }
                
                switch (n) {
                    case 0 :
                        this.clearGameStyle()            // 状态清空
                        if(this.host.allType == 1){     // 游戏状态允许
                            this.gameStart();          // 执行游戏
                        }
                        break;
                }
            },
            clearGameStyle () {
                // 开局状态请0
                this.cardURL.reversal = '';
                this.cardURL.reveEnd = '';
                this.cardURL.start = '';
                this.cardURL.move = '';
                this.cardURL.result = [];
                this.init.textStyle = 1;
                self.roomStyle(1);               // 游戏状态储存
                this.gameOver.bet = true;
                this.gameOver.show = false;
                this.ordinary.bg = false;
                this.gameOver.timeEng = false;
                this.cardURL.clck = -1;
                // 押注清0
                this.ordinary.pay = {
                    0 : [0, 0, 0],
                    1 : [0, 0, 0],
                    2 : [0, 0, 0],
                    3 : [0, 0, 0],
                    4 : [0, 0, 0],
                    5 : [0, 0, 0],
                    6 : [0, 0, 0],
                    7 : [0, 0, 0],
                }
            },
            algorithm () {
                console.time('a')
                // 牛牛计算 -- 比大小未完成
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
                    for(var o=0; o<5; o++){
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
                console.log(maxVal)
                console.log(oxArr)
                this.cardURL.result = oxArr;
                this.cardURL.maxVal = maxVal;
                console.timeEnd('a')
            },
            gameStart() {
                let self = this;
                this.ordinary.pond = this.init.pond;
                var [setT1, setT2, setT3,] = [,,,,];

                clearTimeout(setT1);
                clearTimeout(setT2);
                clearTimeout(setT3);
                // 5秒倒计时
                this.init.time = this.time.initTime;
                // 牛牛计算
                this.algorithm();
                
                // 1、准备开始倒计时
                
                pageTimer["timer01"] = setInterval( ()=> {
                    self.init.time--;
                    if(self.init.time < 0) {
                        this.init.textStyle = 2;
                        self.roomStyle(2)       // 游戏状态储存
                        bank()
                        clearInterval(pageTimer["timer01"])
                    }
                },1000)
                
                // 2、随机选庄家牌
                let num = this.init.cardFn;

                
                function bank(){
                    let arr5 = [0, 1, 3, 4, 5];

                    self.init.time = self.time.random;
                    pageTimer["timer02"] = setInterval( ()=> {
                        self.init.time--;
                        if(self.init.time < 0) {
                            self.time.index = arr5[Math.random()*5>>0];
                            self.ordinary.bg = true;
                            self.init.textStyle = 3;
                            self.roomStyle(3) 
                            countDown();
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
                            self.time.index = arr5[i];
                        }
                    },self.time.speed)
                }

                // 3、发牌以及倒计时
                function countDown(){
                    self.init.time = self.time.timeAll;
                    self.cardURL.start = 'start' ;
                    
                    setT1 = setTimeout( ()=>{
                        self.cardURL.move = 'card0' ;
                        clearTimeout(setT1);
                    } , 500 );

                    // 延时器-发完牌后 -- 押注倒计时
                    setT2 = setTimeout( ()=>{
                        pageTimer['timer04'] = setInterval( ()=> {
                            if(self.init.time >= 1){
                                self.init.time-- ;
                            } else {
                                self.cardURL.reversal = 'reversal';
                                self.cardURL.reveEnd = 'reveEnd';
                                FZ();
                                self.gameOver.bet = false;
                                // self.$refs.onplayerBottomChild.playerBottom=false; 
                                clearInterval(pageTimer['timer04']);
                            }
                        } , 1000);
                    } , 1300 );
                }
                // 翻转FZ
                let sheTimeEnd;
                function FZ(){
                    self.gameOver.show=true;
                    // 算输赢/发送胜负请求
                    self.sf ()

                    // 翻转剩下的牌
                    setT3 = setTimeout(()=>{
                        self.init.textStyle = 4;
                        self.roomStyle(4) 
                        self.init.time = self.time.countTime;

                        pageTimer["timer05"] = setInterval( ()=> {
                            if(self.init.time >= 1){
                                self.init.time-- ;
                            } else {
                                self.gameOver.timeEng = true;
                                self.init.time = self.time.endTime;
                                self.init.textStyle = 5;
                                self.roomStyle(5) 
                                self.settlement(0)
                                clearInterval(pageTimer["timer05"]);
                            }
                        } , 1000);

                    }, 250)
                }
            },
            settlement (i) {         // 单局结算等待时间
                let self = this;
                
                if(i == 0) {
                    // 分数结果
                    this.win.fen = this.win.zorp[1];             
                    this.init.fen = this.win.zorp[0];
                    pageTimer["timer06"] = setInterval(()=>{
                        if(self.init.time >= 1){
                            self.init.time-- ;
                        } else {
                            self.gameType(0);

                            if(self.host.allType == 0) {   // 停止时
                                self.init.textStyle = 0;
                                self.roomStyle(0) 
                            }
                            clearInterval(pageTimer["timer06"]);
                        }
                        // 弹出单局结算
                        // if(self.init.time == self.time.endTime/2){
                        //     self.$refs.onsingleBoardChild.singleBoard=true;
                        // }
                    }, 1000)
                }     
            },
            sf () {                  // 输赢结果
                let maxVal = this.cardURL.maxVal;   // 权重
                let ox = this.cardURL.resultNum    // 牛结果数字化
                let idx = this.time.index;        // 庄位置
                let ya = this.ordinary.pay;      // 押注分数
                let db = this.init.oxNumber;    // 投注倍率
                let oxK = this.init.oxK;       // 比什么
                let maxValEng = [];           // 最终结果
                let fen = this.win.fen       // 个人分数
                let Zfen = this.init.fen;   // 庄分数
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
                console.log(ox)
                console.log(db)
                console.log(ya)
                console.log(maxValEng)
                // 输赢计算 --------普通玩家
                for(var i=0; i<7; i++) {
                    if(ya[i][2] > 0){
                        fen += ya[i][2]
                        if(maxValEng[i] == 1){
                            fen += ya[i][1];
                            fen += ya[i][0]*db[ox[i]]
                            var fenAll = ya[i][1] + ya[i][0]*db[ox[i]]

                            Zfen -= ya[i][1];
                            Zfen -= ya[i][0]*db[ox[i]]
                            var ZfenAll = ya[i][1] + ya[i][0]*db[ox[i]]
                            // 普赢庄输
                            // this.win.cssZZ = ['yin',  'shu',  'yin']
                            // this.win.cssZZF = [`+${fenAll}`, `-${ZfenAll}`, '+0']

                        } else {    // 亏了多少分
                            fen -= ya[i][1];
                            fen -= ya[i][0]*db[ox[idx]];
                            var fenAll = ya[i][1] + ya[i][0]*db[ox[idx]]

                            Zfen += ya[i][1];
                            Zfen += ya[i][0]*db[ox[idx]]
                            var ZfenAll = ya[i][1] + ya[i][0]*db[ox[idx]]
                            // 庄赢
                            // this.win.cssZZ = ['shu', 'yim', 'yin']
                            // this.win.cssZZF = [`-${fenAll}`, `+${ZfenAll}`, `+${ZfenAll}`]
                        }
                    }
                }
                this.win.zorp = [Zfen, fen];

                   // 发送输赢分数=============================================
                   // 返回总分  
            },
            orderPower(players){     // 高分排列
                players = Object.values(players)
                if(players.length <=1){
                    return players;
                }
                var online = [];
                var notline = [];
                // 是否上线
                for(var i = 0; i<players.length; i++){
                    if(players[i].zl_visible==1){
                        online.push(players[i]);
                    }else{
                        notline.push(players[i]);
                    }
                }

                for(var i=0;i<online.length-1;i++){ 
                    for(var j=i+1;j<online.length;j++){ 
                        if(online[i].power>online[j].power){
                            var list=online[i].power; 
                            online[i].power=online[j].power; 
                            online[j].power=list; 
                        }  
                    } 
                }  

                for(var i=0;i<notline.length-1;i++){ 
                    for(var j=i+1;j<notline.length;j++){ 
                        if(notline[i].power>notline[j].power){
                            var list=notline[i].power; 
                            notline[i].power=notline[j].power; 
                            notline[j].power=list; 
                        }  
                    } 
                }
                online.reverse(); 
                notline.reverse(); 
                if(notline[0].constructor === Object){
                    this.players = online.concat(notline);
                } else {
                    this.players = online
                }
            },
            list () {                // 玩家列表
                var self = this;
                http.post('/RoomJoin/getJoinRoomList',{
                    p: 1,
                    pagesize: 100,
                    roomid: this.init.id,
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 1){
                        self.orderPower(res.data)
                        // self.win.fen = res.data.zn_points
                    }
                })
            },
            roomStyle (type) {       // 游戏状态
                http.post('/Room/setRoomStatus',{     
                    zn_room_id: this.init.id,
                    zn_status: type,
                })
                .then(res => {

                })
            },

    },
}
   
</script>