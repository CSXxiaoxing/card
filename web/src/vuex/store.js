import Vue from 'vue';
import Vuex from 'vuex';

import bad from './badDict.js';

Vue.use(Vuex);

export default new Vuex.Store({
   // 字符串数据存储
   // 使用demo : this.$store.state.initRoom
   state: {
        name:666,
        // 用户信息
        self: {
            userName: '',
            userID: '',
            userImg: '',
        },
        // 默认数据
        initRoom: {
            ox: ['牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花牛'],
            radioValue: ['比J', '比Q', '比K', '无牛关机 (庄赢)'],
            oxK: '比Q',
            time: [30, 60, 120, 180, 300, 480],
            miss: ['秒', '分钟'],
            oxNumber: [1, 1, 1, 1, 1, 1, 2, 2, 3, 5, 10],
            // 一个中文两个字节
            nameLenth: 16,
            // 最低上分数
            minG: 500,
        },
        badDict: bad,
      // 牛？倍数
      

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


