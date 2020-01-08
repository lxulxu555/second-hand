import {SAVE_PRODUCT_PAGE} from './action-type'
import Page from '../utils/page'

//储存商品里面的分页
export const saveProductPage = (page) => {
    Page.SavePage(page)
    return {type: SAVE_PRODUCT_PAGE, data: page}
}