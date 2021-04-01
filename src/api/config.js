import { method } from 'lodash'
import { AddressEdit } from 'vant';

/**
 * 按模块分类
 * 公共模块：common，多个页面或者菜单等获取在common下。
 * 其他模块：根据菜单所给的模块命名规则
 *
 * 基本配置
 * url
 * method
 * // 可选参
 * isRestful: true|false // 是否restful接口
 * responseType: 'arraybuffer'|'blob'|'document'|'json'|'text'|'stream' // 返回数据类型
 */

export default {
    // 公共模块
    common: {},
    // 用户管理模块
    user: {
        // 获取用户信息
        getUserInfo: {
            url: '/user/info',
            method: 'get'
        },
        // 登录
        login: {
            url: '/user/login',
            method: 'post',
            // isRestful:true
        },
        // 退出
        logout: {
            url: '/user/logout',
            method: 'post'
        },
        // 注册
        register: {
            url: '/user/register',
            method: 'post'
        },
        editUserInfo: {
            url: '/user/info',
            method: 'put'
        },

    },
    // 首页
    home: {
        // 获取首页数据
        homeInfo: {
            url: '/index-infos',
            method: 'get'
        },
    },
    // 商品分类模块
    goods: {
        getCategory: {
            url: '/categories',
            method: 'get'
        },
        goodSearch: {
            url: '/search',
            method: 'get'
        },
        goodsDetail: {
            url: '/goods/detail',
            method: 'get'
        }
    },
    // 购物车模块
    cart: {
        addCart: {
            url: '/shop-cart',
            method: 'post'
        },
        modifyCart: {
            url: '/shop-cart',
            method: 'put'
        },


        getCart: {
            url: '/shop-cart',
            method: 'get'
        },


        deleteCartItem: {
            url: '/shop-cart',
            method: 'delete'
        },

        getByCartItemIds: {
            url: '/shop-cart/settle',
            method: 'get'
        }

    },

    // 地址栏模块
    address: {
        addAddress: {
            url: '/address',
            method: 'post'
        },
        editAddress: {
            url: '/address',
            method: 'put'
        },
        deleteAddress: {
            url: '/address',
            method: 'delete'
        },
        getDefaultAddress: {
            url: '/address/default',
            method: 'get'
        },
        getAddressList: {
            url: '/address',
            method: 'get'
        },
        getAddressDetail: {
            url: '/address',
            method: 'get'
        },
    },
    // 订单管理
    order: {
        // 创建订单
        createOrder: {
            url: '/saveOrder',
            method: 'post'
        },
        // 获取订单列表
        getOrderList: {
            url: '/order',
            method: 'get'
        },
        // 根据id获取订单详情
        getOrderDetail: {
            url: '/order',
            method: 'get'
        },
        // 取消订单
        cancelOrder: {
            url: '/order',
            method: 'put'
        },
        // 确认订单
        confirmOrder: {
            url: '/order',
            method: 'get'
        },
        // 支付接口
        payOrder: {
            url: '/paySuccess',
            method: 'get'
        }
    }
}