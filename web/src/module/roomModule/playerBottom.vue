<template>
  <mt-popup 
    v-model="playerBottom"
    popup-transition="popup-fade" 
    class="player" >

    <mt-popup
        v-model="details"
        popup-transition="popup-fade" 
        :modal='false'
        class="details">
        <span>牌型赔率 <i @click="details = false">×</i></span>
        <table border="1">
          <thead>
            <tr> <td>牌型</td><td>赔率</td> </tr>
          </thead>
          <tbody>
            <tr> <td>无牛</td><td>比K</td> </tr>
            <tr> <td>牛一</td><td>X10</td> </tr>
            <tr> <td>牛二</td><td>X10</td> </tr>
            <tr> <td>牛三</td><td>X5</td> </tr>
            <tr> <td>牛四</td><td>X10</td> </tr>
            <tr> <td>牛五</td><td>X10</td> </tr>
            <tr> <td>牛六</td><td>X10</td> </tr>
            <tr> <td>牛七</td><td>X10</td> </tr>
            <tr> <td>牛八</td><td>X10</td> </tr>
            <tr> <td>牛九</td><td>X10</td> </tr>
            <tr> <td>牛牛</td><td>X10</td> </tr>
            <tr> <td>五花牛</td><td>X10</td> </tr>
          </tbody>
        </table>
    </mt-popup>

    <span>可押{{scope[0]}}~{{scope[1]}}分 <i @click="playerBottom = false">×</i></span>
    <p :class='inpErr == 99 ? "TEXTerror" : ""'>{{text}}</p>

    <p>翻倍<b @click="details = true">( 查看详情 )</b>   
        <input type="text" v-model.number='double' :class='inpErr == 0 ? "error" : ""' Placeholder="输入押注分数" @focus='inpErr = -1'>
    </p>

    <p>不翻<b>(1:1比大小)</b>  
        <input type="text" v-model.number='noDouble' :class='inpErr == 1 ? "error" : ""' Placeholder="输入押注分数" @focus='inpErr = -1'>
    </p>

    <mt-button @click="valueEnd">确定</mt-button>
    
  </mt-popup >
</template>

<style lang='scss' scoped>

  .bstyle{
    font-size:34px;
    margin:10px 5px;
    font-weight:normal;

  }
  .player{
    width: 766px;
    border-radius: 30px;
    position: absolute;
    top:890px;

    &>span:nth-of-type(1){
      display: block;
      color:white;
      font-size: 70px;
      width:958px;
      height:230px;
      line-height: 195px;
      background: url("../../img/module_home_no1.png") no-repeat;
      background-position: center;
      text-align: center;
      position: relative;
      right: 94px;
      bottom: 25px;
      i{
        position: absolute;
        font-size: 140px;
        color: #028B00;
        right: 120px;
      }
    }

    p:nth-of-type(1){
      line-height:20px;
      padding-bottom: 50px;
      text-align:center;
      font-size:46px;
    }

    p:nth-of-type(2){
      font-size:48px;
      margin-bottom:50px;
      b{
          @extend .bstyle;
          color:#29A345;

        }
    }
    p:nth-of-type(3){
      font-size:48px;
      b{
          @extend .bstyle;
        }
    }
    input{
      width:254px;
      height:84px;
      border-radius:10px;
      margin-left:20px;
      font-size: 28px;
      padding-left: 14px;
    }
    input::-webkit-input-placeholder{color: #ccc;}
    
    button{
      width:357px;
      height: 105px;
      line-height:100px;
      border-radius: 55px;
      font-size:60px;
      margin:90px 0px 50px 0px;
      border: 0 none;
      color: white;
      background: url(../../img/home_all.png) -210px -150px no-repeat;
      background-size: 600px 600px;
    }
    button:active {
        position: relative;
        left: 2px;
        bottom: -5px;
    }
    div{
      text-align:left;
      padding-left: 70px;

      label{
        display:inline-block;
        font-size:48px;
        width:100%;
        margin-bottom: 50px;
        line-height:80px;
        margin-left: 100px;
        span{
          display:inline-block;
          width:60px;
          height:65px;
          background-color: #DADADA;
          border-radius:10px;
          padding:5px 5px 0px 5px;
          position:absolute;
          left:70px;
        }
        
      }
    }
  }

  .details{
    width:1032px;
    height:1350px;
    box-sizing: border-box;
    border-radius:30px;
    span{
      display:inline-block;
      width:100%;
      line-height:140px;
      font-size:64px;
      text-align:center;
      i{
        position: absolute;
        font-size: 140px;
        color: #7B7B7B;
        right: 40px;
      }
    }
    table{
      width:948px;
      border:0px solid #DADADA;
      position:relative;
      right:20px;
      border-radius:5px;
      td{
        text-align:center;
      }
      thead{
        font-size:48px;
        line-height:84px;
        background-color: #D0E7B1;
      }
      tbody{
        tr:nth-of-type(2n){
          background-color:#EFF8E3;
        }
        td{
          line-height:82px;
          font-size:34px;
          color:#618F25;
        }
        td:nth-of-type(1){
          width:416px;
          font-weight: bolder;
          color:#51810C;
        }
      }
    }
  }
</style>

<script type="es6">
    export default {
    data() {
        return {
            playerBottom: false,
            details:false,
            double: '',
            noDouble: '',
            // 文字
            text: '输入押注分数',
            // 输入数值有误
            inpErr: -1,
            // 可压范围
            scope: [this.$parent.init.scope[0], this.$parent.init.scope[1]],
        };
    },
    props: ["p"],
    beforeUpdate: function(){
        // 有初始值
        // if(this.$parent.ordinary.pay[this.p][2] > 0){
        //     this.text = '追加押注分数';
        // } else {
        //     this.text = '输入押注分数';
        // }
    },
    methods:{
        valueEnd() {
            let pay01 = 0;
            let pay02 = 0;
            let theTxt = [this.text, '总值超出可下注范围', '超出押注范围'];
            let idx = 1;
            // 有初始值
            if(this.$parent.ordinary.pay[this.p][2] > 0){
                pay01 = this.$parent.ordinary.pay[this.p][0];
                pay02 = this.$parent.ordinary.pay[this.p][1];
            }
            let val01 = Number(this.double) + Number(pay01);
            let val02 = Number(this.noDouble) + Number(pay02);
            
            // 值超出最小或最大范围
            if((this.double < this.scope[0] || this.double > this.scope[1] )
             && this.double != ''){
                this.inpErr = 0;
                idx = 2;
            }
            if((this.noDouble < this.scope[0] || this.noDouble > this.scope[1] )
                && this.noDouble != '') {
                this.inpErr = 1;
                idx = 2;
            }
            // 无初始值
            switch (true) {
                case !Number(this.double) && this.double != '' :
                    this.inpErr = 0;
                    console.log(this.inpErr)
                    break;
                case !Number(this.noDouble) && this.noDouble != '' :
                    this.inpErr = 1;
                    break;
                // 大于注池/或者超出范围
                case val01 + val02 > this.$parent.ordinary.pond || idx == 2 :
                    let t;
                    clearTimeout(t);
                    t = setTimeout( ()=>{
                        this.text = theTxt[0];
                        this.double = '';
                        this.noDouble = '';
                        this.inpErr = -1;
                        idx=1;
                        clearTimeout(t);
                    }, 2000)
                    this.text = theTxt[idx];
                    this.inpErr = 99;
                    break;
                case this.double + this.noDouble > 0 && this.$parent.init.textStyle == 3:
                    // 1/修改父元素值
                    this.$parent.ordinary.pay[this.p] = [val01, val02, val01+val02];
                    this.$parent.win.fen -= val01+val02;
                    // 2/发起请求-把数据传给后台 (三个值)---------------------------------------
                    // 
                    // 3/请求完后清除数据
                    this.double = '';
                    this.noDouble = '';
                    this.inpErr = -1;
                    this.playerBottom = false;
                    break;
                default : 
                    this.inpErr = -1;
            }   
            

        }
    }
    };
</script>