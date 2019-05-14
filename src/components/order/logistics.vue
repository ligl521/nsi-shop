<template>
    <div class="logistics-com">
        <h4 class="text-center myOrder"><span class="iconfont icon-zuojiantou" @click="backPrePage()"></span>订单跟踪</h4>
        <div class="container-fluid">
            <div class="traces" v-for="(item,index) in traces">
                <div class="spot" :class="{'redspot':index==0}"></div>
                <div class="tracesInfo" :class="{'blacktracesInfo':index==0}">
                    <p class="acceptStation">{{item.acceptStation}}</p>
                    <p class="acceptTime">{{item.acceptTime}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            traces:[]
        }
    },
    methods:{
        backPrePage(){
            history.go(-1)
        },
        getInfo(){
            this.axios({
                method:'get',
                url:'/order/find_logistics_info.do',
                params:{
                    orderNo:localStorage.getItem('orderNumshippingCode'),
                    logisticCode:localStorage.getItem('shippingCode'),
                    'unionId':localStorage.getItem('unionid'),
                }
            }).then((res)=>{
                // console.log(res.data)
                this.traces=res.data.traces.reverse()
            })
        },
    },
    mounted(){
        this.getInfo()
    }
}
</script>

<style lang="scss">
    .logistics-com{
        padding-bottom: 30px;
        .myOrder{
            position: relative;
            font-size: 17px;
            // height: 35px;
            line-height: 35px;
            border-bottom: 8px solid #eee;
            padding-bottom: 10px;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .traces{
            display: flex;
            align-items: center;
            .spot{
                flex: 0 0 auto;
                width: 10px;
                height: 10px;
                background-color: #ccc;
                border-radius: 50%;
                margin-right: 15px;
            }
            .redspot{
                background-color: rgb(253, 74, 74);
            }
            .tracesInfo{
                width: 100%;
                padding-top: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
                color: #888;
                .acceptTime{
                    font-weight: 500;
                    margin-bottom: 0;
                }
            }
            .blacktracesInfo{
                color: #232323
            }
        }
    }
</style>
