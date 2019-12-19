// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './Layout'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import VueScroller from 'vue-scroller';
import 'element-ui/lib/theme-chalk/index.css';
import { store } from '@/store/store'
import { Script } from 'vm';

//阿里矢量图
//import './assets/icon/iconfont.css'
Vue.config.productionTip = false

Vue.prototype.axios = axios

// 李岩
// axios.defaults.baseURL = "http://192.168.0.103:8080/nsi-1.0"

// 罗振
 //axios.defaults.baseURL = "http://192.168.0.7:8080/nsi-1.0"

// 生产
// axios.defaults.baseURL = "http://data.xinxueshuo.cn/nsi-1.0"
axios.defaults.baseURL = "https://data.xinxueshuo.cn/nsi-1.0"
router.afterEach((to, from, next) => { 
    //获取ios系统版本 ios,10版本不兼容出现白屏 提示
    var str = navigator.userAgent.toLowerCase();
    var ver = str.match(/cpu iphone os (.*?) like mac os/);
    //判断ios版本号
    if (ver) {
      var iosVer = ver[1].replace(/_/g, ".");
      var iosVerArr = iosVer.split(".");
      if (iosVerArr[0] < 10){
          var tag = document.createElement('div');
          tag.innerHTML = "当前手机系统版本过低,请升级系统"
          document.getElementsByTagName('body')[0].appendChild(tag);
      } else if (iosVerArr[0] == 10 && iosVerArr[1] <= 4) {
          var tag = document.createElement('div');
          tag.innerHTML = "当前手机系统版本过低,请升级系统"
          document.getElementsByTagName('body')[0].appendChild(tag);
      }
    }


    setTimeout(() => {   
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?e898a1b6e73616a0c84313f55a47efd6";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }, 0);
});

Vue.use(ElementUI);
Vue.use(VueScroller)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { Layout },
    template: '<Layout/>'
})
