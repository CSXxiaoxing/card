<template>
    <div>
    <mt-popup
        v-model="onprize"
        popup-transition="popup-fade"
        class="openRecords" :class = 'cardNum == 0 ? "five":"seven" '>

            <h3 >开奖记录<i @click='onprize = false'></i></h3>
            
            <table  cellspacing="0" class='bel1'>
                <thead>
                    <tr>
                        <th colspan="">局数</th>
                        <th :colspan="prizeNum">点数</th>
                    </tr>
                </thead>
            </table>
            <div class='roll'>
            <table  cellspacing="0" class='bel2'>
                <tbody>
                    <tr v-for='(obj, inx) in $store.state.data.listOver'>
                        <td>第 {{$store.state.data.listOver.length-inx}} 局</td>
                        <td :class='(num)==obj.zzz ?"red":""'
                            v-for='(data,num) in obj.ox'
                            v-if="$store.state.idRoom.cardFn == 5 ? num != 2 && num != 6 && num!=7 : true && num!=7 " 
                            >{{oox[data == 99 ? '11':data]}}</td>
                    </tr>
                </tbody>
            </table>
            </div>
    </mt-popup>
    <loading v-if='loading'></loading>
    </div>
</template>
<!-- cellspacing="0" -->
<style lang='scss' scoped>
     // position: sticky;
     @import '../../utils/baseVar.scss';
     td.red{
        color:red;
     }
     td.yellow{
        color:#F2D923;
     }
    .openRecords.five{
        height:11.296296rem;
        width: 9.555556rem;
        max-height: 15.277778rem;
        border-radius: 0.314815rem;
        padding: 0 0.388889rem;
        box-sizing: border-box;
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
        }
        table.bel2{
            border-top: 0 none;
            tr:nth-of-type(1){
                margin-top: -0.009259rem;
                td{
                    border-top: 0 none;
                }
            }
        }
    }

    .openRecords.seven{
        height:11.296296rem;
        width: 9.555556rem;
        max-height: 15.277778rem;
        border-radius: 0.314815rem;
        padding: 0 0.388889rem;
        box-sizing: border-box;
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
        }
        table.bel2{
            border-top: 0 none;
            tr:nth-of-type(1){
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
            cardNum : this.$store.state.idRoom.cardFn,
            bureau : [],
            cardResult : [],
            // unshift
            index : [],
            oox: ['没牛','牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花牛'],
          }
        },
        props: ['prizeNum'],
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