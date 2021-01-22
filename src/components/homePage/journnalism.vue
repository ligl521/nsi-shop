
<template>
    <div>
    <div class="meun" >
        <div class="meun-video" @click="btnvideo">
             <span class="iconfont icon-shipin1"></span>
             <ul>
                 <li>发展报告</li>
                 <!-- <li>学校发展 展望未来</li>              -->
             </ul>
        </div>
        <div class="meun-book" @click="btnbook">
            <span class="iconfont icon-shu1" ></span>
             <ul>
                 <li>市场报告</li>
                 <!-- <li>市场环境 市场研究</li> -->
             </ul>
        </div>
    </div>
    <div class="meun" >
        <div class="meun-video" @click="btnvideo1">
             <span class="iconfont icon-shipin1"></span>
             <ul>
                 <li>限时预售</li>
                 <!-- <li>学校发展 展望未来</li>              -->
             </ul>
        </div>
        <div class="meun-book" @click="btnbook1">
            <span class="iconfont icon-shu1" ></span>
             <ul>
                 <li>最新内参</li>
                 <!-- <li>市场环境 市场研究</li> -->
             </ul>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    methods: {
        btnvideo:function() {
            // this.$router.push({
            //     path:"/course"
            // })
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/79'
            window.location.href=href
        },
        btnvideo1:function() {
            // this.$router.push({
            //     path:"/course"
            // })
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/81'
            window.location.href=href
        },
        btnbook:function () {
            // this.$router.push({
            //     path:"/list"
            // })
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/76'
            window.location.href=href
        },
        btnbook1:function () {
            // this.$router.push({80
            //     path:"/list"
            // })
            let href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/80'
            window.location.href=href
        }  
    }
}
</script>

<style scoped>
    .meun{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }
    .meun-video,.meun-book{
        width: 48%;
        height: 60px;
        line-height: 60px;
        margin-top: 16px;
        padding-left: 10px;
        /* border: 1px solid #cccccc;
        border-radius: 10px; */
       display: flex;
       /* box-shadow: 0 2px 10px #dde9f1; */
       /* background: #d2d4d6; */

         box-shadow: 0 2px 10px #d2d4d6;
         border-radius: 4px;
       /* align-items: center; */
        /* justify-content:space-around; */
    }
    ul{
       padding: 0;
       margin:0;
       margin-left: 12px;
       /* margin-top: 14px; */
    }
    ul li:first-child{
        font-size: 16px;
        font-weight: 700;
        color: #777;
    }
    /* ul li:last-child{
       font-size: 12px;
       margin-top: 2px;
       color: #777;
    } */
    ul li{
        list-style:none;
    }
    span{
        margin-left: 0px;
        display: inline;
        /* margin-top: 9px;  */
    }
    .iconfont{
        color: #20528f;
       font-size:33px;
       
    }
    
</style>
