<template>
    <div class="personal-com" ref="bg">
        <!-- 用户头像信息 -->
        <div class="personBg">
            <div class="container-fluid">
                <div class="personBox">
                    <img :src="headimgurl" alt="" class="headImg">
                    <p class="userName">{{nickname}}</p>
                    <!-- <div v-show="isSmallRoutineStatus" class="vipBox" @click="toVip()">
                        <span class="iconfont icon-VIPhuiyuan vipLogo"></span><span class="text">会员<span class="iconfont icon-iconfonticonfonti2copycopy vipMore"></span></span>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 订单 -->
        <div class="container-fluid mt15">
            <div class="myOrderBox">
            <h4 class="myTitle">书籍订单<router-link to="/orderState" tag="div" class="moreOrder">查看全部订单<span class="iconfont icon-iconfonticonfonti2copycopy"></span></router-link></h4>
                <div class="orderBox">
                    <router-link to="/orderState" tag="div" class="orderItme">
                        <p class="myOrderLogo orderState text-center"><span class="iconfont icon-dingdan1"></span></p>
                        <p class="myOrder text-center">全部订单</p>
                    </router-link>
                    <router-link to="/orderState/send" tag="div" class="orderItme">
                        <p class="myOrderLogo orderState text-center"><span class="iconfont icon-fahuo"></span><em class="orderCount" v-if="orderState.PAID>0">{{orderState.PAID}}</em></p>
                        <p class="myOrder text-center">待发货</p>
                    </router-link>
                    <router-link to="/orderState/confirm" tag="div" class="orderItme">
                        <p class="myOrderLogo orderState text-center"><span class="iconfont icon-shouhuo"></span><em class="orderCount" v-if="orderState.SHIPPED>0">{{orderState.SHIPPED}}</em></p>
                        <p class="myOrder text-center">待收货</p>
                    </router-link>
                    <router-link v-if="hasNoAddress" tag="div" to="/createAddress" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-Group-"></span></p>
                        <p class="myOrder text-center">地址管理</p>
                    </router-link>
                    <router-link v-else tag="div" to="/editAddress" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-Group-"></span></p>
                        <p class="myOrder text-center">地址管理</p>
                    </router-link>
                </div>
            </div>
        </div>

         <!-- 课程 -->
        <div v-show="isSmallRoutineStatus" class="container-fluid mt15">
            <div class="myOrderBox">
                <h4 class="myTitle">我的课程<router-link to="/mycourse" tag="div" class="moreOrder">更多<span class="iconfont icon-iconfonticonfonti2copycopy"></span></router-link></h4>
                <div class="orderBox courseContent">
                    <p class="noCourse text-center" v-if="courseList.length<=0">暂无购买的课程</p>
                    <div v-else class="courseBox" v-for="(item,index) in courseList" @click="toDetailCourse(item.listId)" :key="index">
                        <div class="courseImgBox">
                            <img :src="item.listImgAddr" alt="" class="img-responsive">
                        </div>
                        <p class="courseName">{{item.listTitle}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 工具 -->
        <div class="container-fluid mt15">
            <div class="myOrderBox">
            <h4 class="myTitle">我的工具</h4>
                <div class="orderBox">
                    <router-link to="/giftCenter" tag="div" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-youhuiquan"></span></p>
                        <p class="myOrder text-center">礼券</p>
                    </router-link>
                    <router-link to="/service" tag="div" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-kefu"></span></p>
                        <p class="myOrder text-center">客服</p>
                    </router-link>
                    <router-link to="/feedback" tag="div" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-winfo-icon-fankuiwenti"></span></p>
                        <p class="myOrder text-center">反馈</p>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container-fluid copyrightBox">
            <p class="text-center copyright" @click="clear">- 新学说提供技术支持1.0 -</p>
        </div>
    </div>
</template>

<script>
import {myCourse} from '@/api/api'
import {getUsrInfo,isSmallRoutine} from '@/assets/js/common.js'
export default {
    data() {
        return {
            headimgurl:'',
            nickname:'',
            hasNoAddress:true,
            orderState:{},
            courseList:[],
            isSmallRoutineStatus:false
        }
    },
    methods:{
        clear(){
            localStorage.removeItem('vuex')
            localStorage.removeItem('cartId')
            localStorage.removeItem('openId')
            localStorage.removeItem('unionid')
            localStorage.removeItem('wxCode')
            this.$message({
                message: '已清空缓存',
                type: 'success'
            })
        },
        toVip(){
            window.open('https://www.xinxueshuo.cn/#/vip','_blank')
        },
        getOrderCount(){
            this.axios({
                method:'get',
                url:'/order/find_order_count.do',
                params:{
                    wechatId:localStorage.getItem('openId'),
                    productType:'书店',
                    'unionId':localStorage.getItem('unionid'),
                }
            }).then((res)=>{
                this.orderState=res.data.data
            })
        },
        getMyCourse(){
            myCourse({
               wechatId:localStorage.getItem('openId'),
               productType:'课程',
               'unionId':localStorage.getItem('unionid'),
            }).then(res=>{
                // console.log(res.data)
                for(let i=0;i<res.data.length;i++){
                    if(res.data[i].statusDesc==="已付款"){
                        this.courseList.push(res.data[i])
                    }
                }
                // console.log(this.courseList.length)
                // this.courseList=res.data
            })
        },
        toDetailCourse(id){
            // console.log(id)
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailCourse/courseInfo/'+id
            window.location.href=href
        },
    },
    created(){
        let that=this
        isSmallRoutine().then(function(data){
            that.isSmallRoutineStatus=data
        })
        // this.getUsrInfo()
    },
    beforeMount(){
        let storage = window.localStorage
        this.headimgurl=storage.headimgurl
        this.nickname=storage.nickname

        this.axios({
            method:"get",
            url: '/ShopAddress/getList.do',
            params:{
                // wechatId:'123123'
                wechatId:localStorage.getItem('openId')
            }
        }).then((res)=>{
            // 0成功 1失败
            let code=res.data.code
            if(code===0){
                this.hasNoAddress=false
            }else{
                this.hasNoAddress=true
            }
        })
    },
    mounted(){
        getUsrInfo('https%3a%2f%2fwww.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html%23%2fmine')
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+"px";
        this.getOrderCount()
        this.getMyCourse()
    }
}
</script>

<style lang="scss">
    .personal-com{
        background-color: #f7f7f7;
        padding-bottom: 30px;
        .mt15{
            margin-top: 15px;
        }
        .mb20{
            margin-bottom: 20px;
        }
        .redLogo{
            color: #f72f2f;
            .myOrder{
                color: #232323;
            }
        }
        .personBg{
            min-height: 180px;
            // background: linear-gradient(90deg,#215089,#1c4372);
            background: url('../assets/personalBg.png');
            background-size: cover;
            background-position: center center;
            padding-top: 45px;
            .personBox{
                display: flex;
                height: 100%;
                align-items: center;
                position: relative;
                .headImg{
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    vertical-align: middle;
                    box-shadow: 0 2px 10px #232323;
                    background-color: #eee;
                }
                .userName{
                    margin-left: 10px;
                    color: #fff;
                    font-size: 20px;
                    margin-bottom: 0;
                    // font-weight: 600;
                }
                .vipBox{
                    position: absolute;
                    right: 0;
                    .vipLogo{
                        color: #eee;
                        font-size: 20px;
                        text-shadow: 0 2px 8px #2a538d;
                        margin-right: 5px;
                    }
                    .text{
                        color: #eee;
                        font-weight: 600;
                        position: relative;
                        top: 1px;
                        .vipMore{
                            margin-left: 5px;
                            font-weight: 200;
                            font-size: 13px;
                        }
                    }
                }
            }
        }
        .myOrderBox{
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 10px #eee;
            .myTitle{
                font-weight: 600;
                padding-bottom: 15px;
                margin-top: 0;
                margin-bottom: 5px;
                color: #222;
                font-size: 17px;
                border-bottom: 1px solid #eee;
                position: relative;
                .moreOrder{
                    position: absolute;
                    right: 0;
                    top: 5px;
                    font-weight: normal;
                    color: #999;
                    font-size: 13px;
                    span{
                        font-size: 13px;
                    }
                }
            }
            .orderBox{
                display: flex;
                justify-content: space-around;
                .myOrderLogo{
                    margin-bottom: 3px;
                    transition: all .3s;
                    position: relative;
                    span{
                        font-size: 30px;
                    }
                    .orderCount{
                        font-style: normal;
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 1.4;
                        border-radius: 50%;
                        border: 2px solid orangered;
                        color: orangered;
                        right: -5px;
                        top: 0;
                        background-color: #fff;
                        font-size: 12px;
                    }
                }
                .myOrder{
                    margin-bottom: 0;
                }
            }
        }
        .copyrightBox{
            margin-top: 30px;
            .copyright{
                font-size: 12px;
                color: rgb(180, 180, 180);
            }
        }
        // 课程样式
        .courseContent{
            margin-top: 15px;
            overflow: hidden;
            justify-content: flex-start !important;
            overflow-x: auto;
            .noCourse{
                color: #888;
                margin: 0 auto;
            }
            .courseBox{
                margin-right: 10px;
                img{
                    width: 80px;
                    border-radius: 4px;
                }
                .courseName{
                    margin-bottom: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    min-height: 18px;
                    max-height: 18px;
                    margin-top: 5px;
                    width: 80px;
                }
            }
        }
    }
</style>
