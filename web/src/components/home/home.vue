<template>
	<div id='home'>
		<header>
			<dl>
				<dt><img src="../../img/home_head.png" alt="" /></dt>
				<dd>
					<span>迷迷糊糊</span>
					<span><i></i>分享</span>
				</dd>
				<dd>
					<span>ID:777777</span>
					<span><i>房卡</i><b>27894</b><i></i></span>
				</dd>
				<dd></dd>
			</dl>
			<p><i></i><span>公告：健康游戏，请勿赌博，谢谢合作。</span></p>
			<span class='homeServer'></span>
		</header>
		<div class='homeMain'>
			<ul>
				<li v-for='(dataRoom, idx) in datagrid'>
					<i></i>
					<h4>大战牛群</h4>
					<div>
						<h5>{{dataRoom.roomName}}</h5>
						<p>
							<span v-show='dataRoom.open == "false"'>{{dataRoom.number}}人</span>
							<span v-show='dataRoom.open == "true"'>{{dataRoom.number}}人</span>
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
				<li>创建房间</li>
				<li>进入房间</li>
				<li>我的房间</li>
			</ul>
		</footer>
		<!-- <addButton></addButton> -->
		<!-- <aaa></aaa> -->
	</div>
</template>

<script type="text/javascript">
	import './home.scss';
	import Vue from 'vue';
	import http from '../../utils/httpClient.js';

	import addButton from '../../module/addButton/addButtion.vue';
	import openRecords from '../../module/openRecords/openRecords.vue';
	
	Vue.component('addButton', addButton)
	Vue.component('aaa', openRecords)
	
	export default {
		data: function(){
			return {
				datagrid : '',

			}
		},
		mounted: function(){
			var self = this;
			http.post({
			            url: 'sel'
			        ,vm:this}).then(res => {
			            self.datagrid = res.data;
			            console.log(res.data)
			        })
		},
		methods: {
			
			generateToolBar: function(obj){
				//动态生成按钮
				
			},

		}
	}
</script>