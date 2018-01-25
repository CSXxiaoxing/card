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
                系统消息
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
            height: 1.87037rem;
            padding: 1.018519rem 0.277778rem 0.0rem;
            box-sizing: border-box;
            background: #2F2E34;
            color: #fff;
            font-size:0.425926rem;
            ul {
                height: 0.796296rem;
                line-height: 0.796296rem;
                display: flex;
                justify-content: space-between;
                li:nth-of-type(2){
                    text-align: center;
                    position:absolute;
                    left:4.62963rem;
                }
                li:first-child {
                    &>i {
                        display: inline-block;
                        width: 0.648148rem;
                        height: 0.509259rem;
                        background: url('../../img/room_all.png') -4.351852rem -1.481481rem no-repeat;
                        background-size: 5.555556rem;
                        position: relative;
                        top: 50%;
                        transform: translate(0, -50%);
                        a {
                            padding: 0.259259rem 0.37037rem;
                        }
                    }
                }
            }
        }
        
        .list{
            
            height:16.092593rem;
            overflow-y:auto;
            overflow-x:hidden;
            background:white;
            font-size:0.388889rem;
            h3{
                font-size:0.388889rem;
                margin-top: 0.462963rem;
                font-weight: normal;
            }
            p{
                color:#7E8080;
                font-size:0.314815rem;
                margin-bottom: 0.740741rem;
                margin-top: 0.185185rem;
            }
            span{
                display:inline-block;
                width:8.5rem;
                text-align:left;
                font-size:0.407407rem;
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