import axios from 'axios'
import { Toast } from 'vant'

const instance = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? '//47.99.134.126:28019/api/v1' : '//47.99.134.126:28019/api/v1',
    timeout: 600000,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(config => {
    config.headers['token'] = localStorage.getItem('token') || ''
    return config
}, err => Promise.reject(err))

instance.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.fail('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.resultCode != 200) {
        if (res.data.message) Toast.fail(res.data.message)
        if (res.data.resultCode == 416) {
            // 返回 416 代表没有登录状态，路由跳转到/login 页面（目前还为创建组件），这里的 window.vRouter 是在
            // main.js 里面设置好的 window.vRouter = router
            window.vRouter.push({ path: '/login' })
        }
        return Promise.reject(res.data)
    }

    return res.data
}, err => { return Promise.reject(err) })

export default instance