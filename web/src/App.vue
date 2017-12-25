<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/*公共样式*/
body,html {
    height: 100%;
    margin: 0;
    padding: 0;
}
body,h1,h2,h3,h4,p,ul,li,ol,dl,dd,dt{
    margin: 0;
    padding: 0;
}
ul,li{
    list-style: none;
}
a{
    text-decoration: none;
}
.fl{
    float:left;
}
html,body{
    font-style: '微软雅黑';
    font-size: 14px;
    height:100%;
    background: #fff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 48px;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

