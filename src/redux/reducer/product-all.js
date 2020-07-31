const init = {
    allProduct : []
}

export default(state = init,action) => {
    switch (action.type) {
        case 'PRODUCT_ALL' :
            return {...init,allProduct: action.allProduct}
        default :
            return state
    }
}