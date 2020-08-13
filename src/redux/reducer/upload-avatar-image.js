const user = JSON.parse(localStorage.getItem('User')) === null ? {user:{img:''}} : JSON.parse(localStorage.getItem('User'))
const init = {
    image : user.img
}


export default(state = init,action) => {
    switch (action.type) {
        case 'UPLOAD_AVATAR_IMAGE' :
            return {...init,image : action.image}
        default:
            return state
    }
}