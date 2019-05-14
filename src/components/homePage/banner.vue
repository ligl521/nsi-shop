<template>
    <div class="banner-com">
        <div class="swiper-container indexBannerM" id="indexBannerM">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(bannerInfos,item) in bannerList" :key="item">
                <img :src="bannerInfos.content01" @click="goCourse(bannerInfos.content02)" alt="">
              <!--<div class="swiper-slide">
                   <img :src="bannerInfos.content03" alt="" class="img-responsive" @click="toDetail(bannerInfos.content02)"> 
                  <img src="../../assets/shopBanner.jpg" @click="goBook" alt="">
              </div>
              <div class="swiper-slide">
                  <img :src="bannerInfos.content03" alt="" class="img-responsive" @click="toDetail(bannerInfos.content02)"> 
                  <img src="../../assets/banner02.jpg" @click="goCourse" alt="">-->
              </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import {getHomeBanner} from '@/api/api'
export default {
    data() {
        return {
            bannerList:[]
        }
    },
    methods:{
        goBook(){
            this.$router.push({path:'/list'})
        },
        goCourse(data){
            console.log(data)
            window.location.href=data
            //this.$router.push({path:'/course'})
        },
        getBannerInfo(){
            // getHomeBanner({
            //     'type':'官网首页banner'
            // }).then((res)=>{
            //     this.bannerList=res.data
            //     // console.log(res.data)
            //     this.$nextTick(()=>{
            //         this.swiperInit()
            //     })
            // })
            this.axios({
                method:"get",
                url:"/manager/configure/get_configure_list.do?typeName=ShopBanner",
            }).then((res)=>{
                this.bannerList=[]
                for (var i = 0; i < res.data.data.length; i++) {
                    if(res.data.data[i].content01!='0'){
                        console.log(res.data.data[i].content01)
                        this.bannerList.push(res.data.data[i])
                    }
                    
                };
                console.log(this.bannerList)
                this.$nextTick(()=>{
                    this.swiperInit()
                })
            })
        },
        swiperInit(){
            const self=this
            new Swiper('#indexBannerM', {
                notNextTick: true,
                autoplay: {
                    delay:3000,
                    disableOnInteraction: false,
                },
                loop: true,
                speed:600,
                grabCursor : true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
            })
        },
    },
    mounted(){
        this.getBannerInfo()
    }
}
</script>

<style lang="scss">
    .banner-com{
        .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom: 0;
        }
        .swiper-pagination-bullet{
            width: 15px;
            height: 2px;
            border-radius: 50px;
            opacity: 1;
            background-color: #fff;
        }
        margin-top: 20px;
        border-radius: 4px;
        height: 160px;
        overflow: hidden;
        box-shadow: 0 5px 10px #dde9f1;
        img{
            display: inline-block;
            // max-width: 100%;
            // height: auto;
            width: 100%;
            height: 160px;
        }
        .indexBannerM{
            min-height: 160px;
            border-radius: 4px;
            overflow: hidden;
            background-color: #f5f5f5;
        }
        .swiper-pagination-bullet-active{
            background: orangered !important;
        }
    }
</style>
