import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import storageUtils  from './utils/storageUtils'
import storageUtilsToken from './utils/storageUtils-token'
import memoryUtils from './utils/memoryUtils'

const user = storageUtils.GetUser()
memoryUtils.user = user

const token = storageUtilsToken.GetToken()
memoryUtils.token = token


ReactDOM.render(<App/>,document.getElementById('root'))