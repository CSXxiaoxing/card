<template>
<mt-popup
  position="bottom"
  v-model="toShare" class="share">
		<p>分享给朋友</p>
		<dl>
			<dt><img src="../../img/module_home_toShare1.png" height="174" width="174"></dt>
			<dd>微信好友</dd>
		</dl> 
		<dl>
			<dt><img src="../../img/module_home_toShare2.png" height="174" width="174"></dt>
			<dd>复制链接</dd>
		</dl>   
  		<p v-on:click="toShare = false">取消</p>
</mt-popup>
</template>
<style lang='scss' scoped>
  .share{
  	width:100%;
  	background-color:#E8E8E8;
  	p:nth-of-type(1){
		font-size: 50px;
		line-height: 120px;
  	}
  	dl{
  		float:left;
  		margin:10px 0px 84px 246px;
  		font-size:40px;
  	}
  	p:nth-of-type(2){
		font-size: 50px;
		line-height: 104px;
		background-color:white;
		clear: both;
  	}
  }


</style>

<script type="es6">
  export default {
    data() {
      return {
        toShare: false
      };


    }
  };
</script>