const init = []

export default(state = init,action) => {
    switch (action.type) {
        case 'BUY_ALL' :
            return action.buyAll
        default:
            return state
    }
}