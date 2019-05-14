<template>
    <div class="searchResult-com" ref="list">
        <div class="container-fluid searchContainer">
            <h4 class="text-center title"><span class="iconfont icon-zuojiantou" @click="backPrePage"></span>搜索</h4>
            <div class="searchBox">
                <div class="searchContent">
                    <span class="iconfont icon-sousuo"></span>
                    <input type="text" autofocus @click="isClick" @keyup.enter="getSearchData(searchKey)" v-model="searchKey" name="search" class="txt" placeholder="输入你想搜索的书籍">
                </div>
                <span class="toSearch" @click="getSearchData(searchKey)">搜索</span>
            </div>
            <div :class="ishotKey ? 'show':'hide'">
                <p class="hotKey">热门搜索</p>
                <div class="bookName">
                    <span  v-for="(item,index) in CommandName" :key="index" @click="toEnter(item.id)">{{item.goodsName}}</span>
                </div>
            </div>
            <div class="searchResultTxt" v-if="searchTotal>0&&notClickFlag">共搜到{{searchTotal}}条与<span>{{'"'+searchKey+'"'}}</span>相关的结果</div>
        </div>
        <div class="container-fluid">
            <scroller :on-infinite="infinite" ref="myscroller" class="scroller-com" :style="'padding-top:'+searchListTop+'px'">
                <div class="container-fluid" style="padding-bottom:15px">
                    <!-- search -->
                    <!-- searchList -->
                    <div class="row bookList" v-for="(book,index) in searchList" @click="toDetail(book.id)" :key="index">
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
    </div>
</template>

<script>
import {getBookList,getBookPopList} from '@/api/api'
export default {
    data() {
        return {
            noDate:false,
            bookList:[],
            searchList:[],
            pageNum:0,
            pageSize:8,
            searchKey:'',
            searchNum:1,
            searchSize:8,
            searchTotal:0,
            notClickFlag:true,
            searchListTop:105,
            CommandName:[],
            ishotKey:true
        }
    },
    methods:{
        backPrePage(){
            if(history.length>0){
                history.go(-1)
            }else{
                location.href="https://www.xinxueshuo.cn/nsi-shop/dist/index.html"
            }
        }, 
        toDetail(id){
            localStorage.setItem("isShare",false)
            // let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            // window.location.href=routeData.href
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/'+id
            window.location.href=href
        },
        isClick(){
            this.notClickFlag=false
            this.searchListTop=105
            this.searchNum=1
        },
        searchCount(){
            getBookPopList({
                'type':'ShopHomeRecommend'
            }).then((res)=>{
                this.CommandName=res.data.goodList
            })
        },
        toEnter(id){
            // let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            // window.location.href=routeData.href
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/'+id
            window.location.href=href
        },
        getData(){  
            // console.log(this.searchKey)
            const data = new URLSearchParams();
            data.append('type', '新学说书籍');
            data.append('state', '上架');
            data.append('pageNum', this.pageNum);
            data.append('pageSize', this.pageSize);
            data.append('searchKey', this.searchKey);
            this.axios({
                method:'post',
                url:'/goods/goods_list.do',
                data:data
                }).then((res)=>{
                // console.log(res.data.data)
                let maxSize=res.data.data.list.length
                if(this.pageNum==1){
                    this.bookList=res.data.data.list
                }else{
                    if(maxSize!=0){
                        this.bookList=this.bookList.concat(res.data.data.list)
                    }else{
                        this.noDate=true
                    }
                }
            })
        },
        getSearchData(key){
            getBookList({
                type:'新学说书籍',
                state:'上架',
                pageNum:this.searchNum,
                pageSize:this.searchSize,
                searchKey:key
            }).then(res=>{
                this.ishotKey=false
                this.notClickFlag=true
                this.searchListTop=135
                // console.log(res.data.data)
                let maxSize=res.data.list.length
                this.searchTotal=res.data.total
                if(this.searchNum==1){
                    if(maxSize!=0){
                        this.searchList=res.data.list
                    }else{
                        this.noDate=true
                        this.searchList=[]
                        this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
                    }
                }else{
                    if(maxSize!=0){
                        this.searchList=this.searchList.concat(res.data.list)
                    }else{
                        this.noDate=true
                        this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
                    }
                }
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
                        if(this.searchKey!=''){
                            that.searchNum++;
                            that.getSearchData(this.searchKey)
                            done()
                        }else{
                            // that.pageNum++;//下拉一次页数+1
                            // that.getData();
                            // done();//进行下一次加载操作
                        }
                    }, 1500);
                }
            }
        },
    },
    created(){
        // this.getData()
        this.searchCount()
    },
    mounted(){
        this.$refs.list.style.minHeight=(window.innerHeight-45)+"px"
        this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
    }
}
</script>

<style lang="scss">
    .searchResult-com{
       ._v-content{
          padding-bottom: 115px;
        }
        padding-bottom: 45px;
        .pl0{
          padding-left: 0;
        }
        .searchContainer{
          width: 100%;
          background-color: #fff;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 999;
        }
        .title{
            position: relative;
            font-weight: 500;
            span{
                position: absolute;
                left: 0;
            }
        }
        .searchBox{
            display: flex;
            align-items: center;
            width: 100%;
            margin-top: 15px;
            .searchContent{
                background-color: #f5f5f5;
                border-radius: 20px;
                height: 40px;
                line-height: 40px;
                padding-left: 15px;
                width: 85%;
                display: flex;
                align-items: center;
                .txt{
                    border: none;
                    outline: none;
                    width: 90%;
                    background-color: transparent;
                    padding-left: 10px;
                    display: flex;
                    align-items: center;
                }
            }
            .toSearch{
                font-size: 16px;
                color: #888;
                margin-left: 10px;
            }
        }
        .hotKey{
            font-size: 16px;
            margin: 14px 10px 0;
            font-weight: bold;
        }
        .bookName{
            span{
                background-color: #f7f7f7;
                color:#777;
                padding: 5px 20px;
                border-radius: 10px;
                margin: 8px 7px;
                display: inline-block;
                &:first-of-type{
                    margin-top:15px;
                }
            }
        }

        // 内容
        img{
            display: inline-block !important;
            border-radius: 4px;
            box-shadow: 0 5px 10px #ccc;
        }
        .scroller-com{
            padding-bottom: 45px;
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
                bottom: 0;
                left: 0;
                color: rgb(83, 83, 83);
                max-height: 60px;
            }
        }
        .searchResultTxt{
            font-weight: 500;
            margin: 10px 10px 5px 10px;
            color: #888;
            // position: relative;
            // z-index: 999;
            // top: 130px;
            span{
                color: #3368a9
            }
        }
    }
</style>
