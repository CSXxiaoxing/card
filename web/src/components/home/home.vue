<template>
	<div id='home'> 
	<iframe :src="iframe" frameborder="0" :id='iframeCss'></iframe>
	<audio src="src/Music/du001.mp3" autoplay v-if='$store.state.Music.autoplay' loop></audio>
		<mt-popup 
	        v-model="careTip"
	        popup-transition="popup-fade"
	        class="care" >
	        <span>通知 <i @click="careTip = false"></i></span>
	        <p>{{errorTips}}</p>
	        <mt-button @click="careTip = false">  确定
	        </mt-button>
      	</mt-popup>

		<header>
			<dl>
				<dt @click.capture='child_KA(2)'>
					<img :src="$store.state.user.userImg" />
				</dt>
				<dd>
					<span>{{$store.state.user.userName}}</span>
					<span @click="child_KA(5)">
						<i></i>
						<b
						:class='$store.state.Music.autoplay ? "huan":"bai"' 
						@click.stop="$store.state.Music.autoplay=!$store.state.Music.autoplay"  ></b>
						分享
					</span>
				</dd>
				<dd>
					<span>ID:{{$store.state.user.userID}}</span>
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
			  	<mt-swipe-item v-for='notices in notice'>
			  		<span>{{notices}}</span>
			  	</mt-swipe-item>
			</mt-swipe>
			</p>

			<span class='homeServer' @click='kefu()'>
			</span>
		</header>

		<div class='homeMain' id='dataUL'>
			<ul>
				<li>
					<router-link to="/oxCrowd">
					<img src="../../image/homeA01.png" alt="" />
					</router-link>
				</li>
				<li><img src="../../image/homeA02.png" alt="" /></li>
				<li><img src="../../image/homeA03.png" alt="" /></li>
			</ul>
		</div>

		<footer> 
			<ul>
				<li @click='$refs.onfriendVIPChild.friend_VIP=true'>
					好友<span class='dot'>999</span>
				</li>
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
		<friendVIP ref="onfriendVIPChild"></friendVIP>
		
		<loading v-if='loading'></loading>
	</div>
</template>

<script type="text/javascript">
	import './home.scss';
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
	import friendVIP from '../friend/friend.vue'; // 原好友
	Vue.component('friendVIP', friendVIP)
	
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
			document.addEventListener("plusready", function() {
		        // 注册返回按键事件
		        plus.key.addEventListener('backbutton', function() {
		            // 事件处理
		            window.history.back();
		        }, false);
		    });	

			goEasy.subscribe({
			    channel: 'room_' + localStorage.oxUid,
			    onMessage: function(message){
			        // console.log('接收到消息:'+message.content)
			        //拿到了信息之后，你可以做你任何想做的事
			        console.log(message)
			    }

			});

			var self = this;
			var self = this;
			var VX_data = this.$store.state.data.DT;
			var VX_dataid = this.$store.state.data.DTid;
			var VX_dataidALL = this.$store.state.data.DTidALL;

			if(localStorage.oxToken && localStorage.oxUid){
				
				if(VX_data.length > 0){	// 百人牛牛
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
                		console.log(res.data)
                		if(res.data[0] == undefined){
                			self.notice.push('文明游戏，请勿赌博！')
                		}
                		for(let i in res.data){
                			self.notice.push(res.data[i].zc_content)
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
				var VX_data = this.$store.state.data;
				var time = new Date().getTime();
				var VX_time = self.$store.state.data.DTtime;
				if((time - VX_time) < 800 || VX_data.DT.length < 15){
					return false;
				}
				this.spinner = 1;
				if((time - VX_time) > self.$store.state.data.DTtimeos){
				http.post('/Room/getRoomList' ,	// 房间请求
                {
                    pagesize : self.pagesize,
                    type 	 : self.type,
                    p 		 : self.$store.state.data.DTpage,
                }, '')
                .then(res => {
                	if(res.status == 1){
                	var arr = [];
                	var dtid = self.$store.state.data.DTid;
                	var arrlength = res.data.length;
                    var DTcount = 0;
                    var weiyi = 0;
                    for(let i in res.data){
                    	var val = res.data[i];
                    	if(dtid.indexOf(val.id) < 0){	// id识别是否重复
                    		weiyi++;
	                    	arr.push({
	                    		key 	   : val.id,			// key值
	                    		open 	   : val.zn_room_type ==1 ? true : false,// 是否开放
	                    		roomName   : val.zc_title,		// 房间名字
	                    		roomNumber : val.zc_number,		// 房间号码
	                    		number 	   : val.pernumber,		// 房间人数
	                    	})
	                    	self.$store.state.data.DTid.push(val.id)
                    	} else {
                    		DTcount++;
                    	}
                    }
                    if(DTcount >= arrlength-1){
                    	self.$store.state.data.DTtimeos = 5000;
                    	self.$store.state.data.DTpage++;
                    } else {
                    	self.$store.state.data.DTtimeos = 0;
                    }
                    var arr01 = self.$store.state.data.DT;
                    self.$store.state.data.DT = arr01.concat(arr);
                    self.$store.state.data.DTtime = time;
                	}
                    self.spinner = 0;
                })} else {
					var atime = setTimeout(() => {
					    self.spinner = 0;
					    clearTimeout(atime)
					  }, 2500);
				}
			}
		}
	}
</script>