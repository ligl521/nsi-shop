<template>
    <div class="orderContainer-com">
        <router-link tag="h4" to="/mine" class="text-center myOrder"><span class="iconfont icon-zuojiantou"></span>书籍订单</router-link>
        <ul class="orderNav">
            <router-link tag="li" exact to="/orderState/all">全部</router-link>
            <router-link tag="li" to="/orderState/wait">待付款</router-link>
            <router-link tag="li" to="/orderState/send">待发货</router-link>
            <router-link tag="li" to="/orderState/confirm">待收货</router-link>
            <router-link tag="li" to="/orderState/success">交易成功</router-link>
        </ul>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .orderContainer-com{
        .myOrder{
            position: relative;
            font-size: 17px;
            height: 35px;
            line-height: 35px;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .orderNav{
            list-style: none;
            padding-left: 0;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #eee;
            margin-bottom: 0;
            li{
                height: 40px;
                line-height: 40px;
            }
        }
        .router-link-active{
            font-weight: 600;
            font-size: 16px;
            border-bottom: 2px solid rgb(255, 30, 0);
        }
    }
</style>
