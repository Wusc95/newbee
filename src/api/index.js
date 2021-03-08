import { transform, omit } from 'lodash'
import http from '@/utils/request'
import config from './config'
// console.log(config,'dsx')
export const apiList = transform(config, (result, item, key) => {
    result[key] = transform(item, (moduleRequest, conf, reqKey) => {
        moduleRequest[reqKey] = (data = {}, config = {}) => {
            let restfulParams = ''
            if (data.restful) { restfulParams = Object.values(data.restful).join('/') }
            if (['get', 'delete'].includes(conf.method)) {
                return http[conf.method](restfulParams ? `${conf.url}/${restfulParams}` : conf.url, Object.assign(config, omit(data, 'restful') || {}, { responseType: conf.responseType }))
            }
            return http[conf.method](restfulParams ? `${conf.url}/${restfulParams}` : conf.url, data.data || {}, Object.assign(config, omit(data, ['restful', 'data']) || {}, { responseType: conf.responseType }))
        }
    }, {})
}, {})

export default function (Vue) {
    if (Vue.installed) return
    Vue.api = Vue.prototype.$api = apiList
}
