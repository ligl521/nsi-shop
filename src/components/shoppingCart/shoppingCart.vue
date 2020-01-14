<template>
    <div class="shoppingCart-com">
        <h4 class="order-title text-center"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>购物车</h4>
        <!-- 地址 -->
        <div class="addressBox" :class="{'justCenter':hasNoAddress}" v-loading="loading">
            <div class="addressLogo" v-show="!hasNoAddress">
                <span class="iconfont icon-dizhi" ></span>
            </div>
            <div class="noAddress" v-if="hasNoAddress">
                <span class="iconfont icon-zanwukoubei"></span>
                <p class="text-center">暂无收货地址<span class="addAddress" @click="editAddress">添加地址</span></p>
            </div>
            <div class="adddressInfo" v-else>
                <p class="person">收货人：{{name}}<span class="phone">{{phoneVal}}</span></p>
                <p class="address" @click="manageAddress()">收货地址：{{addressVal}}<span class="moreAddress iconfont icon-iconfonticonfonti2copycopy"></span></p>
            </div>
        </div>
        <div class="emptyBox" v-if="goodsLength==0">
            <div class="emptyCart">
                <span class="iconfont icon-gouwuche cartLogo"></span>
                <p>购物车是空的</p>
            </div>
            <router-link tag="div" to="/list" class="other">
                <span>去逛逛</span>
            </router-link>
        </div>
        <!-- list -->
        <div class="itemBox">
            <div class="goodItem" v-for="(v,i) in goodsList" :key="i">
                <div class="imgBox">
                    <img :src="v.goodsImg" alt="" class="img-responsive">
                </div>
                <div class="itemInfo">
                    <p class="itemTitle">{{v.goodsName}}</p>
                    <div class="priceBox">
                        <span class="pricetitle">￥<span class="price">{{v.goodsPrice}}</span>.00</span>
                        <div class="num">
                            <!-- <el-input-number size="mini" v-model="v.goodsNum" @change="handleChange" :min="1" :max="10" label=""></el-input-number> -->
                            <span class="arit minus iconfont icon-jianhao" @click="changeNumber(-1,i)"></span>
                            <input class="txtNum" readonly type="number" :value="v.goodsNum" onkeyup="value=value.replace(/[^\d]/g,'')">
                            <span class="arit add iconfont icon-jiahao" @click="changeNumber(1,i)"></span>
                        </div>
                    </div>
                </div>
                <span class="iconfont icon-guanbi del" @click="del(i)"></span>
            </div>
        </div>
        <div class="shoppingHints ">提交订单后可申请电子发票<br/>图书商品不支持退款<p class="styleRed">过年期间受快递影响，节后发货，请多多谅解</p></div>
        <div class="totalBox" v-if="goodsLength!=0">
            <div class="totalPrice">
                合计:<span>￥{{formatNum(totalPrice)}}</span>
            </div>
            <div class="apply" @click="toApply">
                去支付({{goodsLength}})
            </div>
        </div>
    </div>
</template>

<script>
import {getAddress,updateCart,lockCart,createCardOrder} from '@/api/api'
import {Debounce,miniProPayInfo} from '@/assets/js/common'
export default {
    data() {
        return {
            goodsList:[],
            hasNoAddress:true,
            loading:true,
            province:'',
            city:'',
            addressDetail:'',
            addressVal:'',
            totalPrice:'',
            goodsLength:''
        }
    },
    methods:{
        manageAddress(){
            this.$router.push({path:'/manageAddress'})
        },
        editAddress(){
            this.$router.push({path:'/createAddress'})
        },
        getGoodsList(){
           this.goodsList=this.$store.state.shoppingList
        },
        backPrePage(){
            history.back(-1)
        },
        getAddressInfo(){
            getAddress({
                wechatId:localStorage.getItem('openId'),
                'unionId':localStorage.getItem('unionid'),
                // wechatId:'oCUylv0A1A2hO9JNaCNhVom8guLE'
            }).then(res=>{
                this.loading=false
                this.hasNoAddress=false
                // 0成功 1失败
                let code=res.code
                let receiver=res.data
                // console.log(res.data.data)
                if(code===0){
                    this.name=receiver.receivename
                    this.phoneVal=receiver.receivephone
                    this.province=receiver.receivearea01
                    this.city=receiver.receivearea02
                    this.addressDetail=receiver.receivearea03
                    this.addressVal=this.province+' '+this.city+' '+this.addressDetail
                    // localStorage.setItem("name",this.name)
                }else{
                    this.hasNoAddress=true
                }
            })
        },
        handleChange(value) {
            console.log(value);
            // return value
        },
        findPosition(id){
            return this.goodsList.findIndex(item=>{
                return item.id==id
            })
        },
        del(i){
            // let i=this.findPosition(id);
            this.$store.commit("deleteGoods",i)
            this.getTotalPrice()
        },
        changeNumber(val,i){
            // console.log(id,val)
            // let index=this.findPosition(i)
            // console.log(this.goodsList[i].goodsNum)
            let number=this.goodsList[i].goodsNum
            // console.log(number)
            this.$store.commit("updateGoods",{
                index:i,
                key:"goodsNum",
                value:number+val<=0?1:number+val
            })
            this.getTotalPrice()
        },
        getTotalPrice(){
            this.totalPrice=this.$store.getters.sum
            this.goodsLength=this.$store.getters.goodsNumber
        },
        formatNum(str){
            var str=str.toString()
            var newStr = "";
            var count = 0;
            // 当数字是整数
            if (str.indexOf(".") == -1) {
                for (var i = str.length - 1; i >= 0; i--) {
                    if (count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    } else {
                        newStr = str.charAt(i) + newStr;
                    }
                    count++;
                }
                str = newStr + ".00"; //自动补小数点后两位
                return str;
            }
            // 当数字带有小数
            else {
                for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                    if (count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    } else {
                        newStr = str.charAt(i) + newStr; //逐个字符相接起来
                    }
                    count++;
                }
                str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
                return str;
            }
        },
        toApply:Debounce(function(){
            if(this.hasNoAddress){
                this.$message({
                    message: '请补全收货地址',
                    type: 'warning'
                })
            }else{
                let sendList=JSON.stringify(this.goodsList)
                let updateCart01=new Promise((resolve,reject)=>{
                    // 更新购物车
                    updateCart({
                        openId:localStorage.getItem('openId'),
                        // openId:'oCUylv0A1A2hO9JNaCNhVom8guLE',
                        goodsJson:sendList
                    }).then(res=>{
                        resolve(res)
                    })
                })
                // 锁定购物车
                updateCart01.then(res=>{
                    if(res.code==0){
                        lockCart({
                            cartId:localStorage.getItem('cartId')
                        }).then(res=>{
                            let totalfee=res.data
                            // 创建购物车订单
                            createCardOrder({
                                'unionId':localStorage.getItem('unionid'),
                                wechatId:localStorage.getItem('openId'),
                                goodsId:localStorage.getItem('cartId'),
                                productName:"购物车",
                                productType:"购物车",
                                quantity:1,
                                payment:totalfee,
                                totalPrice:totalfee
                            }).then((res)=>{
                                var ua=window.navigator.userAgent.toLowerCase()
                                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                                    wx.miniProgram.getEnv((wxres)=>{
                                        if(wxres.miniprogram){
                                            this.axios({
                                                method:'get',
                                                url:'/Pay/WxPay_miniProgram.do',
                                                // url:'http://192.168.0.13:8080/nsi-1.0/Pay/WxPay_miniProgram.do',
                                                params:{
                                                    openid:localStorage.getItem('openId'),
                                                    body:"购物车",
                                                    total_fee:totalfee,
                                                    // total_fee:'0.01',
                                                    out_trade_no:res.data.orderNo,
                                                    attach:"attach",
                                                }
                                            }).then((resData)=>{
                                                miniProPayInfo('购物车',totalfee,res.data.orderNo)
                                            })
                                        }else{
                                            // console.log("微信H5支付")
                                            // 微信支付
                                            this.towxPay(totalfee,res.data.orderNo)
                                        }
                                    })
                                }
                            })
                        })
                    }else{
                        this.$message({
                            message: '网络错误，请联系客服或稍后尝试1',
                            type: 'warning'
                        })
                    }
                })
            }
        }),
        towxPay(fee,orderNum){
            let that=this
            this.axios({
                method:'get',
                url:'/Pay/WxPay_public.do',
                params:{
                    openid:localStorage.getItem('openId'),
                    body:'新学说研究报告购买_购物车',
                    total_fee:fee,
                    // total_fee:'0.01',
                    out_trade_no:orderNum
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
                                // let routeData =that.$router.resolve({name:"orderAll"})
                                // window.location.href=routeData.href
                                localStorage.removeItem('vuex');
                                localStorage.removeItem('cartId');
                                window.location.href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/orderState/all'
                            }else{
                                localStorage.removeItem('vuex');
                                localStorage.removeItem('cartId');
                                window.location.href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/list'
                            }
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
    },
    mounted(){
    //    location.reload()
        // this.getGoodsList()
       this.getAddressInfo()
       this.getGoodsList()
       this.getTotalPrice()
    }
}
</script>

<style lang="scss">
    .shoppingCart-com{
        padding-bottom: 70px;
        .justCenter{
            justify-content: center
        }
        .order-title{
            height: 50px;
            line-height: 50px;
            color: #333;
            background-color: #f9f9f9;
            margin-top: 0;
            position: relative;
            .back{
                position: absolute;
                left: 15px;
            }
        }
        .addressBox{
            padding: 15px 20px 15px 15px;
            display: flex;
            align-content: center;
            border-bottom: 8px solid #eee;
            position: relative;
            .addressLogo{
                display: flex;
                justify-content: center;
                align-content: center;
                padding-top: 20px;
                padding-right: 15px;
                span{
                    display: inline-block;
                    font-size: 25px;
                    color: #666;
                    // font-weight: 600;
                }
            }
            .noAddress{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                span{
                    font-size: 45px;
                }
                p{
                    color: #888;
                    font-size: 14px;
                    margin-top: 15px;
                }
                .addAddress{
                    font-size: 14px;
                    display: inline-block;
                    background-color: orangered;
                    color: #fff;
                    padding: 2px 15px;
                    margin-left: 10px;
                    border-radius: 4px;
                }
            }
            .adddressInfo{
                position: relative;
                padding-right: 15px;
                width: 90%;
                .person{
                    position: relative;
                    .phone{
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
                .address{
                    position: relative;
                    .moreAddress{
                        position: absolute;
                        right: -20px;
                        top: 50%;
                        transform: translateY(-50%)
                    }
                }
            }
        }
        .itemBox{
            padding: 10px;
            .goodItem{
                width: 100%;
                position: relative;
                padding: 10px;
                box-shadow: 0 3px 10px rgba(222, 223, 223, 0.6);
                border-radius: 4px;
                margin-top: 15px;
                display: flex;
                &:first-of-type{
                    margin-top: 10px;
                }
                .del{
                    position: absolute;
                    right: -5px;
                    top: -10px;
                    font-size: 17px;
                    text-shadow: 0 3px 5px #ccc;
                }
                .imgBox{
                    width: 100px;
                    margin-right: 15px;
                    img{
                        width: 120px;
                    }
                }
                .itemInfo{
                    width: 100%;
                    position: relative;
                    .priceBox{
                        position: absolute;
                        bottom: 0;
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        .pricetitle{
                            font-size: 12px;
                            color: #ef250e;
                            position: relative;
                            top: 3px;
                            .price{
                                font-weight: 500;
                                font-size: 15px;
                            }
                        }
                    }

                }
            }
        }
        .num{
            .arit{
                margin: 0 3px;
                font-size: 14px;
                font-weight: 600;
            }
            .txtNum{
                border: 0;
                width: 40px;
                text-align: center;
                background-color: #eee;
                outline: none;
            }
        }
        .totalBox{
            position: fixed;
            left: 0;
            bottom: 57px;
            width: 100%;
            background-color: #fff;
            border-top: 1px solid #dedede;
            z-index: 99;
            display: flex;
            height: 50px;
            .totalPrice{
                width: 70%;
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: 30px;
                font-size: 16px;
                font-weight: 500;
                span{
                    color: #232323;
                }
            }
            .apply{
                width: 30%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #fa1300;
                color: #fff;
                font-size: 16px;
            }
        }
        .emptyCart{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            color: rgb(155, 155, 155);
            margin-top: 30px;
            .cartLogo{
                font-size: 40px;
                margin-right: 15px;
            }
        }
        .other{
            margin-top: 10px;
            text-align: center;
            span{
                display: inline-block;
                padding: 4px 30px;
                border-radius: 20px;
                border: 2px solid #fa1300;
                color: #fa1300;
            }
        }
        .shoppingHints{
          text-align: center;
          color: #aaa;
        }
    }
    .styleRed{
        color: red;
    }
</style>
