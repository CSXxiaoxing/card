<template>
    <div class='chartList'>

        <mt-popup 
          v-model="putRoom"
          popup-transition="popup-fade" 
          class="tip" >
          <span>退出房间</span>
          <p>退出房间分数将会清零，你是否要退出房间？</p>
          <mt-button @click="putRoom = false">  确定
          </mt-button>
          <mt-button @click="putRoom = false">  取消
          </mt-button>
        </mt-popup >

        <mt-popup 
          v-model="dissolveRoom"
          popup-transition="popup-fade" 
          class="diss" >
          <span>解散房间</span>
          <p>房间玩家分数未清零你是否确定要解散房间？</p>
          <mt-button @click="dissolveRoom = false">  确定
          </mt-button>
          <mt-button @click="dissolveRoom = false">  取消
          </mt-button>
        </mt-popup >

    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>房间成员</li>
                <li>➕添加</li>
            </ul>
        </header>
        <div class='list'>
            <ul>
            	<li>
            		<img src="../../img/chart_Room2.png" alt="">
            		<b>迷糊的大土</b>
                    <span v-show = 'a == 0'><img src="../../img/chart_List1.png" alt="">加友</span>
            	</li>
            	<li class="clear"></li>
            	<li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List4.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
            </ul>
            
        </div>
        <footer>
            <mt-button v-show = 'a == 1' type="primary"  @click="dissolveRoom = true">
                    解散房间
            </mt-button>
            <mt-button v-show = 'a == 1' type="primary"  @click="idMessage = false">
                    删除房间
            </mt-button>
        	<mt-button v-show = 'a == 0' type="primary"  @click="putRoom = true">
                    退出房间
                </mt-button>
        </footer>
    </div>
</template>

<style lang='scss' scoped>
    .mut{
        width: 766px;
        border-radius: 30px;
        position: absolute;
        top:890px;
        span{
          display: block;
          color:white;
          font-size: 66px;
          width:958px;
          height:230px;
          line-height: 195px;
          background: url("../../img/module_home_no1.png") no-repeat;
          background-position: center;
          text-align: center;
          position: relative;
          right: 94px;
          bottom: 50px;
        }

        p{
          height:180px;
          line-height:80px;
          font-size:50px;
          width:606px;
          position:relative;
          left:80px;
          bottom:50px;
          text-align:left;
        }
        button{
          width:300px;
          height: 108px;
          line-height:100px;
          border-radius: 55px;
          font-size:60px;
          margin-bottom:50px;
          border: 0 none;
          color: white;
          background: url(../../img/home_all.png) -210px -150px no-repeat;
          background-size: 600px 600px;
        }
        button:active {
            position: relative;
            left: 2px;
            bottom: -5px;
        }
    }

    .chartList {
        height: 100%;
        background: #ECEDF1;
        
        header {
            height: 202px;
            padding: 110px 30px 0px;
            box-sizing: border-box;
            background: #2F2E34;
            color: #fff;
            ul {
                height: 86px;
                line-height: 86px;
                display: flex;
                justify-content: space-between;
                li:nth-of-type(2){
                    text-align: center;
                }
                li:first-child {
                    &>i {
                        display: inline-block;
                        width: 70px;
                        height: 55px;
                        background: url('../../img/room_all.png') -470px -160px no-repeat;
                        background-size: 600px;
                        position: relative;
                        top: 50%;
                        transform: translate(0, -50%);
                        a {
                            padding: 28px 40px;
                        }
                    }
                }
            }
        }
        
        .list{
            width: 100%;
            height:1538px;
            overflow-y:auto;
            overflow-x:hidden;
            background:white;
            font-size:42px;
            li{
                height:190px;
                text-align:left;
                border-bottom: 2px solid #E6F0E6;
                img{
                    margin:10px 20px 0px 10px;
                }
                b{
                    display:inline-block;
                    min-width:320px;
                    min-height: 129px;
                    line-height:130px;
                    background-position: center;
                    background-size:cover;
                    position:relative;
                    bottom:50px;
                    font-weight: normal;
                }
                span{
                     width:198px;
                     height:90px;
                     border:3px solid #CDE9CC;
                     border-radius:100px;
                     float:right;
                     position:relative;
                     top:50px;
                     right:50px;
                     color:#13BD11;
                     font-size:44px;
                     line-height: 60px;
                     padding-right: 20px;
                     img{
                        position:relative;
                        display:inline-block;
                        vertical-align: sub;
                        top:8px;
                        margin-left:22px;
                     }
                }
            }
            li:nth-of-type(1){
                background-color:#E3FFE3;
            }
            .clear{
                clear: both;
                height:0px;
            }
        }
        .list::-webkit-scrollbar {
            display: none;
        } 

        footer{
            width:100%;
            button{
                  width:444px;
                  height:112px;
                  line-height: 100px;
                  font-size:60px;
                  border: none;
                  background: url(../../img/chart_list2.png) no-repeat;
                  background-position:center;
                  margin-top: 30px;
                }
            button:active {
                    position: relative;
                    left: 2px;
                    bottom: -5px;
            }
            button:nth-of-type(1){
                background: url(../../img/chart_list3.png) no-repeat;
                background-position:center;
            }
        }
    }

    .tip{
      @extend .mut;
      p{
        color:red;
      }
    }

    .diss{
      @extend .mut;
        button:nth-of-type(2){
            background: url(../../img/chart_list3.png) no-repeat;
            background-position:center;
        }
    }
</style>

<script type="text/javascript">
    import Vue from 'vue';
    export default {
        data: function(){
            return {
                a: this.$route.params.id,
                putRoom:false,
                dissolveRoom:false,
            }
        },
        methods: {
            }
        }
</script>