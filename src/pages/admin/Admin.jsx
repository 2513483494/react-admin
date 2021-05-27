import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../home/Home'
import Category from '../category/Category'
import Manage from '../manage/Manage'
import User from '../user/User'
import Role from '../role/Role'
import Bar from '../charts/bar/Bar'
import Line from '../charts/line/LineChart'
import Pie from '../charts/pie/Pie'
import LeftNav from './leftNav/LeftNav'
import NotFound from '../notFound/NotFound'
import ContentHead from '../../components/content-Head/ContentHead'
import Update from '../update/Update'
import UserUpdate from '../update/UserUpdate'
//主界面，配置路由

const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
    
    render() {        
        return (
            <Layout style={{ minHeight: '100%' }}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <ContentHead/>
                    <Content style={{ margin: 20, backgroundColor: '#fff' }}>
                        <Switch>
                            <Redirect from='/' exact to='/login' />
                            <Route path='/home' component={Home} />
                            <Route exact path='/products/category' component={Category} />
                            <Route exact path='/products/manage' component={Manage} />
                            <Route exact path='/products/update' component={Update} />
                            <Route path='/user' exact component={User} />
                            <Route path='/user/update' component={UserUpdate} />
                            <Route path='/role' component={Role} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/charts/line" component={Line} />
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
