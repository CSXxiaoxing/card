  <template>
    <div class='chartRoom'>
    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li v-show='roomstatus == 1 || roomstatus == 2'>迷糊的大土</li>
                <li v-show='roomstatus == 0'>联系客服</li>
                <li v-show='roomstatus == 3'>聊天室（5）</li>
                <li v-show='roomstatus == 3'><img src="../../img/chart_Room7.png" alt=""></li>
                <li  v-show='roomstatus == 1 && a == 1'  @click = 'give == 0 ? give = 1 : give = 0'>给他＋/－分</li>
                <li v-show='(roomstatus == 1 || roomstatus == 2)&& isfriend == 0'><img src="../../img/chart_Room5.png" alt="">加友</li>
            </ul>
        </header>
        <div class='chart'>
            <ul>
            	<li class="left">
            		<img src="../../img/chart_Room2.png" alt="">
                    <div class="test">
                        <span class="bot"></span>
                       你好在吗？
                    </div>
            	</li>
            	<li class="clear"></li>
            	<li class="right">
                    <img src="../../img/chart_Room2.png" alt="">
                    <div class="test">
                        <span class="bot"></span>
                       在的呢。有什么可以帮到您
                    </div>
            	</li>
                <li class="left">
                    <img src="../../img/chart_Room2.png" alt="">
                    <div class="test">
                        <span class="bot"></span>
                       你好在吗？
                    </div>
                </li>
                <li class="clear"></li>
                <li class="right">
                    <img src="../../img/chart_Room2.png" alt="">
                    <div class="test">
                        <span class="bot"></span>
                       在的呢。有什么可以帮到您就算了空间撒尽量减少地方撒旦法方式发到各分公司的丰富的
                    </div>
                    
                </li>
            </ul>
            <div :class = '[(give == 1?"open":"close"),("control")]'>
            	<ul>
            		<li>加分 :<input type="text" placeholder="输入分数"><b @click = 'give == 0 ? give = 1 : give = 0'>确定</b></li>
            		<li>减分 :<input type="text" placeholder="输入分数"></li>
            	</ul>
            </div>
            
        </div>
        <footer>
        	<p><img src="../../img/chart_Room1.png" alt=""><span>按住 说话</span></p>
        </footer>
    </div>
</template>

<style lang='scss' scoped>
    .chartRoom {
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
                font-size:40px;
                img{
                	vertical-align: sub;
                }
                li:nth-of-type(2){
                   position:absolute;
                   left:150px;
                }
                li:nth-of-type(3){
                   position:absolute;
                   left:480px;
                }
                li:nth-of-type(4){
                   position:absolute;
                   left:440px;
                   font-size:50px;
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
                        transform: translate(0%, -50%);
                        a {
                            padding: 28px 40px;
                        }
                    }
                }
                li:nth-of-type(6){
                	background:url('../../img/chart_Room6.png') no-repeat;
                    background-position:center;
                    padding-left: 12px;
                    width:258px;
                    line-height:80px;
                    position:absolute;
                    right:180px;
                }
                
            }
        }
        
        .chart{
            width: 100%;
            height:auto;
            background: #ECEDF1;
            padding: 27px 40px;
            margin-bottom:140px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            font-size:42px;
            li{
                text-align:left;

                clear: both;
                position:relative;
            	.test{max-width:600px; padding:30px 20px; border:3px solid #E4E3E8; position:relative;border-radius:20px;padding-left:20px;}
                .test span{width:0; height:0; font-size:0; overflow:hidden; position:absolute;}
                .test span.bot{
                    border-width:20px; 
                    border-style:solid dashed dashed; 
                }

            }
            .chart{
            	width:100%;
            }
            .clear{
            	clear: both;
                height:20px;
            }
            .left{
                img{
                    float:left;
                }
                .test{
                    background-color:white;
                    float:left;
                    left:50px;
                    top:30px;
                }
                .test span.bot{
                    border-color:transparent white transparent transparent; 
                    left:-40px;
                    bottom:40px;
                }
            }
            .right{
                color: white;
                img{
                    float:right;
                }
                .test{
                    background-color:#07AD05;
                    bottom:-20px;
                    float:right;
                    right:30px;
                }
                .test span.bot{
                    border-color:transparent  transparent transparent #07AD05; 
                    right:-38px; 
                    top:40px;
                    
                }
            }

            .control{
            	overflow:hidden;
            	box-shadow: 1px 1px 20px #A9A9AB;
            	width:100%;
            	height:0px;
            	position:absolute;
            	left:0px;
            	top:0px;
            	background-color:white;
            	font-size:44px;
            	text-align:left;
            	li{

            		margin-top: 30px;
            		margin-left:62px;
            		font-weight:bold;
            		input{
            		height:78px;
            		line-height:78px;
            		width:344px;
            		margin-left:30px;
            		font-size:30px;
            		border:1px solid black;
            		padding-left:30px;
            		}
            		b{
            			float:right;
            			margin-right:36px;
            			color:#1C9ED9;
            			font-weight:normal;
            		}
            	}
            }
            .control.open{
            	height:282px;
            	transition: all 1s;
            }
            .control.close{
            	height:0px;
            	transition: all 1s;
            }
        }

        footer{
        	position:absolute;
        	width:100%;
        	bottom:0px;
        	height:130px;
        	background-color: #F4F4F6;
        	p{
        		img{
        			margin:0px 20px 0px 0px;
        			padding-top: 20px;
        		}
        		span{
        			display:inline-block;
        			font-size:40px;
        			width:880px;
        			height:90px;
        			line-height:90px;
        			border:2px solid #DFDFE1;
        			text-align:center;
        			position:relative;
        			bottom:30px;
        			border-radius: 12px;
        			background-color:white;
        		}
        	}
        }
    }
</style>

<script type="text/javascript">
	import Vue from 'vue';

	export default {
        data: function(){
            return {
            	a: this.$route.params.id,
            	give:0,         
                roomstatus:1,   //客服0  聊天（房主）1  聊天（玩家）2 群聊3
                isfriend:0,   //是好友1  不是0
            }
        },
        mounted: function(){
        	console.log(this.a)
        },
        methods: {

        }
                
            
    }
</script>