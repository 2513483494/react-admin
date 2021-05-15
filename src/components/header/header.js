import React, { Component } from 'react'
import './index.css'
import Son from './son.png'
import {formatDate} from '../../utils/dateUtils'
import Name from '../../utils/memoryUtils'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtiles'


const { confirm } = Modal;

class Header extends Component {
    state = {
        currtTime: formatDate(Date.now()),
    }

    getTime = ()=> {
        this.intervalId = setInterval(()=>{
            const currtTime = formatDate(Date.now())
            this.setState({currtTime})
        }, 1000)
    }

    getTitle = ()=>{
        const path = this.props.location.pathname
        let title
        menuList.forEach(item=>{
            if(item.key===path) {
                title = item.title
            } else if(item.children) {
                const cItem = item.children.find(cItem=>cItem.key===path)
                if(cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = () => {
        confirm({
            title: '确认退出吗?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: ()=> {
                storageUtils.delUser()
                memoryUtils.user = {}
                this.props.history.replace('./login')
            }
          });
    }

    componentDidMount() {
        this.getTime()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        const username = Name.user.username
        const title = this.getTitle()

        return (
            <div className='head'>
                <div className='head-top'>
                    <span>欢迎,{username}</span>
                    <a href='javascript:' onClick={this.logout}>退出</a>
                </div>
                <div className='head-bottom'>
                <div className='head-bottom-left'>{title}</div>
                    <div className='head-bottom-right'>
                        <span>{this.state.currtTime}</span>
                        <img src={Son} alt='e'></img>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
