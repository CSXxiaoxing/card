<template>
    <mt-popup
        v-model="onprize"
        popup-transition="popup-fade"
        class="openRecords">

            <h3>开奖记录<i @click='onprize = false'></i></h3>
            
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
                    <tr v-for='(obj, inx) in bureau'>
                        <td>第 {{index[inx]}} 局</td>
                        <td v-for='data in obj'>{{data}}</td>
                    </tr>
                </tbody>
            </table>
            </div>

            <!-- <button @click='inverted'></button> -->

    </mt-popup>
</template>
<!-- cellspacing="0" -->
<style lang='scss' scoped>
     // position: sticky;
    .openRecords{
        width: 1032px;
        max-height: 1650px;
        border-radius: 34px;
        padding: 0px 42px;
        box-sizing: border-box;
        overflow-y: hidden;
        h3{
            height: 94px;
            font-size: 64px;
            line-height: 64px;
            text-align: center;
            font-weight: 200;
            padding-top: 42px;
            i{
                float: right;
                font-weight: 200;
                font-size: 100px;
                display: inline-block;
                background: url('../../img/home_all.png') -100px -250px no-repeat;
                background-size: 600px 600px;
                height: 57px;
                width: 57px;
            }
        }
        .roll{
            width: 100%;
            overflow-y: auto;
            // overflow-x: hidden;
            max-height: 1512px;
            // overflow: auto;
            position: relative;
        }
        .roll::-webkit-scrollbar {
            display: none;
        } 
        table{
            border: 1px solid #829369;
            width: 100%;
            font-size: 32px;
            th{
                border: 1px solid #AAB19F;
                background: #D0E7B1;
                font-size: 46px;
                color: #46592C;
                font-weight: 500;
                height: 82px;
            }
            tr {
                td{
                    border: 1px solid #AAB19F;
                    height: 82px;
                    font-size: 32px;
                    font-weight: 700;
                }
                td:first-child{
                    font-size: 40px;
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
                margin-top: -1px;
                td{
                    border-top: 0 none;
                }
            }
        }
    }
</style>
 
<script type="text/javascript">
import http from '../../utils/httpClient.js'

    export default {
        data: function () {
          return {
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
            // unshift
            index : [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2, 1]
          }
        },
        props: ['prizeNum'],
        methods: {
            // 倒序inverted
            inverted : function(){
                function length(o) {
                    var count = 0;
                    for(var i in o){count ++;}
                    return count;
                };
                console.log(length(this.bureau));
            }
        }
    }
</script>