<template>
	<div>
		<addButton></addButton>
		<aaa></aaa>
	</div>
</template>

<script type="text/javascript">
	import './home.scss';
	import Vue from 'vue';
	import addButton from '../../module/addButton/addButtion.vue';
	import openRecords from '../../module/openRecords/openRecords.vue';
	
	Vue.component('addButton', addButton)
	Vue.component('aaa', openRecords)
	
	export default {
		methods: {
			generateToolBar: function(obj){
				//动态生成按钮
			},

		}
	}
</script>