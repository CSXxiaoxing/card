  <template>
    <div class='chartRoom'>
    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>联系客服</li>
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
                li:nth-of-type(2){
                    text-align: center;
                    margin-right: 400px;
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
            	span{
            		background:url('../../img/chart_Room3.png') no-repeat;
            	}
            }
            .right{
            	float:right;
            	span{
            		background:url('../../img/chart_Room4.png') no-repeat;
            		
            	}
            	
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
	export default {
        data: function(){
            return {

            }
        },
        methods: {
            }
                
            
        }
</script>