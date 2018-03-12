<template>
	<div id='oxCrowd'> 
	<iframe :src="iframe" frameborder="0" :id='iframeCss'></iframe>
		<mt-popup 
	        v-model="careTip"
	        popup-transition="popup-fade"
	        class="care" >
	        <span>提示 <i @click="careTip = false"></i></span>
	        <p>{{errorTips}}</p>
	        <mt-button @click="careTip = false">  确定
	        </mt-button>
      	</mt-popup>

		<header>
			<dl>
				<dt @click.capture='child_KA(2)'>
					<img src="../../image/home004.png" />
				</dt>
				<dd>
					<span>{{name}}</span>
					<span @click="child_KA(5)">
						<i></i>
						<b></b>
						分享
					</span>
				</dd>
				<dd>
					<span>ID:{{id}}</span>
					<span>
						{{cardNum}}
						<i @click='child_KA(3)'></i>
					</span>
				</dd>
			</dl>
			
			<p>
			<mt-swipe 
				:show-indicators="false" 
				:prevent = 'true'
				:speed="800" :auto="5000"
				class='homeSwipe auto'>
			  	<i></i>
			  	<mt-swipe-item v-for='(notices) in notice'>
			  		<span>{{notices.content}}</span>
			  	</mt-swipe-item>
			</mt-swipe>
			</p>

			<span class='homeServer' @click='kefu()'>
			</span>
		</header>

		<div class='homeMain' id='dataUL'>

			<ul @click='openS' 
			:class='spinner == 1 ? "ul01":""'
			v-infinite-scroll="loadMore"
  			:infinite-scroll-distance="200">

				<li v-for='(dataRoom) in $store.state.data.DT' :key='"ox"+dataRoom.id' :openState='`${dataRoom.zn_room_type == 1 ? "true" : "false"}`' :roomid = 'dataRoom.zc_number'>
					<b v-if='dataRoom.zn_room_type == 1 ? true : false'></b>
					<p>
						{{dataRoom.zc_title}}
					</p>
				</li>
			</ul>

			
			<mt-spinner 
			type="triple-bounce"
			:size="110" 
			v-show='spinner == 1'>
			</mt-spinner>
		</div>

		<footer>
			<ul>
				<li><router-link to="/friend" >好友</router-link></li>
				<li @click='varRoom'>创建房间</li>
				<li @click='child_KA(1)'>进入房间</li>
				<li @click='child_KA(4)'>我的房间</li>
			</ul>
		</footer>

		<idMessage ref="onidMessageChild" ></idMessage>
		<buyRoom ref="onbuyRoomChild" ></buyRoom>
		<noOpen  ref="onOpenChild" ></noOpen>
		<joinRoom ref="onjoinRoomChild" ></joinRoom>
		<varRoom ref="onvarRoomChild" ></varRoom>
		<myRoom ref="onmyRoomChild" ></myRoom>
		<toShare ref="ontoShareChild" :share='"home"'></toShare>
		
		<loading v-if='loading'></loading>
	</div>
</template>

<script type="text/javascript">
	import './oxCrowd.scss';
	import Vue from 'vue';
	import http from '../../utils/httpClient.js';
	import router from '../../router/';
	import { Indicator, InfiniteScroll } from 'mint-ui';
	// 组件
	import noOpen from '../../module/homeModule/noOpen.vue';
	import joinRoom from '../../module/homeModule/joinRoom.vue';
	import idMessage from '../../module/homeModule/idMessage.vue';
	import buyRoom from '../../module/homeModule/buyRoom.vue';
	import setRoom from '../../module/homeModule/varRoom.vue';
	import myRoom from '../../module/homeModule/myRoom.vue';
	import toShare from '../../module/shareModule/toShare.vue';

	import loading from '../loading/loading.vue';
	Vue.component('loading', loading)
	
	Vue.component('noOpen', noOpen)
	Vue.component('joinRoom', joinRoom)
	Vue.component('idMessage', idMessage)
	Vue.component('buyRoom', buyRoom)
	Vue.component('varRoom', setRoom)
	Vue.component('myRoom', myRoom)
	Vue.component('toShare', toShare)
	
	export default {
		data: function(){
			return {
				iframe: '',
				iframeCss: 'iframeCss',
				loading: false,		// loading getData
				careTip : false,	//错误提示 
				errorTips: '',		// 错误信息

				id : localStorage.oxUid,
				name: localStorage.getItem('oxName'),
				pagesize : 40,	// 请求条数
				type : 1,		// 1 所有房间 2 自己开的房间
				p : 1,			// 当前页

				sendId : 0,
				spinner: 0,		// 懒加载loding
				notice : [],	// 系统公告
				cardNum : this.$store.state.initRoom.cardNum,
			}
		},
		mounted: function(){
			
			var self = this;
			var VX_data = this.$store.state.data.DT;
			var VX_dataid = this.$store.state.data.DTid;
			var VX_dataidALL = this.$store.state.data.DTidALL;

			if(localStorage.oxToken && localStorage.oxUid){
				console.log()
				if(VX_data.length > 0){
					return false;
				}
				// 房间请求
				http.post('/Room/getRoomList',
                {
                    pagesize : self.pagesize,
                    type 	 : self.type,
                    p 		 : self.p,
                }, '',this)
	            .then(res => {
	            	console.log(res)
	            	if(res.status != 1){
	            		self.$store.state.data.DTP = 0;
	            		return false;
	            	}
	            	self.$store.state.data.DATE = new Date().getTime();
	            	VX_data = res.data;

	            	for(var i=0; i<VX_data.length; i++){
	            		VX_dataidALL.push(VX_data[i].id)
	            		VX_dataid.push(VX_data[i].id)
	            	}
	            	self.$store.state.data.DT = VX_data;
	            	self.$store.state.data.DTid = VX_dataid;
	            	self.$store.state.data.DTidALL = VX_dataidALL;
	            	self.$store.state.data.DTP = 1;
	            });
	            // 系统公告
                http.post('/MemberNotice/getAnnouncement',{
                    id : self.id,
                }, '' ,this)
                .then(res => {
                	if(res.status == 1){
                		self.notice = [];
                		for(let i in res.data){
                			self.notice.push({
                				content : res.data[i].zc_content,
                			})
                		}
                	}
                })
			} else {
				router.push({name: '/'});	// 跳回登录页
			}
		},
		methods: {
			kefu: function(){
				easemobim.bind({
					configId: "91597b29-7705-433a-9b95-7d6e657896bb",
					domain: '//kefu.easemob.com',
					agentName: '客服',
					hideKeyboard: true,
					autoConnect: true,
					hide: true,
				})
			},
			child_KA: function(n){
				switch(n){
					case 1 : // 加入房间
						this.$refs.onjoinRoomChild.joinRoom=true;
						break;
					case 2 : // 个人信息
						this.$refs.onidMessageChild.idMessage=true;
						break;
					case 3 : // 打开购买房卡
						this.$refs.onbuyRoomChild.buyRoom=true;
						break;
					case 4 : // 打开我的房间
						this.$refs.onmyRoomChild.myRoom=true;
						break;
					case 5 : // 分享界面
						this.$refs.ontoShareChild.toShare=true;
						break;
				}
			},
			varRoom(){	// 创建房间
				this.$refs.onvarRoomChild.initType = 0;
				this.$refs.onvarRoomChild.boxState.CvarRoom=true;
				var self = this;
				http.post('/Room/getRoomNumber',
				{
					token: localStorage.oxToken,
				},'',this)
				.then(res => {
					this.$refs.onvarRoomChild.imgState.room_id =  res.data;
				})
				this.$refs.onvarRoomChild.noModal();
			},
			openS(e){
				let Etar = e.target;
				var self=this;
				var Tar = () => {
					var EtarName = Etar.nodeName.toLowerCase();
					if(EtarName == 'li'){
						var nodeValue = Etar.attributes["openState"].nodeValue;

						nodeValue == 'false' ? this.$refs.onOpenChild.onOpenRoom =
						++[[]][+[]]+[+[]] == 10 : 0.1+0.2 ==0.3;

						if(nodeValue == 'true'){
							this.sendId = Etar.attributes["roomid"].nodeValue
							http.post('/Room/getRooms',{
		                        number: this.sendId,
		                    },'',this)
		                    .then(res => {
		                        // console.log(res)
		                        if(res.status == 1) {
		                            http.post('/Room/joinRoom' ,
		                            {
		                                zn_room_id : res.data.id,
		                            }, '' ,this)
		                            .then(res => {
		                                console.log(res)
		                                if( res.status == 3 ){
		                                    router.push({path: `room/${Etar.attributes["roomid"].nodeValue}`});
		                                    // alert('房间号码不存在')
		                                } else if( res.status == 1 ){
		                                    router.push({path: `room/${res.data.zc_number}`});
		                                } else if( res.status == 0 ){
		                                    self.errorTips = '你已在房间内，请退出当前房间';
		                                    self.careTip = true;
		                                }
		                            })

		                        }
		                    })
						}
						return false;
					} else if(EtarName == 'body'){
						return false;
					} else {
						Etar = Etar.parentElement;
						Tar();
					}
				};
				Tar();
			},
			loadMore(){		// 无限加载
				var self = this;
				var VX_data = this.$store.state.data.DT;
				var VX_dataid = this.$store.state.data.DTid;
				var VX_dataidALL = this.$store.state.data.DTidALL;
				var VX_p = this.$store.state.data.DTP;

				var VX_Time = this.$store.state.data.DATE;
				var VX_date = new Date().getTime();

				if(VX_date - VX_Time >= 90000){
					self.$store.state.data.Page = self.$store.state.data.DTP;
					self.newData();
				}


				if(VX_p >=0 && this.spinner == 0 && VX_data.length>self.pagesize){
					self.spinner = 1;
					http.post('/Room/getRoomList',
	                {
	                    pagesize : self.pagesize,
	                    type 	 : self.type,
	                    p 		 : VX_p,
	                }, '',this)
		            .then(res => {
		            	self.spinner == 0;	// 关掉loding
		            	console.log(res)
		            	if(res.status != 1){
		            		return false;
		            	}
		            	for(var i=0; i<VX_data.length; i++){
		            		var id = VX_data[i].id;
		            		if(VX_dataid.indexOf(id) < 0){
		            			VX_dataidALL.push(VX_data[i].id)
		            			VX_dataid.push(VX_data[i].id)
		            			VX_data.push(VX_data[i])
		            		}
		            	}

		            	self.$store.state.data.DT = VX_data;
		            	self.$store.state.data.DTid = VX_dataid;
		            	self.$store.state.data.DTidALL = VX_dataidALL;
		            	self.$store.state.data.DTP++;
		            	
		            });
				}
			},
			newData: function(){	// 用于更新数据
				var self = this;
				var page = this.$store.state.data.Page;
				var psize = page*self.pagesize;
				if(psize<=0){
					return false;
				}

				http.post('/Room/getRoomList',
                {
                    pagesize : psize,
                    type 	 : self.type,
                    p 		 : 1,
                })
	            .then(res => {
	            	if(res.status == 1){
	            		self.$store.state.data.DTid = [];
	            		self.$store.state.data.DTidALL = [];
	            		self.$store.state.data.DT = res.data;

	            		for(var i=0; i<res.data.length; i++){
	            			var id = res.data[i].id;
	            			self.$store.state.data.DTid.push(id)
	            			self.$store.state.data.DTidALL.push(id)
	            		}
	            		self.$store.state.data.DATE = new Date().getTime();
	            		var pp = Math.random(res.data.length/self.pagesize);
	            		self.$store.state.data.DTP = pp;
	            	}
	            })
			},

		}
	}
</script>