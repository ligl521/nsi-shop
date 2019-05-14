<template>
    <div class="searchList-com" ref="list">
        <div class="container-fluid searchContainer">
            <search/>
        </div>
        <search-list/>
    </div>
</template>

<script>
import searchList from '@/components/searchPage/searchList';
import search from '@/components/homePage/search'
import wxShareInit from '@/assets/js/weChatShare.js';
export default {
    components:{
        searchList,
        search
    },
    data() {
      return {
        wxShareInfo:{
                title:"新学说 | 国际教育研究院",
                imgUrl:"https://data.xinxueshuo.cn/upImage/upInstitutionImg/100062/100062-logo.jpg",
                href:'https://www.xinxueshuo.cn/nsi-shop/dist/index.html',
                desc:"国际教育研究院，一站式解决国际化学校人才职业培训和能力提升"
            }
      }
    },
    mounted(){
      setTimeout(wxShareInit.wxReady(this.wxShareInfo),30)
      this.$refs.list.style.height=(window.innerHeight-45)+"px";
    }
}
</script>

<style lang="scss">
  .searchList-com{
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
