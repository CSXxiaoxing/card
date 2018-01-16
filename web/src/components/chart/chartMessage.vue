<template>
    <div class='chartMessage'>
    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>消息</li>
            </ul>
        </header>
        <div class='list'>
            <h3>这里是标题你已经被清楚请出房间，ID71543</h3>
            <p>2017-12-15 17:00</p>
            <span>
                这里是内容这里是内容这里是内容这里是内容这里是内容
                这里是内容这里是内容这里是内容这里是内容这里是内容
                这里是内容这里是内容这里是内容这里是内容这里是内容
                这里是内容这里是内容这里是内容这里是内容这里是内容
                这里是内容这里是内容这里是内容这里是内容这里是内容
            </span>
        </div>
        
    </div>
</template>

<style lang='scss' scoped>
    .chartMessage {
        height: 100%;
        background: #ECEDF1;
        
        header {
            height: 202px;
            padding: 110px 30px 0px;
            box-sizing: border-box;
            background: #2F2E34;
            color: #fff;
            font-size:46px;
            ul {
                height: 86px;
                line-height: 86px;
                display: flex;
                justify-content: space-between;
                li:nth-of-type(2){
                    text-align: center;
                    position:absolute;
                    left:500px;
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
            
            height:1738px;
            overflow-y:auto;
            overflow-x:hidden;
            background:white;
            font-size:42px;
            h3{
                font-size:42px;
                margin-top: 50px;
                font-weight: normal;
            }
            p{
                color:#7E8080;
                font-size:34px;
                margin-bottom: 80px;
                margin-top: 20px;
            }
            span{
                display:inline-block;
                width:918px;
                text-align:left;
                font-size:44px;
            }
        }
        .list::-webkit-scrollbar {
            display: none;
        } 
    }
</style>

<script type="text/javascript">
    import Vue from 'vue';
    export default {
        data: function(){
            return {
                a: this.$route.params.id,
            }
        },
        methods: {
            }
        }
</script>