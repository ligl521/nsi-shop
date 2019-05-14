import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/home'
import searchPage from '@/pages/searchPage'
import coursePage from '@/pages/coursePage'
import personalPage from '@/pages/personal'
import detailPage from '@/pages/detailPage'
import detailCourse from '@/components/coursePage/detailCourse'
import orderPage from '@/pages/order'
import addressPage from '@/pages/address'
import searchResultPage from '@/pages/searchResult'
import editAddressPage from '@/components/address/editAddress'
import createAddressPage from '@/components/address/createAddress'
import orderContainerCom from '@/components/order/orderContainer'
import allOrderCom from '@/components/order/allOrder'
import waitPayCom from '@/components/order/waitPay'
import waitSendCom from '@/components/order/waitSend'
import confirmOrderCom from '@/components/order/confirmOrder'
import successOrderCom from '@/components/order/successOrder'
import orderDetailCom from '@/components/order/orderDetail'
import logisticsCom from '@/components/order/logistics'
import giftPage from '@/components/giftCertificate/giftPage'
import servicePage from '@/pages/service'
import feedBackPage from '@/pages/feedBack'
import courseInfoCom from '@/components/coursePage/courseInfo'
import chooseCourseCom from '@/components/coursePage/chooseCourse'
import courseOrderCom from '@/components/coursePage/courseOrder'
import myCoursePage from '@/components/coursePage/myCoursePage'
import allCourse from '@/components/coursePage/allCourse'
import waitPayCourse from '@/components/coursePage/waitPay'
import successCourse from '@/components/coursePage/successCourse'
import serviceDetail from '@/pages/serviceDetail'
import pcPage from '@/pages/judgeIsPc'
import cartPage from '@/components/shoppingCart/shoppingCart'
import invoicePage from '@/components/invoice/invoice'
import offlineCoursePage from '@/components/coursePage/offlineCourse'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: HomePage
        },
        {
            path: '/mine',
            component: personalPage,
        },
        {
            path: '/course',
            component: coursePage
        },
        {
            path: '/orderState',
            component: orderContainerCom,
            redirect: "/orderState/all",
            children: [{
                path: "/orderState/all",
                component: allOrderCom,
                name: 'orderAll'
            }, {
                path: "/orderState/wait",
                component: waitPayCom
            }, {
                path: "/orderState/send",
                component: waitSendCom
            }, {
                path: "/orderState/confirm",
                component: confirmOrderCom
            }, {
                path: "/orderState/success",
                component: successOrderCom
            }]
        },
        {
            path: "/orderdetail/:id",
            name: 'orderDetail',
            component: orderDetailCom
        },
        {
            path: '/list',
            name: 'list',
            component: searchPage
        }, {
            path: '/detailPage/:id',
            name: 'detail',
            component: detailPage
        },
        {
            path: '/detailCourse/:id',
            name: 'detailCourse',
            component: detailCourse,
            redirect: '/detailCourse/courseInfo/:id',
            children: [{
                    path: '/detailCourse/courseInfo/:id',
                    component: courseInfoCom
                },
                {
                    path: '/detailCourse/chooseCourse/:id',
                    component: chooseCourseCom
                }
            ]
        },
        {
            path: '/order',
            component: orderPage
        }, {
            path: '/manageAddress',
            name: 'manageAddress',
            component: addressPage
        }, {
            path: '/editAddress',
            component: editAddressPage
        }, {
            path: '/createAddress',
            component: createAddressPage
        }, {
            path: '/result',
            component: searchResultPage,
            name: 'result'
        }, {
            path: '/logistics',
            component: logisticsCom,
            name: 'logistics'
        }, {
            path: '/giftCenter',
            component: giftPage,
            name: 'gift'
        }, {
            path: '/service',
            component: servicePage,
            name: 'service'
        }, {
            path: '/serviceDetail',
            component: serviceDetail,
            name: 'serviceDetail'
        }, {
            path: '/feedback',
            component: feedBackPage
        },
        {
            path: '/courseorder',
            component: courseOrderCom,
            name: 'courseOrder'
        },
        {
            path: '/mycourse',
            component: myCoursePage,
            redirect: '/mycourse/success',
            children: [{
                    path: '/mycourse/all',
                    component: allCourse
                },
                {
                    path: '/mycourse/wait',
                    component: waitPayCourse
                },
                {
                    path: '/mycourse/success',
                    component: successCourse
                }
            ]
        },
        {
            path: '/cart',
            component: cartPage
        },
        {
            path: '/pc',
            component: pcPage,
            name: 'isPC'
        },
        {
            path: '/invoice',
            component: invoicePage
        }, {
            path: '/offlinecourse/:id',
            component: offlineCoursePage
        }
    ]
})