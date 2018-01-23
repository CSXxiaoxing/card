<template>
    <div class='message'>
    	<header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>发布公告</li>
                <li>发布</li>
            </ul>
        </header>
        <div class='imp'>
            <textarea name = "shuruk" 
                placeholder = '输入公告内容' 
                @keyup  = 'textNum'
                v-model = 'content'>
            </textarea>
            <!-- <input type="text" placeholder='输入公告内容'/> -->
            <p><span>{{num}}</span>/50</p>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    .message {
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
                padding-bottom: 4px;
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
        
        .imp{
            width: 100%;
            height: 860px;
            background: #fff;
            padding: 27px 40px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;

            textarea {
                width: 100%;
                height: 100%;
                line-height: 70px;
                font-size: 42px;
                white-space: wrap;
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
                -webkit-user-select: none;
                -moz-user-focus: none;
                -moz-user-select: none;
                -webkit-appearance:none;
                outline: none;
                border: none;
            }
            p {
                position: absolute;
                bottom: 30px;
                right: 0px;
                transform: translate(-50%, 0);
            }
            span {
                color: #06B400;
            }
        }
    }
</style>

<script type="text/javascript">
	export default {
        data: function(){
            return {
                content: '',
                num: 0,
                maxLength:50,
            }
        },
        mounted: function(){
            // init
            // console.log(this.time.random)
            // this.$store.dispatch('login_IM')
            // this.$imConn.onOpened()
        },
        methods: {
            textNum(){
                if( this.content.length<50){
                    this.num = this.content.length;
                }else{
                    this.num = 50;
                    this.content=this.content.slice(0,this.maxLength) + '' ;
                }
                
            }
                
            
        }
    }
</script>