import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import Login from './pages/login/login'
import Register from './pages/register/register'
import ForGet from './pages/login/forget'
import EmailLogin from './pages/login/email-login'

export default class App extends Component{
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path= '/login' component={Login} />
                    <Route path= '/register' component={Register} />
                    <Route path= '/forget' component={ForGet} />
                    <Route path= '/email-login' component={EmailLogin} />
                    <Route path='/' component={HomePage}  />
                </Switch>
            </BrowserRouter>
        )
    }
}

