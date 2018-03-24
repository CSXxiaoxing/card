<template>
    <div>
    <i @click='onprize = false' class='wxx'  v-show='onprize'></i>
    <mt-popup
        v-model="onprize"
        popup-transition="popup-fade"
        class="openRecords" :class = '$store.state.idRoom.cardFn == 5 ? "five":"seven" '>

            <h3 >开奖记录</h3>
            <div class='xsllo'>
            <ul :style='"width:"+1.814815*6+"rem;"'>
                <li  v-for='(obj, inx) in 6'  v-show='$store.state.data.listOver.length-inx>=1'>
                    <table  cellspacing="0">
                    <tr>
                    <th>第 {{$store.state.data.listOver.length-inx}} 局</th>
                    </tr>
                    <tr v-for='(obj, inx) in 6'>

                        <td>
                            999
                            {{oox[obj.data == 99 ? oox['11']: obj.data]}}
                        </td>
                    </tr>
                    </table>
                </li>
            </ul>
            </div>
    </mt-popup>
    <loading v-if='loading'></loading>
    </div>
</template>
<!-- cellspacing="0"// position: sticky; -->
<style lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    td.red{
        color: red;
    }
    td.yellow{
        color: #F2D923;
    }
    .wxx{  // 关闭叉叉
        position: absolute;
        background: $login008 no-repeat;
        right: 0.1rem;
        top: 4.2rem;
        background-size: 0.907407rem 0.972222rem;
        height: 0.972222rem;
        width: 0.907407rem;
        z-index: 8888;
    }
    .openRecords{
        height: 8.8rem;
        width: 9.555556rem;
        background: $friend001 no-repeat;
        background-size: 9.555556rem 8.8rem;
        h3{
            height: 0.87037rem;
            font-size: 0.592593rem;
            line-height: 0.592593rem;
            text-align: center;
            font-weight: 200;
            padding-top: 0.388889rem;
        }
        .xsllo{
            width: 970px;
            position: relative;
            left: 50%;
            transform: translate(-50%,0);
            height: 6.851852rem;
            overflow-x: auto;
            overflow-y: hidden;
            border: 1px solid #8C996D;
        }
        .xsllo::-webkit-scrollbar {
            display: none;
        }
        ul{
            height: 100%;
            display: flex;
            li{
                width: 1.805556rem;
                height: 100%;
                border-right: 1px solid #B4B6B1;
            }
            table{
                height: 100%;
                width: 100%;

                tr{
                    height: 12.5%;
                    background: #fff;
                }
                th{
                    font-size: 0.425926rem;
                    border: 1px solid #A8B0A5;
                    color: #2A8F99;
                    background: #D1E8B2;
                }
                td{
                    border: 1px solid #A8B0A5;
                    font-size: 0.314815rem;
                    color: #537F10;
                }
                tr:nth-of-type(2n-1){
                    background: #EFF6E4;
                }
            }
        }
    }
</style>
 
<script type="text/javascript">
import http from '../../utils/httpClient.js'
import Vue from 'vue';
import loading from '../../components/loading/loading.vue';
import router from '../../router/';
Vue.component('loading', loading)
    export default {
        data: function () {
          return {
            loading: false,     // loading
            onprize : false,    // 对
            cardNum : this.$store.state.idRoom.cardFn,
            bureau : [],
            cardResult : [],
            // unshift
            index : [],
            oox: ['没牛','牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花牛'],
          }
        },
        mounted: function(){
        },
        methods: {
            // 倒序inverted
            inverted : function(){
                function length(o) {
                    var count = 0;
                    for(var i in o){count ++;}
                    return count;
                };
                console.log(length(this.bureau));
            },

        }
    }
</script>