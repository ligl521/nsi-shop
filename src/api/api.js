import {get, post } from '@/api/http'

// 首页banner
export const getHomeBanner = p => get('/manager/official/list.do', p)

// 滚动新闻
export const getScrollNews = p => post('/article/list.do', p)

// 课堂列表
export const getCourseList = p => post('/courseList/get_course_list.do', p)

// 课堂详情
export const getCourseDetail = p => get('/category/list.do', p)

//首页课堂详情
export const getFcourseDetail = p => get('/courseList/get_course_item.do', p)

// 书籍列表
export const getBookList = p => post('/goods/goods_list.do', p)

// 首页最受欢迎、特价、推荐书籍
export const getBookPopList = p => post('/goods/Get_Home_Config.do', p)

// 地址创建
export const createAddress = p => get('/ShopAddress/add.do', p)

// 地址更换
export const editAddress = p => get('/ShopAddress/update.do', p)

// 获取地址
export const getAddress = p => get('/ShopAddress/getList.do', p)

// 判断用户注册完整
export const judgeuserInfo = p => get('/order/valid_userInfo.do', p)

// 用户信息补全
export const complementInfo = p => post('/order/mall_register.do', p)

// 创建课程订单
export const createCourseOrder = p => get('/order/create_course.do', p)

// 微信支付
export const wxPay = p => get('/Pay/WxPay_public.do', p)

// 验证课程权限
export const checkCoursePrivilege = p => get('/ClassUser/vierify_open.do', p)

// 插入课程观看权限
export const insertCoursePrivilege = p => get('/ClassUser/shopCourse_User_Insert.do', p)

// 检测邮箱是否注册
export const checkEmailIsLogin = p => post('/user/UserMailCheck.do', p)

// 查询我的课程
export const myCourse = p => get('/order/get_order_course_list.do', p)

// 根据大课程id查询该课程信息
export const getBigCourseDetail = p => get('/courseList/get_course_item.do', p)

// 根据课程id 微信id验证课程观看权限
export const checkOpenIdCourseIdPrivilege = p => get('/ClassUser/verify_open_by_wechatid.do', p)

// 创建购物车id
export const createCartId = p => post('/ShopCart/create.do', p)

// 更新购物车
export const updateCart = p => post('/ShopCart/updateCart.do', p)

// 锁定购物车
export const lockCart = p => post('/ShopCart/lockCart.do', p)

// 根据cid获取购物车详情
export const getCartDetail = p => post('/ShopCart/cartDetail.do', p)

// 创建购物车订单
export const createCardOrder = p => post('/order/create_cart.do', p)

// 返回购物车列表
export const getCartList = p => get('/order/get_order_cart_list.do', p)

//发票提交申请验证是否存在
export const getCheckInvoice = p => get('/Invoice/check_invoice.do', p)

// 创建发票
export const createInvoice = p => post('/Invoice/ShopInvoiceCreate.do', p)
// 推荐图书或书籍
export const recommmendBookOrCourse = p => post('/ShopRecommend/getRecommend.do', p)
// 报错
export const apiError = p => post('/CommonApi/ErrorNotify.do', p)

