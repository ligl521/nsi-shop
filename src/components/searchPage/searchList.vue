<template>
<div class="searchList-com" ref="list">
    <scroller :on-infinite="infinite" ref="myscroller" class="scroller-com"  v-loading="loading">
        <div class="container-fluid" style="padding-bottom:15px">
            <!-- search -->
            <!-- searchList -->
            <div class="row bookList" v-for="(book,index) in bookList" :key="index" @click="toDetail(book.id)">
                <div class="col-xs-4">
                    <div class="picBox">
                        <img :src="book.goodsImg" alt="" class="img-responsive">
                    </div>
                </div>
                <div class="col-xs-8 pl0">
                    <div class="infoBox">
                        <!-- <p class="englishName">{{book.englishName}}</p> -->
                        <p class="name">{{book.goodsName}}</p>
                        <p class="author">{{book.goodsAuthor}}</p>
                        <p class="bookInfo">{{book.goodsDescribe}}</p>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</div>
</template>

<script>
import {getBookList} from '@/api/api'
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
        toDetail(id){
            // let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            // window.location.href=routeData.href
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/'+id
            window.location.href=href
            localStorage.setItem("isShare",false)
        },
        getData(){
            getBookList({
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
    .searchList-com{
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
            padding-top: 70px;
        }
        .bookList{
            margin-bottom: 20px;
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
                font-size: 19px;
                color: #232323;
                font-weight: 600;
            }
            .author{
                font-size: 14px;
                color: rgb(141, 141, 141);
            }
            .bookInfo{
                padding-right: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                position: absolute;
                bottom: 8px;
                left: 0;
                color: rgb(83, 83, 83);
                max-height: 60px;
            }
        }
    }
</style>
