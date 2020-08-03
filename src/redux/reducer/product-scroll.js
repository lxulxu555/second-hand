const init = {
    scroll : ''
}

export default(state = init,action) => {
    switch (action.type) {
        case 'SAVE_PRODUCT_SCROLL' :
            return {...init,scroll: action.scroll}
        default :
            return state
    }
}