<template>
    <div class="address-com1">
        <h4 class="order-title text-center"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>地址管理<span class="addAddress" @click="editAddress()">添加新地址</span></h4>
        <div class="noAddress" v-if="hasNoAddress">
            <span class="iconfont icon-zanwukoubei"></span>
            <p class="text-center">暂无收货地址</p>
        </div>
        <div class="hasAddress" v-else >
            <div class="addressInfo1" v-for="(item,index) in list" :key="index">
                <div style="width:100%" @click="cart(item.id)">
                    <p class="address">{{item.receivearea01}}{{item.receivearea02}}</p>
                    <p class="name">{{item.receivearea03}}</p>
                    <p class="address">{{item.receivename}}<span class="phone">{{item.receivephone}}</span></p>
                </div>
                <img @click="editAddress1(item.id)" class="edit" src="../assets/xiugai.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import {getUsrInfo} from '@/assets/js/common'
export default {
    data() {
        return {
            list:'',
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
                    wechatId:localStorage.getItem('openId'),
                    'unionId':localStorage.getItem('unionid'),
                }
            }).then((res)=>{
                console.log(res)
                console.log(res.data.data)
                // 0成功 1失败
                let code=res.data.code
                if(code===0){
                    this.hasNoAddress=false
                    this.list=res.data.data
                }else{
                    this.hasNoAddress=true
                }
            })
        },
        editAddress(){
            this.$router.push({path:'/editAddress'})
        },
        editAddress1(e){
            this.$router.push({path:'/editAddress',query:{id:e}})
        },
        cart(e){
            this.$router.push({path:'/cart',query:{id:e}})
        }
    },
    mounted(){
        getUsrInfo('https%3a%2f%2fwww.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html%23%2fmanageAddress')
    }
}
</script>

<style lang="scss">
    .address-com1{
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
            margin-bottom: 20px;
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
            .addressInfo1:first-child{
                border-top:1px solid #eee ;
            }
            .addressInfo1{
                display: flex;
                border-bottom:1px solid #eee ;
                padding: 10px;
                .name{
                    color: #333;
                    font-size: 18px;
                    margin: 5px 0;
                    font-weight: 700;
                    
                }
                .edit{
                    float: right;
                    width: 20px;
                    height: 20px;
                    margin-top:30px;
                }
                .address{
                    margin: 0;
                    font-size: 14px;
                    color: rgb(88, 88, 88);
                    .phone{
                        margin-left: 20px;
                    }
                }
            }
        }
    }
  
</style>
