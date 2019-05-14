<template>
    <div class="orderState-com" ref="bg" v-loading='loading'>
        <!-- <h4 class="title"><span class="iconfont icon-zuojiantou goBack" @click="goBack()"></span>全部订单</h4> -->
        <div class="orderItem" v-for="(item,index) in orderItem" v-if="item.statusDesc==='未支付'">
            <h5 class="goodsTitle">
                <span class="iconfont icon-dianpu goodsLogo"></span><span class="goodsShop">新学说</span>
                <span class="goodsState">{{item.statusDesc}}</span>
            </h5>
            <div class="goodsDesc" @click="toDetail(item.listId)">
                <div class="goodsPic">
                    <img width="100" height="100" :src="item.listImgAddr" alt="" class="img-responsive" >
                </div>
                <div class="desc">
                    <p class="goodsName">{{item.listTitle}}</p>
                    <p class="goodsPress">国际教育研究院</p>
                    <p class="goodsPress goodsPress01"><span>系列：{{item.listTheme}}</span></p>
                    <p class="goodsPrice">￥{{item.totalPrice}}.00<span class="num">x1</span></p>
                </div>
            </div>
            <div class="total">
                <p class="text-right">共计1件商品 合计:￥<span class="totalPrice">{{item.totalPrice}}.00</span></p>
            </div>
            <div class="btnBox text-right" v-if="item.statusDesc==='未支付'">
                <a href="javascript:;" class="cancle" @click="cancleOrder(item.orderNo)">取消订单</a>
                <a href="javascript:;" class="toPay" @click="toPay(item)">付款</a>
            </div>
        </div>
        <div class="noOrder" v-if="orderCode=='1'">
            <p class="text-center noOrderLogo"><span class="iconfont icon-wuxiaodingdan"></span></p>
            <p class="text-center noOrderTxt">您还没有相关订单</p>
        </div>
    </div>
</template>

<script>
import {myCourse} from '@/api/api'
export default {
    data() {
        return {
            orderCode:'1',
            orderItem:[],
            loading:true,
            courseId:''
        }
    },
    methods:{
        getOrderList(){
            myCourse({
                'wechatId':localStorage.getItem('openId'),
                'unionId':localStorage.getItem('unionid'),
            }).then(res=>{
                this.loading=false
                this.orderCode=res.code
                this.orderItem=res.data
                if(this.orderCode!=1){
                    let orderList=res.data
                    let waitPayList=[]
                    for(let i=0;i<orderList.length;i++){
                        if(orderList[i].status===1){
                            waitPayList.push(orderList[i])
                        }
                    }
                    if(waitPayList.length==0){
                        this.orderCode='1'
                    }else{
                        this.orderCode=''
                    }
                }
            })
        },
        goBack(){
            history.go(-1)
        },
        toDetail(id){
            localStorage.getItem('courseId',id)
            window.location.href="https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailCourse/courseInfo"
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
                    total_fee:item.totalPrice,
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
                                localStorage.setItem('courseId',this.courseId)
                                insertCoursePrivilege({
                                    ClassId:localStorage.getItem('courseId'),
                                    UserMail:localStorage.getItem('email')
                                }).then(res=>{
                                    window.location.href="https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailCourse/courseInfo"
                                })
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
        }
    },
    created(){
        this.getOrderList()
    },
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-100)+"px"
    }
}
</script>

<style lang="scss">
@import '@/assets/css/orderCommon.scss';
</style>

