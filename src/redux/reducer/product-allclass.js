const init = {
    allClass : []
}

export default(state = init,action) => {
    switch (action.type) {
        case 'PRODUCT_ALLCLASS' :
            return {...init,allClass: action.allClass}
        default:
            return state
    }
}