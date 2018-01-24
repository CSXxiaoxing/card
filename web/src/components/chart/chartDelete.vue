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
                <li v-for='(data, player) in 50' :key='player' @click='imgStyle.indexOf(player) >= 0 ? imgStyle.splice(imgStyle.indexOf(player),1) : imgStyle.push(player)'>
                    <img src="../../img/chart_Room2.png" alt="">
                    <dl>
                        <dt>迷糊的大土</dt>
                        <dd>分数:<b>70000</b></dd>
                    </dl>
                    <span><img v-show="imgStyle.indexOf(player) >= 0" src="../../img/module_room_setOwner2.png" alt=""></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang='scss' scoped>

@import '../../utils/baseVar.scss';
    .chartDelete {
        height: 100%;
        background: #ECEDF1;
        
        header {
            height: 1.87037rem;
            padding: 1.018519rem 0.277778rem 0;
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
                }
                li:first-child {
                    &>i {
                        display: inline-block;
                        width: 0.648148rem;
                        height: 0.509259rem;
                        background: $roomAll -4.351852rem -1.481481rem no-repeat;
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
            width: 100%;
            height:16.092593rem;
            overflow-y:auto;
            overflow-x:hidden;
            background:white;
            font-size:0.388889rem;
            li{

                height:1.759259rem;
                text-align:left;
                border-bottom: 0.018519rem solid #E6F0E6;
                img{
                    width:1.407407rem;
                    height:1.481481rem;
                    margin:0.092593rem 0.185185rem 0.0rem 0.092593rem;
                }
                dl{
                    display:inline-block;
                    line-height:0.555556rem;
                    background-position: center;
                    background-size:cover;
                    position:relative;
                    bottom:0.185185rem;
                    font-weight: normal;
                }
                dd{
                    color:#757575;
                    b{
                        color:#12AE0F;
                    }
                }
                span{
                     width:0.87963rem;
                     height:0.925926rem;
                     float:right;
                     position:relative;
                     top:0.462963rem;
                     right:0.462963rem;
                     color:#13BD11;
                     font-size:0.407407rem;
                     line-height: 0.555556rem;
                     background:$chart02 no-repeat; 
                     background-position: center;
                     background-size:cover; 
                     img{
                        position:relative;
                        display:inline-block;
                        vertical-align: sub;
                        bottom:0.074074rem;
                        right:0.074074rem;    
                        width:0.87963rem;
                        height:0.925926rem;           
                    }
                }
            }
            .clear{
                clear: both;
                height:0.0rem;
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
                imgStyle: [],
            }
        },
        mounted: function(){

        },
        methods: {

        }
        }
</script>