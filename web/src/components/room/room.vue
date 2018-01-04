<template>
    <div id='room'>
        <header>
            <ul>
                <li>
                    <i></i>
                    <span>第<i>20</i>局</span>
                    <p :class='gameOpen ? "open" : "" '>
                        <span>游戏中</span>
                        <i v-show='ForT == 1'>
                            <b></b>
                        </i>
                    </p>
                </li>
                <li>
                    <span><i></i>开奖记录</span>
                    <span><i></i>流水报表</span>
                </li>
            </ul>
            <dl>
                <dt>
                    <img src="../../img/room03.png" height="155" width="149" alt="" />
                </dt>
                <dd  v-show='ForT == 0'>迷迷糊糊</dd>
                <dd  v-show='ForT == 0'>分数：<span>10999</span></dd>
                <!-- 房主 -->
                <dd  v-show='ForT == 1'>房总分：<span>71666</span></dd>
                <dd  v-show='ForT == 1'><i></i>房间设置</dd>

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
                    <li>{{apply}}</li>
                </ul>
            </div>
            <div class='center'>
                <h1>押注时间：<span>10秒</span></h1>
                <p>还可下注：1090.56</p>
                <ul>
                    <li>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        
                        <span>100.01<br/><b>99999.00</b></span>
                    </li>
                
                    <li>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        
                        <span>100.01<br/><b>99999.00</b></span>
                    </li>
                
                    <li>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        
                        <span ><img  class="zhuang" src="../../img/room4.png"></span>
                    </li>
                
                    <li>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        
                        <span>100.01<br/><b>99999.00</b></span>
                    </li>
                
                    <li>
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        <img src="../../img/room3.png">
                        
                        <span>100.01<br/><b>99999.00</b></span>
                    </li>
                </ul>
            </div>
            <div class='right'>
                <ul>
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
                </ul>
            </div>
        </div>

        <footer>
            <ul>
                <li>好友</li>
                <li>聊天室</li>
                <li v-show='ForT == 1'>发布公告</li>
                <li v-show='ForT == 0'>联系房主</li>
                <!-- <li></li> -->
                <li class='roomScore' v-show='ForT == 1'>
                    <b>150000</b>
                    <b>抽水分数</b>
                </li>
            </ul>
        </footer>

        <!-- <noOpen  ref="onOpenChild" ></noOpen> -->
        <toShare ref="ontoShareChild" :share='"room"'></toShare>
        
    </div>
</template>

<script type="text/javascript">
    import './room.scss';
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    // 组件
    import toShare from '../../module/shareModule/toShare.vue';
    Vue.component('toShare', toShare)
    // import noOpen from '../../module/homeModule/noOpen.vue';
    // Vue.component('noOpen', noOpen)
    export default {
        data: function(){
            return {
                datagrid : '',
                // 1是房主0是普通
                ForT: 1,
                apply: '申请上庄',
                // 游戏开始
                gameOpen: true,
            }
        },
        mounted: function(){
            // var self = this;
            // http.post({
            //     url: 'sel',vm:this
            // }).then(res => {
            //     self.datagrid = res.data;
            //     console.log(res.data)
            // })
        },
        methods: {
            openS(e){
                let Etar = e.target;
                var Tar = () => {
                    var EtarName = Etar.nodeName.toLowerCase();
                    if(EtarName == 'li'){
                        Etar.attributes["openState"].nodeValue == 'false' ? 
                        this.$refs.onOpenChild._data.onOpenRoom =
                        ++[[]][+[]]+[+[]] == 10 : 0.1+0.2 ==0.3;
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
            toShare(){
                this.$refs.ontoShareChild._data.toShare=true;
            },
            generateToolBar: function(obj){
                //动态生成按钮
                
            },
        }
    }
</script>