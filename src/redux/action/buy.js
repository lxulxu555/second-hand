import {reqAddBuyProduct, reqBuyProduct, reqLookUpWantBuy,reqDeleteBuyProduct,reqUpdateBuyProduct} from '../../api'
import {message} from 'antd'

export const PutNewBuy = (condition,callback) => {
    return (dispatch) => {
        (async() => {
            const res = await reqAddBuyProduct(condition)
            const {msg,code} = res
            if(code === 0){
                message.success(msg)
                callback()
            } else {
                message.error(msg)
            }
        })()
    }
}

export const AllBuy = (condition) => {
    return (dispatch) => {
        (async () => {
            let res
            if(condition.title !== ''){
                res = await reqLookUpWantBuy(condition)
            }else{
                res = await reqBuyProduct(condition)
            }
            dispatch({
                type : 'BUY_ALL',
                buyAll : res
            })
        })()
    }
}

export const DeleteBuy = (id,callback) => {
    return (dispatch) => {
        (async() => {
            const res = await reqDeleteBuyProduct(id)
            if(res.code === 0){
                message.success('删除成功')
                callback()
            }else{
                message.error(res.msg)
            }
        })()
    }
}

export const UpdateBuy = (condition,callback) => {
    return (dispatch) => {
        (async() => {
            const res = await reqUpdateBuyProduct(condition)
            if(res.code === 0){
                message.success('更新成功')
                callback()
            }else{
                message.error(res.msg)
            }
        })()
    }
}