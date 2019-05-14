<template>
    <div class="courseOrder-com" ref="bg">
        <h4 class="text-center myOrder"><span class="iconfont icon-zuojiantou" @click="backPrePage"></span>确认订单</h4>
        <div class="courseInfo">
            <h5 class="title">商品信息</h5>
            <div class="courseBox">
                <div class="courseImg"><img :src="courseImg" alt="" class="img-responsive"></div>
                <!-- <div><img src="../../assets/course.jpg" alt="" class="img-responsive courseImg"></div> -->
                <div class="courseTitle">
                    <p>{{courseTitle}}</p>
                    <!-- <p class="them">{{courseTheme}}</p> -->
                    <span class="price">￥{{coursePrice}}.00</span>
                </div>
            </div>
        </div>
        <div class="payState">
            <h5 class="title">支付方式</h5>
            <p class="payBox"><span class="iconfont icon-weixin"></span>微信支付</p>
        </div>
        <div class="payInfo">
            <h5 class="title" style="margin-bottom:0">商品金额<span class="price">{{coursePrice}}.00</span></h5>
        </div>
        <div class="pay">
            <div>实付<span>{{coursePrice}}.00</span></div>
            <div @click="toPay">立即支付</div>
        </div>
    </div>
</template>

<script>
import {createCourseOrder,wxPay,insertCoursePrivilege} from '@/api/api'
export default {
    data() {
        return {
            courseImg:'',
            courseId:'',
            coursePrice:'',
            courseTitle:'',
            courseTheme:'',
        }
    },
    methods:{
        getQueryStringArgs() {
            var qs = location.search.length > 0 ? location.search.substring(1) : '',
                args = {},
                items = qs.length ? qs.split('&') : [],
                item = null,
                name = null,
                value = null,
                i = 0,
                len = items.length;
            for (i = 0; i < len; i++) {
                    item = items[i].split('=');
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    name = item[0];
                    value = item[1];

                    if (name.length) {
                        args[name] = value;
                    }
                }
            return args;
        },
        getUsrInfo(){
            // 存取code
            let args = this.getQueryStringArgs(),
                code = decodeURIComponent(args['code']),
                storage = window.localStorage
            storage['wxCode'] = code

            if(storage.wxCode!='undefined'){
                if(storage.openId){
                    localStorage.setItem("isShare",false)
                }else{
                    localStorage.setItem("isShare",true)
                    const sendData=new URLSearchParams()
                    sendData.append('code',code)
                    this.axios({
                        method:"post",
                        url:'/wxPay/get_wx_info.do',
                        data:sendData
                    }).then((res)=>{
                        storage['openId']=res.data.data.openid
                        storage['headimgurl']=res.data.data.headimgurl
                        storage['nickname']=res.data.data.nickname
                        location.reload()
                    })
                }
            }else{
                // window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e5ddff7dc5282e&redirect_uri=http%3a%2f%2fdata.xinxueshuo.cn%2fnsi-shop%2fdist%2f%23%2fdetailPage%2f"+this.listId+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e5ddff7dc5282e&redirect_uri=https%3a%2f%2fwww.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html%23%2fcourseorder&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
            }
        },
        backPrePage(){
            window.location.href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailCourse/courseInfo'
        },
        getCourseInfo(){
            this.courseImg=localStorage.getItem('courseImg')
            this.courseId=localStorage.getItem('courseId')
            this.coursePrice=localStorage.getItem('coursePrice')
            this.courseTitle=localStorage.getItem('courseTitle')
            this.courseTheme=localStorage.getItem('courseTheme')
        },
        toPay(){
            // console.log(111)
            let openId=localStorage.getItem('openId')
            let courseId=localStorage.getItem('courseId')
            let courseTitle=localStorage.getItem('courseTitle')
            createCourseOrder({
                'unionId':localStorage.getItem('unionid'),
                'wechatId': openId,
                'goodsId': courseId,
                'quantity':'1',
                'buyerMessage': '',
                'productType': '课程'
            }).then(res=>{
                console.log(res)
                let payInfo=res.data
                wxPay({
                    openid:openId,
                    body:courseTitle,
                    total_fee:payInfo.totalPrice,
                    // total_fee:'0.01',
                    out_trade_no:payInfo.orderNo
                }).then(res=>{
                        let payment=res.data
                        let appId = payment.appId
                        let timeStamp = payment.timeStamp
                        let nonceStr = payment.nonceStr
                        let packageNum = payment.package
                        let signType = payment.signType
                        let paySign = payment.paySign
                        let that=this
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
                                        // 开启课程权限
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
            })
        }
    },
    beforeMount(){
        // this.getUsrInfo()
    },
    mounted(){
        this.getCourseInfo()
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+'px'
    }
}
</script>

<style lang="scss">
    .courseOrder-com{
        position: relative;
        background-color: #f2f5f7;
        .myOrder{
            position: relative;
            font-size: 17px;
            height: 40px;
            line-height: 40px;
            margin-top: 0;
            background-color: #fff;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .courseInfo,.payState,.payInfo{
            padding: 15px;
            background-color: #FFF;
            margin-top: 15px;
            .title{
                color: #71777d;
                font-size: 16px;
                margin-top: 0;
                margin-bottom: 15px;
            }
        }
        .courseBox{
            display: flex;
            width: 100%;
            // align-items: center;
            .courseImg{
                width: 100px;
                max-width: 100px;
                border-radius: 4px;
                margin-right: 10px;
            }
            .courseTitle{
                font-weight: 500;
                color:#2a323b;
                font-size: 16px;
                position: relative;
                .price{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    font-size: 14px;
                    color: #f33b3a;
                }
                .them{
                    font-size: 12px;
                    background-color: #f2f5f7;
                    position: absolute;
                    padding: 3px 10px;
                    border-radius: 10px;
                }
            }
        }
        .payBox{
            margin-bottom: 0;
            font-size: 14px;
            color: #2a323b;
            span{
                font-size: 25px;
                color: #00c800;
                margin-right: 10px;
                vertical-align: middle;
            }
        }
        .payInfo{
            position: relative;
            .price{
                position: absolute;
                right: 15px;
                color: #f33b3a;
            }
        }
        .pay{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            height: 57px;
            line-height: 57px;
            display: flex;
            justify-content: space-around;
            background-color: #FFF;
            div{
                width: 50%;
                font-size: 15px;
                text-align: center;
                span{
                    color: #f33b3a;
                    font-size: 19px;
                    font-weight: 500;
                    margin-left: 5px;
                }
                &:last-of-type{
                    background-color:#f33b3a;
                    color: #fff;
                }
            }
        }
    }
</style>
