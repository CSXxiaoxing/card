  <template>
    <div class='chartRoom'>
    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>迷糊的大土</li>
                <li>联系客服</li>
                <li><img src="../../img/chart_Room5.png" alt="">加友</li>
                <li  @click = 'give == 0 ? give = 1 : give = 0'>给他＋/－分</li>
            </ul>
        </header>
        <div class='chart'>
            <ul>
            	<li class="left">
            		<img src="../../img/chart_Room2.png" alt="">
            		<span>你好在吗？</span>
            	</li>
            	<li class="clear"></li>
            	<li class="right">
            		<span>在的呢。有什么可以帮到您</span>
            		<img src="../../img/chart_Room2.png" alt="">
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
                li:nth-of-type(3){
                    margin-left:100px;
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
                li:nth-of-type(4){
                	margin-right: 258px;
                }
                li:last-child{
                	background:url('../../img/chart_Room6.png') no-repeat;
                	background-position:center;
                	padding-left: 12px;
                	width:258px;
                	line-height:80px;
                	position:absolute;
                	right:20px;
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
            	span{
            		display:inline-block;
					min-width:320px;
            		min-height: 129px;
            		line-height:130px;
            		background-position: center;
            		background-size:cover;
            		position:relative;
            		bottom:50px;
            	}
            }
            .chart{
            	width:100%;
            }
            .clear{
            	clear: both;
            }
            .left{
            	float: left;
            }
            .right{
            	float:right;
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
            }
        },
        mounted: function(){
        	console.log(this.a)
        },
        methods: {

        }
                
            
    }
</script>