const init = JSON.parse(localStorage.getItem('User')) === null ? {id : ''} : JSON.parse(localStorage.getItem('User'))


export default(state= init,action) => {
    switch (action.type) {
        case 'USER_LOGIN' :
            return action.user
        default:
            return state
    }
}