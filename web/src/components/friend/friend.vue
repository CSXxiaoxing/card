<template>
    <div id='friend'>
        <header>
            <ul>
                <li>
                    <i><router-link to="/room" ></router-link></i>
                </li>
                <li>好友列表</li>
                <li>
                    <i></i>
                </li>
            </ul>
        </header>
        <div class='friMain'>
            <ul>
                <li @touchend='newWord'>
                    <span><i></i></span>
                    <span>最新消息</span>
                    <span><i :class='arrows == 1 ? "Iup" : ""'></i></span>
                </li>
                <li :class='arrows == 1 ? "show" : "hide"'>
                    
                </li>
                <li @touchend='near'>
                    <span><i></i></span>
                    <span>最近联系</span>
                    <span><i :class='arrows == 2 ? "Iup" : ""'></i></span>
                </li>
                <li :class='arrows == 2 ? "show" : "hide"'>
                    <dl>
                        <dd>
                            <span><i></i></span>
                            <span>测试一号</span>
                            <span><i></i>备注</span>
                        </dd>
                        <dd>
                            <span><i></i></span>
                            <span>测试二号</span>
                            <span><i></i>备注</span>
                        </dd>
                    </dl>
                </li>
                <li @touchend='myFriend'>
                    <span><i></i></span>
                    <span>我的好友</span>
                    <span><i :class='arrows == 3 ? "Iup" : ""'></i></span>
                </li>
                <li :class='arrows == 3 ? "show" : "hide"'>
                    <dl>
                        <dd v-for='a in 6'>
                            <span><i></i></span>
                            <span>测试一号</span>
                            <span><i></i>备注</span>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>

    </div>
</template>

<script type="text/javascript">
    import './friend.scss';

    export default {
        data: function(){
            return {
                // 上下箭头
                arrows: 0,
            }
        },
        methods: {
            newWord() {
                if(this.arrows == 1) {
                    this.arrows = 0;
                } else {
                    this.arrows = 1;
                }

            },
            near() {
                if(this.arrows == 2) {
                    this.arrows = 0;
                } else {
                    this.arrows = 2;
                }
            },
            myFriend() {
                if(this.arrows == 3) {
                    this.arrows = 0;
                } else {
                    this.arrows = 3;
                }
            }
        }
    }
</script>