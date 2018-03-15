import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from '../components/login/login.vue'
import HomeComponent from '../components/home/home.vue'
import oxCrowd from '../components/home/oxCrowd.vue'

import message from '../components/message/message.vue'
import Room from '../components/room/room.vue'

import Water from '../components/room/waterReport.vue'
import chartRoom from '../components/chart/chartRoom.vue'
import CHAT_QUN from '../components/chart/CHAT_QUN.vue'	// 聊天室
import chartList from '../components/chart/chartList.vue'	// 聊天室成员列表
import chartDelete from '../components/chart/chartDelete.vue'


Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'login',
			component: LoginComponent
		},
		{
			path: '/home',
			name: 'home',
			component: HomeComponent,
		},
		{
			path: '/oxCrowd',
			name: 'oxCrowd',
			component: oxCrowd,
		},
		{
			path: '/room/:id',
			name: 'room',
			component: Room
		},
		{
			path: '/message',
			name: 'message',
			component: message
		},

		{
			path: '/water',
			name: 'water',
			component: Water
		},
		{
			path: '/chartRoom/:id',
			name: 'chartRoom',
			component: chartRoom
		},
		{
			path: '/chartList/:id',
			name: 'chartList',
			component: chartList
		},
		{
			path: '/chartDelete/:msg',
			name: 'chartDelete',
			component: chartDelete
		},

		{
			path: '/CHAT_QUN/:id',
			name: 'CHAT_QUN',
			component: CHAT_QUN
		},

	]
})

export default router