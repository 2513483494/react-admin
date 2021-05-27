import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Form, Input, Select, message } from 'antd'
import './index.less'
import LinkButton from '../../components/linkButton/LinkButton'
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from '../../api/index'
import formatTime from '../../utils/formatTime'

const { Option } = Select
const formRef = React.createRef()

function User(props) {
    const [isModalVisible, setisModalVisible] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [roleNames, setRoleNames] = useState([])
    const [selectedRole, setSelectedRole] = useState('')
    const [currentId, setCurrentId] = useState('')

    useEffect(() => {
        getUsers()
    }, [users])

    const getUsers = async () => {
        const result = await reqUsers()
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

    const delUser = async (user) => {
        const id = user._id
        const result = await reqDeleteUser(id)
        if(result.status===0){
            message.success('删除用户成功！')
        }
    }

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
            render: (user) => (
                <span>
                    <LinkButton onClick={() => updateUser(user)}>修改</LinkButton>
                    <LinkButton onClick={() => delUser(user)}>删除</LinkButton>
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

    const handleCancel = () => {
        setisModalVisible(false)
    }
    function handleChange(value) {
        setSelectedRole(value)
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
    const options = roles.map((value, index) => {
        return <Option value={value.name} key={index}>{value.name}</Option>
    })
    const addUser = () => {
        setisModalVisible(true)
        setCurrentId('')
    }
    const updateUser = (user) => {
        setisModalVisible(true)
        setCurrentId(user._id)
    }
    const handleOk = async () => {
        setisModalVisible(false)
        const form = formRef.current // 使用 getFieldsValue 获取多个字段值 
        const values = form.getFieldsValue(['username', 'mail', 'phone'])
        let role_id
        for (let r in roleNames) {
            if (roleNames[r] === selectedRole) {
                role_id = r
            }
        }
        const user = currentId === '' ? { role_id, ...values } : { _id: currentId, role_id, ...values }
        const result = await reqAddOrUpdateUser(user)
        const info = currentId === '' ? '添加用户成功！' : '更新用户信息成功！'
        if (result.status === 0) {
            message.success(info)
        }
    }
    return (
        <div>
            <div className='user-header'>
                <Button type='primary' style={{ marginLeft: 20 }} onClick={() => addUser()}>创建用户</Button>
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
                        name:'',
                        mail:'',
                        phone:'',
                        role:''
                    }}
                    ref={formRef}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
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
                        <Select defaultValue="请选择角色" style={{ width: 120 }} onChange={handleChange}>
                            {options}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User
