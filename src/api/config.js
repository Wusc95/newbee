import { method } from 'lodash'

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
        }

    },
    // 首页
    home: {
        // 获取首页数据
        homeInfo: {
            url: '/index-infos',
            method: 'get'
        },
    }
}