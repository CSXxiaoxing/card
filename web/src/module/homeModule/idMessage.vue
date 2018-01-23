<template>
  <mt-popup
    v-model="idMessage"
    popup-transition="popup-fade"
    class="mess">
    <img src="../../img/module_home_id1.png" height="222" width="238" alt="">
    <p>迷糊的诗诗<br>ID:755693</p>
    <i v-on:click="idMessage = false"></i>
    <mt-button type="primary"  @click="loginOut">
        更换账号
    </mt-button>
  </mt-popup>
</template>

<style lang='scss' scoped>
  @import '../../utils/baseVar.scss';
  .mess{
    img{
      width:2.203704rem;
      height:2.055556rem;
    }
    width: 80%;
    border-radius: 0.277778rem;
    position: absolute;
    height:5.555556rem;
    margin-top: -1.851852rem;
    img{
      position:absolute;
      left:0.555556rem;
      top:0.740741rem;
    }
    p{
      font-size:0.407407rem;
      line-height: 0.648148rem;
      position:absolute;
      left: 2.981481rem;
      top:1.092593rem;
    }
    i{
        position:absolute;
        display: inline-block;
        top:0.444444rem;
        right:0.277778rem;
        width: 0.527778rem;
        height: 0.527778rem;
        background: $homeAll -0.925926rem -2.314815rem no-repeat;
        background-size: 5.555556rem;
      }
    button{
      width:3.518519rem;
      height: 1.018519rem;
      line-height: 0.925926rem;
      font-size:0.555556rem;
      border: none;
      margin-left:2.314815rem;
      background: $homeAll -1.944444rem -1.388889rem no-repeat;
      background-size: 5.555556rem;
      position: absolute;
      bottom: 0.925926rem ;
      left: 0;
    }
    button:active {
        position: absolute;
        left: 0.0rem;
        bottom: 0.851852rem;
    }
  }
</style>

<script type="es6">
  import Vue from 'vue';
  import http from '../../utils/httpClient.js';
  import router from '../../router/';

  export default {
    data() {
      return {
        idMessage: false,
        a: 0,
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
        loginOut(){   //登出
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
                router.push({name: '/'});
            }
          })
        }
      }
   }
</script>