import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from "./redux/store";
import {Provider} from 'react-redux'

import {reqInit} from "./api";

if(!window.location.href.includes('login')){
    (async function () {
        const token = window.localStorage.getItem('Token')
        const res =  await reqInit(token)
        if(res.code === -1){
            window.localStorage.removeItem('User')
        }else{
            window.localStorage.setItem('Token', res.data)
        }
    })()
}


ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
),document.getElementById('root'))
