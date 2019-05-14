
<template>
    <div class="min">
        <div class="minleft" @click="btnsp">
             <span class="iconfont icon-shipin1"></span>
             <ul>
                 <li>精品课程</li>
                 <li>市场招生&nbsp升学指导</li>             
             </ul>
        </div>
        <div class="minright">
            <span class="iconfont icon-shu1" @click="btnsj"></span>
             <ul>
                 <li>教育书籍</li>
                 <li>校长推荐&nbsp教育图书</li>
             </ul>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        btnsp:function() {
            this.$router.push({
                path:"/course"
            })
        },
        btnsj:function () {
            this.$router.push({
                path:"/list"
            })
        }   
    }
}
</script>

<style scoped>
    .min{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }
    .minleft,.minright{
        width: 48%;
        height: 65px;
        margin-top: 16px;
        padding-left: 12px;
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
       margin-left: 15px;
       margin-top: 10px;
    }
    ul li:first-child{
        font-size: 16px;
        font-weight: 700;
        color:#222;
    }
    ul li:last-child{
       font-size: 12px;
       margin-top: 2px;
    }
    ul li{
        list-style:none;
    }
    span{
        margin-left: 0px;
        margin-top: 9px; 
        display: inline;
    }
    .iconfont{
       font-size:33px;
       
    }
    
</style>
