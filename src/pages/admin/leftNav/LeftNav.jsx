import React, { Component } from 'react'
import './index.less'
import Logo from '../imgs/xjq.jpg'
import menuList from '../../../config/menuConfig'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
//配置生成菜单

const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>)
            } else {
                //有子菜单则open设置为当前路径
                const childItem = item.children.find(item => item.key.indexOf(path) === 0)
                if (childItem) {
                    this.openKey = item.key
                }
                //递归生成菜单
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
        //如果是查看商品详情或者修改商品信息，则让商品管理菜单为被选择项
        const path = this.props.location.pathname === '/products/update' ? '/products/manage' : this.props.location.pathname
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
                    defaultOpenKeys={[this.openKey]}
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
