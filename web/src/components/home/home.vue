<template>
	<div id='home'>
		<header>
			<dl>
				<dt @click.capture='mess'>
					<img src="../../img/home_head.png" alt="" />
				</dt>
				<dd>
					<span>迷迷糊糊</span>
					<span><i></i>分享</span>
				</dd>
				<dd>
					<span>ID:777777</span>
					<span>
						<i>房卡</i>
						<b>27894</b>
						<i @click='buy'></i>
					</span>
				</dd>
				<dd></dd>
			</dl>
			<p><i></i><span>公告：健康游戏，请勿赌博，谢谢合作。</span></p>
			<span class='homeServer'><b>客<br>服</b> </span>
		</header>
		<div class='homeMain'>
			<ul @click='openS'>
				<li v-for='(dataRoom) in datagrid' :key='dataRoom.key' :openState='dataRoom.open'>
					<b v-if='dataRoom.open == "true"'></b>
					<i></i>
					<h4>大战牛群</h4>
					<div>
						<h5>{{dataRoom.roomName}}</h5>
						<p>
							<span v-show='dataRoom.open == "false"'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
							<span v-show='dataRoom.open == "true"'><strong class="roomNum">{{dataRoom.number}}</strong>人</span>
							<span v-if='dataRoom.open == "true"' id="roomNumber">房号：{{dataRoom.roomNumber}}</span>
						</p>
						<div></div>
					</div>
				</li>
			</ul>
		</div>

		<footer>
			<ul>
				<li>好友</li>
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
		<!-- <myRoom ref="onmyRoomChild" ></myRoom> -->
	</div>
</template>

<style type="text/css">
	.el-dialog__header{
		display: none;
	}
</style>

<script type="text/javascript">
	import './home.scss';
	import Vue from 'vue';
	import http from '../../utils/httpClient.js';
	// 组件
	import noOpen from '../../module/homeModule/noOpen.vue';
	import joinRoom from '../../module/homeModule/joinRoom.vue';
	import idMessage from '../../module/homeModule/idMessage.vue';
	import buyRoom from '../../module/homeModule/buyRoom.vue';
	import setRoom from '../../module/homeModule/varRoom.vue';
	// import myRoom from '../../module/homeModule/myRoom.vue';
	// Vue.component('myRoom', myRoom)
	Vue.component('noOpen', noOpen)
	Vue.component('joinRoom', joinRoom)
	Vue.component('idMessage', idMessage)
	Vue.component('buyRoom', buyRoom)
	Vue.component('varRoom', setRoom)

	
	export default {
		data: function(){
			return {
				datagrid : '',
			}
		},
		mounted: function(){
			var self = this;
			http.post({
		        url: 'sel',vm:this
		    }).then(res => {
	            self.datagrid = res.data;
	            console.log(res.data)
	        })
		},
		methods: {
			joinRoom(){
				this.$refs.onjoinRoomChild._data.joinRoom=true;
			},
			mess(){
				console.log(this.$refs)
				this.$refs.onidMessageChild._data.idMessage=true;
			},
			buy(){
				this.$refs.onbuyRoomChild._data.buyRoom=true;
			},
			varRoom(){
				this.$refs.onvarRoomChild._data.boxState.CvarRoom=true;
			},
			myRoom(){
				this.$refs.onmyRoomChild._data.myRoom=true;
			},
			openS(e){
				let Etar = e.target;
				var Tar = () => {
					var EtarName = Etar.nodeName.toLowerCase();
					if(EtarName == 'li'){
						console.log(this.$refs)
						Etar.attributes["openState"].nodeValue == 'false' ? 
						this.$refs.onOpenChild._data.onOpenRoom=true : false;
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
			generateToolBar: function(obj){
				//动态生成按钮
				
			},
		}
	}
</script>