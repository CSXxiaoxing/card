<template>
  <el-dialog :visible.sync="boxState.CvarRoom" width="80%"  custom-class="Cvar" center>
    <el-dialog
        width="80%"
        :visible.sync="boxState.coreVisible"
        append-to-body>
        <coreVisible></coreVisible>
    </el-dialog>

    <el-dialog
          width="80%"
          :visible.sync="no"
          append-to-body center class="no">
          <b class="close" v-on:click="no = false">×</b>
          <p>该功能暂未开放</p>
    </el-dialog>

    <el-dialog
      width="80%"
      :visible.sync="card"
      append-to-body center class="card">

      <p>房卡消耗方式 <b class="close" v-on:click="card = false">×</b></p>
        <hr/>
      <div></div>
    </el-dialog>
        
    <h3 @click="no = true">创建房间</h3>
    <ul class='varRoomSet' @click="open">
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
            <span >新人进房确认</span>
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
                <span @click="card = true">付费详情</span>
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

<style lang='scss' scoped>

//关闭叉叉

.clo{
        position:absolute;
        font-size:140px;
        color:#7A7A7A;
    }

 .no{
    width:80%;
    margin-left:10%;
    margin-top:35%;
        .close{
                @extend .clo;
                right:30px;
                top:60px;
            }

        p{
            color:red;
            font-size:50px;
            text-align: center;
            line-height: 300px;
        }
    }

    .card{
        width:109%;
        margin-top:10%;
        position:absolute;
        left:-50px;
        p{
            font-size:70px;
            line-height:100px;
            text-align:center;
            .close{
                @extend .clo;
                right:30px;
                top:18px;
            }
            
        }
        
        hr{
            margin:20px 0px 50px 0px;
        }

        div{
            position:relative;
            left:30px;
            width:830px;
            height:1030px;
            background-color: #E6E6E6;
        }
    }


    .set{
        width:120%;
        margin-top:10%;
        position:absolute;
        left:-110px;
        .top{
            padding-left:380px;
            font-size:66px;
            line-height:100px;
            color:black;
            .close{
                @extend .clo;
                right:30px;
                top:18px;
            }
        }

        hr{
            margin:20px 0px 50px 0px;
            clear: both;
        }

        div:nth-of-type(1){

            p{
                color:#E84D0F;
                font-size:40px;
                text-align:center;
            }
            dt{
                margin-top:64px;
                font-size:55px;
                color:#0BBD0A;
            }
            dd{
                position:relative;
                left:50px;
                bottom:50px;
                line-height:64px;
                margin-left:80px;
                margin-bottom:30px;
                font-size:40px;
                float:left;
               span:nth-of-type(2){
                position:relative;
                top:12px;
                display:inline-block;
                width: 60px;
                height: 60px;
                border-radius:100%;
                background-color:#D3D3D3;
                margin-right:20px;
               }
               span:nth-of-type(1){
                position:relative;
                left:53px;
                top:5px;
                z-index: 999;
                display:inline-block;
                width: 45px;
                height: 45px;
                border-radius:100%;
                background-color:#09BA07;

               }
            }
        }
        div:nth-of-type(2){
            ul{
                font-size: 50px;
                li{
                    width:45%;
                    float:left;
                    color:#0BBF0A;
                    margin-left: 30px;
                    .add{
                        position:relative;
                        left:180px;
                        bottom:40px;

                    }

                    
                    
                }

            }
        }
      button{
          width:380px;
          height: 110px;
          margin-left:300px;
          font-size:60px;
          border: none;
          background: url(../../img/module_home_no2.png) no-repeat;
          background-position:center;
          background-size: cover;
    }

    }
</style>

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
                // checked: false,
                boxState: {
                    coreVisible: false,
                    CvarRoom: false,
                }
                set: false,
                card:false,
                no:false,
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