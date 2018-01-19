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
    font-size:0.314815rem;
    margin:0.092593rem 0.046296rem;
    font-weight:normal;

  }
  .player{
    width: 7.092593rem;
    border-radius: 0.277778rem;
    position: absolute;
    top:8.240741rem;

    &>span:nth-of-type(1){
      display: block;
      color:white;
      font-size: 0.648148rem;
      width:8.87037rem;
      height:2.12963rem;
      line-height: 1.805556rem;
      background: url("../../img/module_home_no1.png") no-repeat;
      background-position: center;
      text-align: center;
      position: relative;
      right: 0.87037rem;
      bottom: 0.231481rem;
      i{
        position: absolute;
        font-size: 1.296296rem;
        color: #028B00;
        right: 1.111111rem;
      }
    }

    p:nth-of-type(1){
      line-height:0.185185rem;
      padding-bottom: 0.462963rem;
      text-align:center;
      font-size:0.425926rem;
    }

    p:nth-of-type(2){
      font-size:0.444444rem;
      margin-bottom:0.462963rem;
      b{
          @extend .bstyle;
          color:#29A345;

        }
    }
    p:nth-of-type(3){
      font-size:0.444444rem;
      b{
          @extend .bstyle;
        }
    }
    input{
      width:2.351852rem;
      height:0.777778rem;
      border-radius:0.092593rem;
      margin-left:0.185185rem;
      font-size: 0.259259rem;
      padding-left: 0.12963rem;
    }
    input::-webkit-input-placeholder{color: #ccc;}
    
    button{
      width:3.305556rem;
      height: 0.972222rem;
      line-height:0.925926rem;
      border-radius: 0.509259rem;
      font-size:0.555556rem;
      margin:0.833333rem 0 0.462963rem 0;
      border: 0 none;
      color: white;
      background: url(../../img/home_all.png) -1.944444rem -1.388889rem no-repeat;
      background-size: 5.555556rem 5.555556rem;
    }
    button:active {
        position: relative;
        left: 0.018519rem;
        bottom: -0.046296rem;
    }
    div{
      text-align:left;
      padding-left: 0.648148rem;

      label{
        display:inline-block;
        font-size:0.444444rem;
        width:100%;
        margin-bottom: 0.462963rem;
        line-height:0.740741rem;
        margin-left: 0.925926rem;
        span{
          display:inline-block;
          width:0.555556rem;
          height:0.601852rem;
          background-color: #DADADA;
          border-radius:0.092593rem;
          padding:0.046296rem 0.046296rem 0px 0.046296rem;
          position:absolute;
          left:0.648148rem;
        }
        
      }
    }
  }

  .details{
    width:9.555556rem;
    height:12.5rem;
    box-sizing: border-box;
    border-radius:0.277778rem;
    span{
      display:inline-block;
      width:100%;
      line-height:1.296296rem;
      font-size:0.592593rem;
      text-align:center;
      i{
        position: absolute;
        font-size: 1.296296rem;
        color: #7B7B7B;
        right: 0.37037rem;
      }
    }
    table{
      width:8.777778rem;
      border:0.0rem solid #DADADA;
      position:relative;
      right:0.185185rem;
      border-radius:0.046296rem;
      td{
        text-align:center;
      }
      thead{
        font-size:0.444444rem;
        line-height:0.777778rem;
        background-color: #D0E7B1;
      }
      tbody{
        tr:nth-of-type(2n){
          background-color:#EFF8E3;
        }
        td{
          line-height:0.759259rem;
          font-size:0.314815rem;
          color:#618F25;
        }
        td:nth-of-type(1){
          width:3.851852rem;
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