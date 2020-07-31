const init = {
    message : 0
}

export default(state = init,action) => {
    switch (action.type) {
        case 'USER_MESSAGE' :
            return {...init,message : action.message}
        default :
            return state
    }
}