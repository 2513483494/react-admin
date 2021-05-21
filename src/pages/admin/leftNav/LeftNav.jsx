import React, { Component } from 'react'
import './index.less'
import Logo from '../imgs/xjq.jpg'
import menuList from '../../../config/menuConfig'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'

const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        //console.log(path)
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>)
            }else{
                const childItem = item.children.find(item=>item.key.indexOf(path)===0)
                if(childItem){
                    this.openKey=childItem.key
                }
                return (
                    <SubMenu key={item.key} title={
                        <span>{item.title}</span>
                    }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        const path = this.props.location.pathname
        console.log(path)
        return (
            <div>
                <div className='left-nav-head'>
                    <div>
                        <img src={Logo} alt='a' />
                        xjqHoutai
                    </div>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={path}
                    defaultOpenKeys={this.openKey}
                >

                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)