import {reqEmailLogin, reqLogin, reqLookUserReplay, reqUpdateUser,reqChangePassword,reqRegister} from '../../api'


export const LoginUser = (user, callback,emailUser) => {
    return (dispatch) => {
        (async function () {
            const res = user !== '' ? await reqLogin(user) :  await reqEmailLogin(emailUser)
            if (res.code === 0) {
                const {user, token} = res.data
                window.localStorage.setItem('Token', token)
                window.localStorage.setItem('User',JSON.stringify(user))
                callback()
                dispatch({
                    type: 'USER_LOGIN',
                    user
                })
            }
        })()
    }
}

export const ForgetUser = (user,callback) => {
    return (dispatch) => {
        (async function () {
            const res = await reqChangePassword(user)
            if(res.code === 0){
                callback()
            }
        })()
    }
}

export const QQLogin = (callback) => {
    return (dispatch) => {
        (async function () {
            const QQUrl = 'http://eurasia.plus:8800/api/user/qqLogin'
            // 弹出 500 * 500 的窗口
            window.open(QQUrl, 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')

            // 通过监听，父页面可以拿到子页面传递的token，父(前端页面)，子(小窗)
            window.addEventListener('message', function (e) {
                const data = JSON.parse(e.data)
                const {user,token} = data.data
                user.user["img"] = user.user.img.replace(/amp;/g, "")
                window.localStorage.setItem('Token', token)
                window.localStorage.setItem('User',JSON.stringify(user))
                callback()
                dispatch({
                    type: 'USER_LOGIN',
                    user
                })
            }, false);
        })()
    }
}

export const register = (user,callback) => {
    return (dispatch) => {
        (async function () {
            const res = await reqRegister(user)
            if(res.code === 0){
                callback()
            }
        })()
    }
}

export const UserMessage = (id) => {
    return (dispatch) => {
        (async function () {
            const res = await reqLookUserReplay(id)
            dispatch({
                type : 'USER_MESSAGE',
                message : res
            })
        })()
    }
}

export const updateUser = (user,callback) => {
    return (dispatch) => {
        (async function () {
            const res = await reqUpdateUser(user)
            if(res.code === 0){
                const {user} = res.data
                callback()
                window.localStorage.setItem('User',JSON.stringify(user))
                dispatch({
                    type: 'USER_LOGIN',
                    user
                })
            }
        })()
    }
}

export const UploadImage = (url) => ({type: 'UPLOAD_IMAGE', image: url})


