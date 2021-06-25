<template>
    <div class="orderState-com" ref="bg" v-loading="loading">
        <!-- <h4 class="title"><span class="iconfont icon-zuojiantou goBack" @click="goBack()"></span>全部订单</h4> -->
        <div class="orderItem" v-for="(item,index) in orderItem" v-if="item.productType=='书店'&&item.statusDesc==='已付款'" :key="index">
            <h5 class="goodsTitle">
                <span class="iconfont icon-dianpu goodsLogo"></span>
                <!-- <span class="goodsShop">{{item.product.goodsPress}}</span> -->
                <span class="goodsShop">订单号：{{item.orderNo}}</span>
                <span class="goodsState">{{item.statusDesc}}</span>
            </h5>
            <div class="goodsDesc" @click="toDetail(item.orderNo)">
                <div class="goodsPic">
                    <img width="100" height="100" :src="item.product.goodsImg" alt="" class="img-responsive" >
                </div>
                <div class="desc">
                    <p class="goodsName">{{item.product.goodsName}}</p>
                    <p class="goodsPress">{{item.product.goodsPress}}</p>
                    <p class="goodsPress goodsPress01"><span>系列：{{item.product.goodsSeries}}</span></p>
                    <p class="goodsPrice">￥{{item.product.goodsPrice}}.00<span class="num">x{{item.quantity}}</span></p>
                </div>
            </div>
            <div class="total">
                <p class="text-right">共计{{item.quantity}}件商品 合计:￥<span class="totalPrice">{{item.total_price}}.00</span></p>
            </div>
            <div class="btnBox text-right">
                <a href="javascript:;"  v-if="item.statusDesc==='已付款'" class="cancle" @click="toinvoice(item)">申请开票</a>
            </div>
        </div>

        <!-- 购物车 -->
        <div class="orderItem" v-for="(item,index) in cartItem">
            <h5 class="goodsTitle">
                <span class="iconfont icon-dianpu goodsLogo"></span><span class="goodsShop">购物车</span>
                <span class="goodsState">{{item.statusDesc}}</span>
            </h5>
            <div>
                <!-- 购物车详情 -->
                <div class="cartItem" v-for="(v,i) in item.list">
                    <!-- <p>{{v}}</p> -->
                    <div class="cartlist">
                        <div class="goodsPic cartPic">
                            <img width="100" height="100" :src="v.goodsImg" alt="" class="img-responsive" >
                        </div>
                        <div class="desc">
                            <p class="goodsName">{{v.goodsName}}</p>
                            <p class="goodsPrice">￥{{v.goodsPrice}}.00<span class="num">x{{v.goodsNum}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="total">
                <p class="text-right">共计{{item.list.length}}类商品 合计:￥<span class="totalPrice">{{item.totalPrice}}.00</span></p>
            </div>
            <div class="btnBox text-right">
                <a href="javascript:;"  v-if="item.statusDesc==='已付款'" class="cancle" @click="toinvoice(item)">申请开票</a>
            </div>
        </div>

        <div class="noOrder" v-if="orderCode=='1'">
            <p class="text-center noOrderLogo"><span class="iconfont icon-wuxiaodingdan"></span></p>
            <p class="text-center noOrderTxt">您还没有相关订单</p>
        </div>
    </div>
</template>

<script>
import {getCartDetail} from '@/api/api';
export default {
    data() {
        return {
            orderCode:'1',
            orderItem:[],
            loading:true,
            cartIdList:[],
            cartItem:[]
        }
    },
    methods:{
        toDetail(orderNum){
            localStorage.setItem("isShare",false)
            let routeData =this.$router.resolve({name:"orderDetail",params:{id:orderNum}})
            window.location.href=routeData.href
        },
        goBack(){
            history.go(-1)
        },
        toinvoice(item){
            // console.log(item)
            localStorage.setItem('orderNo',item.orderNo)
            if(item.total_price){
                localStorage.setItem('total_price',item.total_price)
            }else{
                localStorage.setItem('total_price',item.totalPrice)
            }
            this.$router.push({path:'/invoice'})
        }
    },
    created(){
        this.axios({
            method:'get',
            url:'/order/get_order_list.do',
            params:{
                // 'wechatId':'123123'
                'wechatId':localStorage.getItem('openId'),
                'unionId':localStorage.getItem('unionid')
            }
        }).then((res)=>{
            this.loading=false;
            this.orderCode=res.data.code
            this.orderItem=res.data.data

            let cartList=[]
            let cartPrice=[]
            let cartOrderNum=[]
            let cartstatusDesc=[]

            if(this.orderCode!=1){
                let orderList=res.data.data
                let waitPayList=[]
                for(let i=0;i<orderList.length;i++){
                    if(orderList[i].status===2){
                        waitPayList.push(orderList[i])
                    }
                }
                if(waitPayList.length==0){
                    this.orderCode='1'
                }else{
                    this.orderCode=''
                }
            }

            // cid获取购物车详情
            this.orderItem.filter(item=>{
                if(item.productType=="购物车"&&item.statusDesc=="已付款"){
                    this.cartIdList.push(item.product.id)
                    cartPrice.push(item.total_price)
                    cartOrderNum.push(item.orderNo)
                    cartstatusDesc.push(item.statusDesc)
                }
            })
            for(let i=0;i<this.cartIdList.length;i++){
                getCartDetail({
                    cartId:this.cartIdList[i]
                }).then(res=>{
                    // console.log(res.data)
                    cartList.push(res.data)

                    // console.log(cartList)
                    // console.log(cartPrice)
                    // cartList.forEach((item,index)=>{
                        this.cartItem.push({
                            'totalPrice':cartPrice[i],
                            'list':cartList[i],
                            'orderNo':cartOrderNum[i],
                            'statusDesc':cartstatusDesc[i]
                        })
                    // })
                    // console.log(this.cartItem)
                    if(this.cartItem.length>0){
                        this.orderCode='0'
                    }
                })
            }
        })
    },
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-155)+"px"
    }
}
</script>

<style lang="scss">
 @import '@/assets/css/orderCommon.scss';
</style>
