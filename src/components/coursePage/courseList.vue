<template>
    <div class="courseList-com" ref="list">
        <!-- <scroller :on-infinite="infinite" ref="myscroller" class="scroller-com"> -->
            <div class="container-fluid" style="padding-bottom:15px;margin-top:15px;" v-loading="loading">
                <!-- search -->
                <!-- searchList -->
                <div class="row bookList" v-for="(book,index) in bookList" :key="index" @click="toDetail(book)">
                    <div class="col-xs-4">
                        <div class="picBox">
                            <span v-show="book.listType!='录播课'" :class="{listType2:book.listType=='线下课'}" class="listType">{{book.listType}}</span>
                            <img :src="book.listImg" alt="" class="img-responsive">
                            <!-- <img src="../../assets/course.jpg" alt="" class="img-responsive"> -->
                            <span class="iconfont icon-bofang listlogo"></span>
                        </div>
                    </div>
                    <div class="col-xs-8 pl0">
                        <div class="infoBox">
                            <!-- <p class="englishName">{{book.englishName}}</p> -->
                            <p class="name">{{book.listTitle}}</p>
                            <p class="bookInfo">{{book.syllabus}}</p>
                            <p class="author">{{book.lecturer}}</p>
                            <p class="price" v-if="book.listPrice!=0">原价 ￥{{book.listPrice}}.00</p>
                            <p class="price" v-else>即将上线</p>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </scroller> -->
    </div>
</template>

<script>
import {getCourseList} from '@/api/api'
export default {
    data() {
        return {
            loading:true,
            noDate:false,
            bookList:[],
            pageNum:1,
            pageSize:8
        }
    },
    methods:{
        toDetail(item){
            // console.log(item)
            if(item.listPrice!=0){
                if(item.listType!='录播课'){
                    window.location.href=item.listTheme
                    return;
                }
                localStorage.setItem('courseId',item.listId)
                localStorage.setItem('courseImg',item.listImg)
                localStorage.setItem('coursePrice',item.listPrice)
                localStorage.setItem('courseTitle',item.listTitle)
                localStorage.setItem('courseTheme',item.listTheme)
                localStorage.setItem('coursePrice',item.listPrice)
                // let routeData =this.$router.resolve({name:"detailCourse",params:{id:item.listId}})
                // window.location.href=routeData.href
                let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailCourse/courseInfo/'+item.listId
                window.location.href=href
            }else{
                this.$message({
                    message: '课程筹备中，敬请期待',
                    type: 'warning',
                    duration:1500
                });
            }
        },
        getData(){
            getCourseList({
                type:'新学说书籍',
                state:'上架',
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                // console.log(res.data)
                 let maxSize=res.data.list.length
                if(this.pageNum==1){
                    this.bookList=res.data.list
                    // console.log(this.bookList)
                }else{
                    if(maxSize!=0){
                        this.bookList=this.bookList.concat(res.data.list)
                    }else{
                        this.noDate=true
                    }
                }
                this.loading=false
            })
        },
        infinite(done){
            let that=this
            if(this.noDate){
                this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
            }else{
                if(this.noDate){
                    done(true)
                }else{
                    setTimeout(() => {
                        that.pageNum++;//下拉一次页数+1
                        that.getData();
                        done();//进行下一次加载操作
                    }, 1500);
                }
            }
        },
    },
    created(){
        this.getData()
    },
    mounted(){
        // this.$refs.list.style.minHeight=(window.innerHeight)+"px"
    }
}
</script>

<style lang="scss">
    .courseList-com{
                // padding-bottom: 45px;
        ._v-content{
          padding-bottom: 45px;
        }

        .pl0{
            padding-left: 0;
        }
        .pt30{
            padding-top: 30px;
        }
        .mt15{
            margin-top: 15px;
        }
        img{
            display: inline-block !important;
            border-radius: 4px;
            box-shadow: 0 5px 10px #ccc;
        }
        .scroller-com{
            padding-bottom: 45px;
            padding-top: 15px;
        }
        .bookList{
            margin-bottom: 10px;
        }
        .picBox{

            position: relative;
            .listType{
                position:absolute;
                left:0;
                top:0;
                background:#ff6618;
                color:#fff;
                padding:2px 5px 0 5px;
                font-size:12px;
                border-radius: 4px 0 5px 0;
                border:0;
            }
            .listType2{
                background:#67C23A;
            }
            .listlogo{
                position: absolute;
                right: 8px;
                bottom: 3px;
                font-size: 25px;
                color: #fff;
            }
        }
        .infoBox{
            min-height: 155px;
            max-height: 155px;
            @media (max-width: 376px) {
                min-height: 140px;
                max-height: 140px;
            }
            @media (max-width: 351px) {
                min-height: 111px;
                max-height: 111px;
            }
            p{
                margin-bottom: 3px;
            }
            .englishName{
                font-size: 22px;
                color: #333;
                // font-weight: 600;
                font-family: -webkit-pictograph,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .name{
                font-size: 17px;
                color: #1c1f21;
                font-weight: 600;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                // min-height: 54px;
                max-height: 54px;
                line-height: 24px;
                margin-bottom: 8px;
                @media (max-width:376px) {
                    -webkit-line-clamp: 1;
                    max-height: 24px;
                }
            }
            .author{
                font-size: 12px;
                color: #9199a1;
            }
            .bookInfo{
                padding-right: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                // position: absolute;
                // bottom: 8px;
                // left: 0;
                color: #545c63;
                max-height: 36px;
                // min-height: 36px;
                font-size: 14px;
                line-height: 18px;
                margin-bottom: 10px;
            }
            .price{
                font-size: 12px;
                color: #9199a1;
                text-align: left;
                line-height: 26px;
            }
        }
    }
</style>
