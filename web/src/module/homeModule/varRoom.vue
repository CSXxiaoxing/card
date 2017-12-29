<template>
  <el-dialog :visible.sync="boxState.CvarRoom" width="80%"  custom-class="Cvar" center>
    <el-dialog
        width="80%"
        :visible.sync="boxState.coreVisible"
        append-to-body>
        <coreVisible></coreVisible>
    </el-dialog>
<!--     <el-dialog
        width="80%"
        :visible.sync="coreVisible"
        append-to-body>
    </el-dialog>
    <el-dialog
        width="80%"
        :visible.sync="coreVisible"
        append-to-body>
    </el-dialog> -->
    <h3>创建房间</h3>
    <ul class='varRoomSet' @click="open" @change="inputChange">
        <li>
            <label>
                房号：<span>777776</span>
            </label>
            <label :judge='"open"'>
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
            <el-switch v-model="imgState.newMan"
                :width=94
                active-color='red'>
            </el-switch>
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
                <span>付费详情</span>
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
                <span @click="boxState.coreVisible = true">点击设置倍率</span>
            </p>
        </li>
        <li>
            <dl>
                <dt>无牛(比k)</dt>
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
            </dl>
        </li>
        <li>
            <p>可下注时间：</p>
            <div class="divTime">
                <label :judge='30'>
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == 30' height="81" width="76" alt="" />
                    </span>
                    30秒 
                </label>
                <label :judge='60'>
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == 60' height="81" width="76" alt="" />
                    </span>
                    1分钟 
                </label>
                <label :judge='120'>
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == 120' height="81" width="76" alt="" />
                    </span>
                    2分钟 
                </label>
                <label :judge='180'>
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == 180' height="81" width="76" alt="" />
                    </span>
                    3分钟 
                </label>
                <label :judge='300'>
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == 300' height="81" width="76" alt="" />
                    </span>
                    5分钟 
                </label>
                <label :judge='480'>
                    <span>
                        <img src="../../img/varTrue.png" v-show='imgState.time == 480' height="81" width="76" alt="" />
                    </span>
                    8分钟 
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
    <button type="success" round @click="boxState.CvarRoom = false">确定</button>

    <div slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="coreVisible = true">打开内层 Dialog</el-button> -->
    </div>
  </el-dialog>
</template>

<style type="text/css">
    .Cvar .el-dialog__body{
        padding: 0;
    }
    .Cvar .el-switch__core{
        display: inline-block;
        height: 60px!important;
        width: 136px!important;
        border-radius: 40px;
    }
    .Cvar .el-switch__button{
        height: 58px;
        width: 58px;
    }
</style>

<script>
    import Vue from 'vue';
    import './varRoom.scss'
    import coreVisible from '../../module/homeModule/coreVisible.vue'

    Vue.component('coreVisible', coreVisible)

    export default {
        data() {
            return {
                // checked: false,
                boxState: {
                    coreVisible: false,
                    CvarRoom: false,
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
                let img =  this.imgState;
                var judgeVal = '';
                var nodeName = e.target.nodeName.toLowerCase();
                var labelTarget = e.target.attributes["judge"];
                var spanTarget = e.target.parentElement.attributes["judge"];
                var imgTarget = e.target.parentElement.parentElement.attributes["judge"];
                if( !(nodeName == 'label' || nodeName == 'span' || nodeName == 'img') ){
                    return false;
                }
                if( !(labelTarget || spanTarget || imgTarget) ){
                    return false;
                }
                labelTarget ? judgeVal = labelTarget.nodeValue : 
                nodeName == 'span' ? judgeVal = spanTarget.nodeValue : 
                judgeVal = imgTarget.nodeValue;
                judgeVal == 'open' ? (img.open == false? img.open = true : img.open = false) : 
                judgeVal == 'cardFn5' ? img.cardFn = 5 : 
                judgeVal == 'cardFn7'? img.cardFn = 7 : 
                judgeVal == 'bell' ? img.room = 'bell' : 
                judgeVal == 'day' ? img.room = 'day' : 
                judgeVal >= 30 ? img.time = judgeVal : false;
            },
            inputChange(ev) {
                
                if(ev.target.nodeName.toLowerCase() != 'input' || ev.target.getAttribute("class") == 'el-switch__input'){
                    return false;
                }
                let inp =  this.imgState;
                var inpTarget = ev.target.attributes["Inp"].nodeValue;
                var inpVal = ev.target.value;
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
            }
        }
    }
</script>