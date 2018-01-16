<template>
    <div id='room'>
        <!-- <div class="varR_modal" style='z-index: 2000' @click='noModal'></div> -->
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
                                <span @click='gameStyle'>游戏中</span>
                                <span @click='gameStyle'>暂停中</span>
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
                <dd  v-show='init.ForT == 0'>分数：<span>10999</span></dd>
                <!-- 房主 -->
                <dd  v-show='init.ForT == 1'>房总分：<span>71666</span></dd>
                <dd  v-show='init.ForT == 1' @click='varRoom'><i></i>房间设置</dd>

                <dd  @click="toShare">
                    <i></i>
                    <span>邀请好友</span>
                </dd>
                <dd>
                    <i></i><span>房主公告：健康游戏，请勿赌博，谢谢合作。</span>
                </dd>
            </dl>
        </header>

        <div class='roomMain'>
            <div class='left'>
                <ul>
                    <li>
                        <div>
                            <img src="../../img/room1.png">
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li @click="singleBoard">
                        <div>
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li>
                        <div>
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li  @click="applyOn" class='tips'>{{apply}}</li>
                </ul>
            </div>

            <div class='center'>

                <h1>{{init.text[init.textStyle]}}

                    <span v-show='init.textStyle >= 1'>{{init.time}}秒</span>

                </h1>
                <!-- 还可下注：1090.56 -->
                <p :style='{visibility: init.textStyle == 4 ? "hidden" : "none"}'>还可下注：{{init.pond}}</p>
                <ul>
                    <!-- li -->
                    <li v-for='(datalist,index) in 7' 
                        :class='[(init.prizeNum == 7 ? "b7" : "a5"), 
                        (time.index == index ? "bgccc" : ""), 
                        (ordinary.bg ? "bg" : "")] '
                        :size = index
                        v-show='init.prizeNum == 5 ? index != 2 && index != 6 : true'

                         @click="[(time.index != index && cardURL.clck == -1 ? playerBottom(index) : false), (cardURL.clck=index)]" 
                         @touchend='ordinary.Pn = index'>

                        <img v-for='dat in 5' src="../../img/room3.png">

                        <span>
                            <!-- 出牛 -->
                            <b :class='[(init.prizeNum == 7 ? "b7" : "a5"),
                            ((time.index == index && init.textStyle >= 4) || init.textStyle == 6 ? "showoff" : "")]'>

                                {{init.textStyle > 4 ? cardURL.result[ index ] : '庄'}}
                            </b>
                            <b v-show='ordinary.allPay>0'>{{ordinary.allPay}}</b>
                            <b v-show='ordinary.pay[index][2]>0'>{{ ordinary.pay[index][2] }}</b>
                        </span>

                        <!-- 扑克牌 -->
                        <div class='testCard' :class='[(init.prizeNum == 7 ? "b7" : "a5" ), (time.index != index && gameOver.show ? "three":""), (gameOver.timeEng ? "threeEng" : "")]'>
                            <!-- 翻开卡片 -->
                            <img v-if='init.textStyle >= 1'
                            v-for='(data, idx) in 5'
                            :src="cardURL.src[1]+cardURL.card[idx+index*5]+'.png'"

                            :class='[(cardURL.start),(cardURL.move+(idx+1)),
                            (time.index == index ? cardURL.reveEnd : ""),
                            ("initNum"), (idx > 2 && init.textStyle == 4 && cardURL.clck == index ? "temporary" : "temporary02")]'/>
                            <!-- 背部卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),
                            (time.index == index ? cardURL.reversal : ""), (idx > 2 && init.textStyle == 4 && cardURL.clck == index ? "beimian" : "beimian02")]' />
                        </div>
                    </li>
                </ul>
            </div>

            <div class='right'>
                <ul>
                    <li v-for='data in 10'>
                        <div>
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                </ul>
            </div>
        </div>

        <footer>
            <ul>
                <li><router-link to="/chartList/1" >好友</router-link></li>

                <!-- <li><router-link to="/friend" >好友</router-link></li> -->

                <li @click='cardURL.test = false'>
                    <router-link to="/chartRoom/1" >聊天室</router-link>
                </li>
                <li v-show='init.ForT == 1'>
                    <router-link to="/message" >发布公告</router-link>
                </li>
                <li v-show='init.ForT == 0'>联系房主</li>
                <li class='roomScore' v-show='init.ForT == 1'>
                    <b>{{host.gainNum}}</b>
                    <b>抽水分数</b>
                </li>
            </ul>
        </footer>
        
        <varRoom ref="onvarRoomChild" ></varRoom>
        <toShare ref="ontoShareChild" :share='"room"'></toShare>
        <prize ref="onprizeChild" ></prize>
        <applyOn ref="onapplyOnChild" ></applyOn>

        <playerBottom ref="onplayerBottomChild" :p='ordinary.Pn'></playerBottom>
        <setOwner ref="onsetOwnerChild" ></setOwner>
        <singleBoard ref="onsingleBoardChild"></singleBoard>

    </div>
</template>

<script type="text/javascript">
    import './room.scss';
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    // 组件
    import toShare from '../../module/shareModule/toShare.vue';
    import prize from '../../module/roomModule/openRecords.vue';
    import playerBottom from '../../module/roomModule/playerBottom.vue';
    import applyOn from '../../module/roomModule/applyOn.vue';
    import setOwner from '../../module/roomModule/setOwner.vue';
    import singleBoard from '../../module/roomModule/singleBoard.vue';
    import setRoom from '../../module/homeModule/varRoom.vue';
    Vue.component('toShare', toShare)
    Vue.component('prize', prize)
    Vue.component('applyOn', applyOn)
    Vue.component('playerBottom', playerBottom)
    Vue.component('setOwner', setOwner)
    Vue.component('singleBoard', singleBoard)
    Vue.component('varRoom', setRoom)

    // 定义所有定时器
    // 游戏中定时器 [01准备5s, 02随机庄家, 03随机庄位置, 04押注倒计时, 05牌全开, 06-10s下一盘]
    let pageTimer = {};
    // 游戏状态码 {
    //      0 : 执行游戏
    //      
    // }
    export default {
        data: function(){
            return {
                // 初始化
                init: {
                    // 1是房主0是普通
                    ForT: 1,
                    prizeNum: 7,
                    // 游戏时间控制 
                    time: 0,
                    oxK: '比K',
                    // 可下注范围
                    scope: [100, 99999],
                    // 设定可下注池
                    pond: 1000,
                    // 游戏状态
                    text: ['游戏暂未开始', '准备开始：', '随机庄牌：', '可押注时间：', '开牌倒计时', '开牌结果'],
                    // 对应状态码   [0, 1, 2, 3, 4, 5, 6]
                    textStyle : 0,
                },
                time: {
                    // 准备开始倒计时
                    initTime: 5,
                    // 随机庄牌倒计时
                    random: 3,
                    // 随机背景/庄家
                    index: -1,
                    // 随机背景的速度
                    speed: 80,
                    // 押注倒计时
                    timeAll: 5,
                    // 全开倒计时
                    countTime: 10,

                },
                // 主人
                host: {
                    // 游戏开始
                    styleName: '暂停中',
                    style: false,
                    gainNum: 150000,

                },
                // 普通
                ordinary: {
                    // 背景渐变
                    bg: false,
                    // 可下注池
                    pond: 0,
                    // 总下注
                    allPay: 999,
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
                    src: ["./src/img/z999.png", "./src/img/cardPlus/"],
                    start: "",
                    move: "",
                    reversal: "",
                    reveEnd: "",
                    // 牌-号码-输赢结果
                    card: [],
                    cardEnd: [[],[],[],[],[],[],[]],
                    result: [],
                    // 点击翻转
                    clck: -1,
                },
                // 游戏结果处理
                gameOver: {
                    // 出现
                    show: false,
                    bet: false,
                    // 倒计时结束
                    timeEng: false,
                },
                apply: '申请上庄',

            }
        },
        mounted: function(){
            // init
            this.time.initTime = this.$store.state.time.initTime;
            this.time.random = this.$store.state.time.random;
            // console.log(this.time.random)
            this.$store.dispatch('login_IM')
            this.$imConn.onOpened()
            
        },
        methods: {
            varRoom(){
                this.$refs.onvarRoomChild._data.boxState.CvarRoom=true;
                this.$refs.onvarRoomChild.noModal();
            },
            toShare(){
                this.$refs.ontoShareChild._data.toShare=true;
            },
            prize(){
                this.$refs.onprizeChild._data.onprize=true;
            },
            playerBottom(index){
                let init = this.init;
                let self = this;
                if(init.textStyle == 3 && this.ordinary.pond > init.scope[0]){
                    this.$refs.onplayerBottomChild._data.playerBottom=true; 
                }
                if(init.textStyle == 5){
                    let temporary;
                    temporary = setTimeout(function(){
                        self.cardURL.clck = -1;
                        clearTimeout(temporary);
                    }, 1500)
                }
            },
            applyOn(){
                let init = this.init;
                if(init.ForT == 1) {
                    this.$refs.onsetOwnerChild._data.setOwner=true;
                } else if(init.ForT == 0){
                    this.$refs.onapplyOnChild._data.applyOn=true;
                }
            },
            singleBoard(){
                this.$refs.onsingleBoardChild._data.singleBoard=true;
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
                        this.init.textStyle = 0;
                        console.log(66)
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
                        this.gameStart();   // 执行游戏
                        break;

                }
                
                
            },
            gameStart() {
                // 开局状态请0
                this.cardURL.reversal = '';
                this.cardURL.reveEnd = '';
                this.cardURL.start = '';
                this.cardURL.move = '';
                this.cardURL.result = [];
                this.init.textStyle = 1;
                this.gameOver.bet = true;
                this.gameOver.show = false;
                this.ordinary.bg = false;
                this.gameOver.timeEng = false;
                this.cardURL.clck = -1;
                
                
                var [setT4] = [,,,,,,];

                console.log(pageTimer)

                this.ordinary.pond = this.init.pond;
                var [setT1, setT2, setT3,] = [,,,,];

                clearInterval(setT4);

                clearTimeout(setT1);
                clearTimeout(setT2);
                clearTimeout(setT3);
                // 5秒倒计时
                this.init.time = this.time.initTime;
                    // 牛牛计算 -- 比大小未完成
                    let color = ['spade', 'heart', 'clubs', 'dianmond'];
                    let card = this.cardURL.card;
                    let cardEnd = [];
                    let OXcard = this.cardURL.cardEnd;
                    console.time('a')
                    ! function result () {
                        var ResNum = Math.random()*13+1>>0;
                        var Res = color[Math.random()*4>>0] + `${ResNum}`;

                        card.indexOf(Res) < 0 ? card.push(Res) && cardEnd.push(ResNum) && result () : 
                        card.length < 35 ? result () : false;
                    } ()
                    console.timeEnd('a')

                    // 数组分离
                    for(var i=0; i<7; i++){
                        for(var o=0; o<5; o++){
                            OXcard[i].push(cardEnd[i*5 + o])
                        }
                    }
                    console.log(card)
                    console.log(cardEnd)
                    console.log(OXcard)
                    var oxArr = [];
                for(var Q=0; Q<7; Q++) {
                    // 牛几计算
                    let count = 0;
                    // 算牛
                    let suanOX = 0;
                    let maxNum = 0;
                    oxIS(0,1,2)
                        // 结果
                    function oxIS (i,j,o) {
                        // console.log(i + ',' +j+','+o)
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
                                maxNum = '牛';
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
                        oxArr.push('没牛')

                    } else {
                        oxArr.push('牛'+maxNum)
                    }
                    // 五花牛算法
                    var wuhuaOX = 0;
                    for(var i=0; i<5; i++){
                        OXcard[Q][i] > 10 ? wuhuaOX++ : false;
                    }
                    wuhuaOX >= 5 ? oxArr.splice(Q, 1, '五花牛') : false;
                }
                // 无牛比大小
                console.log(oxArr)

                let self = this;
                
                // 1、准备开始倒计时
                pageTimer["timer01"] = setInterval( ()=> {
                    self.init.time--;
                    if(self.init.time < 0) {
                        this.init.textStyle = 2;
                        bank()
                        clearInterval(pageTimer["timer01"])
                    }
                },1000)
                
                // 2、随机选庄家牌
                let num = this.init.prizeNum;

                
                function bank(){
                    let arr5 = [0, 1, 3, 4, 5];

                    self.init.time = self.time.random;
                    pageTimer["timer02"] = setInterval( ()=> {
                        self.init.time--;
                        if(self.init.time < 0) {
                            self.time.index = arr5[Math.random()*5>>0];
                            self.ordinary.bg = true;
                            self.init.textStyle = 3;
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

                    // 延时器-发完牌后倒计时
                    setT2 = setTimeout( ()=>{
                        pageTimer['timer04'] = setInterval( ()=> {
                            if(self.init.time >= 1){
                                self.init.time-- ;
                            } else {
                                self.cardURL.reversal = 'reversal';
                                self.cardURL.reveEnd = 'reveEnd';
                                FZ();
                                self.gameOver.bet = false;
                                clearInterval(pageTimer['timer04']);
                            }
                        } , 1000);
                    } , 1300 );
                }
                // 翻转FZ
                var theUrl = this.cardURL;
                let sheTimeEnd;
                function FZ(){
                    self.gameOver.show=true;
                    theUrl.result = oxArr;

                    // 翻转剩下的牌
                    setT3 = setTimeout(()=>{
                        self.init.textStyle = 4;
                        self.init.time = self.time.countTime;

                        pageTimer["timer05"] = setInterval( ()=> {
                            if(self.init.time >= 1){
                                self.init.time-- ;
                            } else {
                                self.gameOver.timeEng = true;
                                // self.gameStart();
                                self.init.time = 10;
                                self.init.textStyle = 5;

                                pageTimer["timer06"] = setInterval(()=>{
                                    if(self.init.time >= 1){
                                        self.init.time-- ;
                                    } else {
                                        self.gameStart();
                                        clearInterval(pageTimer["timer06"]);
                                    }
                                }, 1000)
                                clearInterval(pageTimer["timer05"]);
                            }
                        } , 1000);

                    }, 250)
                }
            }, 
        }
    }
   
</script>