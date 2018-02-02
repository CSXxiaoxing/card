<template>
	<div id="water">
		<mt-popup 
		    v-model="careTip"
		    popup-transition="popup-fade" :modal='false'
		    class="care" >
		    <span>通知 <i @click="careTip = false">×</i></span>
		    <p>该房间尚未公开</p>
		    <mt-button @click="careTip = false">  确定
		    </mt-button>
		</mt-popup >
		<header>
            <ul>
                <li>
                    <i><router-link :to='"/room/"+$store.state.idRoom.room_id'></router-link></i>
                </li>
                <li>流水报表</li>
            </ul>
        </header>
		<table border="1" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<td colspan="4">第三局</td>
				</tr>
				<tr>
					<td>昵称</td> <td>分数流水</td> <td>抽水分数</td> <td>结余分数</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>迷糊的诗诗 <img src="../../img/room_water1.png"></td> <td>+100</td> <td>10</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr  v-if="seen">
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr class="total"  v-if="seen">
					<td>房间余剩分数</td> <td colspan="3">+20</td>
				</tr>
				<tr class="open" v-if="!seen">
					<td colspan="4" @click="more">点击加载更多</td>
				</tr>
				
			</tbody>
		</table>

		<table border="1" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<td colspan="4">第三局</td>
				</tr>
				<tr>
					<td>昵称</td> <td>分数流水</td> <td>抽水分数</td> <td>结余分数</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>迷糊的诗诗 <img src="../../img/room_water1.png"></td> <td>+100</td> <td>10</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr  v-if="seen">
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr class="total"  v-if="seen">
					<td>房间余剩分数</td> <td colspan="3">+20</td>
				</tr>
				<tr class="open" v-if="!seen">
					<td colspan="4" @click="more">点击加载更多</td>
				</tr>
				
			</tbody>
		</table>

		<table border="1" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<td colspan="4">第三局</td>
				</tr>
				<tr>
					<td>昵称</td> <td>分数流水</td> <td>抽水分数</td> <td>结余分数</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>迷糊的诗诗 <img src="../../img/room_water1.png"></td> <td>+100</td> <td>10</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>-20</td> <td>0</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr>
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr  v-if="seen">
					<td>迷糊的诗诗</td> <td>+20</td> <td>10</td> <td>10</td>
				</tr>
				<tr class="total"  v-if="seen">
					<td>房间余剩分数</td> <td colspan="3">+20</td>
				</tr>
				<tr class="open" v-if="!seen">
					<td colspan="4" @click="more">点击加载更多</td>
				</tr>
				
			</tbody>
		</table>
		<loading v-if='loading'></loading>
	</div>
</template>




<script type="text/javascript">
	import Vue from 'vue';
	import './water.scss';
	import loading from '../loading/loading.vue';
	Vue.component('loading', loading)

  	export default {
    data() {
      	return {
      		loading: false,		// loading
        	water: false,
        	seen:false,
        	careTip : false,
      	};
    },
    methods:{
    	more(){
    		this.seen =!this.seen;
    	}
  	}
	};
</script>