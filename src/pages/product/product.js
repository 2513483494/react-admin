import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Producthome from './home'
import Productdetail from './detail'
import Productupdate from './add-update'
import './product.less'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/product' component={Producthome} />
                <Route path='/product/update' component={Productupdate} />
                <Route path='/product/detail' component={Productdetail} />
                <Redirect to='/product'/>
            </Switch>
        )
    }
}
