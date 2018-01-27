<template>
	<div id='home'>
		<header>
			<dl>
				<dt @click.capture='mess'>
					<img src="../../img/home_head.png"  alt="" />
				</dt>
				<dd>
					<span @click="loading()">{{name}}</span>
					<span @click="toShare"><i></i>分享</span>
				</dd>
				<dd>
					<span>ID:{{id}}</span>
					<span>
						<i>房卡</i>
						<b>27894</b>
						<i @click='buy'></i>
					</span>
				</dd>
			</dl>
			
			<mt-swipe 
			:show-indicators="false" 
			:prevent = 'true'
			:speed = '600'
			class='homeSwipe auto'>
			  <mt-swipe-item>
			  	<p><i></i><span>公告：健康游戏a</span></p>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<p><i></i><span>公告：请勿赌博。</span></p>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<p><i></i><span>公告：谢谢合作。</span></p>
			  </mt-swipe-item>
			</mt-swipe>

			<span class='homeServer'><router-link to="/chartRoom/0" ><b>客<br>服</b></router-link></span>
		</header>
		<div class='homeMain' id='dataUL'>
			<ul @click='openS' 
			:class='spinner == 1 ? "ul01":""'
			v-infinite-scroll="loadMore"
  			:infinite-scroll-disabled="loading"
  			:infinite-scroll-distance="20">
				<li v-for='(dataRoom) in this.$store.state.data.DT' :key='dataRoom.key' :openState='`${dataRoom.open}`' :roomid = 'dataRoom.roomNumber'>
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
				<li @click='joinRoom'>进入房间</li>
				<li @click='myRoom'>我的房间</li>
			</ul>
		</footer>

		<idMessage ref="onidMessageChild" ></idMessage>
		<buyRoom ref="onbuyRoomChild" ></buyRoom>
		<noOpen  ref="onOpenChild" ></noOpen>
		<joinRoom ref="onjoinRoomChild" ></joinRoom>
		<varRoom ref="onvarRoomChild" ></varRoom>
		<myRoom ref="onmyRoomChild" ></myRoom>
		<toShare ref="ontoShareChild" :share='"home"'></toShare>
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
				datagrid : '',
				id : 0,
				name: '',

				pagesize :30,	// 请求条数
				type :1 ,		// 1 所有房间 2 自己开的房间
				p : 1,			// 当前页

				sendId : 0,
				spinner: 0,		// 懒加载loding
			}
		},
		mounted: function(){		
			var self = this;
			var VX_data = this.$store.state.data;
			var VX_time = new Date().getTime();
			if(localStorage.oxToken && localStorage.oxUid){
				this.$store.dispatch('webIM')
				this.id = localStorage.oxUid
				this.name = localStorage.getItem('oxName')
				// 房间请求
				if(VX_data.DT.length < 1 || (VX_time-VX_data.DTtime) > 6e4){
					http.post('/Room/getRoomList' ,
	                {
	                    pagesize : self.pagesize,
	                    type 	 : self.type,
	                    p 		 : self.$store.state.data.DTpage,
	                }, '' ,this)
	                .then(res => {
	                	if(res.status == 1){
	                	var arr = [];
	                    for(let i in res.data){
	                    	var val = res.data[i];
	                    	arr.push({
	                    		key 	   : val.id,			// key值
	                    		open 	   : val.zn_room_type ==1 ? true : false,// 是否开放
	                    		roomName   : val.zc_title,		// 房间名字
	                    		roomNumber : val.zc_number,		// 房间号码
	                    		number 	   : val.pernumber,		// 房间人数
	                    	})
	                    	self.$store.state.data.DTid.push(val.id)
	                    }
	                    self.$store.state.data.DT = arr;
	                    self.$store.state.data.DTtime = VX_time;
	                    self.$store.state.data.DTpage++;
	                	}
	                })
				}
			} else {
				router.push({name: '/'});	// 跳回登录页
			}
		},
		methods: {
			joinRoom(){
				this.$refs.onjoinRoomChild.joinRoom=true;
			},
			mess(){
				this.$refs.onidMessageChild.idMessage=true;
			},
			buy(){
				this.$refs.onbuyRoomChild.buyRoom=true;
			},
			varRoom(){
				this.$refs.onvarRoomChild.initType = 0;
				this.$refs.onvarRoomChild.boxState.CvarRoom=true;
				var self = this;
				http.post('/Room/getRoomNumber',
				{
					token: localStorage.oxToken,
				})
				.then(res => {
					this.$refs.onvarRoomChild.imgState.room_id =  res.data;
				})
				this.$refs.onvarRoomChild.noModal();
			},
			myRoom(){
				this.$refs.onmyRoomChild.myRoom=true;
			},
			toShare(){
				this.$refs.ontoShareChild.toShare=true;
			},
			openS(e){
				let Etar = e.target;
				var Tar = () => {
					var EtarName = Etar.nodeName.toLowerCase();
					if(EtarName == 'li'){
						var nodeValue = Etar.attributes["openState"].nodeValue;

						nodeValue == 'false' ? this.$refs.onOpenChild.onOpenRoom =
						++[[]][+[]]+[+[]] == 10 : 0.1+0.2 ==0.3;

						if(nodeValue == 'true'){
							this.sendId = Etar.attributes["roomid"].nodeValue
							console.log(Etar.attributes["roomid"].nodeValue)
							http.post('/Room/getRooms',{
		                        number: this.sendId,
		                    })
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
			loading(){
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle',
				});
			},
			loadMore(){		// 无限加载
				var self = this;
				var VX_data = this.$store.state.data;
				var time = new Date().getTime();
				var VX_time = self.$store.state.data.DTtime;
				if((time - VX_time) < 800){
					return false;
				}
				this.spinner = 1;
				if((time - VX_time) > self.$store.state.data.DTtimeos){
				console.log(time)
				console.log(VX_time)
				http.post('/Room/getRoomList' ,	// 房间请求
                {
                    pagesize : self.pagesize,
                    type 	 : self.type,
                    p 		 : self.$store.state.data.DTpage,
                }, '' ,this)
                .then(res => {
                	console.log(res)
                	if(res.status == 1){
                	var arr = [];
                	var dtid = self.$store.state.data.DTid;
                    var DTcount = 0;
                    for(let i in res.data){
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
	                    	DTcount++;
                    	}
                    }
                    if(DTcount <= 6){
                    	self.$store.state.data.DTtimeos = 5000;
                    } else {
                    	self.$store.state.data.DTtimeos = 0;
                    }
                    var arr01 = self.$store.state.data.DT;
                    self.$store.state.data.DT = arr01.concat(arr);
                    self.$store.state.data.DTtime = time;
                    self.$store.state.data.DTpage++
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