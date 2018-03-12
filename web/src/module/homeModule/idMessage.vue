<template>
  <div>
  <mt-popup
    v-model="idMessage"
    popup-transition="popup-fade"
    class="mess">
    <dl>
      <dt>
        <img src="src/image/idMessage6.png" alt="">
      </dt>
      <dd><span>更 换 头 像</span></dd>
    </dl>
    
    <ul>
      <li>{{name}}<img src="src/image/idMessage3.png" alt=""></li>
      <li>ID:{{id}}</li>
      <li>音乐  <span><mt-switch v-model="backmusic" id="onOff"></mt-switch></span></li>
      <li>音效  <span><mt-switch v-model="playmusic"></mt-switch></span></li>
    </ul>

    <i v-on:click="idMessage = false"></i>
    <p></p>
  </mt-popup>
  <loading v-if='loading'></loading>
  </div>
</template>

<style lang='scss' scoped>
  @import '../../utils/baseVar.scss';
  .swi{
          .mint-switch {
              display: -webkit-box;
              display: -ms-flexbox;
              @include flexbox();
              -webkit-box-align: center;
                  -ms-flex-align: center;
                      align-items: center;
              position: relative;
          }
          .mint-switch * {
              pointer-events: none;
          }
          .mint-switch-label {
              margin-left: 0.092593rem;
              display: inline-block;
          }
          .mint-switch-label:empty {
              margin-left: 0;
          }
          .mint-switch-core {
              display: inline-block;
              position: relative;
              width: 1.157407rem;
              height: 0.574074rem;
              border: 0.009259rem solid #d9d9d9;
              @include border-radius(0.277778rem);
              @include box-sizing();
              background: #d9d9d9;
          }
          .mint-switch-core::after, .mint-switch-core::before {
              content: " ";
              top: 0;
              left: 0;
              position: absolute;
              -webkit-transition: -webkit-transform .3s;
              transition: -webkit-transform .3s;
              transition: transform .3s;
              transition: transform .3s, -webkit-transform .3s;
              @include border-radius(0.138889rem);
          }
          .mint-switch-core::after {
              width: 0.537037rem;
              height: 0.537037rem;
              @include border-radius(50%);
              background-color: #fff;
              box-shadow: 0 0.009259rem 0.027778rem rgba(0, 0, 0, .4);
          }
          .mint-switch-core::before {
              width: 1.157407rem;
              height: 0.574074rem;
              @include border-radius(0.277778rem);
              background-color: #fdfdfd;
          }
          .mint-switch-input {
              display: none;
          }
          .mint-switch-input:checked + .mint-switch-core {
              border-color: #26a2ff;
              background-color: #26a2ff;
          }
          .mint-switch-input:checked + .mint-switch-core::before {
              -webkit-transform: scale(0);
                      transform: scale(0);
          }
          .mint-switch-input:checked + .mint-switch-core::after {
              -webkit-transform: translateX(0.601852rem);
                      transform: translateX(0.601852rem);
          }
  }
  .mess{
    width:7.546296rem;
    height:4.87963rem;
    background: $idmess01 no-repeat;
    background-size:7.546296rem 4.87963rem;
        dl{
            float: left;
            width:2.514815rem;
            height:2.533333rem;
            position:relative;
            dt{
                position:relative;
                left: 0.451444rem;
                top:0.52963rem;
                width:2.333333rem;
                height: 2.37037rem;
                background: $idmess02 no-repeat;
                background-size:2.333333rem 2.37037rem;
                img{
                    width:2.205926rem;
                    height:2.175926rem;
                    z-index: 2px;
                    border-radius:0.185185rem;
                    padding-top:0.061296rem;
                    padding-right:0.010296rem;
                }
            }
            dd{
                color: white;
                position:relative;
                background-color: black;
                opacity: 0.7;
                width:2.175926rem;
                line-height:0.435185rem;
                left: 0.504444rem;
                border-radius:0px 0px 0.157407rem 0.157407rem;
                font-size:0.203704rem;
            }
        }
        ul{
            width:3.0rem;
            padding:0.509259rem 0.557407rem; 
            position:relative;
            font-size: 0.352963rem;
            float:left;
            text-align: left;
            li{
                margin-bottom: 0.122593rem;
                span{
                    position:absolute;
                    display:inline;
                    left:1.525926rem;
                    #onOff{
                        @extend .swi;
                    }
                }
            }
            li:nth-of-type(1){
                width:2.27037rem;
                line-height: 0.494444rem;
                background-color:#DFC7A5;
                padding-left: 0.192593rem;
                border-radius:0.925926rem;
                position:relative;
                img{
                    position:absolute;
                    right:0.092593rem;
                    top:0.172593rem;
                }
            } 
        }
        i{
            position:absolute;
            right:-0.240741rem;
            top:-0.240741rem;
            width:0.944444rem;
            height:1.0rem;
            background:$idmess03 no-repeat;
            background-size:0.944444rem 1.0rem;
        }
        p{
            clear: both;
            position:relative;
            left:50%;
            top:0.192593rem;
            transform:translateX(-50%);
            -webkit-transform:translateX(-50%);
            -moz-transform:translateX(-50%);
            width:3.361111rem;
            height:1.274074rem;
            background:$idmess04 no-repeat;
            background-size:3.361111rem  1.074074rem;
        }
}
 
  // border-radius
  
</style>

<script type="es6">
  import Vue from 'vue';
  import http from '../../utils/httpClient.js';
  import router from '../../router/';
  import loading from '../../components/loading/loading.vue';
  import { Switch } from 'mint-ui';
  Vue.component('loading', loading)
  Vue.component(Switch.name, Switch);
  export default {
    data() {
      return {
        loading: false,     // loading
        idMessage: false,
        a: 0,
        name : localStorage.oxName,
        id : localStorage.oxUid,
        backmusic:true,
        playmusic:true,
      }
    },
    mounted: function(){
      if(localStorage.oxToken){ 
        this.a = 1;
      } else {
        this.a = 0;
      }
    },
    methods: {
        loginOut(){   // 退出
            var self =this;
            http.post('/Member/login_out',
            {
                token: localStorage.oxToken,
                uid: localStorage.oxUid,
            })
            .then(res => {
                console.log(res)
                if(res.status == 1){
                    localStorage.removeItem('oxToken')
                    self.a = 0;
                    self.idMessage = false
                    router.push({name: 'login'});
                } else if(res.status == 2){ // token失效
                    localStorage.removeItem("oxToken")
                    router.push({name: 'login'});
                }
            })
        }
      }
   }
</script>