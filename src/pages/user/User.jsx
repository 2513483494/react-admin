import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Form, Input, Select } from 'antd'
import './index.less'
import LinkButton from '../../components/linkButton/LinkButton'
import { reqUsers } from '../../api/index'
import formatTime from '../../utils/formatTime'

const { Option } = Select

function User() {
    const [isModalVisible, setisModalVisible] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [roleNames, setRoleNames] = useState([])

    useEffect(() => {
        async function f() {
            const result = await reqUsers()
            //console.log(result)
            if (result.status === 0) {
                const { users, roles } = result.data
                setUsers(users)
                setRoles(roles)
                const roleNames = roles.reduce((pre, role) => {
                    pre[role._id] = role.name
                    return pre
                }, {})
                setRoleNames(roleNames)
            }
        }
        f()
    })

    //该处dataIndex必须与后台数据key相同
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render: formatTime
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id) => roleNames[role_id]
        },
        {
            title: '操作',
            render: () => (
                <span>
                    <LinkButton>修改</LinkButton>
                    <LinkButton>删除</LinkButton>

                </span>
            )
        },
    ]
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }

    const handleOk = () => {
        setisModalVisible(false)
    }
    const handleCancel = () => {
        setisModalVisible(false)
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const onFinish = (values) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const title = (
        <span>添加用户</span>
    )
    const options = roles.map((value,index) => {
        return <Option value={value.name} key={index}>{value.name}</Option>
    })
    return (
        <div>
            <div className='user-header'>
                <Button type='primary' style={{ marginLeft: 20 }} onClick={() => setisModalVisible(true)}>创建用户</Button>
            </div>
            <Table
                bordered
                dataSource={users}
                columns={columns} />
            <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[{
                            required: true,
                            message: '请输入用户名!',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="mail"
                        rules={[{
                            required: true,
                            message: '请输入邮箱!',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        name="phone"
                        rules={[{
                            required: true,
                            message: '请输入电话!',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="角色"
                        name="role"
                        rules={[{
                            required: true,
                            message: '请输入角色!',
                        }]}
                    >
                        <Select defaultValue="xjq" style={{ width: 120 }} onChange={handleChange}>
                            {options}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User
