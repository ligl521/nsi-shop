
<template>
    <div class="min">
        <div class="minleft" @click="btnsp">
             <span class="iconfont icon-shipin1"></span>
             <ul>
                 <li>精品课程</li>
                 <li>习休息</li>
             </ul>
        </div>
        <div class="minright">
            <span class="iconfont icon-shu1" @click="btnsj"></span>
             <ul>
                 <li>教育书籍</li>
                 <li>学习学习学休息</li>
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
        height: 90px;
        border: 1px solid #cccccc;
        border-radius: 10px;
       display: flex;
       box-shadow: 0 2px 10px #dde9f1;
       /* align-items: center; */
        /* justify-content:space-around; */
    }
    ul{
       padding: 0;
       margin:0;
       margin-left: 10px;
       margin-top: 20px;
    }
    ul li:first-child{
        font-size: 15px;
       font-weight: 700;
       color:red;
    }
    ul li:last-child{
       font-size: 12px;
    }
    ul li{list-style:none;}
    span{
        margin-left: 5px;
        margin-top: 18px; 
        display: inline;
    }
    .iconfont{
       font-size:33px;
       
    }
    
</style>
