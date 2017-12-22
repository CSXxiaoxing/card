<!-- 加减小组件使用方式：
在使用页引入文件，在script写入以下代码：
Vue.component('自定义组件名称', 引入时定义的变量名) -->
<style lang='scss' scoped>
    #addButtion{
        width-min: 200px;
        overflow: hidden;
        button{
            height: 60px;
            width: 60px;
            float: left;
            font-size: 50px;
        }
        input{
            width: 100px;
            height: 60px;
            margin: 0;
            font-size: 40px;
            float: left;
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
            number: '30'
          }
        },
        methods: {
            addButtion : function(e){
                    if(e.target.nodeName.toLowerCase() === 'button'){
                        if(e.target.innerHTML == '+'){
                            this._data.number++
                        }else{
                            this._data.number--
                        }
                    }
                }
        }
    }
</script>
