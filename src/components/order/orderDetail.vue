<template>
    <div class="orderDetail-com">
        <h4 class="text-center myOrder"><span class="iconfont icon-zuojiantou" @click="backPrePage()"></span>订单详情</h4>
        <!-- 配送物流 -->
        <div class="orderDesc logisticsBox" v-if="itemDesc.status==4" @click="toLogisticsDetail">
            <div class="iconBox">
                <span class="iconfont icon-wuliu"></span>
            </div>
            <div class="logisticsDesc">
                <p class="acceptStation">{{traces[0].acceptStation}}</p>
                <p class="acceptTime">{{traces[0].acceptTime}}</p>
            </div>
            <span class="iconfont icon-iconfonticonfonti2copycopy detailIcon"></span>
        </div>
        <div class="goodsBox">
            <h5 class="shopTitle"><span class="iconfont icon-dianpu"></span>{{itemDesc.product.goodsPress}}</h5>
            <div class="goodsDesc">
                <div class="goodsPic">
                    <img class="img-responsive" width="100" height="100" :src="itemDesc.product.goodsImg" alt="">
                </div>
                <div class="goodsInfo">
                    <p class="goodsName">{{itemDesc.product.goodsName}}</p>
                    <p class="goodsPress">{{itemDesc.product.goodsType}}<span>{{itemDesc.product.goodsLabel}}</span></p>
                    <p class="goodsQuantity">数量：{{itemDesc.quantity}}&nbsp;系列：{{itemDesc.product.goodsSeries}}</p>
                    <p class="goodsPrice">￥{{itemDesc.product.goodsPrice}}.00</p>
                </div>
            </div>
        </div>
        <div class="orderDesc">
            <p><span>订单编号：</span>{{itemDesc.orderNo}}</p>
            <p><span>下单时间：</span>{{setTime(itemDesc.createTime)}}</p>
            <p><span>支付方式：</span>在线支付</p>
            <p><span>配送方式：</span>普通快递</p>
        </div>
        <div class="orderPrice">
            <p>商品总额<span>￥{{itemDesc.total_price}}.00</span></p>
            <p>运费<span>+ ￥0.00</span></p>
            <div class="text-right needToPay" v-if="itemDesc.status==1">需付款：<span>￥{{itemDesc.total_price}}.00</span></div>
            <div class="text-right needToPay" v-else="itemDesc.status==2||itemDesc.status==4||itemDesc.status==5">实付款：<span>￥{{itemDesc.total_price}}.00</span></div>
        </div>
        <div class="btnBox text-right" v-if="itemDesc.status==1">
            <a href="javascript:;" class="cancle" @click="cancleOrder(itemDesc.orderNo)">取消订单</a>
            <a href="javascript:;" class="toPay" @click="toPay(itemDesc)">去支付</a>
        </div>
         <div class="btnBox text-right" v-if="itemDesc.status==2||itemDesc.status==4||itemDesc.status==5">
            <a href="javascript:;" class="toPay" @click="toDetail(itemDesc.product.id)">再次购买</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemDesc:{},
            traces:[]
        }
    },
    methods:{
        getOrderInfo(){
            let listId=this.$route.params.id;
            var getOrderDetail=new Promise((resolve,reject)=>{
                this.axios({
                    method:'get',
                    url:'/order/find_order_item.do',
                    params:{
                        wechatId:localStorage.getItem('openId'),
                        orderNo:listId,
                        'unionId':localStorage.getItem('unionid'),
                    }
                }).then((res)=>{
                    resolve(res)
                })
            })
            
            getOrderDetail.then(res=>{
                this.itemDesc=res.data.data
                localStorage.setItem('shippingCode',res.data.data.shippingCode)
                localStorage.setItem('orderNum',listId)
                let logisticCode=res.data.data.shippingCode
                this.axios({
                    method:'get',
                    url:'/order/find_logistics_info.do',
                    params:{
                        orderNo:listId,
                        logisticCode:logisticCode,
                        'unionId':localStorage.getItem('unionid'),
                    }
                }).then(res=>{
                    this.traces=res.data.traces.reverse()
                })
            })
        },
        fetchDate(){
            let listId = this.$route.params.id;
            this.axios({
                method:"get",
                url: '/order/find_order_item.do',
                params:{
                    // wechatId:'123123',
                    wechatId:localStorage.getItem('openId'),
                    orderNo:listId,
                    'unionId':localStorage.getItem('unionid'),
                }
            }).then((res)=>{
                this.itemDesc=res.data.data
                localStorage.setItem('shippingCode',res.data.data.shippingCode)
                localStorage.setItem('orderNum',listId)
                // console.log(this.itemDesc)
                this.axios({
                    method:'get',
                    url:'/order/find_logistics_info.do',
                    params:{
                        orderNo:listId,
                        logisticCode:res.data.data.shippingCode,
                        'unionId':localStorage.getItem('unionid'),
                    }
                }).then((res)=>{
                    // console.log(res.data)
                    this.traces=res.data.traces.reverse()
                    // this.traces=this.traces.reverse()
                })
            })
        },
        backPrePage(){
            history.go(-1)
        },
        setTime(str){
            let date = new Date(str),
            Y = date.getFullYear() + '-',
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
            D = date.getDate() + ' ',
            h = date.getHours() + ':',
            m = date.getMinutes() + ':',
            s = date.getSeconds(); 
            return Y+M+D+h+m+s 
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
                let routeData =this.$router.resolve({name:"orderAll"})
                window.location.href=routeData.href
            })
        },
        toPay(item){
            let that=this
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
        toDetail(id){
            // let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            // window.location.href=routeData.href
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/'+id
            window.location.href=href
        },
        toLogisticsDetail(){
            let routeData =this.$router.resolve({name:"logistics"})
            window.location.href=routeData.href
        }
    },
    mounted(){
        // this.fetchDate()
        this.getOrderInfo()
    }
}
</script>

<style lang="scss">
    .orderDetail-com{
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
        .goodsBox{
            padding: 10px;
            border-top: 8px solid #eee;
            border-bottom: 8px solid #eee;
            .shopTitle{
                margin-top: 0;
                height: 30px;
                line-height: 30px;
                color: #232323;
                position: relative;
                font-weight: 600;
                span{
                    font-size: 18px;
                    display: inline-block;
                    margin-right: 5px;
                    color: #666;
                    position: relative;
                    top: 1px;
                }
            }
            .goodsDesc{
                display: flex;
                align-items: flex-start;
                .goodsPic{
                    flex: 0 0 auto;
                    margin-right: 10px;
                    img{
                        border-radius: 4px;
                        box-shadow: 0 2px 10px #e4e4e4;
                    }
                }
                .goodsInfo{
                    width: 100%;
                    word-break: break-all;
                    .goodsName,.goodsPrice{
                        font-weight: 600;
                        font-size: 14px;
                    }
                    .goodsQuantity{
                        font-size: 13px;
                        color: #888;
                    }
                    .goodsPress{
                        color: #205590;
                        span {
                            margin-left: 10px;
                            color: #999;
                        }
                    }
                }
            }
        }
        .orderDesc{
            padding: 10px;
            border-bottom: 8px solid #eee;
            p{  
                color: #555;
                line-height:2;
                &:last-of-type{
                    margin-bottom: 0;
                }
                span{
                    font-weight: 600;
                    color: #232323;
                }
            }
        }
        .logisticsBox{
            display: flex;
            align-items: center;
            border-top: 8px solid #eee;
            border-bottom: 0px;
            position: relative;
            .iconBox{
                margin-right: 10px;
                span{
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #205590;
                    color: #FFF;
                    font-size: 25px;
                }
            }
            .logisticsDesc{
                padding-right: 30px;
                .acceptStation{
                    color: #205590;
                    line-height: 1.5;
                    margin-bottom: 0;
                }
            }
            .detailIcon{
                position: absolute;
                right: 15px;
                font-size: 20px;
                color: #ccc;
            }
        }
        .orderPrice{
            padding: 10px;
            border-bottom: 8px solid #eee;
            p{
                font-weight: 600;
                position: relative;
                span{
                    position: absolute;
                    right: 0;
                }
            }
            .needToPay{
                font-weight: 600;
                span{
                    color: red;
                    font-size: 19px;
                }
            }
        }
        .btnBox{
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 57px;
            line-height: 57px;
            z-index: 100;
            background-color: #fff;
            padding: 0 10px;
            a{
                margin-left: 15px;
                padding: 7px 20px;
                border-radius: 20px;
            }
            .cancle{
                color: #232323;
                border: 1px solid #ccc;
            }
            .toPay{
                background-color: rgb(255, 38, 0);
                border: 1px solid rgb(255, 38, 0);
                color: #fff;
                box-shadow: 0 3px 10px rgb(252, 116, 93);
            }
        }
    }
</style>
