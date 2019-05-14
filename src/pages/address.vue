<template>
    <div class="address-com">
        <h4 class="order-title text-center" v-if="hasNoAddress"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>地址管理<span class="addAddress" >添加新地址</span></h4>
        <h4 class="order-title text-center"  v-else><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>地址管理<span class="addAddress" @click="editAddress()">编辑地址</span></h4>
        <div class="noAddress" v-if="hasNoAddress">
            <span class="iconfont icon-zanwukoubei"></span>
            <p class="text-center">暂无收货地址</p>
        </div>
        <div class="hasAddress" v-else>
            <div class="nameLogo">{{nameLogo}}</div>
            <div class="addressInfo">
                <p class="name">{{name}}<span class="phone">{{phone}}</span></p>
                <p class="address">{{address}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {getUsrInfo} from '@/assets/js/common'
export default {
    data() {
        return {
            nameLogo:'',
            name:'',
            phone:'',
            address:'',
            hasNoAddress:true
        }
    },
    created(){
        this.getAddress()
    },
    methods:{
        backPrePage(){
            history.back(-1)
        },
        getAddress(){
           this.axios({
                method:"get",
                url: '/ShopAddress/getList.do',
                params:{
                    // wechatId:'123123'
                    wechatId:localStorage.getItem('openId'),
                    'unionId':localStorage.getItem('unionid'),
                }
            }).then((res)=>{
                // 0成功 1失败
                let code=res.data.code
                if(code===0){
                    this.hasNoAddress=false
                    let address=res.data.data
                    let name=address.receivename
                    this.nameLogo=name.substring(0,1)
                    this.name=address.receivename
                    this.phone=address.receivephone
                    this.address=address.receivearea01+address.receivearea02+address.receivearea03
                    // localStorage.setItem("name",name)
                }else{
                    this.hasNoAddress=true
                }
            })
        },
        editAddress(){
            this.$router.push({path:'/editAddress'})
        }
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
            margin-top: 0;
            position: relative;
            .back{
                position: absolute;
                left: 15px;
            }
            .addAddress{
                position: absolute;
                right: 15px;
                font-size: 14px;
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
            padding: 15px;
            display: flex;
            align-items: center;
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
                .name{
                    color: #333;
                    font-size: 18px;
                    margin-right: 15px;
                    .phone{
                        display: inline-block;
                        margin-left: 15px;
                        color: #888;
                        font-size: 14px;
                    }
                }
            }
        }
    }
  
</style>
