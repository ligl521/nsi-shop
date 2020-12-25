<template>
    <div class="address-com">
        <h4 class="order-title text-center"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>开票记录<span class="addAddress" @click="refresh">刷新</span></h4>
        <div class="noAddress" v-if="hasNoAddress">
            <span class="iconfont icon-zanwukoubei"></span>
            <p class="text-center">暂无开票记录</p>
        </div>
        <div class="hasAddress" v-else >
            <div class="addressInfo" v-for="(item,index) in list" :key="index" >
                <div class="top">
                    <span class="left">电子发票</span>
                    <span class="min">{{item.createTime}}</span>
                    <span class="right">{{item.financeState}}</span>
                </div>
                <div class="botom">
                    <p class="title">{{item.userInvoiceName}}</p>
                    <div class="botom-main">
                        <p class="botom-p"><span class="text">公司抬头</span><br><span>{{item.userInvoiceNum}}</span></p>
                        <p class="botom-p"><span class="text">类型</span><br><span>{{item.userBillingType}}</span></p>
                        <p class="botom-qian"><span>￥{{item.manageMoney}}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getUsrInfo} from '@/assets/js/common';
import {invoiceHistory} from '@/api/api';
export default {
    data() {
        return {
            list:'',
            hasNoAddress:true
        }
    },
    created(){
        this.getMyCourse()
        this.refresh()
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
        //刷新
        refresh(){
          this.getMyCourse()
        },
        getMyCourse(){
          console.log(localStorage.getItem('openId'))
          invoiceHistory({
                pageNum:1,
                pageSize:10,
                wechatId:localStorage.getItem('openId'),
            }).then((res)=>{
                if(res.data.list.length>0){
                    this.hasNoAddress=false
                    let listarr = res.data.list
                    for(let key in listarr){
                      listarr[key].createTime =  this.formatTimeTwo(listarr[key].createTime,"Y-M-D h:m:s")
                    }
                    this.list=res.data.list
                }else{
                    this.hasNoAddress=true
                }
            })
        },
    },
    mounted(){
        getUsrInfo('https%3a%2f%2fwww.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html%23%2fmanageAddress')
    }
}
</script>

<style lang="scss">
    .address-com{
        .order-title{
            height: 50px;
            line-height: 50px;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            position: relative;
            .back{
                position: absolute;
                left: 15px;
            }
            .addAddress{
                position: absolute;
                right: 15px;
                font-size: 16px;
                color: rgb(211, 172, 43);
            }
        }
        .noAddress{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 400px;
            span{
                font-size: 70px;
            }
            p{
                color: #888;
                font-size: 14px;
                margin-top: 15px;
            }
        }
        .hasAddress{
            padding: 10px;
            .nameLogo{
                flex:0 0 auto;
                margin-right: 15px;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-radius: 50%;
                background-color: #888;
                color: #fff;
                font-size: 22px;
            }
            .addressInfo{
                background-color:#f5f5f5;
                margin-bottom: 10px;
                border-radius: 8px;
                .top{
                    padding: 10px 20px;
                    border-bottom: 1px solid #c7c7c7;
                }
                .botom{
                    padding: 10px 20px 6px;
                }
                .left{
                    color:#2164bd ;
                    margin-right: 10px;
                }
                .right{
                    float: right;
                }
                .title{
                    font-size: 18px;
                    color: #000;
                    font-weight:600;
                }
                .botom-main{
                    .botom-p:first-child{
                        margin-right: 50px;
                    }
                    .botom-p{
                        display: inline-block;
                    }
                    .text{
                        display: inline-block;
                        color: rgb(158, 158, 158);
                        margin-bottom: 4px;
                    }
                    .botom-qian{
                        display: inline-block;
                        margin-top: 10px;
                        font-size: 20px;
                        float: right;
                    }
                }
            }
        }
    }
  
</style>
