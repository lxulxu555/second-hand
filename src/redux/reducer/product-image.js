const init = {
    imageList : []
}
export default(state=init,action) => {
    switch (action.type) {
        case 'SAVE_PRODUCT_IMAGE' :
            return {...init,imageList:action.imageList}
        default :
            return state
    }
}