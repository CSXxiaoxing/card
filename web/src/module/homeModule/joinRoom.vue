<template>
    <mt-popup
    v-model="joinRoom"
    popup-transition="popup-fade" 
    class="join" >
        <p></p>
        <h3>加入房间 <i v-on:click="joinRoom = false"></i> </h3>
        <div class="joinCenter">
            <input type="text" maxlength='6' :value="val" readonly/>
            <ul @click='number'>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li class="word">重输</li>
                <li>0</li>
                <li class="word">删除</li>
            </ul>
        </div>
    </mt-popup>
</template>

<style  lang='scss' scoped>
    .join{
        width: 776px;
        margin-top: -30px;
        border-radius: 30px;
        .joinCenter{
            padding: 0 43px 42px 43px;  
        }
    p{height: 180px; width: 100%;}
    h3{
        font-size: 76px;
        text-align: center;
        line-height: 132px;
        color: #5E4105;
        width: 908px;
        height: 180px;
        padding: 0;
        margin: 0;
        background: url('../../img/JoinTOP.png') no-repeat;
        background-position:center;
        background-size: cover;
        position: absolute;
        left: 50%;
        top: 0;
        -webkit-transform: translate(-50%,-10%);
           -moz-transform: translate(-50%,-10%);
            -ms-transform: translate(-50%,-10%);
             -o-transform: translate(-50%,-10%);
                transform: translate(-50%,-10%);
        i{
            position:absolute;
            right: 0;
            transform: translate(-135%, 65%);
            height: 60px;
            width: 60px;
            background: url('../../img/chaJoinRoom.png') no-repeat;
            background-position:center;
            background-size: cover;
        }    
    }
    input{
        height: 122px;
        width: 100%;
        color:#0FBA0E;
        font-size: 72px;
        line-height: 118px;
        text-align: center;
        border: 0 none;
        background: url('../../img/inputJoinRoom.png') no-repeat;
        background-position: center;
        background-size: cover;
        margin-bottom: 18px;
    }
    ul{
        width: 100%;;
        font-size: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
            height: 133px;
            width: 219px;
            line-height: 133px;
            font-size: 76px;
            text-align: center;
            margin: 10px 0px;
            color:white;
            background:url("../../img/JoinNum.png") no-repeat;
            background-position: center;
            background-size: cover;
        }
        .word{
            font-size:80px;
            background:url("../../img/JoinNum2.png") no-repeat;
            background-position: center;
            background-size: cover;
        }
    }
  }
</style>

<script>
  import http from '../../utils/httpClient.js';

  export default {
    data() {
        return {
            joinRoom: false,
            val: ''
        };
    },
    methods: {
        number(e) {
            // 输入逻辑
            if(e.target.nodeName.toLowerCase() == 'li'){
                if(e.target.innerText == '重输'){
                    this.val = '';
                } else if(e.target.innerText == '删除'){
                    this.val = this.val.slice(0,-1);
                } else {
                    this.val = this.val+e.target.innerText
                }
            }
            // 判断逻辑
            if(this.val.length == 6){
                http.post({
                    url: 'roomNumber',vm:this, params:{val: this.val}
                }).then(res => {
                    if( res.data == false ){
                        // alert('房间号码不存在')
                        // this.open6()
                    } else if( res.data == true ){
                        // window.location()
                    }
                    console.log(res.data)
                })
            }
        },
        open6() {
            this.$notify.error({
                title: '错误',
                message: '这是一条错误的提示消息',
                customClass: 'joinError',
                duration: '9999999'
                });
            }
    }
  };
</script>