import {combineReducers} from 'redux'
import user from './user'
import userMessage from './user-message'
import uploadImage from './upload-image'
import productAllClass from './product-allclass'
import productAll from './product-all'
import productPage from './product-page'

export default combineReducers({
    user,
    userMessage,
    uploadImage,
    productAllClass,
    productAll,
    productPage
})