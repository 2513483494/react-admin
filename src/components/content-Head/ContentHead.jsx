import React, { Component } from 'react'
import './index.less'
import LinkButton from '../linkButton/LinkButton'
import { withRouter } from 'react-router-dom'
import formatTime from '../../utils/formatTime'
import store from 'store'
import pathName from '../../config/pathName'

class ContentHead extends Component {
    state = {
        //格式化当前时间
        currtime: formatTime(Date.now())
    }
    getTime = () => {
        this.id = setInterval(() => {
            const currtime = formatTime(Date.now())
            this.setState({ currtime })
        }, 1000);
    }
    logout = () => {
        //需要清除登录信息，避免下次不用登录就可以访问，不过有没有这种需求有待考虑
        this.props.history.push('/login')
        store.clearAll()
    }
    componentDidMount() {
        this.getTime()
    }

    componentWillUnmount() {
        clearInterval(this.id)
    }
    render() {
        const { currtime } = this.state
        //通过地址与title的映射找到title
        //注意不能写进didmount里，那样不会更新
        const title = pathName[this.props.location.pathname]
        return (
            <div className='main'>
                <div className='top'>
                    <div className='topcontent'>
                        <span>欢迎, {store.get('userName')}</span>
                        <LinkButton onClick={this.logout}>退出</LinkButton>
                    </div>
                </div>
                <div className='bottom'>
                    <span className='title'>{title}</span>
                    <div className='bottomcontent'>
                        <span>{currtime}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ContentHead)
