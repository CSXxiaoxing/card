<template>
	<div id='oxCrowd'> 
	<iframe :src="iframe" frameborder="0" :id='iframeCss'></iframe>
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
				<a>客服</a>
			</span>
		</header>

		<div class='homeMain' id='dataUL'>
			<ul @click='openS' 
			:class='spinner == 1 ? "ul01":""'
			v-infinite-scroll="loadMore"
  			:infinite-scroll-distance="20">
				<li v-for='(dataRoom) in $store.state.data.DT' :key='"ox"+dataRoom.key' :openState='`${dataRoom.open}`' :roomid = 'dataRoom.roomNumber'>
					<b v-if='dataRoom.open'></b>
					<i></i>
					<h4>大战牛群</h4>
					<div>
						<h5>{{dataRoom.roomName}}</h5>
						<p>
							<span v-show='dataRoom.open == "false"'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
							<span v-show='dataRoom.open'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
							<span v-show='dataRoom.open' id="roomNumber">房号：{{dataRoom.roomNumber}}</span>
						</p>
						<div></div>
					</div>
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

				id : 0,
				name: '',
				pagesize :15,	// 请求条数
				type :1 ,		// 1 所有房间 2 自己开的房间
				p : 1,			// 当前页
				sendId : 0,
				spinner: 0,		// 懒加载loding
				notice : [],
				cardNum : this.$store.state.initRoom.cardNum,
			}
		},
		mounted: function(){	
			// 客服
			window.easemobim = window.easemobim || {};
            easemobim.config = {
                // hide: true,
                // autoConnect: true    
            };
			// easemobim
			var self = this;
			
			var VX_data = this.$store.state.data;
			var VX_time = new Date().getTime();
			if(localStorage.oxToken && localStorage.oxUid){
				this.$store.dispatch('webIM')
				this.id = localStorage.oxUid
				this.name = localStorage.getItem('oxName')
				// 房间请求
				if(VX_data.DT.length < 1 || (VX_time-VX_data.DTtime) > 6e1){

					http.post('/Room/getRoomList' ,
	                {
	                    pagesize : self.pagesize,
	                    type 	 : self.type,
	                    p 		 : self.$store.state.data.DTpage,
	                }, '',this)
	                .then(res => {
	                	// console.log(res)
	                	if(res.status == 1){
	                	var arr = [];
	                	var dtid = self.$store.state.data.DTid;
	                    for(var i = 0 ; i < res.data.length ; i++){
	                    	var val = res.data[i];
	                    	if(dtid.indexOf(val.id) < 0){	// id识别是否重复
		                    	arr.push({
		                    		key 	   : val.id,			// key值
		                    		open 	   : val.zn_room_type ==1 ? true : false,// 是否开放
		                    		roomName   : val.zc_title,		// 房间名字
		                    		roomNumber : val.zc_number,		// 房间号码
		                    		number 	   : val.pernumber,		// 房间人数
		                    	})
	                    		self.$store.state.data.DTid.push(val.id)
	                    	}
	                    }
	                    if(self.$store.state.data.DT.length > 0){
	                    	var arr01 = self.$store.state.data.DT;
	                    	self.$store.state.data.DT = arr01.concat(arr);
	                    }else {
	                    	self.$store.state.data.DT = arr;
	                    }

	                    self.$store.state.data.DTtime = VX_time;
	                	} else {
	                		self.errorTips = res.msg;
	                		self.careTip = true;
	                	}
	                });

	                http.post('/MemberNotice/getAnnouncement',{
	                    id : self.id
	                }, '' ,this)
	                .then(res => {
	                	if(res.status == 1){
	                		console.log(res);
	                		self.notice = [];
	                		for(let i in res.data){
	                			self.notice.push({
	                				content : res.data[i].zc_content,
	                			})
	                		}
	                		console.log(self.notice);
	                	}
	                })
				}
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