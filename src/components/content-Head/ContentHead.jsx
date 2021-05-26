import React, { Component } from 'react'
import './index.less'
import LinkButton from '../linkButton/LinkButton'
import { withRouter } from 'react-router-dom'
import formatTime from '../../utils/formatTime'
import store from 'store'
import pathName from '../../config/pathName'

class ContentHead extends Component {
    state = {
        currtime: formatTime(Date.now())
    }
    getTime = () => {
        this.id = setInterval(() => {
            const currtime = formatTime(Date.now())
            this.setState({ currtime })
        }, 1000);
    }
    logout = () => {
        this.props.history.push('/login')
    }
    componentDidMount() {
        this.getTime()
    }

    componentWillUnmount() {
        clearInterval(this.id)
    }
    render() {
        const { currtime } = this.state
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
