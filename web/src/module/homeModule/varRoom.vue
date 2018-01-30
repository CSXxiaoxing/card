<template>
    <div>
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
                房号：<span>{{imgState.room_id}}</span>
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
            <input type="text" v-model.number='imgState.scope[0]' :class='init.error.minS ? "error" : ""' @focus='init.error.minS = false'/>
            <i></i>
            <input type="text" v-model.number='imgState.scope[1]' :class='init.error.maxS ? "error" : ""' @focus='init.error.maxS = false'/>
        </li>
        <li>
            <span>抽庄赢分比例：</span>
            <input type="text" value="imgState.scale" v-model.number='imgState.scale' :class='init.error.sca ? "error" : ""' @focus='init.error.sca = false'/>
            <span><span>%</span>(1-15)</span>
        </li>
    </ul>
    <button @click="end">确定</button>
  </mt-popup>
  
    <loading v-if='loading'></loading>
  </div>
</template>

<script>
    import Vue from 'vue';
    import http from '../../utils/httpClient.js';
    import router from '../../router/';

    import './varRoom.scss'
    import coreVisible from '../../module/homeModule/coreVisible.vue'
    import addButtion from '../addButton/addButtion.vue';
    Vue.component('addButtion', addButtion);
    Vue.component('coreVisible', coreVisible)

    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)

    export default {
        data() {
            return {
                loading: false,     // loading
                initType: 0,       //  0 是初创   1 是修改
                init: {
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
                    room_id: 0,
                    open: false,
                    roomName: '',
                    newMan: false,
                    cardFn: 5,
                    room: 'bell',
                    time: 30,
                    minGrade: 0,
                    scope: [0, 100],
                    scale: 1,
                    oxK: '',
                }
            };
        },
        created: function() {
            this.oxOpen = this.$store.state.initRoom;
            this.boxState.radio = this.oxOpen.oxK;
        },
        mounted: function(){
            this.$store.dispatch('webIM')
            this.$store.dispatch('dl')
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
            
            end () {
                var self = this;
                var oxNumber = this.$store.state.initRoom.oxNumber
                var oxK = this.$store.state.initRoom.oxK
                oxNumber.push(oxK)

                let [Err, git] = [this.init.error, this.imgState];
                // 规则判断
                git.roomName == '' ? Err.roomName = true : 
                git.minGrade <= 0 ? Err.minG = true : 
                git.scope[0] <= 0 ? Err.minS = true :
                git.scope[1] < git.scope[0] ? Err.maxS = true :
                git.scale < 1 || git.scale > 15 ? Err.sca = true : false;

                if(!Err.roomName && !Err.minG && !Err.minS && !Err.maxS && !Err.sca) {
                    if(self.initType == 0) {
                        var options = { // 创建聊天群组
                            data: {
                                groupname: '牛群'+localStorage.oxUid,
                                desc: '聊天室开发测试',
                                members: ['hz_niuniu_961','hz_niuniu_962'],
                                public: false,
                                approval: false,
                                allowinvites: true,
                            },
                            success: function (respData) {
                                console.log(respData) // 创建房间成功
                                console.log(respData.data.groupid) // 创建房间成功
                                http.post("/Room/createRoom",{
                                    zc_rate : JSON.stringify(oxNumber),
                                    zc_number : self.imgState.room_id,
                                    zn_min_score : self.imgState.minGrade,
                                    zn_bet_between_s : self.imgState.scope[0],
                                    zn_bet_between_e : self.imgState.scope[1],
                                    zn_extract : self.imgState.scale,
                                    zn_chatid : respData.data.groupid,      // 群聊号码
                                    // zn_room_type : self.imgState.open ? 1 : 2,
                                    zn_room_type : self.imgState.open ? 1 : 1,
                                    zn_confirm : self.imgState.newMan ? 1:2,
                                    zn_pay_type : self.imgState.room ? 1:2,
                                    zn_play_type : self.imgState.cardFn ? 1:2,
                                    zn_bet_time : self.imgState.time,
                                    zc_title : self.imgState.roomName,
                                } , '' ,this)
                                .then(res=> {
                                    if(res.status == 1 && self.imgState.room_id > 0){
                                        router.push({path: `room/${self.imgState.room_id}`});
                                    }
                                })
                            },
                            error: function (err) {
                                console.log('创建失败')
                            }
                        };
                        conn.createGroupNew(options);

                    } else if(self.initType == 1){
                        http.post("/Room/updatedRoom",{
                            zc_rate : JSON.stringify(oxNumber),
                            zn_chatid : self.$store.state.idRoom.zn_chatid,
                            // zc_number : self.imgState.room_id,
                            roomid: self.$store.state.idRoom.room_id,
                            zn_min_score : self.imgState.minGrade,
                            zn_bet_between_s : self.imgState.scope[0],
                            zn_bet_between_e : self.imgState.scope[1],
                            zn_extract : self.imgState.scale,
                            // zn_room_type : self.imgState.open ? 1 : 2,
                            zn_room_type : self.imgState.open ? 1 : 1,
                            zn_confirm : self.imgState.newMan ? 1:2,
                            zn_pay_type : self.imgState.room ? 1:2,
                            zn_play_type : self.imgState.cardFn ? 1:2,
                            zn_bet_time : self.imgState.time,
                            zc_title : self.imgState.roomName,
                        } , '' ,this)
                        .then(res=> {
                            console.log(res)
                            if(res.status == 1 && self.imgState.room_id > 0){
                                // router.push({path: `room/${self.imgState.room_id}`}); 通知更新
                            }
                        })
                    }
                    
                    this.$store.state.setRoom = this.imgState;
                    this.boxState.CvarRoom = false;
                }       // 确认创建
            },

        }
    }
</script>