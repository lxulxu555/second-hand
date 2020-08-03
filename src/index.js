import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from "./redux/store";
import {Provider} from 'react-redux'
import {initUser} from './redux/action/user'

if(!window.location.href.includes('login')){
    store.dispatch(initUser())
}


ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
),document.getElementById('root'))
