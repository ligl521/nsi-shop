<template>
    <div class="orderState-com" ref="bg" v-loading='loading'>
        <!-- <h4 class="title"><span class="iconfont icon-zuojiantou goBack" @click="goBack()"></span>全部订单</h4> -->
        <div class="orderItem" v-for="(item,index) in orderItem" v-if="item.productType=='书店'&&item.statusDesc==='已发货'">
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
                 <a href="javascript:;"  v-if="item.statusDesc==='已发货'" class="cancle" @click="toinvoice(item)">申请开票</a>
                 <!-- <a href="javascript:;" v-if="item.statusDesc==='已发货'" class="cancle" @click="newLogistics(item)">查看物流</a> -->
            </div>
            <!-- <el-dialog title="物流信息" :visible.sync="dialogVisible" width="90%" class="tracesBox">
                 <div class="traces" v-for="(item,index) in activities">
                    <div class="spot" :class="{'redspot':index==0}"></div>
                    <div class="tracesInfo" :class="{'blacktracesInfo':index==0}">
                        <p class="acceptStation">{{item.acceptStation}}</p>
                        <p class="acceptTime">{{item.acceptTime}}</p>
                    </div>
                </div>
            </el-dialog> -->
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
                <a href="javascript:;"  v-if="item.statusDesc==='已发货'" class="cancle" @click="toinvoice(item)">申请开票</a>
                <a href="javascript:;" v-if="item.statusDesc==='已发货'" class="cancle" @click="newLogistics(item)">查看物流</a>
            </div>
            <el-dialog title="物流信息" :visible.sync="dialogVisible" width="90%" class="tracesBox">
                 <div class="traces" v-for="(item,index) in activities">
                    <div class="spot" :class="{'redspot':index==0}"></div>
                    <div class="tracesInfo" :class="{'blacktracesInfo':index==0}">
                        <p class="acceptStation">{{item.acceptStation}}</p>
                        <p class="acceptTime">{{item.acceptTime}}</p>
                    </div>
                </div>
            </el-dialog>
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
            cartItem:[],
            newLogisticsTxt:'暂无物流信息',
            dialogVisible:false,
            activities:[]
        }
    },
    methods:{
        goBack(){
            history.go(-1)
        },
        toDetail(orderNum){
            let routeData =this.$router.resolve({name:"orderDetail",params:{id:orderNum}})
            window.location.href=routeData.href
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
        },
        newLogistics(item){
            this.dialogVisible=true
            // console.log(item)
            var getOrderDetail=new Promise((resolve,reject)=>{
                this.axios({
                    method:'get',
                    url:'/order/find_order_item.do',
                    params:{
                        wechatId:localStorage.getItem('openId'),
                        orderNo:item.orderNo,
                        'unionId':localStorage.getItem('unionid'),
                    }
                }).then((res)=>{
                    resolve(res)
                })
            })

            getOrderDetail.then(res=>{
                this.itemDesc=res.data.data
                let logisticCode=res.data.data.shippingCode
                // let logisticCode="ZTO_73109132776833"
                this.axios({
                    method:'get',
                    url:'/order/find_logistics_info.do',
                    params:{
                        orderNo:item.orderNo,
                        logisticCode:logisticCode,
                        'unionId':localStorage.getItem('unionid'),
                    }
                }).then(res=>{
                    // this.traces=res.data.traces.reverse()
                    // let lastone=res.data.traces.length-1
                    // console.log(res.data.traces[lastone].acceptStation)
                    // this.newLogisticsTxt=res.data.traces[lastone].acceptStation
                    this.activities=res.data.traces.reverse()
                    // console.log(this.activities)
                })
            })
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
            this.loading=false
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
                    if(orderList[i].status===4){
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
                if(item.productType=="购物车"&&item.statusDesc=="已发货"){
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
        this.$refs.bg.style.minHeight=(window.innerHeight-100)+"px"
    }
}
</script>

<style lang="scss">
 @import '@/assets/css/orderCommon.scss';
</style>
