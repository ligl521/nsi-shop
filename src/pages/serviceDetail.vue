<template>
    <div class="serviceDetail">
        <p @click="toServicePage()">客服</p>
    </div>
</template>

<script>
export default {
    methods:{
        toServicePage(){
            this.$router.push({path:'/service'})
        }
    }
}
</script>

<style lang="scss">
    .serviceDetail{
        p{
            font-size: 14px;
            position: fixed;
            right: -1px;
            bottom: 100px;
            padding: 4px 5px 4px 15px;
            border-radius: 50px 0px 0 50px;
            background-color: #215089;
            color: #fff;
            letter-spacing: 5px;
            font-weight: 500;
            box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.4);
        }
    }
</style>
