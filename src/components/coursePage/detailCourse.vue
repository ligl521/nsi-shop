<template>
    <div class="detailCourse-com" ref="bg" >
        <div class="videoBox" ref="coverContent">
            <!-- <video src="https://nsi-class-video.oss-cn-zhangjiakou.aliyuncs.com/class/test.mp4" class="play" controls ref="play" controlslist="nodownload"></video> -->
            <video webkit-playsinline="true" :src="getUrl" class="play" :class="{'zindex9':isPlay}" controls ref="play" controlslist="nodownload"></video>
            <!-- <video src="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/test/yearVideo/xxs.mp4" class="play" :class="{'zindex9':isPlay}" controls ref="play" controlslist="nodownload"></video> -->
            <div class="cover coverbg" ref="coverbg" :style="'background-image:url('+coverImg+')'">
                <div class="cover coverContent">
                    <span class="iconfont icon-bofang" @click="toplay"></span>
                </div>
            </div>
            <!-- back -->
            <div class="back" @click="toBack">
                <span class="iconfont icon-zuojiantou"></span>
            </div>
        </div>
        <!-- <h4>{{listId}}</h4> -->
        <div class="link" id="searchBar" :class="{'addShadow':isScroll}">
            <router-link tag="div" :to="'/detailCourse/courseInfo/'+listId" exact class="rightline">课程介绍</router-link>
            <router-link tag="div" :to="'/detailCourse/chooseCourse/'+listId">课程选集</router-link>
        </div>
        <div class="courseContent" v-loading="loading">
            <router-view></router-view>
        </div>
        <div v-if="notBought" class="pay">
            <div>￥<span>{{coursePrice}}.00</span></div>
            <div class="toBuy text-center" @click="toBuy">
                <span class="iconfont icon-gouwuche"></span>立即购买
            </div>
        </div>
        <!-- <complement-info-com v-if="isShow"/> -->
        <complement-info-com v-if="isShow" @hideCom="hideInfoBox" :class="[isShow?'bounceInUp':'bounceOutDown']"/>
        <!-- <div class="test">
            {{testmsg}}
        </div> -->
        <!-- 课程推荐 -->
        <!-- <recommend-course></recommend-course> -->
    </div>
</template>

<script>
import Bus from '@/assets/js/Bus'
import recommendCourse from '../../components/recommend/recommendCourse.vue'
import complementInfoCom from '@/components/coursePage/complementInfo'
import {judgeuserInfo,checkCoursePrivilege,getCourseDetail,getBigCourseDetail,checkOpenIdCourseIdPrivilege} from '@/api/api'
import wxShareInit from '@/assets/js/weChatShare.js';
import {getUsrInfo} from '@/assets/js/common.js'
export default {
    components:{
        complementInfoCom,recommendCourse
    },
    data(){
        return{
            loading:true,
            listId:'',
            isPlay:false,
            getUrl:'#',
            isShow:false,
            notBought:true,
            urlList:[],
            coursePrice:'',
            coverImg:'',
            wxShareInfo:{
                title:"",
                imgUrl:"",
                href:'',
                desc:""
            },
            isScroll:false
        }
    },
    methods:{
        fetchDate(){
            getBigCourseDetail({
                listId:this.$route.params.id
            }).then(res=>{
                this.loading=false
                // console.log(res.data)
                // 微信分享配置
                this.wxShareInfo.title="国际教育研究院 | "+res.data.listTitle
                this.wxShareInfo.imgUrl=res.data.listImg
                this.wxShareInfo.href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailCourse/courseInfo/'+res.data.listId
                this.wxShareInfo.desc=res.data.syllabus
                setTimeout(wxShareInit.wxReady(this.wxShareInfo),30)
                // 本地存储课程信息
                let item=res.data
                this.coverImg=item.listImg
                localStorage.setItem('courseId',item.listId)
                localStorage.setItem('courseImg',item.listImg)
                localStorage.setItem('coursePrice',item.listPrice)
                localStorage.setItem('courseTitle',item.listTitle)
                localStorage.setItem('courseTheme',item.listTheme)
                localStorage.setItem('coursePrice',item.listPrice)

                // 通过分享添加dom数据
                this.coursePrice=item.listPrice
            })
        },
        judgeBought(){
            checkOpenIdCourseIdPrivilege({
                'classId':localStorage.getItem('courseId'),
                'wechatId':localStorage.getItem('openId')
            }).then(res=>{
                // 用户已购买
                if(res.code===0){
                    this.notBought=false
                }else{
                    // 用户未购买
                    this.notBought=true
                    // this.$router.push({name:'courseOrder'})
                }
            })
        },
        getCourseInfo(){
            this.listId = this.$route.params.id;
            // console.log(this.listId)
        },
        createPlayer(){
            let videoHeight=Math.floor((window.innerWidth/16*9))+"px"
            this.$refs.play.style.height=videoHeight
            this.$refs.coverbg.style.height=videoHeight
        },
        toplay(){
            let video=this.$refs.play
            this.isPlay=true
            this.$refs.coverbg.style.display="none"
            video.play()
        },
        getSourse(){
            // console.log(data)
            let video=this.$refs.play
            Bus.$on('getSourse', (msg) => {
                // console.log(msg)
                if(this.notBought){
                    this.$refs.coverbg.style.display="block";
                    this.isPlay=false
                    video.pause()
                    this.$message({
                        message: '您未购买该课程',
                        type: 'info'
                    });
                }else{
                    video.pause()
                    this.getUrl = msg.url
                    video.load()
                    video.play()
                }

                if(msg.pattern==1){
                    video.pause()
                    this.getUrl = msg.url
                    video.load()
                    video.play()
                }
                // console.log(this.getUrl)
            })
        },
        // 用户未购买
        toBuy(){
            // 判断用户信息是否补全
            judgeuserInfo({
                wechatId:localStorage.getItem('openId'),
                'unionId':localStorage.getItem('unionid')
            }).then(res=>{
                // 0成功 1失败
                if(res.code===0){
                    // 信息已经补全
                    this.isShow=false
                    this.$router.push({name:'courseOrder'})
                }else{
                    // 信息未补全
                    this.isShow=true
                }
            })
        },
        hideInfoBox(val){
            this.isShow=val
        },
        toBack(){
            window.location.href="https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/course"
        },
        nextPlay(){
            let video=this.$refs.play
            let that=this
             getCourseDetail({
                listId:localStorage.getItem('courseId')
            }).then(res=>{
                // console.log(res.data.courseLists)
                for(let i=0;i<res.data.courseLists.length;i++){
                    this.urlList.push(res.data.courseLists[i].courseAddress)
                }
                // console.log(this.urlList)
                // 默认赋值第一节课地址
                this.getUrl=this.urlList[0]

                let vLen=this.urlList.length
                let curr=0
                video.addEventListener('ended',function(){
                    if(that.notBought===false){
                        play()
                    }else{
                        video.pause()
                        that.$refs.coverbg.style.display="block"
                        that.$message({
                            message: '请购买该课程以便观看下一节',
                            type: 'info'
                        });
                    }
                })
                function play(){
                    video.src=that.urlList[curr]
                    video.load()
                    video.play()
                    curr++;
                    if(curr>=vLen){
                        curr=0
                    }
                }
            })
        },
        handleScroll () {
            
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // console.log(scrollTop)
            // console.log(this.$refs.coverContent.style.height)
            if(scrollTop>220){
                this.isScroll=true
            }else{
                this.isScroll=false
            }
            //console.log(scrollTop)
            // var searchTop = document.querySelector('#searchBar').offsetTop
            // if(scrollTop>0){
            //     searchTop = linkTop - Number(scrollTop);
            //     if(searchTop<=0){
            //     // document.querySelector('#searchBar').style.opacity="0.9"
            //         document.querySelector('#searchBar').style.top ='0px';
            //         this.isScroll=true
            //         // document.querySelector('#searchBar').style.boxShadow ="0 1px 10px rgba(0, 0, 0, 0.4);";
            //     }else{
            //         document.querySelector('#searchBar').style.top = searchTop+'px';
            //         // document.querySelector('#searchBar').style.boxShadow ="0 1px 10px rgba(0, 0, 0, 0.4);";
            //     }
            // }else{
            //     // document.querySelector('#searchBar').style.opacity="1"
            //     this.isScroll=false
            //     document.querySelector('#searchBar').style.top = linkTop+'px';
            // }
        },
    },
    mounted(){
        this.coursePrice=localStorage.getItem('coursePrice')
        getUsrInfo('https%3a%2f%2fwww.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html%23%2fdetailCourse%2fcourseInfo%2f'+ localStorage.getItem('courseId'))
        // this.getUsrInfo()
        this.judgeBought()
        this.getCourseInfo()
        this.createPlayer()
        this.getSourse()
        this.nextPlay()
        this.fetchDate()
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+"px"
        window.addEventListener('scroll', this.handleScroll)
    }
}
</script>

<style lang="scss">

    .detailCourse-com{
        padding-bottom: 30px;
        position: relative;
        #searchBar{
            background:#fff;
        }
        .videoBox{
            position: relative;
            .zindex9{
                z-index: 9;
            }  
            .play{
                width: 100%;
                position: relative;
            }
            .cover{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
            .coverbg{
                // background-image: url('../../assets/course.jpg');
                background-size: 100%;
                background-position: center center;
                z-index: 1;
                overflow: hidden;
                &::after{
                    content: "";
                    width:100%;
                    height:100%;
                    position: absolute;
                    left:0;
                    top:0;
                    background: inherit;
                    filter: blur(8px);
                    z-index: 2;
                }
            }
            .coverContent{
                display: flex;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
                z-index: 3;
                span{
                    font-size: 60px;
                    color: rgba(247, 247, 247, 1);
                }
            }
        }
        .addShadow{
            box-shadow: -1px 1px 10px rgba(0, 0, 0, 0.4);
            position:fixed;
            top:0;
            z-index:999;
        }
        .link{
            display: flex;
            width: 100%;
            justify-content: space-around;
            background-color: #FFF;
            div{
                width: 50%;
                text-align: center;
                height: 40px;
                line-height: 40px;
                font-weight: 500;
                font-size: 15px;
            }
            .router-link-active{
                color: goldenrod;
                border-bottom: 2px solid goldenrod;
            }
            .rightline{
                position: relative;
                &::before{
                    display: block;
                    content: "";
                    position: absolute;
                    width: 2px;
                    height: 20px;
                    background-color: #eee;
                    right: 0;
                    top: 8px;
                }
            }
        }
        .courseContent{
            border-top: 7px solid #f7f7f7;
            
        }
        .back{
            position: absolute;
            top: 10px;
            left: 15px;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            z-index: 99;
            background-color: rgba(0, 0, 0, .5);
            // box-shadow: 0 5px 10px rgba(122, 122, 122,.6);
            span{
                color: #fff;
                font-size: 16px;
                position: relative;
                left: -1px;
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
            .toBuy{
                color: #FFF;
                font-size: 15px;
                font-weight: 500;
                span{
                    color: #fff;
                    margin-right: 5px;
                    font-size: 25px;
                    vertical-align: middle;
                    position: relative;
                    top: -2px;
                }
            }
        }
        .buyAbout{
            margin: 0 10px;
            .content{
                border-radius: 4px;
                overflow: hidden;
                // box-shadow: 0 3px 10px rgba(121, 121, 121, 0.4);
            }
            .title{
                font-size: 15px;
                font-weight: 600;
                color: #fff;
                padding-top: 8px;
                background-color: #c1c1c1;
                padding-bottom: 8px;
                letter-spacing: 1px;
                margin-bottom: 0;
            }
            ul{
                padding: 10px;
                list-style: none;
                margin-bottom: 0;
                li{
                    font-size: 13px;
                    margin-bottom: 10px;
                    color: #808080;
                    font-weight: 500;
                    &:last-of-type{
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>
