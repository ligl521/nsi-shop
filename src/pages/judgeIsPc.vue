<template>
    <div class="judge" ref="bg">
        <img src="../assets/erweima.png" alt="" width="300">
        <p><span class="iconfont icon-weixin"></span>微信扫描二维码进入手机版</p>
        <div class="intro">
            <p style="margin-top:20px;">国际教育研究院</p>
            <ul>
                <li><span>国际教育最新研究报告</span></li>
                <li><span>国际学校职能岗位课程</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.bg.style.minHeight=(window.outerHeight)+"px"
    }
}
</script>

<style lang="scss">
    .judge{
		text-align: center;
        z-index: 999;
        position: relative;
        background-color: #FFF;
        img{
            margin-top:150px
        }
        p{
            font-size: 20px;
            margin-top: 35px;
            span{
                color: #07ac07;
                font-size: 30px;
                padding-right: 10px;
            }
        }
        .intro{
            width: 270px;
            height: 120px;
            margin: 0 auto;
            margin-top: 50px;
            background-color: #f2f2f2;
            color: #777;
            padding: 1px;
            border-radius: 5px;
            p{
                font-size: 18px;
                font-weight: bold;
            }
            ul{
                position: relative;
                left: 20px;
                top:-5px;
                li{
                    &:last-of-type{
                         margin-top:5px;
                    }
                    span{
                        padding-right:60px;
                    }
                }
                
            }
        }
	}
</style>
