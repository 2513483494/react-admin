import React, { Component } from 'react'
import { Steps, Timeline, Progress, TimePicker } from 'antd';
import './index.less'
import moment from 'moment'
import pathName from '../../config/pathName'
import store from 'store'

const { Step } = Steps;
const format = 'HH:mm'

export default class Admin extends Component {
    componentDidMount() {
        store.set('globalTitle',pathName[this.props.location.pathname])
    }
    render() {
        return (
            <div>
                <TimePicker defaultValue={moment('12:08', format)} format={format} />
                <div className='timeline'>
                    <Timeline>
                        <Timeline.Item>商品管理后台系统开始启用</Timeline.Item>
                        <Timeline.Item>进行多项模块化更新</Timeline.Item>
                        <Timeline.Item>超过100家商铺使用</Timeline.Item>
                        <Timeline.Item>未来可期</Timeline.Item>
                        <Timeline.Item>。。。</Timeline.Item>
                    </Timeline>
                </div>
                <div className='progress'>
                    <Progress type="circle" percent={75} />
                    <Progress type="circle" percent={70} status="exception" />
                    <Progress type="circle" percent={100} />
                </div>
                <div className='steps'>
                    <Steps current={1}>
                        <Step title="任务一" description="已完成" />
                        <Step title="任务二" subTitle="剩余23%" description="进行中" />
                        <Step title="任务三" description="未开始" />
                    </Steps>
                </div>
            </div>

        )
    }
}
