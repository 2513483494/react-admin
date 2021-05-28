import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Input, Tree } from 'antd'
import './index.less'
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api/index'
import formatTime from '../../utils/formatTime'
import { UserOutlined } from '@ant-design/icons'
import meunList from '../../config/menuConfig'

function Role() {
    const [roles, setRoles] = useState([])
    const [role, setRole] = useState({ _id: 0 })
    const [isOn, setIsOn] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [authVisible, setAuthVisible] = useState(false)
    const [newRoleName, setNewRoleName] = useState('')
    const [roleMenu,setRoleMenu]=useState(role.menus)

    useEffect(() => {
        getRoles()
    })

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: formatTime
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            render: formatTime
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
        },
    ]
    const getRoles = async () => {
        const result = await reqRoles()
        setRoles(result.data)
    }
    const onRow = (role) => {
        return {
            onClick: event => { // 点击行
                // alert('点击行')
                setRole(role)
                setIsOn(false)
                setRoleMenu(role.menus)
            },
        }
    }
    const createRole = () => {
        setIsModalVisible(true)

    }
    const setAuth = () => {
        setAuthVisible(true)
    }
    const handleOk = async () => {
        setIsModalVisible(false)
        const result = await reqAddRole(newRoleName)
        console.log(result)
        if (result.status === 0) {
            getRoles()
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const handleAuthOk = async() => {
        setAuthVisible(false)
        role.menus=roleMenu
        const result = await reqUpdateRole(role)
        console.log(result)
    }
    const handleAuthCancel = () => {
        setAuthVisible(false)
    }
    const handleChange = (e) => {
        const { value } = e.target
        setNewRoleName(value)
    }

    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        setRoleMenu(checkedKeys,...roleMenu)
    }
    return (
        <div>
            <div className='head-button'>
                <Button type='primary' style={{ marginRight: 15 }} onClick={() => createRole()}>创建角色</Button>
                <Button type='primary' disabled={isOn} onClick={() => setAuth()}>设置角色权限</Button>
            </div>
            <div className='table-body'>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={columns}
                    pagination={{ defaultPageSize: 5 }}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => setRole(role)
                    }}
                    onRow={onRow}
                />
                <Modal title="新建角色" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder='请输入角色名称'
                        onChange={(e) => handleChange(e)} />
                </Modal>
                <Modal title="设置角色权限" visible={authVisible} onOk={handleAuthOk} onCancel={handleAuthCancel}>
                    <Tree
                        checkable
                        defaultExpandedKeys={['/products', '/charts']}
                        checkedKeys={roleMenu}
                        onCheck={onCheck}
                        treeData={meunList}
                    />
                </Modal>
            </div>

        </div>
    )
}

export default Role
