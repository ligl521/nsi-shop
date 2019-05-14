<template>
<div class="searchList-com" ref="list">
        <div class="recommendTitle">推荐书籍</div>
        <div class="container-fluid" style="padding-bottom:0px;display:flex;flex-wrap:wrap;">
            <div class="bookList" v-for="(book,index) in bookList" :key="index">
                <div @click="toDetail(book.id)" class="inbookList">
                    <div class="picBox">
                        <img :src="book.goodsImg" alt="" class="img-responsive">
                    </div>
                    <p class="name">{{book.goodsName}}</p>
                </div>
                
            </div>
        </div>
</div>
</template>

<script>
import {recommmendBookOrCourse} from '../../api/api.js'
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
            //this.$router.push({path:'/detailPage/'+id}); 
           
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/'+id
            window.location.href=href
            localStorage.setItem("isShare",false)
        },
        getData(){
            let that=this
            recommmendBookOrCourse({
                goodsId:that.$route.params.id,
                type:'书籍',
            }).then((res)=>{
                console.log(res)
                let maxSize=res.data.length
                this.bookList=res.data
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
    watch: {
      '$route' (to, from) {
            if(to.params.id!=from.params.id){
                this.getData()
                window.reload()
            }
       }
    },
    created(){
        this.getData()
    },
    mounted(){
        // this.$refs.list.style.minHeight=(window.innerHeight)+"px"
    }
}
</script>

<style lang="scss" scoped>

    .searchList-com{
        // padding-bottom: 45px;
        margin-top:10px;
           border-bottom: 20px solid #f7f5f5;
        ._v-content{
          padding-bottom: 0px;
        }
        .recommendTitle{
            padding:10px 20px;
            font-size:20px;
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
            
            width: 33.333%;
            padding:15px 15px 0 15px;
            .name{
                padding:10px 0px 0 0;
                text-align:center;
                font-size: 12px;
                color: #333;
                font-weight: 200;
                margin:5px 0;
                max-height:61px;
                overflow:hidden;
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