<template>
    <div id='room'>
        <header>
            <ul>
                <li>
                    <i><router-link to="/home" ></router-link></i>
                    <span>第<i>20</i>局</span>
                    <p :class='host.gameOpen ? "open" : "" '>
                        <span>{{host.styleName}}</span>
                        <i v-show='init.ForT == 1' @click='host.style = true'>
                            <b></b>
                        </i>
                        <mt-popup
                            v-model="host.style"
                            :modal='false'
                            popup-transition="popup-fade"
                            class='gameStyle'
                            @click='style = false'>
                                <span @click='gameStyle'>游戏中</span>
                                <span @click='gameStyle'>休息中</span>
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
                <dd  v-show='init.ForT == 1'><i></i>房间设置</dd>

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
                    <li @click="playerBottom">
                        <div>
                            <img src="../../img/room1.png">
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li @click="ownerBottom">
                        <div>
                            <span>76000</span>
                        </div>
                        <p>迷糊的大土</p>
                    </li>
                    <li @click="setOwner">
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
                    <li  @click="applyOn">{{apply}}</li>
                </ul>
            </div>


            <div class='center'>
                <h1 v-if='!host.gameOpen' @click='gameStart'>游戏开始</h1>
                <h1 v-if='host.gameOpen'>{{init.before}}<span>{{init.time}}秒</span></h1>
                <p>还可下注：1090.56</p>
                <ul>
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>

                        <img v-for='dat in 5' src="../../img/room3.png">

                        <span>
                            <b :class='[(init.prizeNum == 7 ? "b7" : "a5"),(gameOver.show)]'>{{cardURL.result[0]}}</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img v-if='host.gameOpen'
                            v-for='(data, idx) in 5'  
                            :src="cardURL.src[1]+cardURL.card[idx]+'.png'"  
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reveEnd),("initNum")]'/>
                            <!-- 卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reversal)]' />
                        </div>
                    </li>
                
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img v-for='dat in 5' src="../../img/room3.png">
                        <span>
                            <b :class='[(init.prizeNum == 7 ? "b7" : "a5"),(gameOver.show)]'>{{cardURL.result[1]}}</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img v-if='host.gameOpen'
                            v-for='(data, idx) in 5'  
                            :src="cardURL.src[1]+cardURL.card[idx+5]+'.png'"  
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reveEnd),("initNum")]'/>
                            <!-- 卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reversal)]' />
                        </div>
                    </li>

                    <li v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img v-for='dat in 5' src="../../img/room3.png">
                        
                        <span>
                            <b :class='[(init.prizeNum == 7 ? "b7" : "a5"),(gameOver.show)]'>
                                {{cardURL.result[2]}}
                            </b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img v-if='host.gameOpen'
                            v-for='(data, idx) in 5'  
                            :src="cardURL.src[1]+cardURL.card[idx+10]+'.png'"  
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reveEnd),("initNum")]'/>
                            <!-- 卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reversal)]' />
                        </div>
                    </li>
                
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img v-for='dat in 5' src="../../img/room3.png">
                        
                        <img  class="zhuang" src="../../img/room4.png"></span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img v-if='host.gameOpen'
                            v-for='(data, idx) in 5'  
                            :src="cardURL.src[1]+cardURL.card[idx+15]+'.png'"  
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reveEnd),("initNum")]'/>
                            <!-- 卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reversal)]' />
                        </div>
                    </li>
                
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img v-for='dat in 5' src="../../img/room3.png">
                        <span :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <b :class='[(init.prizeNum == 7 ? "b7" : "a5"),(gameOver.show)]'>{{cardURL.result[4]}}</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img v-if='host.gameOpen'
                            v-for='(data, idx) in 5'  
                            :src="cardURL.src[1]+cardURL.card[idx+20]+'.png'"  
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reveEnd),("initNum")]'/>
                            <!-- 卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reversal)]' />
                        </div>
                    </li>

                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img v-for='dat in 5' src="../../img/room3.png">
                        <span>
                            <b :class='[(init.prizeNum == 7 ? "b7" : "a5"),(gameOver.show)]'>
                            {{cardURL.result[5]}}
                            </b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img v-if='host.gameOpen'
                            v-for='(data, idx) in 5'  
                            :src="cardURL.src[1]+cardURL.card[idx+25]+'.png'"  
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reveEnd),("initNum")]'/>
                            <!-- 卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reversal)]' />
                        </div>
                    </li>

                    
                    <li v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img v-for='dat in 5' src="../../img/room3.png">
                        
                        <span>
                            <b :class='[(init.prizeNum == 7 ? "b7" : "a5"),(gameOver.show)] '>
                            {{cardURL.result[6]}}
                            </b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>

                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img v-if='host.gameOpen'
                            v-for='(data, idx) in 5'  
                            :src="cardURL.src[1]+cardURL.card[idx+30]+'.png'"  
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reveEnd),("initNum")]'/>
                            <!-- 卡片 -->
                            <img :src="cardURL.src[0]"  v-for='(data, idx) in 5' 
                            :class='[(cardURL.start),(cardURL.move+(idx+1)),(cardURL.reversal)]' />
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
                <li><router-link to="/friend" >好友</router-link></li>
                <li @click='cardURL.test = false'>
                    <router-link to="/friend" >聊天室</router-link>
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
        
        <toShare ref="ontoShareChild" :share='"room"'></toShare>
        <prize ref="onprizeChild" :prizeNum='init.prizeNum' ></prize>
        <ownerBottom ref="onownerBottomChild" :prizeNum='init.prizeNum' ></ownerBottom>
        <applyOn ref="onapplyOnChild" :prizeNum='init.prizeNum' ></applyOn>
        <playerBottom ref="onplayerBottomChild" :prizeNum='init.prizeNum' ></playerBottom>
        <setOwner ref="onsetOwnerChild" :prizeNum='init.prizeNum' ></setOwner>
        <singleBoard ref="onsingleBoardChild" :prizeNum='init.prizeNum' ></singleBoard>
    </div>
</template>

<script type="text/javascript">
    import './room.scss';
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    // 组件
    import toShare from '../../module/shareModule/toShare.vue';
    import prize from '../../module/roomModule/openRecords.vue';
    import ownerBottom from '../../module/roomModule/ownerBottom.vue';
    import playerBottom from '../../module/roomModule/playerBottom.vue';
    import applyOn from '../../module/roomModule/applyOn.vue';
    import setOwner from '../../module/roomModule/setOwner.vue';
    import singleBoard from '../../module/roomModule/singleBoard.vue';
    Vue.component('toShare', toShare)
    Vue.component('prize', prize)
    Vue.component('ownerBottom', ownerBottom)
    Vue.component('applyOn', applyOn)
    Vue.component('playerBottom', playerBottom)
    Vue.component('setOwner', setOwner)
    Vue.component('singleBoard', singleBoard)

    export default {
        data: function(){
            return {
                test: '',
                // 初始化
                init: {
                    // 1是房主0是普通
                    ForT: 1,
                    prizeNum:7,
                    before: '押注时间：',
                    time: 1,
                    oxK: '比K'
                },
                // 主人
                host: {
                    // 游戏开始
                    gameOpen: false,
                    styleName: '休息中',
                    style: false,
                    gainNum: 150000,
                },
                // 普通
                ordinary: {

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
                    // 结果
                    result: [],
                },
                // 游戏结果处理
                gameOver: {
                    // 出现
                    show: '',
                },
                datagrid : '',
                apply: '申请上庄',
            }
        },
        mounted: function(){
        },
        methods: {

            toShare(){
                this.$refs.ontoShareChild._data.toShare=true;
            },
            prize(){
                this.$refs.onprizeChild._data.onprize=true;
            },
            ownerBottom(){
                this.$refs.onownerBottomChild._data.ownerBottom=true;
            },
            playerBottom(){
                this.$refs.onplayerBottomChild._data.playerBottom=true;
            },
            applyOn(){
                this.$refs.onapplyOnChild._data.applyOn=true;
            },
            setOwner(){
                this.$refs.onsetOwnerChild._data.setOwner=true;
            },
            singleBoard(){
                this.$refs.onsingleBoardChild._data.singleBoard=true;
            },
            gameStyle(e){
                let [Host, Etxt] = [this.host, e.target.innerText];
                Host.style = false;
                Host.styleName = Etxt;
                Etxt == '游戏中' ? Host.gameOpen = true : Host.gameOpen = false;
            },
            gameStart(){
                this.host.gameOpen = true;
                let num = this.init.prizeNum;
                // 牛牛计算 -- 五花牛未完成 -- 比大小未完成
                // 卡牌结果
                let color = ['spade', 'heart', 'clubs', 'dianmond'];
                let card = this.cardURL.card;
                let cardEnd = [];
                let OXcard = this.cardURL.cardEnd;

                console.time('a')
                ! function result () {
                    var ResNum = Math.random()*13+1>>0;
                    var Res = color[Math.random()*4>>0] + `${ResNum}`;

                    // var oxNum = ResNum >10 ? 10 : ResNum;

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
            }
            console.log(oxArr)

                this.host.styleName = '游戏中';
                this.cardURL.start = 'start' ;
                var setCard;
                var setT1;
                var setT2;
                var setT3;
                clearInterval(setCard);
                clearTimeout(setT1);
                clearTimeout(setT2);
                clearTimeout(setT3);

                setT1 = setTimeout( ()=>{
                    this.cardURL.move = 'card0' ;
                } , 500 );

                // 延时器-发完牌后倒计时
                setT2 = setTimeout( ()=>{

                    setCard = setInterval( ()=> {

                        if(this.init.time >= 1){
                            this.init.time-- ;
                        } else {
                            this.cardURL.reversal = 'reversal';
                            this.cardURL.reveEnd = 'reveEnd';
                            FZ();
                            clearInterval(setCard);
                        }
                    } , 1000);
                } , 1300 );

                var theUrl = this.cardURL;
                var ceshi = document.getElementsByClassName("i02");
                // 翻转FZ
                
                var self = this;
                function FZ(){
                    setT3 = setTimeout(()=>{
                        self.gameOver.show='showoff'
                        theUrl.result = oxArr;
                    }, 250)
                }
            },
            generateToolBar: function(obj){
                //动态生成按钮
            },
            
        }
    }
   
</script>