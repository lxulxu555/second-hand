import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import storageUtils  from './utils/storageUtils'
import storageUtilsToken from './utils/storageUtils-token'
import memoryUtils from './utils/memoryUtils'
import store from './redux/store'

const user = storageUtils.GetUser()
memoryUtils.user = user

const token = storageUtilsToken.GetToken()
memoryUtils.token = token


ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
),document.getElementById('root'))