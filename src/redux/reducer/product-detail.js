const init = {
    detail : {
        user : '',
        images : '',
        commentList:[]
    }
}

export default(state = init,action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL' :
            return {...init,detail:action.productDetail}
        default :
            return state
    }
}