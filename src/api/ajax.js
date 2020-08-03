// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import {message} from 'antd'



axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api'

// 请求拦截器
axios.interceptors.request.use(config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.withCredentials = true // 开启这个，后台服务器才能拿到cookie
    const token = localStorage.getItem('Token')
    token && (config.headers.token = token)
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
// eslint-disable-next-line handle-callback-err
}, error => {
    if (error.response.status) {
        switch (error.response.status) {
            case 401:
                message.error(error.response.data.msg)
                const user = localStorage.getItem('user')
                window.localStorage.removeItem('Token')
                window.localStorage.removeItem('User')
                if(user){
                    window.location.reload()
                }
                break
            case 403:
                console.log('当状态码为403时操作')
                break
            case 404:
                message.error('找不到该网页')
                break
            default:
                console.log('其他错误，直接抛出错误提示')
        }
        return Promise.reject(error.response)
    }
})

// get
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(
            res => {
                resolve(res.data)
            }
        ).catch(error => {
            reject(error.data)
        })
    })
}

export const DELETE = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
        }).then(
            res => {
                resolve(res.data)
            }
        ).catch(error => {
            reject(error.data)
        })
    })
}

// post
export const post = (url, ...params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, ...params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    }).catch((e) => {
        return e
    })
}

export const put = (url, ...params) => {
    return new Promise((resolve, reject) => {
        axios.put(url, ...params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

export const patch = (url, params) => {
// 将数据转换为formData格式
// 正常情况下可以直接使用参数对象进行patch，如果出错可以尝试转换form Data
    var formData = new FormData()
    formData.append('username', params.username)
    formData.append('password', params.password)
    return new Promise((resolve, reject) => {
        axios
            .patch(url, formData)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
