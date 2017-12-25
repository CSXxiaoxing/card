<template>
<div>
<el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>

<el-dialog
  :visible.sync="centerDialogVisible"
  width="88%"
  center custom-class="aaa">
  <span>需要注意的是内容是默认不居中的</span>
  <p>这是个测试</p>
  <p>这是个测试</p>
  <p>这是个测试</p>
  <p>这是个测试</p>
  <p>这是个测试</p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<style  lang='scss' scoped>
  .aaa{
    font-size: 80px;
    span{color: #26c472;}
    p{font-size: 50px;line-height: 50px;}
  }

</style>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false
      };
    }
  };
</script>