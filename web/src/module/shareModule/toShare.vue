<template>
<mt-popup
  position="bottom"
  v-model="toShare" class="share">
        <p @click='test' v-if='share == "home"'>分享给朋友</p>
		<p @click='test' v-if='share == "room"'>选择邀请方式</p>
		<dl>
			<dt><img src="../../img/module_home_toShare1.png" height="174" width="174"></dt>
			<dd>微信好友</dd>
		</dl> 
		<dl v-if='share == "home"'>
			<dt><img src="../../img/module_home_toShare2.png" height="174" width="174"></dt>
			<dd>复制链接</dd>
		</dl> 
        <dl v-if='share == "room"'>
            <dt><img src="../../img/room06.png" height="174" width="174"></dt>
            <dd>游戏好友</dd>
        </dl>   
  		<p v-on:click="toShare = false">取消</p>
</mt-popup>
</template>
<style lang='scss' scoped>
  .share{
  	width:100%;
  	background-color:#E8E8E8;
  	p:nth-of-type(1){
		font-size: 0.462963rem;
		line-height: 1.111111rem;
  	}
  	dl{
  		float:left;
  		margin:0.092593rem 0.0rem 0.777778rem 2.277778rem;
  		font-size:0.37037rem;
  	}
  	p:nth-of-type(2){
		font-size: 0.462963rem;
		line-height: 0.962963rem;
		background-color:white;
		clear: both;
  	}
  }


</style>

<script type="es6">
  export default {
    data() {
      return {
        toShare: false,
      };
    },
    props: ['share'],
    methods: {
        test(){
            console.log(this.share)
        }
    }
  };
</script>