import axios from 'axios'
import {message} from 'antd'

export  function ajax(url,data={},type='GET') {
    return new Promise((resolve,reject) => {
        let promise
        if(type==='GET'){
            promise = axios.get(url,{
                params : data
            })
        }else if(type === 'POST'){
            promise = axios.post(url,data)
        }else if(type === 'PUT'){
            promise = axios.put(url,data)
        } else if(type === 'DELETE'){
            promise = axios.delete(url,{
                params : data
            })
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了' + error.message)
        })
    })
}

