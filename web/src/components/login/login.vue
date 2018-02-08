<template>
	<div class='login'>
		<mt-popup 
		    v-model="careTip"
		    popup-transition="popup-fade" :modal='false'
		    class="care" >
		    <span>通知 <i @click="careTip = false">×</i></span>
		    <p>{{errorTips}}</p>
		    <mt-button @click="careTip = false">  确定
		    </mt-button>
		</mt-popup>
		<mt-popup
		    v-model="zhuce"
		    popup-transition="popup-fade" 
		    :modal='true'
		    class="zhuce">
		    <b class="close" @touchend="zhuce = false"></b>
		    <h4 :class='TEXTerror'>{{TEXTerror.length >= 1 ? "输入不能为空" :text[0]}}</h4>
		    <label> 
			    <span>您的昵称</span> 
			    <input type="text" placeholder='输入昵称' v-model.trim='nikename'/> 
		    </label>
	        <label> 
	    	    <span>输入密码</span> 
	    	    <input type="text" placeholder='输入密码' v-model.trim='password'/> 
	        </label>
	        <label> 
			    <span>手机号码</span> 
			    <input type="text" placeholder='输入手机号' v-model.trim='cell'/> 
		    </label>
		    <label> 
			    <span>验证码</span> 
			    <input type="text" placeholder='输入验证码' v-model.trim=' code'/> 
			    <i @click="sendCode">获取验证码</i>
		    </label>
		    <span @touchend="input(4)" >确定</span>
		</mt-popup>

		<mt-popup
		    v-model="phone"
		    popup-transition="popup-fade" 
		    :modal='true'
		    class="phone">
		    <b class="close" @touchend="phone = false"></b>
		    <h4 :class='TEXTerror'>{{TEXTerror.length >= 1 ? "输入不能为空" :text[1]}}</h4>
		    <label> 
			    <span>手机号码</span> 
			    <input type="text" placeholder='输入手机号' v-model.trim='cell'/> 
		    </label>
	        <label> 
	    	    <span>输入密码</span> 
	    	    <input type="text" placeholder='输入密码' v-model.trim='password'/> 
	        </label>
	        <label @click='[(find = true),(type = 2)]' >忘记密码？点击找回！</label>
	        <hr/>
		    <span @click="input(2)">确定</span>
		    <!-- <span @touchend="input(2)">确定</span> -->
		    <!-- @touchend="phone = false" -->
		</mt-popup>

		<mt-popup
		    v-model="find"
		    popup-transition="popup-fade" 
		    :modal='true'
		    class="find">
		    <b class="close" @touchend="find = false"></b>
		    <h4 :class='TEXTerror'>{{TEXTerror.length >= 1 ? "输入不能为空" :text[2]}}</h4>
		    <label> 
			    <span>手机号码</span> 
			    <input type="text" placeholder='输入手机号' v-model.trim='cell'/>
		    </label>
		    <label> 
			    <span>验证码</span> 
			    <input type="text" placeholder='输入验证码' v-model.trim=' code'/>
			    <i @click="sendCode">获取验证码</i>
		    </label>
	        <label> 
	    	    <span>新的密码</span> 
	    	    <input type="text" placeholder='输入新的密码' v-model.trim='password'/> 
	        </label>
	        <hr/>
		    <span @touchend="input(3)">确定</span>
		</mt-popup>

		<div class='logo'></div>
		<div class="nouser" v-show="a == 0">
			<span class='spanLog'>微信登录</span>
			<span class='spanLog' @click='[(phone = true),(type = 1)]'>手机登录</span>
			<p>还没有账号？<span @click='[(zhuce = true),(type = 3)]'>注册</span></p>
		</div>

		<div class="haveuser"  v-show="a == 1 ">
			<span>{{a}}<b @click="a=0" @touchend="loginOut">切换</b></span>
			<span @touchend='local'>登录</span>
		</div>
		
		<loading v-if='loading'></loading>
	</div>
</template>

<style  lang='scss' scoped>
	@import '../../utils/baseVar.scss';

    b{
    	padding: 0.092593rem;
    }
    @mixin h4 {
		font-size: 0.611111rem;
		color: #3B3B3B;
		line-height: 0.611111rem;
		margin-bottom: 0.518519rem;
    }
    @mixin min-active {
		-webkit-transform: scale(0.78, 0.78) translate(1%, 6px);;
		   -moz-transform: scale(0.78, 0.78) translate(1%, 6px);;
		    -ms-transform: scale(0.78, 0.78) translate(1%, 6px);;
		     -o-transform: scale(0.78, 0.78) translate(1%, 6px);;
		        transform: scale(0.78, 0.78) translate(1%, 6px);;
    }
    @mixin label {
    	display: block;
    	height: 0.851852rem;
    	padding: 0.12963rem 0;
    	text-align: left;
    	span {
    		display: inline-block;
    		font-size: 0.444444rem;
    		line-height: 0.851852rem;
    		width: 1.944444rem;
    	}
    	input {
			border: 0.027778rem solid #D4D4D4;
			height: 0.796296rem;
			padding-left: 0.240741rem;
			font-size: 0.37037rem;
			line-height: 0.796296rem;
			-webkit-border-radius: 0.092593rem;
			-moz-border-radius: 0.092593rem;
			-ms-border-radius: 0.092593rem;
			-o-border-radius: 0.092593rem;
			border-radius: 0.092593rem;

    	}
    }
    @mixin i {
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
    	background: $login01 -0.925926rem -3.0rem no-repeat;
    	background-size: 5.555556rem 5.555556rem;
    }
    @mixin b {
    	right: 0.37037rem;
    	top: 0.444444rem;
    	position: absolute;
    	background: $homeAll -1.759259rem -2.407407rem no-repeat;
    	background-size: 5.555556rem 5.555556rem;
    	height: 0.361111rem;
    	width: 0.361111rem;
    }
	.login {
		height: 100%;
		width: 100%;
		background: $login02 no-repeat;
		background-size: 100%;
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
			-webkit-transform: translate(-50%, 0);
			   -moz-transform: translate(-50%, 0);
			    -ms-transform: translate(-50%, 0);
			     -o-transform: translate(-50%, 0);
			        transform: translate(-50%, 0);
		}
		@mixin position {
			position: absolute;
			left: 50%;
			-webkit-transform: translate(-50%, 0);
			   -moz-transform: translate(-50%, 0);
			    -ms-transform: translate(-50%, 0);
			     -o-transform: translate(-50%, 0);
			        transform: translate(-50%, 0);
		} 
		.logo {
			@include position;
			top: 3.796296rem;
			width: 7.111111rem;
			height: 2.259259rem;
			background: $login03 no-repeat;
			background-size: 7.111111rem 2.259259rem;
		}
		.nouser{
			.spanLog:nth-of-type(1){
				background: $login01 -0.185185rem -1.574074rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
				width: 5.166667rem;
				height: 1.268519rem;
				@include spans;
				bottom: 5.2rem;
			}
			.spanLog:nth-of-type(2){
				background: $login01 -0.185185rem -0.092593rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
				@include spans;
				bottom: 3.5rem;
			}
			.spanLog:active {
		        -webkit-transform: translate(-50%, 6px);
		           -moz-transform: translate(-50%, 6px);
		            -ms-transform: translate(-50%, 6px);
		             -o-transform: translate(-50%, 6px);
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
				position: absolute;
				bottom: 5rem;
				font-size: 0.555556rem;
				-webkit-transform: translate(-50%, 0);
				   -moz-transform: translate(-50%, 0);
				    -ms-transform: translate(-50%, 0);
				     -o-transform: translate(-50%, 0);
				        transform: translate(-50%, 0);
				b{
					text-decoration: underline;
					color:#16942A;
					font-weight: normal;
				}
			}
			span:nth-of-type(2){
				background: $login01 -0.185185rem -1.574074rem no-repeat;
				background-size: 5.555556rem 5.555556rem;
				width: 5.166667rem;
				height: 1.268519rem;
				@include spans;
				bottom: 3rem;
			}
		}	
	}
	.zhuce {
		// width: 8.666667rem;
		width: 80%;
		padding: 0.37037rem 0.37037rem 0.388889rem 0.62963rem;
		@include box-sizing();
		border-radius: 0.277778rem;
		h4{		@include h4;	}
		span:last-child{
			display: inline-block;
			height: 1.268519rem;
			width: 4.166667rem;
			font-size: 0.722222rem;
			line-height: 1.268519rem;
			color: #fff;
			-webkit-transform: scale(0.79, 0.79);
			   -moz-transform: scale(0.79, 0.79);
			    -ms-transform: scale(0.79, 0.79);
			     -o-transform: scale(0.79, 0.79);
			        transform: scale(0.79, 0.79);
			background: $login01 -0.277778rem -4.074074rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
		}
		span:last-child:active{ @include min-active; }
		label{
		 	@include label; 
			width: 100%;
			span{width: 26%;}
			input{
				width: 70%;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				-ms-box-sizing: border-box;
				-o-box-sizing: border-box;
				box-sizing: border-box;
			}
		}
		label:nth-of-type(4){ 
			padding-bottom: 0.296296rem;
			border-bottom: 0.027778rem solid #D4D4D4;
			margin-bottom: 0.333333rem;
			position: relative;
			input{
				width: 2.8rem;
				margin-right: 0.111111rem;
			}
			i {
				font-style: normal;
				font-size: 0.333333rem;
				color: #fff;
				
				-webkit-border-radius: 0.240741rem;
				-moz-border-radius: 0.240741rem;
				-ms-border-radius: 0.240741rem;
				-o-border-radius: 0.240741rem;
				border-radius: 0.240741rem;
				display: inline-block;
				line-height: 0.851852rem;
				height: 0.851852rem;
				width: 30%;
				position: absolute;
				top: 0.16rem;
				right: -0.04rem;
				text-align: center;
				background: $login04 no-repeat;
				background-size: 100% 100%;

			}
		}
		b{	@include b;  }
	}
	.phone{
		width: 8.666667rem;
		height:7.037037rem;
		padding: 0.37037rem 0.37037rem 0.388889rem 0.62963rem;
		@include box-sizing();
		
		-webkit-border-radius: 0.277778rem;
		-moz-border-radius: 0.277778rem;
		-ms-border-radius: 0.277778rem;
		-o-border-radius: 0.277778rem;
		border-radius: 0.277778rem;
		h4{		@include h4;	}
		span:last-child{
			display: inline-block;
			height: 1.24rem;
			width: 4.166667rem;
			font-size: 0.722222rem;
			color: #fff;
			line-height: 1.268519rem;
			position: relative;
			bottom:0.2em;
			right:0.2rem;
			-webkit-transform: scale(0.8, 0.8);
			   -moz-transform: scale(0.8, 0.8);
			    -ms-transform: scale(0.8, 0.8);
			     -o-transform: scale(0.8, 0.8);
			        transform: scale(0.8, 0.8);
			background: $login01 -0.277778rem -4.074074rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
		}
		span:last-child:active{ @include min-active; }
		label{
			@include label;
			span{
				width: 26%;
			}
			input{
				width: 60%;
			}
			margin: 0.222222rem 0.0rem;
		}
		label:nth-of-type(3){
			padding-right: 0.703704rem;
			text-align: right;
			color: #3DC93C;
			font-size: 0.388889rem;
			text-decoration: underline;	
			}
		hr{
			width:8.666667rem;
			position:relative;
			right:0.648148rem;
		}
		b{	@include b;  }
	}
	.find {
		width: 8.666667rem;
		padding: 0.37037rem 0.37037rem 0.388889rem 0.62963rem;
		@include box-sizing();
		
		-webkit-border-radius: 0.277778rem;
		-moz-border-radius: 0.277778rem;
		-ms-border-radius: 0.277778rem;
		-o-border-radius: 0.277778rem;
		border-radius: 0.277778rem;
		h4{		
			@include h4;
			margin-bottom: 0.185185rem;
		}
		span:last-child{
			display: inline-block;
			color: #fff;
			height: 1.268519rem;
			width: 4.166667rem;
			font-size: 0.722222rem;
			line-height: 1.268519rem;
			-webkit-transform: scale(0.79, 0.79);
			   -moz-transform: scale(0.79, 0.79);
			    -ms-transform: scale(0.79, 0.79);
			     -o-transform: scale(0.79, 0.79);
			        transform: scale(0.79, 0.79);
			background: $login01 -0.277778rem -4.074074rem no-repeat;
			background-size: 5.555556rem 5.555556rem;
		}
		span:last-child:active{ @include min-active; }
		label{
			@include label;
			padding: 0.296296rem 0.0rem;
		}
		label:nth-of-type(2){ 
			position: relative;
			padding: 0;
			margin: 0.296296rem 0rem;
			input{
				width: 2.8rem;
				margin-right: 0.111111rem;
			}
			i {
				font-style: normal;
				font-size: 0.333333rem;
				color: #fff;
				
				-webkit-border-radius: 0.240741rem;
				   -moz-border-radius: 0.240741rem;
				    -ms-border-radius: 0.240741rem;
				     -o-border-radius: 0.240741rem;
				        border-radius: 0.240741rem;
				display: inline-block;
				line-height: 0.851852rem;
				height: 0.851852rem;
				width: 30%;
				position: absolute;
				top: -0.02rem;
				right: 0rem;
				text-align: center;
				background: $login04 no-repeat;
				background-size: 100% 100%;
			}
		}

		b{	@include b;  }
	}
</style>

<script type="text/javascript">
	import Vue from 'vue';
	import loading from '../loading/loading.vue';
	Vue.component('loading', loading)
	import http from '../../utils/httpClient.js';
	import router from '../../router/';

	Vue.component('loading', loading)

	export default {
		data(){
			return {
				loading: false,		// loading
				zhuce: false,
				login:false,
				find: false,
				phone:false,
				text: ["注册", "登录", "找回密码"],
				zhuceType: true, 
				TEXTerror: '',
				// 用户资料
				nikename: '',
				password: '',
				cell: '',
				code: '',
				a: 0,
				type:0,
				careTip : false,
				errorTips: '',		// 错误信息
			}
		},
		mounted: function(){
			var self = this;
			if(localStorage.oxToken){
				this.a = 1;
			} else {
				this.a = 0;
			}
			// function myrefresh(){ 
			// 	window.location.reload(); 
			// }
			// this.$store.state.self.shuaxin = 1
			// myrefresh()
			function reurl(){
				var url = location.href; //把当前页面的地址赋给变量 url
				var times = url.split("?"); //分切变量 url 分隔符号为 "?"
				if(times[1] != 1){ //如果?后的值不等于1表示没有刷新
				url += "?1"; //把变量 url 的值加入 ?1
					window.location.replace(url); //刷新页面
				}
			}
			onload = reurl();
		},
		methods: {
			local () {
				if(localStorage.oxToken){
					router.push({name: 'home'});
				} else {
					this.a = 0;
				}
			},
			input (n) {		//input非空验证 
				var type = true;
				var self = this;
				if(n >= 2){
					!this.password ? type = false : 0;
					!this.cell ? type = false : 0;
				}
				if(n >= 3){
					!this.code ? type = false : 0;
				}
				if(n >= 4){
					!this.nikename ? type = false : 0;
				}
				function txtErr(){
					self.TEXTerror = 'TEXTerror';
					var a = setTimeout(()=>{
						self.TEXTerror = '';
						clearTimeout(a)
					},2000)
				}
				if(type == false) {
					txtErr()
				} else {
					if(n == 2) {
						self.loging();
					}
					if(n == 3) {
						self.findPassword();
					}
					if(n == 4) {
						self.zhuCe();
					}
				}
			},
			loging() {		//登录
				var self = this;
				http.post( '/Member/login', {
						mobile: Number(self.cell),
						password: self.password,
					}, '', this )
					.then(res => {
						console.log(res)
						if(res.status == 1){
							router.push({name: 'home'});
							localStorage['oxToken'] = res.data.token;
							localStorage['oxUid'] = res.data.uid;
							localStorage['oxName'] = res.data.member_info.nickname;
							// 注册信号为true
							var options2 = { 
							    username: 'hz_niuniu_'+localStorage.oxUid,
							    password: '123456',
							    nickname: localStorage.oxName+'cc_10086',
							    appKey: WebIM.config.appkey,
							    success: function () { 
							        console.log('注册成功')
							    },  
							    error: function () {
							    	console.log('注册失败')
							    },
							    apiUrl: WebIM.config.apiURL
							}; 
							conn.registerUser(options2);
						} else {
							self.errorTips = res.msg;
							self.careTip = true;
						}
						self.phone = false;
					})
			},
			zhuCe() {		//注册
				var self = this;
				http.post( '/Member/registered', {
							mobile: self.cell,
							password: self.password,
							code: self.code,
							nikename: self.nikename,
						}, '', this )
					.then(res => {
						if(res.status == 1){
							self.loging();
						} else {
							self.errorTips = res.msg;
							self.careTip = true;
						}
						self.zhuce = false;
					})
			},
			findPassword() {	//找回密码
				var self = this;

				http.post( '/Member/changePassword', {
							mobile: self.cell,
							password: self.password,
							code: self.code,
						}, '', this )
					.then(res => {
						if(status == 1){
							router.push({name: 'home'});
						} else {
							self.errorTips = res.msg;
							self.careTip = true;
						}
						self.find = false;
					})
			},
			
			loginOut(){		//登出
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
						} else {
							self.errorTips = res.msg;
							self.careTip = true;
						}
					})
			},
			sendCode(){
				var self = this ;
				console.log(self.type)
				http.post('/Api/Sms/sendYzm',{
					mobile : self.cell,
					type : self.type,
				}, '' ,this)
				.then(res=> {
					console.log(res)
					if(res.status == 1){

					}
				})
			},
			//手机验证码
			phoneCode(){
				var self = this ;
				http.post('/Api/Sms/sendYzm',{
					mobile 
				})
			}
		}
	}
</script>