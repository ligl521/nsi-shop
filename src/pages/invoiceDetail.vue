<template>
    <div class="address">
        <h4 class="order-title text-center"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>发票详情</h4>
        <div class="main main-one">
            <p class="title">电子发票<span class="span-color span-size">{{financeState}}</span></p>
            <p class="time">申请日期<span>{{createTime}}</span></p>
        </div>
        <div class="main">
            <p class="span-color">发票抬头&emsp;<span>{{userInvoiceName}}</span></p>
            <p class="span-color">发票类型&emsp;<span>{{invoiceType}}</span></p>
            <p class="span-color">发票内容&emsp;<span>{{userBillingType}}</span></p>
            <p class="span-color">发票金额&emsp;<span>￥{{manageMoney}}</span></p>
            <p class="span-color">申请时间&emsp;<span>{{createTime}}</span></p>
            <p class="span-color">收票人邮箱<span>{{usermail}}</span></p>
        </div>
    </div>
</template>

<script>
import {getUsrInfo} from '@/assets/js/common';
import {invoiceDetail} from '@/api/api';
export default {
    data() {
        return {
            financeState:'',//开没开票
            createTime:'',//申请日期
            userInvoiceName:'',//发票抬头
            invoiceType:'',//发票类型
            userBillingType:'',//发票内容
            manageMoney:'',//发票金额
            usermail:'',//收票人邮箱
        }
    },
    created(){
        this.getMyCourse()
        console.log(this.$route.query.id)
    },
    methods:{
        formatNumber(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        },
        formatTimeTwo(number, format) {
            var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
            var returnArr = [];
            var date = new Date(number);
            returnArr.push(date.getFullYear());
            returnArr.push(this.formatNumber(date.getMonth() + 1));
            returnArr.push(this.formatNumber(date.getDate()));
            returnArr.push(this.formatNumber(date.getHours()));
            returnArr.push(this.formatNumber(date.getMinutes()));
            returnArr.push(this.formatNumber(date.getSeconds()));
            for (var i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i]);
            }
            return format;
        },
        backPrePage(){
            history.back(-1)
        },
        getMyCourse(){
          invoiceDetail({
                invoiceId:this.$route.query.id,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.invoiceType == "1"){
                  this.invoiceType = "电子发票"//发票类型
                }else if(res.data.invoiceType == "2"){
                  this.invoiceType = "纸质发票"//发票类型
                }
                this.financeState =res.data.financeState //开没开票
                this.createTime = this.formatTimeTwo(res.data.createTime,"Y-M-D h:m:s") //申请日期
                this.userInvoiceName =res.data.userInvoiceName //发票抬头
                this.userBillingType =res.data.userBillingType //发票内容
                this.manageMoney =res.data.manageMoney //发票金额
                this.usermail =res.data.usermail //收票人邮箱
            })
        },
    },
    mounted(){
        getUsrInfo('https%3a%2f%2fwww.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html%23%2fmanageAddress')
    }
}
</script>

<style lang="scss">
    .address{
        background-color: rgb(235, 235, 235);
        padding: 0 0 20px 0;
        .order-title{
            height: 50px;
            line-height: 50px;
            color: #333;
            background-color: rgb(235, 235, 235);
            margin: 0;
            position: relative;
            .back{
                position: absolute;
                left: 15px;
            }
        }
        .main{
            margin: 0 2px;
            padding:15px 20px 8px;
            background-color:#fff;
            border-radius: 8px;
            .title{
                font-size: 18px;
            }
            .time{
                font-size: 14px;
                color: rgb(158, 158, 158);
            }
            .span-color{
                font-size: 16px;
                color: rgb(158, 158, 158);
                margin-bottom: 16px;
            }
            span{
                margin-left: 30px;
                color: #000;
            }
        }
        .main-one{
            margin-bottom: 10px;
        }
    }
  
</style>
