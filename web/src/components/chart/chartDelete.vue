<template>
    <div class='chartDelete'>
    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>删除房间成员</li>
                <li>确认</li>
            </ul>
        </header>
        <div class='list'>
            <ul>
                <li v-for='(data, player) in 50' :key='player' @click='sel = player'>
                    <img src="../../img/chart_Room2.png" alt="">
                    <dl>
                        <dt>迷糊的大土</dt>
                        <dd>分数:<b>70000</b></dd>
                    </dl>
                    <span><img v-show="sel == player" src="../../img/module_room_setOwner2.png" alt=""></span>
                </li>
            </ul>
            
        </div>
        
    </div>
</template>

<style lang='scss' scoped>
    .chartDelete {
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
            height:1738px;
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
                dl{
                    display:inline-block;
                    line-height:60px;
                    background-position: center;
                    background-size:cover;
                    position:relative;
                    bottom:20px;
                    font-weight: normal;
                }
                dd{
                    color:#757575;
                    b{
                        color:#12AE0F;
                    }
                }
                span{
                     width:95px;
                     height:100px;
                     float:right;
                     position:relative;
                     top:50px;
                     right:50px;
                     color:#13BD11;
                     font-size:44px;
                     line-height: 60px;
                     background:url("../../img/module_room_setOwner3.png") no-repeat; 
                     background-position: center;
                     background-size:cover; 
                     img{
                        position:relative;
                        display:inline-block;
                        vertical-align: sub;
                        bottom:8px;
                        right:8px;                     
                    }
                }
            }
            .clear{
                clear: both;
                height:0px;
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
                sel: -1,
            }
        },
        methods: {
            }
        }
</script>