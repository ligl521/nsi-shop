<template>
    <div class="service-com" ref="bg">
        <router-link tag="h4" to="/mine" class="text-center myOrder"><span class="iconfont icon-zuojiantou"></span>客服</router-link>
        <div class="container-fluid">
            <div class="serviceLogo">
                <img src="../assets/serviceLogo.jpg" alt="" class="img-responsive">
                <p>长按识别上图小程序码，接入在线客服</p>
                <p>客服小新电话：15010927730</p>
                <p>客服座机：010-52468286</p>
            </div>
            <div class="content">
                <p>书籍将在48小时内发货，请耐心等待！</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+"px";
    }
}
</script>

<style lang="scss">
    .service-com{
        .myOrder{
            position: relative;
            font-size: 17px;
            height: 35px;
            line-height: 27px;
            border-bottom: 1px solid #eee;
            background-color: #fff;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .serviceLogo {
            img{
                width:60%;
                margin:0 auto;
                border-radius: 5px;
                margin-top: 70px;
                margin-bottom: 40px;
            }
            p{
                text-align: center;
                color:#afafaf;
                margin-top:10px;
            }
        }
        .content{
            display: flex;
            justify-content: center;
            margin-top:40px;
            p{
                text-align: center;
                background-color: #f7f7f7;
                width:83%;
                padding:8px 16px;
                color:#8c8c8c;
                border-radius: 5px;
            }
        }
    }
</style>
