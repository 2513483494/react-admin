import React, { Component } from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'

//Switch 功能为之匹配一个就不想下进行匹配了
export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
