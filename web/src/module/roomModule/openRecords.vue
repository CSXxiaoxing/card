<template>
    <div>
    <mt-popup
        v-model="onprize"
        popup-transition="popup-fade"
        class="openRecords" :class = '$store.state.idRoom.cardFn == 5 ? "five":"seven" '>

            <h3>开奖记录<i @click='onprize = false'></i></h3>
            
            <table  cellspacing="0" class='bel1'>
                <thead>
                    <tr>
                        <th>局数</th>
                        <th>点数</th>
                    </tr>
                </thead>
            </table>
            <div class='roll'>
            <table  cellspacing="0" class='bel2'>
                <tbody>
                    <tr v-for='(obj, inx) in bureau'>
                        <td>第 {{index[inx]}} 局</td>
                        <td v-for='data in obj'>{{data}}</td>
                    </tr>
                </tbody>
            </table>
            </div>
    </mt-popup>
    <loading v-if='loading'></loading>
    </div>
</template>
<!-- cellspacing="0"// position: sticky; -->
<style lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    // flex

    .openRecords.five{
        width: 9.555556rem;
        max-height: 15.277778rem;
         @include border-radius(0.314815rem);
        padding: 0 0.388889rem;
        @include box-sizing();
        overflow-y: hidden;
        h3{
            height: 0.87037rem;
            font-size: 0.592593rem;
            line-height: 0.592593rem;
            text-align: center;
            font-weight: 200;
            padding-top: 0.388889rem;
            i{
                float: right;
                font-weight: 200;
                font-size: 0.925926rem;
                display: inline-block;
                background: $homeAll -0.925926rem -2.314815rem no-repeat;
                background-size: 5.555556rem 5.555556rem;
                height: 0.527778rem;
                width: 0.527778rem;
            }
        }
        .roll{
            width: 100%;
            overflow-y: auto;
            // overflow-x: hidden;
            max-height: 13.0rem;
            // overflow: auto;
            position: relative;
            // padding-bottom: 20px;
        }
        .roll::-webkit-scrollbar {
            display: none;
        } 
        table{
            border: 0.009259rem solid #829369;
            width: 100%;
            font-size: 0.296296rem;
            th{
                border: 0.009259rem solid #AAB19F;
                background: #D0E7B1;
                font-size: 0.425926rem;
                color: #46592C;
                font-weight: 500;
                height: 0.759259rem;
            }
            tr {
                td{
                    border: 0.009259rem solid #AAB19F;
                    height: 0.759259rem;
                    font-size: 0.296296rem;
                    font-weight: 700;
                }
                td:first-child{
                    font-size: 0.37037rem;
                    font-weight: 400;
                    color: #298B98;
                    white-space: nowrap;
                }
                td.self {
                    color: #D35403;
                }
            }
            tr:nth-of-type(2n) {
                background: #EFF8E3;
            } 
        }
        table.bel1{
            border-bottom: 0 none;
            th:nth-of-type(1){
            width: 2.648148rem;
                
            }
        }
        table.bel2{
            border-top: 0 none;
            tr:nth-of-type(1){
                width: 2.648148rem;
                margin-top: -0.009259rem;
                td{
                    border-top: 0 none;
                }
            }
        }
    }
    .openRecords.seven{
        width: 9.555556rem;
        max-height: 15.277778rem;
         @include border-radius(0.314815rem);
        padding: 0 0.388889rem;
        @include box-sizing();
        overflow-y: hidden;
        h3{
            height: 0.87037rem;
            font-size: 0.592593rem;
            line-height: 0.592593rem;
            text-align: center;
            font-weight: 200;
            padding-top: 0.388889rem;
            i{
                float: right;
                font-weight: 200;
                font-size: 0.925926rem;
                display: inline-block;
                background: $homeAll -0.925926rem -2.314815rem no-repeat;
                background-size: 5.555556rem 5.555556rem;
                height: 0.527778rem;
                width: 0.527778rem;
            }
        }
        .roll{
            width: 100%;
            overflow-y: auto;
            // overflow-x: hidden;
            max-height: 14.0rem;
            // overflow: auto;
            position: relative;
        }
        .roll::-webkit-scrollbar {
            display: none;
        } 
        table{
            border: 0.009259rem solid #829369;
            width: 100%;
            font-size: 0.296296rem;
            th{
                border: 0.009259rem solid #AAB19F;
                background: #D0E7B1;
                font-size: 0.425926rem;
                color: #46592C;
                font-weight: 500;
                height: 0.759259rem;
            }
            tr {
                td{
                    border: 0.009259rem solid #AAB19F;
                    height: 0.759259rem;
                    font-size: 0.296296rem;
                    font-weight: 700;
                }
                td:first-child{
                    font-size: 0.37037rem;
                    font-weight: 400;
                    color: #298B98;
                    white-space: nowrap;
                }
                td.self {
                    color: #D35403;
                }
            }
            tr:nth-of-type(2n) {
                background: #EFF8E3;
            } 
        }
        table.bel1{
            border-bottom: 0 none;
            th:nth-of-type(1){
                width: 2.648148rem;
            }
        }
        table.bel2{
            border-top: 0 none;
            tr:nth-of-type(1){
                width: 2.648148rem;
                margin-top: -0.009259rem;
                td{
                    border-top: 0 none;
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
            onprize : false,
            bureau : {
                1 : ['牛二', '牛3', '牛二', '牛二', '牛二'],
                2 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                3 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                4 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                5 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                6 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                7 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                8 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                9 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                10 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                11 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                12 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                13 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                14 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                15 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                16 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                17 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                18 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
                19 : ['牛二', '牛二', '牛4', '牛二', '牛二'],
            },
            index : [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2, 1]
          }
        },
        mounted: function(){
            console.log(this.$store.state.data.listOver)
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