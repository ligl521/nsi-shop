<template>
    <div class="orderState-com" ref="bg" v-loading='loading'>
        <!-- <h4 class="title"><span class="iconfont icon-zuojiantou goBack" @click="goBack()"></span>全部订单</h4> -->
        <div class="orderItem" v-for="(item,index) in orderItem" v-if="item.productType=='书店'">
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
                <a href="javascript:;"  v-if="item.statusDesc==='未支付'" class="cancle" @click="cancleOrder(item.orderNo)">取消订单</a>
                <a href="javascript:;"  v-if="item.statusDesc==='未支付'" class="toPay" @click="toPay(item)">付款</a>
                 <!-- <el-popover placement="bottom" title="最新物流" width="300" trigger="click" :content="newLogisticsTxt">
                    <a href="javascript:;" slot="reference"  v-if="item.statusDesc==='未支付'" class="cancle" @click="newLogistics(item)">查看物流</a>
                </el-popover> -->
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
import {getCartList,getCartDetail} from '@/api/api';
export default {
    data() {
        return {
            orderCode:'1',
            orderItem:[],
            loading:true,
            cartIdList:[],
            // cartList:[],
            // cartPrice:[],
            cartItem:[],
            dialogVisible:false,
            newLogisticsTxt:'暂无物流信息',
            activities:[]
        }
    },
    methods:{
        getOrderList(){
                this.axios({
                method:'get',
                url:'/order/get_order_list.do',
                params:{
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
                    })
                }
            })
        },
        goBack(){
            history.go(-1)
        },
        toDetail(orderNum){
            let routeData =this.$router.resolve({name:"orderDetail",params:{id:orderNum}})
            window.location.href=routeData.href
        },
        cancleOrder(ordernum){
            this.axios({
                method:'get',
                url:'/order/cancel_me.do',
                params:{
                    // wechatId:'123123',
                    wechatId:localStorage.getItem('openId'),
                    orderNo:ordernum,
                    'unionId':localStorage.getItem('unionid')
                }
            }).then((res)=>{
                this.$message({
                    message: '订单取消成功',
                    type: 'info'
                });
                this.getOrderList()
            })
        },
        toPay(item){
            let that=this
            // console.log(item)
            this.axios({
                method:'get',
                url:'/Pay/WxPay_public.do',
                params:{
                    openid:localStorage.getItem('openId'),
                    body:item.product.goodsName,
                    total_fee:item.total_price,
                    // total_fee:'0.01',
                    out_trade_no:item.orderNo
                }
            }).then((res)=>{
                let payment=res.data.data
                let appId = payment.appId
                let timeStamp = payment.timeStamp
                let nonceStr = payment.nonceStr
                let packageNum = payment.package
                let signType = payment.signType
                let paySign = payment.paySign

                function onBridgeReady(){
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": appId, //公众号名称，由商户传入     
                            "timeStamp": timeStamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": nonceStr, //随机串     
                            "package": packageNum,
                            "signType": signType, //微信签名方式：     
                            "paySign": paySign //微信签名 
                        },
                        function(res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                //alert("支付成功")
                                let routeData =that.$router.resolve({name:"orderAll"})
                                window.location.href=routeData.href
                            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                        }
                    );
                }

                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            })
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
                    // // console.log(res.data.traces[lastone].acceptStation)
                    // this.newLogisticsTxt=res.data.traces[lastone].acceptStation
                    this.activities=res.data.traces.reverse()
                })
            })
        }
    },
    created(){
        this.getOrderList()
    },
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-155)+"px"
    }
}
</script>

<style lang="scss">
@import '@/assets/css/orderCommon.scss';
</style>
