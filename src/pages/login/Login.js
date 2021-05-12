import React, { Component } from 'react'
import './login.css'
import Logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtiles'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    render() {
        const user = memoryUtils.user
        if(user&&user._id) {
            return <Redirect to='admin'></Redirect>
        }
        const layout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          };
          const tailLayout = {
            wrapperCol: {
              offset: 8,
              span: 16,
            },
          };
          const onFinish = async(values) => {
            const {username, password} = values
            const result = await reqLogin(username, password)
            console.log('请求成功',result)
            if(result.status === 0) {
                const user = result.data
                memoryUtils.user = user
                storageUtils.saveUser(user)
                message.success('登录成功')
                this.props.history.replace('/')
            } else {
                message.error(result.msg)
            }
          };
        
          const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={Logo} alt='a'></img>
                    <h1>后台管理系统</h1>
                </header>
                <section className='login-section'>
                    <h2>用户登录</h2>
                    <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        }, {
                            min: 4,
                            message: '用户名最少4位！'
                        }
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
                            message: '请输入密码!',
                        }, {
                            min: 5,
                            message: '密码最少5位！'
                        }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: 'green'}}>
                            登陆
                        </Button>
                    </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
