import React, { Component } from 'react'
import './index.less'
import LinkButton from '../linkButton/LinkButton'
import { withRouter } from 'react-router-dom'
import formatTime from '../../utils/formatTime'

class ContentHead extends Component {
    state={
        currtime:formatTime(Date.now()),
    }
    getTime=()=>{
        this.id = setInterval(() => {
            const currtime = formatTime(Date.now())
            this.setState({currtime},console.log(this.state.currtime))
        }, 1000);
    }
    componentDidMount(){
        this.getTime()
    }
    componentWillUnmount(){
        clearInterval(this.id)
    }
    render() {
        const {currtime}=this.state
        return (
            <div className='main'>
                <div className='top'>
                    <div className='topcontent'>
                        <span>欢迎, admin</span>
                        <LinkButton onClick={this.logout}>退出</LinkButton>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='bottomcontent'>
                        <span>{currtime}</span>
                    </div>
                </div>
            </div>
        )
    } 
}

export default withRouter(ContentHead)