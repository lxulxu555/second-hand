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
            const result = response.data
            resolve(result)
            if(result.code === 0){
                message.success(result.msg)
            }else if(result.code === -1){
                message.error(result.msg)
            }
        }).catch(error => {
            if(error.response.status === 401){
                resolve(error.response.data)
            }else{
                message.error('请求出错了' + error.message)
            }
        })
    })
}

