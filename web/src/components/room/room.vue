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
                    <span><i></i>流水报表</span>
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
                <!-- <h1>押注时间：<span>{{init.time}}秒</span></h1> -->
                <h1>押注时间：<span v-show='host.gameOpen'>{{init.time}}秒</span></h1>
                <p >还可下注：1090.56</p>
                <ul>
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" ' >
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <span>
                            <b v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>牛一</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card01":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card02":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card03":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card04":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card05":""' alt="" />
                        </div>
                    </li>
                
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <span>
                            <b v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>牛一</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card01":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card02":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card03":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card04":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card05":""' alt="" />
                        </div>
                    </li>
                
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <span v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <b >牛一</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <span v-show='init.prizeNum == 5' :class='init.prizeNum == 5 ? "a5" : "b7" '>
                            <img  class="zhuang" src="../../img/room4.png"></span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card01":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card02":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card03":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card04":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card05":""' alt="" />
                        </div>
                    </li>
                
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <span v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img  class="zhuang" src="../../img/room4.png">
                        </span>

                        <span v-show='init.prizeNum == 5' :class='init.prizeNum == 5 ? "a5" : "b7" '>100.01<br/><b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card01":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card02":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card03":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card04":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card05":""' alt="" />
                        </div>
                    </li>
                
                    <li :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <span>
                            <b v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>牛一</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>
                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card01":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card02":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card03":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card04":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card05":""' alt="" />
                        </div>
                    </li>

                    <li v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        
                        <span>
                            <b v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>牛一</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>

                        <!-- 扑克牌 -->
                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card01":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card02":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card03":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card04":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card05":""' alt="" />
                        </div>
                    </li>
                    <li v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        
                        <span>
                            <b v-show='init.prizeNum == 7' :class='init.prizeNum == 7 ? "b7" : "a5" '>牛一</b>
                            <br/>100.01<br/>
                            <b>99999.00</b>
                        </span>

                        <div class='testCard' :class='init.prizeNum == 7 ? "b7" : "a5" '>
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card01":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card02":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card03":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card04":""' alt="" />
                            <img src="../../img/z999.png" :class='cardURL.test ==true ? "card05":""' alt="" />
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
                <li @click='testCard'>好友</li>
                <li @click='cardURL.test = false'>聊天室</li>
                <li v-show='init.ForT == 1'>
                    <router-link to="/message" >发布公告</router-link>
                </li>
                <li v-show='init.ForT == 0'>联系房主</li>
                <!-- <li></li> -->
                <li class='roomScore' v-show='init.ForT == 1'>
                    <b>150000</b>
                    <b>抽水分数</b>
                </li>
            </ul>
        </footer>
        
        <!-- <noOpen  ref="onOpenChild" ></noOpen> -->
        <toShare ref="ontoShareChild" :share='"room"'></toShare>
        <prize ref="onprizeChild" :prizeNum='init.prizeNum' ></prize>
        <ownerBottom ref="onownerBottomChild" :prizeNum='init.prizeNum' ></ownerBottom>
        <applyOn ref="onapplyOnChild" :prizeNum='init.prizeNum' ></applyOn>
        <playerBottom ref="onplayerBottomChild" :prizeNum='init.prizeNum' ></playerBottom>
        <setOwner ref="onsetOwnerChild" :prizeNum='init.prizeNum' ></setOwner>
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
    Vue.component('toShare', toShare)
    Vue.component('prize', prize)
    Vue.component('ownerBottom', ownerBottom)
    Vue.component('applyOn', applyOn)
    Vue.component('playerBottom', playerBottom)
    Vue.component('setOwner', setOwner)

    export default {
        data: function(){
            return {
                // 初始化
                init: {
                    // 1是房主0是普通
                    ForT: 1,
                    prizeNum:5,
                    before: '押注时间：',
                    time: 30,
                },
                // 主人
                host: {
                    // 游戏开始
                    gameOpen: true,
                    styleName: '游戏中',
                    style: false,
                },
                // 普通
                ordinary: {

                },
                // 扑克牌
                cardURL: {
                    test: false,
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
            gameStyle(e){
                let [Host, Etxt] = [this.host, e.target.innerText];
                Host.style = false;
                Host.styleName = Etxt;
                Etxt == '游戏中' ? Host.gameOpen = true : Host.gameOpen = false;
            },
            testCard(){
                
                this.cardURL.test = true;
            },
            generateToolBar: function(obj){
                //动态生成按钮
            },
            
        }
    }
</script>