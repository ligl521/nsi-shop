<template>
    <div class="giftPage-com">
        <router-link tag="h4" to="/mine" class="text-center myOrder"><span class="iconfont icon-zuojiantou"></span>我的礼券</router-link>
        <div class="content" ref="bg">
            <span class="iconfont icon-youhuiquan iconLogo"></span>
            <p class="text-center txt">无礼券</p>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-100)+"px";
    }
}
</script>

<style lang="scss">
    .giftPage-com{
        .myOrder{
            position: relative;
            font-size: 17px;
            height: 35px;
            line-height: 27px;
            border-bottom: 1px solid #eee;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .content{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .iconLogo{
                font-size: 50px;
                color: #666;
            }
            .txt{
                font-size: 17px;
                color: #ccc;
            }
        }
    }
</style>
