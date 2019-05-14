<template>
    <div class="scrollNews-com">
        <div class="scroll-wrap">
            <ul class="scroll-content" :style="{ top }">
                <li @click="toUrl(item.articleUrl)" v-for="(item,index) in prizeList" :key="index" class="animated" :class="{'fadeInUp':activeIndex===index,'fadeOutUp':activeIndex===index&&fadeOut}">{{item.title}}</li >  
            </ul>
        </div>
    </div>
</template>

<script>
import {getScrollNews} from '@/api/api'
export default {
  data () {
    return {
      prizeList: [],
      activeIndex: 0,
      fadeOut:false
    }
  },
  methods:{
      toUrl(url){
          window.open(url,'_blank')
      }
  },
  computed: {
    top() {
      return - this.activeIndex * 60 + 'px';
    }
  },
  created(){
        getScrollNews({
          'pageNum':1,
          'pageSize': 8
        }).then((res)=>{
            const msg=res.data.list
            // Array.prototype.push.apply(this.prizeList,msg)
            for(let i=0;i<msg.length;i++){
                this.prizeList.push(msg[i])
            }
        })
  },
  mounted() {
    setInterval(_ => {
      if(this.activeIndex < this.prizeList.length-1) {
        this.fadeOut=false
        setTimeout(()=>{
            this.fadeOut=true
        },4000)
        this.activeIndex += 1;
      } else {
        this.fadeOut=false
        setTimeout(()=>{
            this.fadeOut=true
        },4000)
        this.activeIndex = 0;
      }
    }, 5000);
  }
};
</script>

<style lang="scss">
    .scrollNews-com{
        // margin: 35px 0 15px;
        .scroll-wrap{
            width: 100%;
            height: 60px;
            // box-shadow: 0 2px 10px #e4e4e4;
            border-radius: 8px;
            overflow: hidden;
        }
            .scroll-content{
            position: relative;
            padding-left: 0;
            li{
                height: 60px;
                display: flex;
                align-items: center;
                margin-left: 5px;
                color: #232323;
            }
        }
    }
</style>
