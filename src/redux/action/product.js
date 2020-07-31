import {reqFindClassAll,reqAllProduct} from '../../api'
import store from "../store";

export const GetAllClass = () => {
    return (dispatch) => {
        (async function () {
            const res = await reqFindClassAll()
            dispatch({
                type : 'PRODUCT_ALLCLASS',
                allClass : res
            })
        })()
    }
}

export const SaveProductPage = (page) => ({type : 'SAVE_PRODUCT_PAGE',page})

export const GetAllProduct = (condition) => {
    return (dispatch) => {
        (async function () {
            const {create_time, money, currentKey, searchname} = condition
            const page = store.getState().productPage.page
            localStorage.setItem('page',page)
            let ordeyBy = money ? money : create_time
            const res = await reqAllProduct(currentKey, page, 15, '', ordeyBy, searchname)
            dispatch({
                type : 'PRODUCT_ALL',
                allProduct : res
            })
        })()
    }
}