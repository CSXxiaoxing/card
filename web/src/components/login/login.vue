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
			    <input type="text" placeholder='输入昵称' v-model='nikeName'/> 
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
			    <input type="text" placeholder='输入验证码' v-model=' code'/> 
			    <i>获取验证码</i>
		    </label>
		    <span @touchend="zhuCe" >确定</span>
		</mt-popup>

		<mt-popup
		    v-model="phone"
		    popup-transition="popup-fade" 
		    :modal='true'
		    class="phone">
		    <b class="close" @touchend="phone = false"></b>
		    <h4>登录</h4>
		    <label> 
			    <span>手机号码</span> 
			    <input type="text" placeholder='输入手机号' v-model='cell'/> 
		    </label>
	        <label> 
	    	    <span>输入密码</span> 
	    	    <input type="text" placeholder='输入密码' v-model='password'/> 
	        </label>
	        <label @click='find = true'>忘记密码？点击找回！</label>
	        <hr/>
		    <span @touchend="loging">确定</span>
		    <!-- @touchend="phone = false" -->
		</mt-popup>

		<mt-popup
		    v-model="find"
		    popup-transition="popup-fade" 
		    :modal='true'
		    class="find">
		    <b class="close" @touchend="find = false"></b>
		    <h4>找回密码</h4>
		    <label> 
			    <span>手机号码</span> 
			    <input type="text" placeholder='输入手机号' v-model='cell'/>
		    </label>
		    <label> 
			    <span>验证码</span> 
			    <input type="text" placeholder='输入验证码' v-model=' code'/>
			    <i>获取验证码</i>
		    </label>
	        <label> 
	    	    <span>新的密码</span> 
	    	    <input type="text" placeholder='输入新的密码' v-model='password'/> 
	        </label>
	        <hr/>
		    <span @touchend="findPassword">确定</span>
		</mt-popup>

		<div class='logo'></div>
		<div class="nouser" v-show="a == 0">
			<span class='spanLog'>微信登录</span>
			<span class='spanLog' @click='phone = true'>手机登录</span>
			<p>还没有账号？<span @click='zhuce = true'>注册</span></p>
		</div>
		<div class="haveuser"  v-show="a == 1 ">
			<span>{{a}}<b @click="a=0" @touchend="loginOut">切换</b></span>
			<span>登录</span>
		</div>

		<loading v-show='loadingShow'></loading>
	</div>
</template>

<style  lang='scss' scoped>
    b{
    	padding: 0.092593rem;
    }
	.login {
		height: 100%;
		width: 100%;
		background: url(../../img/login0.png) no-repeat;
		background-size: 10.0rem 17.777778rem;
		background-position: center;
		@mixin spans {
			width: 5.166667rem;
			height: 1.268519rem;
			display: inline-block;
			font-size: 0.722222rem;
			line-height: 1.268519rem;
			color: #fff;
			position: absolute;
			left: 50%;
			bottom: 4.796296rem;
			transform: translate(-50%, 0);
		}
		@mixin position {
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
		} 
		.logo {
			@include position;
			top: 3.796296rem;
			width: 7.111111rem;
			height: 2.259259rem;
			background: url(../../img/z01.png) no-repeat;
			background-size: 7.111111rem 2.259259rem;
			background-position: center;
		}
		.nouser{
			.spanLog:nth-of-type(1){
				background: url(../../img/login.png) -0.185185rem -1.574074rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
				width: 5.166667rem;
				height: 1.268519rem;
				@include spans;
				bottom: 5.2rem;
			}
			.spanLog:nth-of-type(2){
				background: url(../../img/login.png) -0.185185rem -0.092593rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
				@include spans;
				bottom: 3.5rem;
			}
			.spanLog:active {
		        transform: translate(-50%, 6px);
		    }
			p {
				@include position;
				bottom: 2.5rem;
				font-size: 0.537037rem;
				height: 0.555556rem;
				line-height: 0.555556rem;
				color: #3A3C37;
				span {
					color: #089225;
					border-bottom: 0.018519rem solid #089225;
				}
			}
		}

		.haveuser{
			span:nth-of-type(1){
				position:absolute;
				font-size:0.555556rem;
				transform: translate(-50%, 0.0rem);
				bottom: 5rem;
				b{
					text-decoration:underline;
					color:#16942A;
					font-weight: normal;
				}
			}
			span:nth-of-type(2){
				background: url(../../img/login.png) -0.185185rem -1.574074rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
				width: 5.166667rem;
				height: 1.268519rem;
				@include spans;
				bottom: 3rem;
			}
		}
		
	}
	.zhuce {
		width: 8.666667rem;
		padding: 0.37037rem 0.37037rem 0.388889rem 0.62963rem;
		box-sizing: border-box;
		border-radius: 0.277778rem;
		h4{
			font-size: 0.611111rem;
			color: #3B3B3B;
			line-height: 0.611111rem;
			margin-bottom: 0.518519rem;
		}
		span:last-child{
			display: inline-block;
			height: 1.268519rem;
			width: 4.166667rem;
			font-size: 0.722222rem;
			line-height: 1.268519rem;
			color: #fff;
			transform: scale(0.79, 0.79);
			background: url(../../img/login.png) -0.277778rem -4.074074rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
		}
		span:last-child:active{
			position: relative;
			bottom: -0.037037rem;
			left: 0.009259rem;
		}
		label{
			display: block;
			height: 0.851852rem;
			padding: 0.12963rem 0;
			text-align: left;
			span{
				display: inline-block;
				font-size: 0.444444rem;
				line-height: 0.851852rem;
				width: 1.944444rem;
			}
			input{
				border: 0.027778rem solid #D4D4D4;
				height: 0.796296rem;
				padding-left: 0.240741rem;
				font-size: 0.37037rem;
				line-height: 0.796296rem;
				border-radius: 0.092593rem;
			}
		}
		label:nth-of-type(4){ 
			padding-bottom: 0.296296rem; 
			border-bottom: 0.027778rem solid #D4D4D4;
			margin-bottom: 0.333333rem;
			position: relative;
			input{
				width: 3.055556rem;
				margin-right: 0.111111rem;
			}
			i {
				font-style: normal;
				font-size: 0.333333rem;
				color: #fff;
				display: inline-block;
				line-height: 0.851852rem;
				height: 0.851852rem;
				width: 2.166667rem;
				position: absolute;
				top: 0.12963rem;
				right: 0.0rem;
				text-align: center;
				background: url(../../img/login.png) -0.925926rem -3.0rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
			}
		}
		b{
			right: 0.37037rem;
			top: 0.444444rem;
			position: absolute;
			background: url(../../img/home_all.png) -1.759259rem -2.407407rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
			height: 0.361111rem;
			width: 0.361111rem;
		}
	}
	.phone{
		width: 8.666667rem;
		height:7.037037rem;
		padding: 0.37037rem 0.37037rem 0.388889rem 0.62963rem;
		box-sizing: border-box;
		border-radius: 0.277778rem;
		h4{
			font-size: 0.611111rem;
			color: #3B3B3B;
			line-height: 0.611111rem;
			margin-bottom: 0.518519rem;
		}
		span:last-child{
			display: inline-block;
			height: 1.24rem;
			width: 4.166667rem;
			font-size: 0.722222rem;
			color: #fff;
			line-height: 1.268519rem;
			position:relative;
			bottom:0.2em;
			right:0.2rem;
			transform: scale(0.8, 0.8);
			background: url(../../img/login.png) -0.277778rem -4.074074rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
		}
		span:last-child:active{
			position: relative;
			bottom: -0.037037rem;
			left: 0.009259rem;
		}
		label{
			display: block;
			height: 0.851852rem;
			padding: 0.12963rem 0;
			text-align: left;
			margin: 0.222222rem 0.0rem;
			span{
				display: inline-block;
				font-size: 0.444444rem;
				line-height: 0.851852rem;
				width: 1.944444rem;
			}
			input{
				border: 0.027778rem solid #D4D4D4;
				height: 0.796296rem;
				padding-left: 0.240741rem;
				font-size: 0.37037rem;
				line-height: 0.796296rem;
				border-radius: 0.092593rem;
			}
		}
		label:nth-of-type(3){
			padding-right: 0.703704rem;
			text-align:right;
			color:#3DC93C;
			font-size:0.388889rem;
			text-decoration:underline;	
			}
		hr{
			width:8.666667rem;
			position:relative;
			right:0.648148rem;
		}
		b{
			right: 0.37037rem;
			top: 0.444444rem;
			position: absolute;
			background: url(../../img/home_all.png) -1.759259rem -2.407407rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
			height: 0.361111rem;
			width: 0.361111rem;
		}
	}
	.find {
		width: 8.666667rem;
		padding: 0.37037rem 0.37037rem 0.388889rem 0.62963rem;
		box-sizing: border-box;
		border-radius: 0.277778rem;
		h4{
			font-size: 0.611111rem;
			color: #3B3B3B;
			line-height: 0.611111rem;
			margin-bottom: 0.518519rem;
		}
		span:last-child{
			display: inline-block;
			// height: 108px;
			// width: 356px;
			// font-size: 58px;
			// line-height: 108px;
			color: #fff;
			height: 1.268519rem;
			width: 4.166667rem;
			font-size: 0.722222rem;
			line-height: 1.268519rem;
			transform: scale(0.79, 0.79);
			background: url(../../img/login.png) -0.277778rem -4.074074rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
		}
		span:last-child:active{
			position: relative;
			bottom: -0.037037rem;
			left: 0.009259rem;
		}
		label{
			display: block;
			height: 0.851852rem;
			padding: 0.12963rem 0;
			text-align: left;
			margin: 0.296296rem 0.0rem;
			span{
				display: inline-block;
				font-size: 0.444444rem;
				line-height: 0.851852rem;
				width: 1.944444rem;
			}
			input{
				border: 0.027778rem solid #D4D4D4;
				height: 0.796296rem;
				padding-left: 0.240741rem;
				font-size: 0.37037rem;
				line-height: 0.796296rem;
				border-radius: 0.092593rem;
			}
		}
		label:nth-of-type(2){ 
			position: relative;
			input{
				width: 3.055556rem;
				margin-right: 0.111111rem;
			}
			i {
				font-style: normal;
				font-size: 0.333333rem;
				color: #fff;
				display: inline-block;
				line-height: 0.851852rem;
				height: 0.851852rem;
				width: 2.166667rem;
				position: absolute;
				top: 0.12963rem;
				right: 0.0rem;
				text-align: center;
				background: url(../../img/login.png) -0.925926rem -3.0rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
			}
		}

		b{
			right: 0.37037rem;
			top: 0.444444rem;
			position: absolute;
			background: url(../../img/home_all.png) -1.759259rem -2.407407rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
			height: 0.361111rem;
			width: 0.361111rem;
		}
	}
</style>

<script type="text/javascript">
	import Vue from 'vue';
	import loading from '../loading/loading.vue';
	import http from '../../utils/httpClient.js';
	import router from '../../router/';

	Vue.component('loading', loading)

	export default {
		data(){
			return {
				zhuce: false,
				login:false,
				find: false,
				phone:false,
				// 用户资料
				nikeName: '',
				password: '',
				cell: '',
				code: '',
				loadingShow: false,
				a: 1,

			}
		},
		mounted: function(){

		},
		methods: {
			loginHandler: function(){
				// http.post('/login', {cell: this.username, password: this.password}).then(res => {
				// 	router.push({name: 'home'});
				// })
			},
			loginTo(){
				router.push('home')
			},
			loging() {
				var self = this;
				http.post( '/Member/login', {
							mobile: self.cell,
							password: self.password
						}, '', this )
					.then(res => {
						console.log(res)
						if(status == 1){
							router.push({name: 'home'});
						}
						self.phone = false;
					})
			},
			zhuCe() {
				var self = this;
				http.post( '/Member/registered', {
							mobile: self.cell,
							password: self.password,
							code: self.code,
							nikeName: self.nikeName
						}, '', this )
					.then(res => {
						console.log(res)
						if(status == 1){
							router.push({name: 'home'});
						}
						self.zhuce = false;
					})
			},
			findPassword() {
				// find = false
				var self = this;
				http.post( '/Member/login', {
							mobile: self.cell,
							password: self.password,
							code: self.code
						}, '', this )
					.then(res => {
						console.log(res)
						if(status == 1){
							router.push({name: 'home'});
						}
						self.find = false;
					})
			},
			loginOut(){
				var self =this;
				http.post('/Member/login_out')
				.then(res => {
					console.log(res)
						if(status == 1){
							router.push({name: 'home'});
						}
					})
				},
			components: {
				loading
			}
		}
	}
</script>