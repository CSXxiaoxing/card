<!-- 加减小组件使用方式：
在使用页引入文件，在script写入以下代码：
Vue.component('自定义组件名称', 引入时定义的变量名) -->
<style lang='scss' scoped>
    #addButtion{
        width-min: 200px;
        // overflow: hidden;
        button{
            // height: 60px;
            // width: 60px;
            // float: left;
            font-size: 0px;
        }
        input {
            width: 242px;
            height: 68px;
            background: #E3E3E3;
            font-size: 32px;
            line-height: 68px;
            padding: 4px 4px;
            border-radius: 10px;
            box-sizing: border-box;
            float: left;
            margin: 0;
            border: 0 none;
            text-align: center;
        }
    }
</style>


<script type="text/javascript">
    // import './addButtion.scss';
    
    export default {
        template : `
        <div id='addButtion' @click='addButtion'>
            <button key='1'>+</button>
            <input type="text"  disabled :value='number'/>
            <button key='2'>-</button>
        </div>
        `,
        data: function () {
          return {
            number: 10
          }
        },
        methods: {
            addButtion : function(e){
                    if(e.target.nodeName.toLowerCase() === 'button'){
                        e.target.innerHTML == '+' ? this._data.number++ : 
                        this._data.number > 0 ? this._data.number-- : false;
                    }
                }
        }
    }
</script>
