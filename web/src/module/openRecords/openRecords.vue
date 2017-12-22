<style lang='scss' scoped>
    div.openRecords{
        width: 94%;
        border: 1px solid #000;
        margin: 0 auto;
        border-radius: 30px;
        padding: 30px;
        box-sizing: border-box;
    }
    h3{
        text-align: center;
        font-weight: 200;
        i{
            float: right;
            font-weight: 200;
            font-size: 100px;
            display: inline-block;
            height: 74px;
            line-height: 74px;
        }
    }
    table{
        width: 100%;
        font-size: 32px;
    }
</style>


<script type="text/javascript">
import http from '../../utils/httpClient.js'

    export default {
        template : `
        <div class='openRecords'>
            <h3>开奖记录<i>&times</i></h3>
            <table>
                <thead>
                    <tr>
                        <th>局数</th>
                        <th>点数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(obj, inx) in bureau'>
                        <td>第 {{index[inx-1]}} 局</td>
                        <td v-for='data in obj'>{{data}}</td>
                    </tr>
                </tbody>
            </table>
            <button @click='inverted'></button>
        </div>
        `,
        data: function () {
          return {
            bureau : {
                1 : ['牛二', '牛3', '牛二', '牛二', '牛二'],
                2 : ['牛二', '牛二', '牛4', '牛二', '牛二']
            },
            // unshift
            index : [2, 1]
          }
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

            }
        }
    }
</script>