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

Vue.config.productionTip = false

Vue.prototype.axios = axios

// 李岩
// axios.defaults.baseURL = "http://192.168.0.13:8080/nsi-1.0"

// 罗振
 //axios.defaults.baseURL = "http://192.168.0.7:8080/nsi-1.0"

// 生产
// axios.defaults.baseURL = "http://data.xinxueshuo.cn/nsi-1.0"
axios.defaults.baseURL = "https://data.xinxueshuo.cn/nsi-1.0"

router.afterEach((to, from, next) => { 
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