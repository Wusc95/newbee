// yyyy-mm转换为yyyymm
import Vue from 'vue'
Vue.filter('formatDataMonth', function (val) {
    if (!val) return ''

    let year = val.substring(0, 4)
    let month = val.substring(5)

    return year + month
})

// 图片路径处理
Vue.filter('prefix', function (url) {
    if (url && (url.includes('http') || url.includes('https'))) {
        return url;
    } else {
        url = `http://47.99.134.126:28019${url}`;
        return url;
    }
})