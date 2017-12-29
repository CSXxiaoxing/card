<template>
  <el-dialog :visible.sync="CvarRoom" width="80%"  custom-class="Cvar" center>
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

    <el-dialog
      width="80%"
      :visible.sync="set"
      append-to-body center class="set">

      <span class="top">倍率设置 <b class="close" v-on:click="set = false">×</b></span>
        <hr/>
      <div>
        <p>提示：大型牌的倍率不能低于小牌型</p>
        <dl>
            <dt>无牛</dt>
            <dd><span></span><span></span> 比J</dd>
            <dd><span></span><span></span> 比Q</dd>
            <dd><span></span><span></span> 比K</dd>
            <dd><span></span><span></span>无牛关机（庄赢）</dd>
        </dl>
      </div>
       <hr/>
        <div>
            <ul>
                <li>牛一<addButtion class="add"></addButtion></li>
                <li>牛二<addButtion class="add"></addButtion></li>
                <li>牛三<addButtion class="add"></addButtion></li>
                <li>牛四<addButtion class="add"></addButtion></li>
                <li>牛五<addButtion class="add"></addButtion></li>
                <li>牛六<addButtion class="add"></addButtion></li>
                <li>牛七<addButtion class="add"></addButtion></li>
                <li>牛八<addButtion class="add"></addButtion></li>
                <li>牛九<addButtion class="add"></addButtion></li>
                <li>牛牛<addButtion class="add"></addButtion></li>
                <li>五花牛<addButtion class="add"></addButtion></li>
            </ul>
            
        </div>
        <hr/>
        <el-button type="success" round v-on:click="idMessage = false">更换账号</el-button>
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
            <input type="text" v-model="imgState.roomName"/>
        </li>
        <li>
            <span >新人进房确认</span>
            <el-switch v-model="imgState.newMan"
                :width=94
                active-color='red'>
            </el-switch>
        </li>
        <li @click='cardFn'>
            <span>玩法：</span>
            <label :judge='"cardFn5"'>
                <span><img src="../../img/varTrue.png" v-show='imgState.cardFn == 5' height="81" width="76" alt="" /></span>
                5副牌 
            </label>
            <label :judge='"cardFn7"'>
                <span><img src="../../img/varTrue.png" v-show='imgState.cardFn == 7' height="81" width="76" alt="" /></span>
                7副牌 
            </label>
        </li>
        <li>
            <p>
                房间付费模式：
                <span @click="card = true">付费详情</span>
            </p>
            <label>
                <span></span>
                钟点房 
            </label>
            <label>
                <span></span>
                日费房 
            </label>
            <div class="clear"></div>
        </li>
        <li>
            <p>
                倍率设置：
                <span @click="set = true">点击设置倍率</span>
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
                <label>
                    <span></span>
                    30秒 
                </label>
                <label>
                    <span></span>
                    1分钟 
                </label>
                <label>
                    <span></span>
                    2分钟 
                </label>
                <label>
                    <span></span>
                    3分钟 
                </label>
                <label>
                    <span></span>
                    5分钟 
                </label>
                <label>
                    <span></span>
                    8分钟 
                </label>
            </div>
        </li>
        <li>
            <p>
                庄家封顶预赔分或最低上庄分数：
            </p>
            <input type="text" value="15" />
        </li>
        </li>
        <li>
            <span>玩家下注范围：</span>
            <input type="text" />
            <i></i>
            <input type="text" />
        <li>
            <span>抽庄赢分比例：</span>
            <input type="text" />
            <span><span>%</span>(1-15)</span>
        </li>
    </ul>
    <button type="success" round @click="CvarRoom = false">确定</button>

    <div slot="footer" class="dialog-footer">

      <!-- <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button> -->
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
    import './varRoom.scss';
    import addButtion from '../addButton/addButtion.vue';
    Vue.component('addButtion', addButtion);
    export default {
        data() {
            return {
                checked: false,
                CvarRoom: false,
                set: false,
                card:false,
                no:false,
                imgState: {
                    open: false,
                    roomName: '',
                    newMan: false,
                    cardFn: 5,
                }
            };
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
            open(e) {
                let img =  this.imgState;
                var nodeName = e.target.nodeName.toLowerCase();
                if(nodeName == 'label' || nodeName == 'span' || nodeName == 'img'){
                    var judgeVal = '';
                    if(e.target.attributes["judge"]){
                        judgeVal = e.target.attributes["judge"].nodeValue;
                    } else if(nodeName == 'span'){
                        judgeVal = e.target.parentElement.attributes["judge"].nodeValue;
                    } else{
                        judgeVal = e.target.parentElement.parentElement.attributes["judge"].nodeValue;
                    }
                    judgeVal == 'open'? (img.open == false? img.open = true : img.open = false) : 
                    judgeVal == 'cardFn5'? img.cardFn = 5 : judgeVal == 'cardFn7'? img.cardFn = 7 : console.log(22)
                    ;
                }
                
            },
            cardFn() {

                let img =  this.imgState;
                img.cardFn == false? img.cardFn = true : img.cardFn = false;
            }
        }
    }
</script>