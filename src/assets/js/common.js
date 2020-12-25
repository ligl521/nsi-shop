import axios from 'axios'
import wx from 'weixin-js-sdk'
/**
 *获取用户微信信息
 *@param {String} url [回调地址]
 */
export function getUsrInfo(url) {
    function getQueryStringArgs() {
        var qs = location.search.length > 0 ? location.search.substring(1) : '',
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    // 存取code
    let storage = window.localStorage
    let args = getQueryStringArgs()
    let code = decodeURIComponent(args['code'])
    localStorage.setItem('wxCode', code)
    console.log('---------------------------')
    console.log("wxCode: "+localStorage.getItem('wxCode'))
    if (storage.getItem('openId')) {} else {
        if (localStorage.getItem('wxCode') == 'undefined') {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e5ddff7dc5282e&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        } else {
            const sendData = new URLSearchParams()
            sendData.append('code', code)
            axios({
                method: "post",
                url: '/wxPay/get_wx_info.do',
                data: sendData
            }).then((res) => {
                localStorage.setItem('openId', res.data.data.openid)
                localStorage.setItem('headimgurl', res.data.data.headimgurl)
                localStorage.setItem('nickname', res.data.data.nickname)
                localStorage.setItem('unionid', res.data.data.unionid)
                const userData = new URLSearchParams()
                userData.append('wechatId', res.data.data.openid)
                userData.append('unionId', res.data.data.unionid)
                axios({
                    method: "post",
                    url: '/user/add_union_id.do',
                    data: userData
                }).then((res) => {
                    console.log(res)
                    location.reload()
                })

            })
        }
    }
}

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    let delay = t || 1000;
    let timer;
    // console.log(fn)
    // console.log(typeof fn)
    return function() {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
};

/**
 * 判断当前是否微信小程序环境,因该是废弃,不敢乱删
 * @return {boolean}
 */

export function isminiprogream() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') { //判断是否是微信环境
        //微信环境
        wx.miniProgram.getEnv((res) => {
            if (res.miniprogram) {
                // 小程序环境下逻辑
            } else {
                //非小程序环境下逻辑
            }
        })
    } else {
        //非微信环境逻辑
    }
}

// export function miniProPayInfo(timeStamp, nonceStr, packageNum, paySign) {
export function miniProPayInfo(body, totalFee, outTradeNo) {
    let jumpUrl = encodeURIComponent('https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/orderState/all')
        // let path = `/pages/pay/pay?timeStamp=${timeStamp}&nonceStr=${nonceStr}&package=${packageNum}&paySign=${paySign}&jumpUrl=${jumpUrl}`
    let path = `/pages/pay/pay?body=${body}&totalFee=${totalFee}&outTradeNo=${outTradeNo}&jumpUrl=${jumpUrl}`
    console.log(path)
    wx.miniProgram.navigateTo({
        url: path
    })
}
//判断是不是小程序环境,异步操作
export function isSmallRoutine(){
    return new Promise(function(resolve,reject){
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') { //判断是否是微信环境
            //微信环境
            wx.miniProgram.getEnv((res) => {
                if (res.miniprogram) {
                    //小程序环境
                    resolve(false)
                } else {
                    //非小程序环境
                    resolve(true)
                }
            })
        } else {
            //不是微信环境
            resolve(true)
        }
    })
}
