<template>
	<div class='login'>
		<mt-popup
		    v-model="zhuce"
		    popup-transition="popup-fade" 
		    :modal='true'
		    class="zhuce">
		    <b class="close" @touchend="zhuce = false"></b>
		    <h4>注册</h4>
		    <label> 
			    <span>您的昵称</span> 
			    <input type="text" placeholder='输入昵称' v-model='username'/> 
		    </label>
	        <label> 
	    	    <span>输入密码</span> 
	    	    <input type="text" placeholder='输入密码' v-model='password'/> 
	        </label>
	        <label> 
			    <span>手机号码</span> 
			    <input type="text" placeholder='输入手机号' v-model='cell'/> 
		    </label>
		    <label> 
			    <span>验证码</span> 
			    <input type="text" placeholder='输入验证码' v-model='verify'/> 
			    <i>获取验证码</i>
		    </label>
		    <span @touchend="zhuce = false">确定</span>
		</mt-popup>

		<div class='logo'></div>
		<span class='spanLog'>微信登录</span>
		<span class='spanLog' @click='loginTo'>手机登录</span>
		<p>还没有账号？<span @click='zhuce = true'>注册</span></p>
		<!-- <input type="text" v-model="username">
		<input type="password" v-model="password">
		<input type="button" value="Login" @click="loginHandler">
		<loading v-show="loadingShow"></loading> -->
	</div>
</template>

<style  lang='scss' scoped>
	.login {
		height: 100%;
		width: 100%;
		background: url(../../img/login.png) no-repeat;
		background-size: 1080px 1920px;
		background-position: center;
		@mixin spans {
			width: 558px;
			height: 137px;
			display: inline-block;
			background-size: 558px 137px;
			background-position: center;
			font-size: 78px;
			line-height: 137px;
			color: #fff;
			position: absolute;
			left: 50%;
			bottom: 518px;
			transform: translate(-50%, 0);
		}
		@mixin position {
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
		} 
		.logo {
			@include position;
			top: 410px;
			width: 768px;
			height: 244px;
			background: url(../../img/z01.png) no-repeat;
			background-size: 768px 244px;
			background-position: center;
		}
		.spanLog:nth-of-type(1){
			background: url(../../img/z03.png) no-repeat;
			@include spans;
		}
		.spanLog:nth-of-type(2){
			background: url(../../img/z02.png) no-repeat;
			@include spans;
			bottom: 320px;
		}
		.spanLog:active {
	        transform: translate(-50%, 6px);
	    }
		p {
			@include position;
			bottom: 196px;
			font-size: 58px;
			height: 60px;
			line-height: 60px;
			color: #3A3C37;
			span {
				color: #089225;
				border-bottom: 2px solid #089225;
			}
		}
	}
	.zhuce {
		width: 936px;
		padding: 40px 40px 42px 68px;
		box-sizing: border-box;
		border-radius: 30px;
		h4{
			font-size: 66px;
			color: #3B3B3B;
			line-height: 66px;
			margin-bottom: 56px;
		}
		span:last-child{
			display: inline-block;
			height: 108px;
			width: 356px;
			background: url(../../img/z05.png) no-repeat;
			background-size: 356px 108px;
			background-position: center;
			font-size: 58px;
			line-height: 108px;
			color: #fff;
		}
		span:last-child:active{
			position: relative;
			bottom: -4px;
			left: 1px;
		}
		label{
			display: block;
			height: 92px;
			padding: 14px 0;
			text-align: left;
			span{
				display: inline-block;
				font-size: 48px;
				line-height: 92px;
				width: 210px;
			}
			input{
				border: 3px solid #D4D4D4;
				height: 86px;
				padding-left: 26px;
				font-size: 40px;
				line-height: 86px;
				border-radius: 10px;
			}
		}
		label:nth-of-type(4){ 
			padding-bottom: 32px; 
			border-bottom: 3px solid #D4D4D4;
			margin-bottom: 36px;
			position: relative;
			input{
				width: 330px;
				margin-right: 12px;
			}
			i {
				font-style: normal;
				font-size: 36px;
				color: #fff;
				display: inline-block;
				line-height: 92px;
				height: 92px;
				width: 234px;
				position: absolute;
				top: 14px;
				right: 0px;
				text-align: center;
				background: url(../../img/z04.png) no-repeat;
				background-size: 246px 92px;
				background-position: center;
			}
		}
		b{
			right: 40px;
			top: 48px;
			position: absolute;
			background: url(../../img/chaVar.png) no-repeat;
			height: 39px;
			width: 39px;
			background-size: 39px;
			background-position: center;
		}
	}
</style>

<script type="text/javascript">
	import loading from '../loading/loading.vue'
	import http from '../../utils/httpClient.js'
	import router from '../../router/';

	export default {
		data(){
			return {
				zhuce: false,
				login: false,
				find: false,
				// 用户资料
				username: '',
				password: '',
				cell: '',
				verify: '',
				loadingShow: false
			}
		},
		methods: {
			loginHandler: function(){
				http.post('/login', {username: this.username, password: this.password}).then(res => {
					router.push({name: 'home'});
				})
			},
			loginTo(){
				router.push('home')
			}
		},

		components: {
			loading
		}
	}
</script>