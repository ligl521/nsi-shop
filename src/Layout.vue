<template>
    <div class="layout-com" id="app">
        <!-- <keep-alive> -->
            <router-view/>
        <!-- </keep-alive> -->
        <div class="navBar">
            <ul class="barList">
                <router-link to="/" tag="li" exact>
                    <p class="iconBox text-center"><span class="iconfont icon-home"></span></p>
                    <p class="iconName text-center">首页</p>
                </router-link>
                <router-link to="/list" tag="li">
                    <p class="iconBox text-center"><span class="iconfont icon-liebiao1"></span></p>
                    <p class="iconName text-center">书库</p>
                </router-link>
                <!-- <router-link to="/course" v-show="isSmallRoutineStatus" tag="li">
                    <p class="iconBox text-center"><span class="iconfont icon-shipinbofangyingpian"></span></p>
                    <p class="iconName text-center">课程</p>
                </router-link> -->
                <router-link to="/mine" tag="li">
                    <p class="iconBox text-center"><span class="iconfont icon-gerenzhongxin1"></span></p>
                    <p class="iconName text-center">我的</p>
                </router-link>
            </ul> 
        </div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {isSmallRoutine} from './assets/js/common.js'
export default {
    name:'app',
    data(){
        return {
            isSmallRoutineStatus:false
        }
    },
    created(){
        let that=this
        isSmallRoutine().then(function(data){
            that.isSmallRoutineStatus=data
        })
    },
    mounted(){
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            // wx.miniProgram.getEnv(res=>{
            //     if(res.miniprogram){
            //         // window.location.href="https://www.xinxueshuo.cn"
            //         window.location.href="https://data.xinxueshuo.cn/nsi-wap/"
            //     }
            // })
        } else {
            // window.location.href = "https://www.xinxueshuo.cn/nsi-shop/index.html#/pc";
            this.$router.push({path:"/pc"})
        }
    }
}
</script>

<style lang="scss">
    .layout-com{
        position: relative;
        padding-bottom: 45px;
        .navBar{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #fff;
            box-shadow: 0 -1px 10px rgba(0,0,0,.4);
            z-index: 99;
            padding-top: 2px;
            .barList{
                display: flex;
                align-content: center;
                justify-content: space-around;
                list-style: none;
                padding-left: 0;
                li{
                    // padding: 10px 0 0 0;
                    height: 45px;
                    .iconBox{
                        margin-bottom: 0;
                    }
                    span{
                        font-size: 25px;
                        color: rgb(163, 162, 162);
                        font-weight: 600;
                    }
                    .iconName{
                        position: relative;
                        top: -3px;
                        font-size: 13px;
                        color: rgb(163, 162, 162);
                    }
                }
                .router-link-active{
                    span,.iconName{
                        transition: all .3s;
                        color: #333 !important;
                    }
                }
            }
        }
    }
</style>
