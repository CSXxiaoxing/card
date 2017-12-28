<template>
  <el-dialog :visible.sync="CvarRoom" width="80%"  custom-class="Cvar" center>
    <el-dialog
      width="30%"
      :visible.sync="innerVisible"
      append-to-body>
    </el-dialog>
        
    <h3>创建房间</h3>
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
            <span>新人进房确认</span>
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
                <span>付费详情</span>
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
                <span>点击设置倍率</span>
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
        <li>
            <span>玩家下注范围：</span>
            <input type="text" />
            <i></i>
            <input type="text" />
        </li>
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

<script>
    import './varRoom.scss'
    export default {
        data() {
            return {
                checked: false,
                CvarRoom: false,
                innerVisible: false,
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