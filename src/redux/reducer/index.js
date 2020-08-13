import {combineReducers} from 'redux'
import user from './user'
import userMessage from './user-message'
import uploadAvatarImage from './upload-avatar-image'
import productAllClass from './product-allclass'
import productAll from './product-all'
import productPage from './product-page'
import productScroll from './product-scroll'
import productDetail from './product-detail'
import productImage from './product-image'
import buyAll from './buy-all'
import userReplayByMe from './user-replay-by-me'

export default combineReducers({
    user,
    userMessage,
    uploadAvatarImage,
    productAllClass,
    productAll,
    productPage,
    productScroll,
    productDetail,
    productImage,
    buyAll,
    userReplayByMe
})