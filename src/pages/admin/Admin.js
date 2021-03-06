import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../notFound/NotFound';

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to='/login'></Redirect>
        }
        return (
            <Layout style={{ 'height': '100%' }}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ margin: 20, backgroundColor: '#fff' }}>
                        <Switch>
                            <Redirect exact from='/' to='/home' />
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/user' component={User} />
                            <Route path='/role' component={Role} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'grey' }}>这里是我的世界。</Footer>
                </Layout>
            </Layout>
        )
    }
}
