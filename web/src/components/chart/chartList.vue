<template>
    <div class='chartList'>
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
                    <span><img src="../../img/chart_List1.png" alt="">加友</span>
            	</li>
            	<li class="clear"></li>
            	<li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
                <li>
                    <img src="../../img/chart_Room2.png" alt="">
                    <b>迷糊的大土</b>
                    <span><img src="../../img/chart_List1.png" alt="">备注</span>
                </li>
                <li class="clear"></li>
            </ul>
            
        </div>
        <footer>
        	<mt-button type="primary"  @click="idMessage = false">
                    退出房间
                </mt-button>
        </footer>
    </div>
</template>

<style lang='scss' scoped>
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
                  width:438px;
                  height:112px;
                  line-height: 100px;
                  font-size:60px;
                  border: none;
                  background: url(../../img/chart_list2.png) no-repeat;
                  background-position:center;
                  position: absolute;
                  bottom: 30px ;
                  left: 300px;
                }
                button:active {
                    position: absolute;
                    left: 310px;
                    bottom: 20px;
                }
        }
    }
</style>

<script type="text/javascript">
    export default {
        data: function(){
            return {

            }
        },
        methods: {
            }
                
            
        }
</script>