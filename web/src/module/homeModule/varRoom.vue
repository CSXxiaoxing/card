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
                    <label class="mint-radiolist-label" v-for="dataRadio in oxOpen.radioValue"  >
                        <span class="mint-radio">
                            <input type="radio" class="mint-radio-input" :value='dataRadio' name="Dradio" v-model="boxState.radio" />
                            <span class="mint-radio-core"></span>
                        </span>
                        <span class="mint-radio-label">{{dataRadio}}</span>
                    </label>
                </div>
            </dd>
        </dl>
        <ul>
            <li v-for='(data, index) in oxOpen.ox'>
                <span>{{data}}</span>
                <addButtion class="add" :oxNum = 'index' ></addButtion>
            </li>
        </ul>
      </div>
        <hr/>
        <mt-button @click="coreVisible" >确定</mt-button>
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
    <h3>创建房间 <i @click="boxState.CvarRoom = false">×</i> </h3>
    <ul class='varRoomSet' @click="open">
        <li>
            <label  @click="card = true">
                房号：<span>{{init.roomID}}</span>
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
            <input type="text" v-model.trim="imgState.roomName" :placeholder='init.plaName' :class='init.error.roomName ? "error" : ""' @focus='init.error.roomName = false' @change="inputChange"/>
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
                <span @click="boxSet">付费详情</span>
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
                <dt>无牛({{oxOpen.oxK}})</dt>
                <dd v-for='(cent,index) in oxOpen.oxNumber'>
                    {{oxOpen.ox[index]}}(X{{cent}})
                </dd>
                <dd></dd>
            </dl>
        </li>
        <li>
            <p>可下注时间：</p>
            <div class="divTime">

                <label v-for='times in oxOpen.time' :judge='times' >
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == times' height="81" width="76" alt="" />
                    </span>
                    {{times/60 >= 1 ? (times/60 + oxOpen.miss[1]): (times+oxOpen.miss[0])}}
                </label>

            </div>
        </li>
        <li>
            <p>
                庄家封顶预赔分或最低上庄分数：
            </p>
            <input type="text" value="imgState.minGrade" v-model.number='imgState.minGrade' :class='init.error.minG ? "error" : ""' @focus='init.error.minG = false'/>
        </li>
        <li>
            <span>玩家下注范围：</span>
            <input type="text" value="imgState.minScope" v-model.number='imgState.minScope' :class='init.error.minS ? "error" : ""' @focus='init.error.minS = false'/>
            <i></i>
            <input type="text" value="imgState.maxScope" v-model.number='imgState.maxScope' :class='init.error.maxS ? "error" : ""' @focus='init.error.maxS = false'/>
        </li>
        <li>
            <span>抽庄赢分比例：</span>
            <input type="text" value="imgState.scale" v-model.number='imgState.scale' :class='init.error.sca ? "error" : ""' @focus='init.error.sca = false'/>
            <span><span>%</span>(1-15)</span>
        </li>
    </ul>
    <button @click="end">确定</button>
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
                init: {
                    roomID : 777777,
                    plaName: '请输入房间名称',
                    error: {
                        roomName : false,
                        minG: false,
                        minS: false,
                        maxS: false,
                        sca : false,
                    },
                }, 
                oxOpen: {},
                // 弹框状态
                boxState: {
                    CvarRoom: false,
                    coreVisible: false,
                    varModal: false,
                    no:false,
                    card:false,
                    radio: "",
                },
                imgState: {
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
        created: function() {
            this.oxOpen = this.$store.state.initRoom;
            this.boxState.radio = this.oxOpen.oxK;
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
            inputChange() {
                // roon过滤
                let [inp, badDI, nameSize] = [this.imgState, this.$store.state.badDict, this.oxOpen.nameLenth];
                inp.roomName = inp.roomName.replace(badDI,'*');
                var [Val, count, ValArray] = [ [], 0, inp.roomName.split('') ];
                for(var i=0; i<inp.roomName.length; i++){
                    count += ValArray[i].replace(/[\u0391-\uFFE5]/g,"aa").length;
                    if(count > nameSize){
                        break;
                    } else {
                        Val.push(ValArray[i]);
                    }
                }
                inp.roomName = Val.join('');
            },
            varMo() {
                var [vModal, Cvar] = [document.getElementsByClassName('varR_modal')[0].style, 
                                      document.getElementsByClassName('Cvar')[0].style];
                1 ^ function touModal () {
                    vModal.zIndex <= Cvar.zIndex ? vModal.zIndex++ && touModal() : 
                    vModal.display = 'block';
                } ()
            },
            noModal() {
                let State = this.boxState;
                State.no = false ;
                State.card = false ;
                State.coreVisible = false ;
                document.getElementsByClassName('varR_modal')[0].style.display = 'none';
            },
            // 确认倍率
            coreVisible() {
                this.$store.state.initRoom.oxK = this.boxState.radio;
                this.noModal();
            },
            // 倍率/付费  公开
            boxSet(e) {
                e.target.innerText == '付费详情' ? this.boxState.card = true : 
                this.boxState.coreVisible = true ;
                this.varMo();
            },
            boxNo() {
                this.varMo();
                this.boxState.no = true;
            },
            // 确认创建
            end(eve) {
                let [Err, git] = [this.init.error, this.imgState];
                var a = this.$store.state.initRoom.oxK
                var oxNumber = this.$store.state.initRoom.oxK
                console.log(this.imgState)
                console.log(oxNumber)
                console.log(a)
                // 规则判断
                git.roomName == '' ? Err.roomName = true : 
                git.minGrade <= 0 ? Err.minG = true : 
                git.minScope <= 0 ? Err.minS = true :
                git.maxScope < git.minScope ? Err.maxS = true :
                git.scale < 1 || git.scale > 15 ? Err.sca = true : false;

                if(!Err.roomName && !Err.minG && !Err.minS && !Err.maxS && !Err.sca) {
                    console.log(this.imgState)
                    this.$store.state.setRoom = this.imgState;
                    console.log(this.oxOpen)
                    this.boxState.CvarRoom = false;
                }

            }
        }
    }
</script>