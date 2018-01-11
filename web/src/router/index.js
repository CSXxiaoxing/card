import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from '../components/login/login.vue'
import HomeComponent from '../components/home/home.vue'

import GoodsListComponent from '../components/goodslist/goodslist.vue'
import message from '../components/message/message.vue'
import Room from '../components/room/room.vue'
import friend from '../components/friend/friend.vue'
import Water from '../components/room/waterReport.vue'
import chartRoom from '../components/chart/chartRoom.vue'
import chartList from '../components/chart/chartList.vue'
import chartDelete from '../components/chart/chartDelete.vue'

Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{
			path: '/home',
			name: 'home',
			component: HomeComponent,
			children: [{
				path: 'goodslist',
				name: 'goodslist',
				component: GoodsListComponent
			}]
		},
		{
			path: '/',
			name: 'login',
			component: LoginComponent
		},
		{
			path: '/room',
			name: 'room',
			component: Room
		},
		{
			path: '/message',
			name: 'message',
			component: message
		},
		{
			path: '/friend',
			name: 'friend',
			component: friend
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
			path: '/chartDelete',
			name: 'chartDelete',
			component: chartDelete
		},
	]
})

export default router