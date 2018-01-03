<template>
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
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td>
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
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td></td>
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
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td></td>
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
            <td rowspan="3"><img src="../../img/module_home_buy2.png" height="250" width="258" alt=""></td></td>
            <td class="more">更多房卡</td>
          </tr>
          <tr>
            <td class="sev">7折优惠</td>
          </tr>
          <tr>
            <td><mt-button class="sev" type="primary" @click="more">去填写数量</mt-button></td>
          </tr>
        </table>
      </li>
    </ul>

  </mt-popup>
</template>

<style lang='scss' scoped>
    .buyR_modal{
        position: absolute;
            left: 50%;
            top: 50%;
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
            top: 5px;
            left: 2px;
        }
    }
    .buy{
        background: url(../../img/module_home_buy1.png) no-repeat;
        width: 879px;
        height: 1489px;
        position: absolute;
        bottom: 100px;
        h1{
            margin: 65px 0px 140px 60px;
            font-size:60px;
            font-weight:bolder;
            color: #5E4205;
            text-align:center;

            i{
                position:absolute;
                line-height:100px;
                font-size:120px;
                font-weight:lighter;
                color:white;
                right:20px;
                top:60px;
                background-color:#BA3C16;
                width:90px;
                height:100px;
                border-radius:100%;
                padding-right:10px;
            }
        }
        ul{
            text-align: center;
            li{
                table{
                    position: relative;
                    left:358px;
                    bottom:30px;
                    transform: translate(-50%, 0);
                }
            }
        }
        table{
            font-size:42px;
            background-color: white;
            width:660px;
            height: 270px;
            border-radius:30px;
            margin: 20px 0px 20px 90px;
            text-align:left;
            button{
                width:261px;
                height:74px;
                font-size:38px;
                background: url(../../img/home_all.png) -0px -470px no-repeat;
                background-size: 600px 600px;
                @extend .button;
            }
            tr:nth-of-type(1){
                td:nth-of-type(2){
                    padding-top:30px;
                    padding-left: 20px;
                }
            }

            tr:nth-of-type(2){
                color:#149824;
                td{
                    padding-left: 20px;
                }
            }
              .more{
                  color:#3B87C5;
                  position:relative;
                  left:60px;
              }
              .sev{
                  position:relative;
                  left:60px;
              }
            
        }
    }
       
  
  .more{
      width:765px;
      border-radius:20px;
      span{
        display: block;
        color:white;
        font-size: 68px;
        width:950px;
        height:195px;
        line-height: 165px;
        background: url("../../img/module_home_buy4.png") no-repeat;
        background-position: center;
        text-align: center;
        position: relative;
        right: 90px;
        bottom: 30px;
        
          b{
            position: absolute;
            float: right;
            background: url(../../img/home_all.png) -340px -260px no-repeat;
            background-size: 600px 600px;
            height: 60px;
            width: 60px;
            right: 110px;
            top: 40px;
          }
      }

      p:nth-of-type(1){
        padding-bottom: 20px;
        position:relative;
        bottom:30px;
        color:red;
        text-align:center;
        font-size:45px;
      }
      p:nth-of-type(2){
        margin-bottom: 20px;
        margin-left: 60px; 
        font-size:35px;
        font-weight: bold;
        text-align:left;
      }

      .num{
        width:85%;
        height:120px;
        font-size:90px;
        text-align:center;
        margin: 00px 0px 0px 10px;
        border-radius:15px;
        border:3px solid #D4D4D4; 
        color:#0BBA05;

      }
      button{
        border-radius: 52px;
        width: 357px;
        height: 104px;
        line-height: 104px;
        font-size:60px;
        margin: 43px 0;
        background: url(../../img/home_all.png) -210px -150px no-repeat;
        background-size: 600px 600px;
        @extend .button;
      }
    }
</style>

<script type="es6">
  export default {
    data() {
      return {
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