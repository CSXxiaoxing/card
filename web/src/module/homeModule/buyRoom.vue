<template>
  <div>
  <mt-popup 
  v-model="buyRoom" 
  popup-transition="popup-fade" 
  class="buy" >
  <div class="buyR_modal" style='z-index: 2000' @touchend='noBuyMoal'></div>
    <mt-popup
      v-model="moreCard"
      popup-transition="popup-fade"
      :modal='false'
      class="more">
        <span>
            购买房卡 
            <b @click="noBuyMoal"></b>
        </span>
        <p>{{cardNumError}}</p>
        <p>请输入购买的房卡数量</p>
        <input  class="num" v-model.trim='cardNum' ></input>
        <mt-button @:click="cardNumber" >确定</mt-button>

    </mt-popup>


    <h1>购买房卡 <i v-on:click="buyRoom = false">×</i></h1>

    <ul>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="/dist/module_home_buy2.png" height="250" width="258" alt=""></td>
            <td>房卡X5</td
          </tr>
          <tr>
            <td>RMB：10元</td>
          </tr>
          <tr>
            <td><button>购买</button></td>
          </tr>
        </table>
      </li>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="/dist/module_home_buy2.png" height="250" width="258" alt=""></td></td>
            <td>房卡X5</td>
          </tr>
          <tr>
            <td>RMB：10元</td>
          </tr>
          <tr>
            <td><button>购买</button></td>
          </tr>
        </table>
      </li>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="/dist/module_home_buy2.png" height="250" width="258" alt=""></td></td>
            <td>房卡X5</td>
          </tr>
          <tr>
            <td>RMB：10元</td>
          </tr>
          <tr>
            <td><button>购买</button></td>
          </tr>
        </table>
      </li>
      <li>
        <table>
          <tr>
            <td rowspan="3"><img src="/dist/module_home_buy2.png" height="250" width="258" alt=""></td></td>
            <td class="more">更多房卡</td>
          </tr>
          <tr>
            <td class="sev">7折优惠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td><mt-button class="sev" type="primary" @click="more">去填写数量</mt-button></td>
          </tr>
        </table>
      </li>
    </ul>
  </mt-popup>
  <loading v-if='loading'></loading>
  </div>
</template>

<style lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    .buyR_modal{
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 200%;
            height: 200%;
            opacity: 0.5;
            background: #000;
            display: none;   
    }
    // 点击按钮
    .button {
        background-position: center;
        border: 0 none;
        outline: none;
        color: white;
        &:active {
            position: relative;
            top: 0.046296rem;
            left: 0.018519rem;
        }
    }
    .buy{
        background: $home02 no-repeat;
        background-size:8.138889rem 13.787037rem;
        width: 8.138889rem;
        height: 13.787037rem;
        position: absolute;
        bottom: 0.925926rem;
        h1{
            margin: 0.601852rem 0.0rem 1.296296rem 0.555556rem;
            font-size:0.555556rem;
            font-weight:bolder;
            color: #5E4205;
            text-align:center;

            i{
                position:absolute;
                line-height:0.925926rem;
                font-size:1.111111rem;
                font-weight:lighter;
                color:white;
                right:0.185185rem;
                top:0.555556rem;
                background-color:#BA3C16;
                width:0.833333rem;
                height:0.925926rem;
                border-radius:100%;
                padding-right:0.092593rem;
            }
        }
        ul{
            text-align: center;
            li{
                table{
                    img{
                      width:2.388889rem;
                      height:2.314815rem;
                    }
                    position: relative;
                    left:3.314815rem;
                    bottom:0.277778rem;
                    width:5.925926rem;
                    height:2.5rem;
                    -webkit-transform: translate(-50%, 0);
                    -moz-transform: translate(-50%, 0);
                    -ms-transform: translate(-50%, 0);
                    -o-transform: translate(-50%, 0);
                    transform: translate(-50%, 0);
                }
            }
        }
        table{
            font-size:0.388889rem;
            background-color: white;
            width:6.111111rem;
            height: 2.5rem;
            border-radius:0.277778rem;
            margin: 0.185185rem 0.0rem 0.185185rem 0.833333rem;
            text-align:left;
            button{
                width:2.416667rem;
                height:0.685185rem;
                font-size:0.351852rem;
                background: $homeAll -0.0rem -4.351852rem no-repeat;
                background-size: 5.555556rem 5.555556rem;
                @extend .button;
            }
            tr:nth-of-type(1){
                td:nth-of-type(2){
                    padding-top:0.277778rem;
                    padding-left: 0.185185rem;
                }
            }

            tr:nth-of-type(2){
                color:#149824;
                td{
                    padding-left: 0.185185rem;
                }
            }
            .more{
                color:#3B87C5;
                position:relative;
                left:0.555556rem;
            }
            .sev{
                margin-left:0.611111rem;
                text-align: center;
            }
            
        }
    }
  .more{
      width:7.083333rem;
      border-radius:0.185185rem;
      span{
        display: block;
        color:white;
        font-size: 0.62963rem;
        width:8.796296rem;
        height:1.805556rem;
        line-height: 1.527778rem;
        background: $home03 no-repeat;
        background-size: 8.87037rem 1.805556rem;
        background-position: center;
        text-align: center;
        position: relative;
        right: 0.833333rem;
        bottom: 0.277778rem;
        
          b{
            position: absolute;
            float: right;
            background: $homeAll -3.148148rem -2.407407rem no-repeat;
            background-size: 5.555556rem 5.555556rem;
            height: 0.555556rem;
            width: 0.555556rem;
            right: 1.018519rem;
            top: 0.37037rem;
          }
      }

      p:nth-of-type(1){
        padding-bottom: 0.185185rem;
        position:relative;
        bottom:0.277778rem;
        color:red;
        text-align:center;
        font-size:0.416667rem;
      }
      p:nth-of-type(2){
        margin-bottom: 0.185185rem;
        margin-left: 0.555556rem; 
        font-size:0.324074rem;
        font-weight: bold;
        text-align:left;
      }

      .num{
        width:85%;
        height:1.111111rem;
        font-size:0.833333rem;
        text-align:center;
        margin: 0.0rem 0.0rem 0.0rem 0.092593rem;
        border-radius:0.138889rem;
        border:0.027778rem solid #D4D4D4; 
        color:#0BBA05;

      }
      button{
        border-radius: 0.481481rem;
        width: 3.305556rem;
        height: 0.962963rem;
        line-height: 0.962963rem;
        font-size:0.555556rem;
        margin: 0.398148rem 0;
        background: $homeAll -1.944444rem -1.388889rem no-repeat;
        background-size: 5.555556rem 5.555556rem;
        @extend .button;
      }
    }
</style>

<script type="es6">
  import Vue from 'vue';
  import loading from '../../components/loading/loading.vue';
  Vue.component('loading', loading)
  export default {
    data() {
      return {
        loading: false,     // loading
        buyRoom: false,
        moreCard: false,
        cardNum: '',
        cardNumError: 'N张以上，几折优惠',
      };
    },
    methods: {
        cardNumber(){
            let reg = new RegExp("^[0-9]*$");
            if(!reg.test(this.cardNum)){
                this.cardNumError = '请输入正确数量';
                setTimeout(()=>{
                    this.cardNumError = 'N张以上，几折优惠';
                }, 1800)
                return false;
            } else if(this.cardNum == 0){
                this.cardNumError = '请输入房卡数量';
                setTimeout(()=>{
                    this.cardNumError = 'N张以上，几折优惠';
                }, 1800)
                return false;
            } else {
                console.log(this.cardNum.replace(/^[0]+/,''))
                // this.moreCard = false;match
            }
        },
        buyModal(event) {
            var vModal = document.getElementsByClassName('buyR_modal')
            var Cvar = document.getElementsByClassName('buy')
            var touModal = ()=>{
                vModal[0].style.zIndex <= Cvar[0].style.zIndex ? 
                ( vModal[0].style.zIndex++ && touModal() ) : 
                vModal[0].style.display = 'block';
            }
            touModal()
        },
        noBuyMoal() {
            this.moreCard = false;
            document.getElementsByClassName('buyR_modal')[0].style.display = 'none';
        },
        more() {
            this.buyModal(event);
            this.moreCard = true;
        }
    }
  };
</script>