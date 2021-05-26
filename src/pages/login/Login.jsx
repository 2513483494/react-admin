import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import Header from './header/Header'
import './index.less'
import { reqLogin } from '../../api/index'
import store from 'store'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
}

export default class Login extends Component {
    onFinish = async(values) => {
        const result = await reqLogin(values.username,values.password)
        //用户名保存到localstorage中，虽然读取的慢但是只读一次影响不大
        store.set('userName',values.username)
        if(result.status===0){
            this.props.history.push('/home')
            message.success('登录成功！')
        }else{
            message.warning('用户名或密码错误，请重新登录！')
        }
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    componentWillMount(){
        if(store.get('userName')) {
            this.props.history.push('/home')
        }
    }
    render() {
        return (
            <div className='login-body'>
                <Header />
                <div className='login-form'>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        )
    }
}
