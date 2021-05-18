import React, { Component } from 'react'
import {
    Button,
    Modal,
    Input,
    Table,
    message,
    Card,
    Form,
    Select
} from 'antd'
import { formatDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { reqUsers, reqDeleteUser } from '../../api/index'

const { confirm } = Modal;
const { form } = Form.useForm

export default class User extends Component {
    state = {
        users: [],
        roles: [],
        isShow: false,
        user:{},
    }
    delUser = (user) => {
        confirm({
            title: `确认删除${user.username}吗`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success('删除用户成功！')
                    this.getUsers()
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formatDate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.state.roles.find(role => role._id === role_id).name
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.delUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }
    getUsers = async () => {
        const result = await reqUsers()
        if (result.status === 0) {
            const { users, roles } = result.data
            this.setState({
                users,
                roles
            })
        }
    }
    showUpdate = (user) => {
        this.user = user
        console.log('update:',this.user)
        this.setState({ isShow: true })
    }
    //未实现
    addOrUpdateUser = () => {
        const user = form.getFieldValue()
        console.log(user)
    }
   
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getUsers()
    }
    render() {
        const title = (
            <Button type='primary' onClick={() => { 
                this.setState({ isShow: true })
                this.user={}
             }}>创建用户</Button>
        )
        const { users, roles } = this.state
        const user = this.user||{}
        console.log('render',user)

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 2 }}
                />
                <Modal
                    title={user._id ? '修改用户' : '添加用户'}
                    visible={this.state.isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => { this.setState({ isShow: false }) }}
                    htmlType="submit"
                >
                    <Form initialValues={{ 
                        username: user.username,
                        password:user.password,
                        phone:user.phone,
                        mail:user.email,
                        role_id:user.role_id
                    }}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        onFinish={this.onFinish}
                        form={form}>
                        <Form.Item name='username' rules={[{ required: true, message: '用户名称必须输入' }]} label='用户名'>
                            <Input placeholder='请输入用户名称' value='111'/>
                        </Form.Item>
                        {
                            user._id?null:<Form.Item name='password' rules={[{ required: true, message: '密码必须输入' }]} label='密码'>
                            <Input placeholder='请输入密码' />
                        </Form.Item>
                        }
                        
                        <Form.Item name='phone' label='手机号'>
                            <Input placeholder='请输入手机号' />
                        </Form.Item>
                        <Form.Item name='mail' label='邮箱 '>
                            <Input placeholder='请输入用户邮箱' />
                        </Form.Item>
                        <Form.Item name='role_id' rules={[{ required: true, message: '用户名称必须输入' }]} label='角色'>
                            <Select placeholder='请选择角色'>
                                {
                                    roles.map(role => {
                                        return <Select.Option key={role._id}>{role.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}
