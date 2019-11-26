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
        bookDepot:"https://www.xinxueshuo.cn/nsi-shop/dist/index.html/?from=singlemessage&isappinstalled=0#/list",
        // bookDepot:"https://www.xinxueshuo.cn/nsi-shop/dist/index.html?code=021R5bdD0pglzk2rR1dD00JddD0R5bdu&state=STATE#/course",
        wxShareInfo:{
                title:"新学说 | 国际教育研究院",
                imgUrl:"https://data.xinxueshuo.cn/upImage/upInstitutionImg/100062/100062-logo.jpg",
                href:"",
                desc:"国际教育研究院，一站式解决国际化学校人才职业培训和能力提升"
            }
      }
    },
    mounted(){
      // this.bookDepot = window.location.href;
      console.log(this.bookDepot.indexOf("?"))
      // console.log(this.bookDepot.substr(this.bookDepot.indexOf("?")-1,1))
      let temporaryStr = this.bookDepot.indexOf("?")-1,
          temporaryStrTwo = this.bookDepot.substr(temporaryStr,1);
      if(temporaryStrTwo == "/"){

        var aa = this.bookDepot.match(/.html(\S*)/)[1].replace(/^[/]/,'');
        var cc = this.bookDepot.match(/(\S*).html/)[0];
        this.bookDepot = cc + aa;
        console.log(this.bookDepot)
        // var bb = aa.splice(0)
        // let reg = //;
        // this.bookDepot.replace(reg,'html')
        // console.log(this.bookDepot)
      }
      if(this.bookDepot.indexOf("?")!=-1){                        //判断是否存在参数
        let reg = /[?&]([^=&#]+)=([^*#]*)/g;
        // let reg = /(\?|#)/;
        this.bookDepot = this.bookDepot.replace(reg, '');           //去除参数
      }
      this.wxShareInfo.href = this.bookDepot;
      console.log(this.wxShareInfo.href )


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
