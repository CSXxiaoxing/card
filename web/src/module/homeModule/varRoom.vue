<template>
  <mt-popup 
  v-model="boxState.CvarRoom" 
  popup-transition="popup-fade"  
  class="Cvar" >
    <div class="varR_modal" style='z-index: 2000' @click='noModal'></div>
    <mt-popup 
      v-model="boxState.coreVisible"
      popup-transition="popup-fade"
      :modal='false'
      class="set">

        <p class="top">
            倍率设置 
            <b class="close" @click="noModal">
            </b>
        </p>
      <div class="DLUL">
        <p>提示：大型牌的倍率不能低于小牌型</p>
        <dl>
            <dt>无牛</dt>
            <dd>
                <div class="dd_radio">
                    <label class="mint-radiolist-label" v-for="dataRadio in ['比J', '比Q', '比K', '无牛关机 (庄赢)']">
                        <span class="mint-radio">
                            <input type="radio" class="mint-radio-input" :value='dataRadio' name="Dradio" v-model="boxState.radio = dataRadio" />
                            <span class="mint-radio-core"></span>
                        </span>
                        <span class="mint-radio-label">{{dataRadio}}</span>
                    </label>
                </div>
            </dd>
        </dl>
        <ul>
            <li v-for='(data, index) in ox'>
                <span>{{data}}</span>
                <addButtion class="add" :oxNum = 'index' ></addButtion>
            </li>
        </ul>
      </div>
        <hr/>
        <mt-button @click="idMessage = false" >确定</mt-button>
    </mt-popup >

    <mt-popup
        v-model="boxState.no"
        popup-transition="popup-fade" 
        :modal='false'
        class="no">
        <b class="close" @click="noModal"></b>
        <p>该功能暂未开放</p>
    </mt-popup>

    <mt-popup
        v-model="boxState.card"
        popup-transition="popup-fade" 
        :modal='false'
        class="card" >
        <p>
            房卡消耗方式 
            <b class="close" @click="noModal">
            </b>
        </p>
        <div></div>
    </mt-popup>
<!-- touchstart touchmove touchend  -->
    <h3 @click='varMo'>创建房间</h3>
    <ul class='varRoomSet' @click="open" @change="inputChange">
        <li>
            <label  v-on:click="card = true">
                房号：<span>777776</span>
            </label>
            <label :judge='"open"' @click='boxNo'>
                <span>
                    <img src="../../img/varTrue.png" v-show='imgState.open' height="81" width="76" alt="" />
                </span>
                公开
            </label>
        </li>
        <li>
            <span>房名：</span>
            <input type="text" v-model="imgState.roomName" :Inp = '"roomN"'/>
        </li>
        <li>
            <span>新人进房确认</span>
            <mt-switch v-model="imgState.newMan" class="onOff">
            </mt-switch>
        </li>
        <li>
            <span>玩法：</span>
            <label :judge='"cardFn5"'>
                <span>
                    <img src="../../img/varTrue.png" v-show='imgState.cardFn == 5' height="81" width="76" alt="" />
                </span>
                5副牌 
            </label>
            <label :judge='"cardFn7"'>
                <span>
                    <img src="../../img/varTrue.png" v-show='imgState.cardFn == 7' height="81" width="76" alt="" />
                </span>
                7副牌 
            </label>
        </li>
        <li>
            <p>
                房间付费模式：
                <span @click="boxMoney">付费详情</span>
            </p>
            <label :judge='"bell"'>
                <span>
                    <img src="../../img/varTrue.png" v-show='imgState.room == "bell"' height="81" width="76" alt="" />
                </span>
                钟点房 
            </label>
            <label :judge='"day"'>
                <span>
                    <img src="../../img/varTrue.png" v-show='imgState.room == "day"' height="81" width="76" alt="" />
                </span>
                日费房 
            </label>
            <div class="clear"></div>
        </li>
        <li>
            <p>
                倍率设置：
                <span @click="boxSet">点击设置倍率</span>
            </p>
        </li>
        <li>
            <dl>
                <dt>无牛(比K)</dt>
                <dd>牛一(X1)</dd>
                <dd>牛二(X1)</dd>
                <dd>牛三(X1)</dd>
                <dd>牛四(X1)</dd>
                <dd>牛五(X1)</dd>
                <dd>牛六(X1)</dd>
                <dd>牛七(X2)</dd>
                <dd>牛八(X2)</dd>
                <dd>牛九(X3)</dd>
                <dd>牛牛(X4)</dd>
                <dd>五花牛(X5)</dd>
                <dd></dd>
            </dl>
        </li>
        <li>
            <p>可下注时间：</p>
            <div class="divTime">

                <label v-for='times in time' :judge='times' >
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == times' height="81" width="76" alt="" />
                    </span>
                    {{times/60 >= 1 ? (times/60 + miss[1]): (times+miss[0])}}
                </label>

            </div>
        </li>
        <li>
            <p>
                庄家封顶预赔分或最低上庄分数：
            </p>
            <input type="text" value="imgState.minGrade" v-model='imgState.minGrade' :Inp = '"minG"'/>
        </li>
        <li>
            <span>玩家下注范围：</span>
            <input type="text" value="imgState.minScope" v-model='imgState.minScope' :Inp = '"minS"'/>
            <i></i>
            <input type="text" value="imgState.maxScope" v-model='imgState.maxScope':Inp = '"maxS"'/>
        </li>
        <li>
            <span>抽庄赢分比例：</span>
            <input type="text" value="imgState.scale" v-model='imgState.scale':Inp = '"sca"'/>
            <span><span>%</span>(1-15)</span>
        </li>
    </ul>
    <button @click="boxState.CvarRoom = false">确定</button>
  </mt-popup>
</template>

<script>
    import Vue from 'vue';
    import './varRoom.scss'
    import coreVisible from '../../module/homeModule/coreVisible.vue'
    import addButtion from '../addButton/addButtion.vue';
    Vue.component('addButtion', addButtion);
    Vue.component('coreVisible', coreVisible)

    export default {
        data() {
            return {
                ox: ['牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花牛'],
                time: [30, 60, 120, 180, 300, 480],
                miss: ['秒', '分'],
                boxState: {
                    CvarRoom: false,
                    coreVisible: false,
                    varModal: false,
                    no:false,
                    card:false,
                    radio: '',
                },
                imgState: {
                    state: false,
                    open: false,
                    roomName: '',
                    newMan: false,
                    cardFn: 5,
                    room: 'bell',
                    time: 30,
                    minGrade: 0,
                    minScope: 0,
                    maxScope: 100,
                    scale: 1,
                }
            };
        },
        methods: {
            open(e) {
                let [img, judgeVal, nodeName, labelTarget, spanTarget, imgTarget] =  
                [this.imgState, void 0, 
                e.target.nodeName.toLowerCase(), 
                e.target.attributes["judge"], 
                e.target.parentElement.attributes["judge"], 
                e.target.parentElement.parentElement.attributes["judge"]];

                try {
                    labelTarget ? judgeVal = labelTarget.nodeValue : 
                    nodeName == 'span' ? judgeVal = spanTarget.nodeValue : 
                    judgeVal = imgTarget.nodeValue;
                    judgeVal == 'open' ? (img.open == false? img.open = false : img.open = false) : 
                    judgeVal == 'cardFn5' ? img.cardFn = 5 : 
                    judgeVal == 'cardFn7'? img.cardFn = 7 : 
                    judgeVal == 'bell' ? img.room = 'bell' : 
                    judgeVal == 'day' ? img.room = 'day' : 
                    judgeVal >= 30 ? img.time = judgeVal : false;
                } catch (er) {};
                
            },
            inputChange(ev) {

                try {
                let [inp, inpTarget, inpVal] = [this.imgState, ev.target.attributes["Inp"].nodeValue, ev.target.value];
                // 规则判断
                inpTarget == 'roomN' ? 
                (inpVal.length <= 15 ? inp.roomName = inpVal : inp.state = false) :
                inpTarget == 'minG' ? 
                (inpVal >= 1 && inpVal <= 99999 ? inp.minGrade = inpVal : inp.state = false) :
                inpTarget == 'minS' ? 
                (inpVal >= 1 ? inp.minScope = inpVal : inp.state = false) :
                inpTarget == 'maxS' ? 
                (inpVal > inp.minScope && inpVal <= 99999 ? inp.maxScope = inpVal : inp.state = false) :
                inpTarget == 'sca' ? 
                (inpVal >=1 && inpVal <=15 ? inp.scale = inpVal : inp.state = false) : false;
                } catch (err) {};
                // var numTrue = numT => {
                //     // 验证数字
                //     var reg = new RegExp("^[0-9]*$");
                //     if(!reg.test(ev.target.value)){
                //         inp.state = false;
                //         ev.target.value = 1;
                //         return false;
                //     } else if(ev.target.value == 0){
                //         inp.state = false;
                //         return false;
                //     } else {
                //         console.log(ev.target.value.replace(/^[0]+/,''))
                //         // this.moreCard = false;match
                //     }
                // }
            },
            varMo(event) {
                var [vModal, Cvar] = [document.getElementsByClassName('varR_modal')[0], 
                                      document.getElementsByClassName('Cvar')[0]]
                var touModal = ()=>{
                    vModal.style.zIndex <= Cvar.style.zIndex ? 
                    ( vModal.style.zIndex++ && touModal() ) : 
                    vModal.style.display = 'block';
                }
                touModal()
            },
            noModal() {
                this.boxState.no = false;
                this.boxState.card = false;
                this.boxState.coreVisible = false;
                document.getElementsByClassName('varR_modal')[0].style.display = 'none';
            },
            // 公开 倍率 付费
            boxNo() {
                this.varMo(event)
                this.boxState.no = true;
            },
            boxSet() {
                this.varMo(event)
                this.boxState.coreVisible = true;
            },
            boxMoney() {
                this.varMo(event)
                this.boxState.card = true
            },
            test() {
                console.log(this)
            }
        }
    }
</script>