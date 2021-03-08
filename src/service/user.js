// import axios from '../utils/axios' // 二次封装的 axios 
import instance from '@/utils/request/request'
// 获取用户信息
export function getUserInfo() {
    return instance.get('/user/info');
}

// 登录
export function login(params) {
    return instance.post('/user/login', params);
}

// 登出
export function logout() {
    return instance.post('/user/logout')
}

// 注册
export function register(params) {
    return instance.post('/user/register', params);
}