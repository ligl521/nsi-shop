<template>
    <div class="home-com">
        <div class="container-fluid">
            <!-- search -->
            <search/>
            <!-- banner -->
            <home-banner/>
            <!-- scrollNews -->

            <journnalism />
            <!-- <div v-show="isSmallRoutineStatus" class="scrollBox">
                <journnalism />
            </div> -->
            <!-- list -->
            <div class="bookList">
                <div class="bookListContent">
                    <h4 class="title" style="margin-top:30px;">最新研究报告</h4>
                    <div class="bookContent">
                        <div class="row">
                            <div class="col-xs-4" v-for="(item,index) in bookPopList" :key="index" v-if="index<3" @click="toDetail(item.id)">
                                <img :src="item.goodsImg" alt="" class="img-responsive bookImg">
                                <h4 class="bookName">{{item.goodsName}}</h4>
                                <p class="bookAuthor">{{item.goodsAuthor}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div v-show="isSmallRoutineStatus" class="bookListContent">
                    <h4 class="title">精品课程</h4>    
                    <div class="courseContentRow" v-for="(item,index) in courseList" :key="index"  @click="toCourseDetail(item.listId)">
                        <div class="row">
                            <div class="col-xs-4">
                                <img :src="item.listImg" alt="" class="img-responsive bookImg">
                                <span class="iconfont icon-bofang"></span>
                            </div>
                            <div class="col-xs-8 pl0 pr160">
                                <h4 class="bookName">{{item.listTitle}}</h4>
                                <p class="bookAuthor">{{item.lecturer}}</p>
                                <!-- <p class="bookPress">{{item.goodsPress}}</p> -->
                                <p class="bookDesc">{{item.syllabus}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bookListContent">
                    <h4 class="title">限时特惠</h4>
                    <div class="bookContent">
                        <div class="row">
                            <div class="col-xs-4" v-for="(item,index) in bookSaleList" :key="index"  @click="toDetail(item.id)">
                                <img :src="item.goodsImg" alt="" class="img-responsive bookImg">
                                <h4 class="bookName">{{item.goodsName}}</h4>
                                <p class="bookAuthor">{{item.goodsAuthor}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bookListContent">
                    <h4 class="title">主编推荐</h4>    
                    <div class="bookContentRow" v-for="(item,index) in bookCommandList" :key="index"  @click="toDetail(item.id)">
                        <div class="row">
                            <div class="col-xs-4">
                                <img :src="item.goodsImg" alt="" class="img-responsive bookImg">
                            </div>
                            <div class="col-xs-8 pl0 pr160">
                                <h4 class="bookName">{{item.goodsName}}</h4>
                                <p class="bookAuthor">{{item.goodsAuthor}}</p>
                                <!-- <p class="bookPress">{{item.goodsPress}}</p> -->
                                <p class="bookDesc">{{item.goodsDescribe}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="more" @click="more">查看更多<span class="iconfont icon-gengduo"></span></div>
        </div>
    </div>
</template>

<script>
import homeBanner from '@/components/homePage/banner';
// import scrollNews from '@/components/homePage/scrollNews';
import journnalism from '@/components/homePage/journnalism';
import search from '@/components/homePage/search'
import wxShareInit from '@/assets/js/weChatShare.js';
import {getBookPopList,getCourseList} from '@/api/api'
import {isSmallRoutine} from '../assets/js/common.js'
export default {
    
    data() {
        return {
            courseList:[],
            pageNum:1,
            pageSize:8,
            bookPopList:[],
            bookSaleList:[],
            bookCommandList:[],
            isSmallRoutineStatus:false,
            wxShareInfo:{
                title:"新学说 | 国际教育研究院",
                imgUrl:"https://data.xinxueshuo.cn/upImage/upInstitutionImg/100062/100062-logo.jpg",
                href:'https://www.xinxueshuo.cn/nsi-shop/dist/index.html',
                desc:"国际教育研究院，一站式解决国际化学校人才职业培训和能力提升"
            }
        }
    },
    components:{
        homeBanner,    
        // scrollNews,
        search,
        journnalism
    },
    methods:{
        toDetail(id){  
            // let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            // window.location.href=routeData.href
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/'+id
            window.location.href=href
        },
        toCourseDetail(listId){
            localStorage.setItem('courseId',listId)
            // let routeData =this.$router.resolve({name:"detailCourse",params:{id:localStorage.getItem('courseId')}})
            // window.location.href=routeData.href
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailCourse/courseInfo/'+listId
            window.location.href=href
        },             
        courseIndex(){
            getCourseList({
                type:'新学说书籍',
                state:'上架',
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.courseList=res.data.list.slice(0,2)
            })
        },   
        bookPop(){
            getBookPopList({
                'type':'ShopHomeTop'
            }).then((res)=>{
                this.bookPopList=res.data.goodList
            })
        },
        bookSale(){
            getBookPopList({
                'type':'ShopHomeSale'
            }).then((res)=>{
                this.bookSaleList=res.data.goodList
            })
        },
        bookCommand(){
            getBookPopList({
                'type':'ShopHomeRecommend'
            }).then((res)=>{
                this.bookCommandList=res.data.goodList
            })
        },
        more(){
            this.$router.push({path:'/list'})
        },
        getQueryStringArgs() {
            var qs = location.search.length > 0 ? location.search.substring(1) : '',
                args = {},
                items = qs.length ? qs.split('&') : [],
                item = null,
                name = null,
                value = null,
                i = 0,
                len = items.length;
            for (i = 0; i < len; i++) {
                    item = items[i].split('=');
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    name = item[0];
                    value = item[1];
                    if (name.length) {
                        args[name] = value;
                    }
            }
            return args;
        }
    },
    created(){
        let that=this
        isSmallRoutine().then(function(data){
            that.isSmallRoutineStatus=data
        })
        setTimeout(wxShareInit.wxReady(this.wxShareInfo),500)
        const data = new URLSearchParams();
        this.courseIndex()
        this.bookPop()
        this.bookSale()
        this.bookCommand()
        // 存取code
        // let args = this.getQueryStringArgs(),
        //     code = decodeURIComponent(args['code']),
        //     storage = window.localStorage
        // storage['wxCode'] = code

        // if(storage.wxCode!='undefined'){
        //     if(storage.openId){}else{
        //         const sendData=new URLSearchParams()
        //         sendData.append('code',code)
        //         this.axios({
        //             method:"post",
        //             url:'/wxPay/get_wx_info.do',
        //             data:sendData
        //         }).then((res)=>{
        //             storage['openId']=res.data.data.openid
        //             storage['headimgurl']=res.data.data.headimgurl
        //             storage['nickname']=res.data.data.nickname
        //         })
        //     }
        // }else{
        //     window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e5ddff7dc5282e&redirect_uri=http%3a%2f%2fdata.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        // }
    }
}
</script>

<style lang="scss">
    .home-com{
        .pl0{
            padding-left: 0;

        }
        .pr160{
            position: relative;
            min-height: 155px;
            @media (max-width: 376px) {
                min-height: 140px;
            }
            @media (max-width: 321px) {
                min-height: 110px;
            }
        }
        .bookList{
            margin-top: 20px;
            .bookListContent{
                margin-bottom: 20px;
            }
            .title{
                font-size: 20px;
                color: #222;
                margin-bottom: 20px;
                letter-spacing: 1px;
                font-weight: 600;
                position: relative;
                padding-left: 10px;
                &::before{
                    display: block;
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 1px;
                    width: 2px;
                    height: 20px;
                    background-color: #3368a9;
                    border-radius: 70px;
                }
            }
            .bookImg{
                border-radius: 4px;
                box-shadow: 0 5px 10px #ccc;
                margin-bottom: 10px;
            }
            .bookName{
                font-weight: 600;
                font-size: 13px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                // -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                min-height: 27px;
                max-height: 27px;
                margin: 6px 0;
            }
            .bookAuthor{
                font-size: 14px;
                color: #777;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                min-height: 20px;
                max-height: 20px;
            }
            .bookPress{
                font-size: 14px;
                color: #205590;
                @media (max-width: 321px) {
                    display: none;
                }
            }
            .bookContentRow{
                margin-bottom: 20px;
                .bookName{
                    margin-top: 0;
                    font-size:18px;
                    min-height: 40px;
                    max-height:40px;
                }
                .bookDesc{
                    color:#777;
                    position: absolute;
                    padding-right: 15px;
                    bottom: 8px;
                    left: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-bottom: 0;
                    min-height: 38px;
                    max-height: 38px;
                }
            }
            .courseContentRow{
                margin-bottom: 10px;
                img{
                    position: relative;
                }
                span{
                    position: absolute;
                    right: 20px;
                    bottom: 12px;
                    font-size: 25px;
                    color: #fff;
                }
                .bookName{
                    margin-top: 0;
                    font-size:18px;
                    min-height: 40px;
                    max-height: 40px;
                }
                .bookDesc{
                    color:#777;
                    position: absolute;
                    padding-right: 15px;
                    bottom: 15px;
                    left: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-bottom: 0;
                    min-height: 38px;
                    max-height: 38px;
                }
            }
        }
        .more{
            position: relative;
            top: -20px;
            color: #777;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f1f1f1;
            padding: 5px;
            border-radius: 5px;
        }

        // scrollNews
        .scrollBox{
            margin-top: 25px;
            // display: flex;
            align-items: center;
            // box-shadow: 0 2px 10px #e4e4e4;
            box-shadow: 0 2px 10px #d2d4d6;
            border-radius: 4px;
            padding: 5px 10px 5px 20px;
            .text{
                // font-size: 19px;
                // font-weight: 700;
                // letter-spacing: 6px;
                // position: relative;
                // left: -7px;
                &::after{
                    // display: block;
                    // content:"";
                    // width: 1px;
                    // height: 50px;
                    // background-color: #eee;
                    // left: 53px;
                    // top: 0;
                    // position: absolute;
                }
            }
            .scrollNews{
                width: 79%;
                margin-left: 10px;
            }
        }
    }
</style>
