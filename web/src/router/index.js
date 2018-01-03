import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from '../components/login/login.vue'
import HomeComponent from '../components/home/home.vue'

import GoodsListComponent from '../components/goodslist/goodslist.vue'
import GoodsFormComponent from '../components/goodsform/goodsform.vue'
import Room from '../components/room/room.vue'


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
			},{
				path: 'goodsform',
				name: 'goodsform',
				component: GoodsFormComponent
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
	]
})

export default router