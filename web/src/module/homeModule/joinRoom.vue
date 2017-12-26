<template>
  <el-dialog
    :visible.sync="joinRoom"
    width="74%"
    center custom-class="join">
    <p></p>
    <h3>加入房间</h3>
    <div class="joinCenter">
      <input type="text" maxlength='6' :value="val"/>
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
        <li>重输</li>
        <li>0</li>
        <li>删除</li>
      </ul>
    </div>
  </el-dialog>
</template>

<style type="text/css">
  .join{
    /*border-radius: 50%;*/
  }
</style>

<style  lang='scss' scoped>
  // 这里的类名需要用custom-class定义
  .join{
    p{height: 180px; width: 100%;}
    h3{
      padding: 0;
      margin: 0;
      width: 908px;
      height: 180px;
      text-align: center;
      font-size: 76px;
      line-height: 140px;
      background: url('../../img/JoinTOP.png') no-repeat;
      position: absolute;
      left: 50%;
      top: 0;
      -webkit-transform: translate(-50%,-10%);
         -moz-transform: translate(-50%,-10%);
          -ms-transform: translate(-50%,-10%);
           -o-transform: translate(-50%,-10%);
              transform: translate(-50%,-10%);
    }
    div.joinCenter{padding: 48px;}
    input{
      height: 50px;
      width: 100%;
      font-size: 48px;
      text-align: center;
    }
    ul{
      font-size: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        height: 130px;
        line-height: 130px;
        width: 210px;
        text-align: center;
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
                url: 'roomNumber'
            ,vm:this, params:{val: this.val}}).then(res => {
                if( res.data == false ){
                  // alert('房间号码不存在')
                  this.open4()
                } else if( res.data == true ){
                  // window.location()
                }
                console.log(res.data)
            })
        }
      },
      open4() {
        this.$message.error('错了哦，这是一条错误消息');
        center: true;
      }
    }
  };
</script>