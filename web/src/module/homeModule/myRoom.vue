<template>
  <el-dialog
    :visible.sync="myRoom"
    width="74%"
    center custom-class="tabHead">
    <p></p>
    <h3>我的房间</h3>
    <div class="joinCenter">
        <el-tabs type="card" class="tabRoom"  style="height: 200px;">
            <el-tab-pane>
                <span slot="label" class='tabRoomchild'>我开的房间</span>
                <span>3333333333333</span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class='tabRoomchild'>加入的房间</span>
                <p>55555555555</p>
            </el-tab-pane>
        </el-tabs>
    </div>
  </el-dialog>
</template>

<style type="text/css">
    .tabHead .el-tabs__nav{
        border-radius: 30px!important;
        border: 3px solid #000!important;
    }
</style>
<style  lang='scss' scoped>
  // 这里的类名需要用custom-class定义
    
    .tabHead{
        p{height: 180px; width: 100%;}
        h3{
          padding: 0;
          margin: 0;
          width: 908px;
          height: 180px;
          text-align: center;
          font-size: 76px;
          line-height: 140px;
          background: url('../../img/JoinTOP.png') no-repeat;
          position: absolute;
          left: 50%;
          top: 0;
          -webkit-transform: translate(-50%,-10%);
             -moz-transform: translate(-50%,-10%);
              -ms-transform: translate(-50%,-10%);
               -o-transform: translate(-50%,-10%);
                  transform: translate(-50%,-10%);
        }
        .tabRoom{
            .tabRoomchild{
                font-size: 48px;
                height: 60px;
                line-height: 60px;
            }
            .tabRoomchild:hover{
                background: #409EFF;
                color: #fff;
            }
        }

    }
</style>
  
<script>
    import http from '../../utils/httpClient.js';

    export default {
        data() {
        return {
            myRoom: false,
            val: '',
            tabPosition: 'top'
        };
        },
        methods: {

        }
    };
</script>