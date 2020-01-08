import {combineReducers} from 'redux'
import {SAVE_PRODUCT_PAGE} from './action-type'

function page(state = 1 ,action) {
    switch (action.type) {
        case SAVE_PRODUCT_PAGE :
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    page
})