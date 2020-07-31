const init = {
    page : parseInt(localStorage.getItem('page'))
}

export default(state = init,action) => {
    switch (action.type) {
        case 'SAVE_PRODUCT_PAGE' :
            return {...init,page:action.page}
        default :
            return state
    }
}