import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './index.css'
import App from './App.vue'

import router from './router/';

// import VueSocketio from "vue-socket.io"
// import $ from 'jquery'

// Vue.use(VueSocketio, 'http://localhost:5566');  
Vue.use(Vuex);
Vue.use(ElementUI);

const store = new Vuex.Store({
   // 字符串数据存储
   // 使用demo : this.$store.state.name
   state: {
      name:666
   },
   // 属性计算
   // 使用demo ：this.$store.getters.doneTodos
   getters: {
      doneTodos: state => {
         return state.todos.filter(todo => todo.done)
      }
   },
   // 方法，mutations必须同步执行
   // 使用demo : this.$store.commit('increment')
   mutations: {
      increment (state) {
         // 变更状态
         // state.name++
         for(var i=0; i<2000; i++){
            console.log(888)
         }
      }
   },
   // 这里的方法可异步执行
   // 使用demo : this.$store.dispatch('aaa')
   actions: {
      increment ( { commit } ) {
         setTimeout(() => {
               // commit('increment')
               console.log('异步成功')
             }, 1000)
      },
      aaa () {
         console.log('test123')
      }
   },
   // module看文档，数据繁杂时使用。
})

new Vue({
   el: '#app',
   store,
   router,
   render: h => h(App)
})
