<template>
    <div class="coursePage-com" ref="list">
        <!-- <div class="container searchContainer">
            <search/>
        </div> -->
        <course-list/>
    </div>
</template>

<script>
import search from '@/components/homePage/search'
import courseList from '@/components/coursePage/courseList'
export default {
    components:{
        search,
        courseList
    },
    mounted(){
      this.$refs.list.style.height=(window.innerHeight-45)+"px";
    }
}
</script>

<style lang="scss">
    .coursePage-com{
        // scrollNews
        .searchContainer{
            background-color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            padding-bottom: 15px;
            width: 100%;
        }
    }
</style>
