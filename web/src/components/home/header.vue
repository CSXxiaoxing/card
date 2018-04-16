<template>
    <header>
        <div>
            <div class="hei"></div>
            <div class='btl'>
                <img src="src/srcImg/fanhui.png" alt="返回" @click="fhHome"/>
                <span>{{hashsh == '#/home'? "游戏大厅": "房间大厅"}}</span>
                <img src="src/srcImg/fenxiang.png" alt="分享"  @click="$parent.child_KA(5)" />
                <b
                v-if='hash!="home"'
                :class='$store.state.Music.autoplay ? "huan":"bai"' 
                @click.stop="$store.state.Music.autoplay=!$store.state.Music.autoplay">
                </b>
            </div>
        </div>
        <dl>
            <dt @click.capture='$parent.child_KA(2)'>
                <img :src="$store.state.user.userImg" />
            </dt>

            <dd>
                <span>{{$store.state.user.userName}}</span>
            </dd>

            <dd> 
                <span>ID:{{$store.state.user.userID}}</span>
                <span>
                    {{$parent.cardNum}}
                    <i @click='$parent.child_KA(3)'></i>
                </span>
            </dd>
        </dl>

        <p>
          <i></i>
        <mt-swipe 
            :show-indicators="false" 
            :prevent = 'true'
            :speed="800" :auto="5000" 
            class='autoOx'>
            <mt-swipe-item v-for='notices in $store.state.oxCrowd.notice'>
                <span>{{notices}}</span>
            </mt-swipe-item>
            <mt-swipe-item v-for='notices in $store.state.oxCrowd.notice'>
                <span>{{notices}}</span>
            </mt-swipe-item>
        </mt-swipe>
        </p>

        <span class='homeServer' @click='kefu=true'>
        </span>
        <mt-popup 
            v-model="kefu"
            popup-transition="popup-fade"
            class="kefu" >
            <span>咨询客服 <i @click="kefu = false"></i></span>
            <textarea name="" id="" cols="30" rows="10" v-model='connet'>
            </textarea>
            <mt-button @click="liuyan">
            </mt-button>
        </mt-popup>
    </header>
</template>

<style lang='scss' scoped>
    .kefu{
    border-radius: 0.277778rem;
    border-top-right-radius: 0.46rem;
    position: absolute;
    top: 8.240741rem;
    background: #F7E8D3;
    width: 88%;
    height: 7.6rem;
    // background: url('../image/careTipK.png') no-repeat;
    // background-size: 8.425926rem 5.37037rem; 
    span{
        display: block;
        color: #3D3D35;
        font-size: 0.72rem;
        // font-weight: 600;
        line-height: 1.2rem;
        width:100%;
        height: 1.12963rem;

        text-align: center;
        position: relative;
        i{
            display: block;
            height: 1.1rem;
            width: 1.1rem;
            position: absolute;
            right: 0%;
            top: 0%;
            transform: translate(0%, 0%);
            background: url('../../image/idMessage5.png') no-repeat;
            background-size: 1.1rem 1.1rem;
        }
    }

    textarea{
      width: 84%;
      height: 4rem;
      line-height: 0.725926rem;
      text-align: left;
      font-size: 0.42963rem;
      padding: 0 0.152593rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-56%);
      white-space: pre-wrap;
    }
    button{
      width:3.305556rem;
      height: 1.018519rem;
      line-height:0.925926rem;
      border-radius: 0.509259rem;
      font-size:0.555556rem;
      margin-bottom:0.462963rem;
      border: 0 none;
      color: white;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%,0);
      background: url('../../image/careTip.png') no-repeat;
      background-size: 3.305556rem 1.018519rem;
    }
    // button:active {
    //     position: relative;
    //     left: 0.018519rem;
    //     bottom: -0.046296rem;
    // }
    }
</style>

<script type="text/javascript">
    import Vue from 'vue';
    import router from '../../router/';
    import http from '../../utils/httpClient.js';

    export default {
        data: function(){
            return {
                hash: location.hash.slice(-4),
                hashsh: location.hash,
                kefu: false,
                kefuType: 0,
                connet: '',
            }
        },
        methods: {
            fhHome(){
                if(this.hash=="home"){
                    this.$parent.careTip2 = true;
                    this.$parent.errorTips2 = '确定退出游戏？';
                }else{
                    router.push({name: 'home'})
                }
            },
            liuyan(){
                if(this.kefuType == 1){
                    this.kefuType = 0;
                    this.kefu=false;
                }
                
                if(this.connet!=''){
                    http.post( '/Chat/Feedback', {
                        connect: this.connet,
                    })
                    .then(res => {
                        if(res.status==1){
                            this.kefu=false;
                        } else if(res.status==2){
                            this.connet=res.msg;
                            this.kefuType = 1;
                        }
                        console.log(res)
                    })
                } else {
                    this.kefu=false;
                }
                
            },
        }
    }
</script>