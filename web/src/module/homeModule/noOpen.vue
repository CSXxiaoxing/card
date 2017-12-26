<template>
  <el-dialog
    :visible.sync="onOpenRoom"
    width="88%"
    center custom-class="aaa">
    <span>需要注意的是内容是默认不居中的</span>
    <p>这是个测试</p>
    <p>这是个测试</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onOpenRoom = false">取 消</el-button>
      <el-button type="primary" @click="onOpenRoom = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style  lang='scss' scoped>
// 这里的类名需要用custom-class定义
  .aaa{
    font-size: 80px;
    span{color: #26c472; font-size: 50px;}
    p{font-size: 50px;line-height: 50px;}
    button{width: 20%; height: 10%; font-size: 50px;}
  }
</style>

<script>
  export default {
    data() {
      return {
        onOpenRoom: false
      };
    }
  };
</script>