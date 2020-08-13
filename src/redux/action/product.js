import {
    reqFindClassAll,
    reqAllProduct,
    reqFindIdProduct,
    reqSaveComment,
    reqReplayComment,
    reqLikeComment,
    reqAddProduct,
    reqUpdateProduct,
    reqDeleteProduct
} from '../../api'
import {message} from 'antd'
import store from "../store";

export const GetAllClass = () => {
    return (dispatch) => {
        (async function () {
            const res = await reqFindClassAll()
            dispatch({
                type: 'PRODUCT_ALLCLASS',
                allClass: res
            })
        })()
    }
}

export const GetAllProduct = (condition) => {
    return (dispatch) => {
        (async function () {
            const {create_time, money, currentKey, searchname,page,userid} = condition
            let ordeyBy = money ? money : create_time
            const res = await reqAllProduct(currentKey, page, 30, userid, ordeyBy, searchname)
            dispatch({
                type: 'PRODUCT_ALL',
                allProduct: res
            })
        })()
    }
}

export const GetProductDetail = (id) => {
    return (dispatch) => {
        (async function () {
            const userId = store.getState().user.id
            const res = await reqFindIdProduct(id, userId)
            dispatch({
                type: 'PRODUCT_DETAIL',
                productDetail: res
            })
        })()
    }
}

export const SendComment = async (content, userid, goodsid, callback) => {
    const res = await reqSaveComment(content, userid, goodsid)
    const {msg} = res
    res.code === 0 ? message.success(msg) : message.error(msg)
    callback()
}

export const ReplyComment = async (reply, callback) => {
    const res = await reqReplayComment(reply)
    const {msg} = res
    res.code === 0 ? message.success(msg) : message.error(msg)
    callback()
}

export const LikeComment = async () => {
    await reqLikeComment
}

export const PutNewProduct = (values,callback) => {
    return (dispatch) => {
        (async () => {
            const list = []
            const {user,productImage} = store.getState()
            const {imageList} = productImage
            list.push(imageList.map(item => (item.url)))
            values.userid = user.id
            values.images = list.toString()
            if(values.classify2_id){
                const res = await reqAddProduct(values)
                console.log(res)
                if(res.code === 0){
                    message.success('添加成功')
                    callback()
                }else{
                    message.error(res.msg)
                }
            }else{
                message.error('请选择二级分类')
            }
        })()
    }
}

export const SaveProductPage = (page) => {
    return (dispatch) => {
        (async() => {
            localStorage.setItem('page',page)
            dispatch({
                type: 'SAVE_PRODUCT_PAGE',
                page
            })
        })()
    }
}

export const UpdateProductInfo = (condition,callback) => {
    return (dispatch) => {
        (async() => {
           const res =  await reqUpdateProduct(condition)
            if(res.code === 0){
                message.success('更新成功')
                callback()
            }else{
                message.error(res.msg)
            }
        })()
    }
}


export const DeleteProduct = (id,callback) => {
    return (dispatch) => {
        (async() => {
            const res = await reqDeleteProduct(id)
            if(res.code === 0){
                message.success('删除成功')
                callback()
            }else{
                message.error(res.msg)
            }
        })()
    }
}

export const SaveScroll = (scroll) => ({type: 'SAVE_PRODUCT_SCROLL', scroll})

export const SaveProductImage = (imageList) => ({type: 'SAVE_PRODUCT_IMAGE',imageList})