import instance from './request'
class Http {

    get(url, config) {
        return instance.get(url, config)
    }

    post(url, data, config) {
        return instance.post(url, data, config)
    }

    put(url, data, config) {
        return instance.put(url, data, config)
    }

    delete(url, config) {
        return instance.delete(url, config)
    }
}

export const http = new Http()

export default http
