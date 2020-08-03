import {
    reqFindClassAll,
    reqAllProduct,
    reqFindIdProduct,
    reqSaveComment,
    reqReplayComment,
    reqLikeComment
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
            const {create_time, money, currentKey, searchname} = condition
            const page = store.getState().productPage.page
            localStorage.setItem('page', page)
            let ordeyBy = money ? money : create_time
            const res = await reqAllProduct(currentKey, page, 30, '', ordeyBy, searchname)
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

export const SaveProductPage = (page) => ({type: 'SAVE_PRODUCT_PAGE', page})

export const SaveScroll = (scroll) => ({type: 'SAVE_PRODUCT_SCROLL', scroll})