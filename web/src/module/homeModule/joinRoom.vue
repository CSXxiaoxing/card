<template>
    <div>
    <mt-popup
    v-model="joinRoom"
    popup-transition="popup-fade" 
    class="join" >
        <p></p>
        <h3>加入房间 <i v-on:click="joinRoom = false"></i> </h3>
        <div class="joinCenter">
            <input type="text" maxlength='6' v-model.number='val' readonly/>
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
    <loading v-if='loading'></loading>
    </div>
</template>

<style  lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    .join{
        width: 7.185185rem;
        margin-top: -0.277778rem;
        border-radius: 0.277778rem;
        .joinCenter{
            padding: 0 0.398148rem 0.388889rem 0.398148rem;  
        }
    p{height: 1.666667rem; width: 100%;}
    h3{
        font-size: 0.703704rem;
        text-align: center;
        line-height: 1.222222rem;
        color: #5E4105;
        width: 8.407407rem;
        height: 1.666667rem;
        padding: 0;
        margin: 0;
        background: $home04 no-repeat;
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
            height: 0.555556rem;
            width: 0.555556rem;
            background: $homeAll -2.407407rem -2.407407rem no-repeat;
            background-size: 5.555556rem 5.555556rem;
        }    
    }
    input{
        height: 1.12963rem;
        width: 100%;
        color:#0FBA0E;
        font-size: 0.666667rem;
        line-height: 1.092593rem;
        text-align: center;
        border: 0 none;
        background: $home05 no-repeat;
        background-position: center;
        background-size: cover;
        margin-bottom: 0.166667rem;
    }
    ul{
        width: 100%;
        font-size: 0.462963rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
            height: 1.231481rem;
            width: 2.027778rem;
            line-height: 1.231481rem;
            font-size: 0.703704rem;
            text-align: center;
            margin: 0.092593rem 0.0rem;
            color:white;
            background: $homeAll -1.574074rem -3.055556rem no-repeat;
            background-size: 5.555556rem 5.555556rem;
        }
        li:active{
            position: relative;
            left: 0.018519rem;
            top: 0.046296rem;
        }
        .word{
            font-size:0.740741rem;
            background: $homeAll -3.611111rem -3.055556rem no-repeat;
            background-size: 5.555556rem 5.555556rem;
        }
    }
  }
</style>

<script>
    import http from '../../utils/httpClient.js';
    import router from '../../router/';
    import Vue from 'vue';
    import loading from '../../components/loading/loading.vue';
    Vue.component('loading', loading)

    export default {
        data() {
            return {
                loading: false,     // loading
                joinRoom: false,
                val: '',
            };
        },
    methods: {
        number(e) {
            var self = this;
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
                var zhi = this.val
                http.post('/Room/getRooms',{
                        number: this.val,
                    },'',this)
                    .then(res => {
                        console.log(res)
                        if(res.status == 1) {
                            http.post('/Room/joinRoom' ,
                            {
                                zn_room_id : res.data.id,
                            }, '' ,this)
                            .then(res => {
                                if( res.status == 3 ){
                                    router.push({path: `room/${zhi}`});
                                } else if( res.status == 1){
                                    router.push({path: `room/${res.data.zc_number}`});
                                } else if( res.status == 0 ){
                                    self.$parent.errorTips = '你已在房间内，请退出当前房间';
                                    self.$parent.careTip = true;
                                }
                            })

                        } else if( res.status == 0 ){
                            self.$parent.errorTips = '该房间不存在或不对外开放';
                            self.$parent.careTip = true;
                        }
                    })
            }else if(this.val.length > 6){
                this.val = this.val.slice(0,6)
            }
        },
        open6() {
            this.$notify.error({
                title: '错误',
                message: '这是一条错误的提示消息',
                customClass: 'joinError',
                duration: '9999999'
                });
            },
        }
  };
</script>