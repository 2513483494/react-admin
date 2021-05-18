import React, { Component } from 'react'
import {
    Button,
    Card,
    Table,
    Modal,
    Form,
    Input,
    message,
    Tree
} from 'antd'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import { formatDate } from '../../utils/dateUtils'

const Item = Form.Item

export default class Role extends Component {
    state = {
        roles: [],
        role: {},
        isShowAdd: false,
        isShowAuth: false,
        value1: '',
        value2: '',
        checkedKeys: []
    }
    treeData = menuList
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render:(create_time)=>formatDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:(auth_time)=>formatDate(auth_time)
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
        ]
    }

    getRoles = async () => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({ roles })
        }
    }
    handleMaxRestoreUp = (event) => {
        if (event && event.target && event.target.value) {
            let value = event.target.value;
            this.setState(() => ({ value1: value }))
        }
    }

    addRole = async () => {
        this.setState({
            isShowAdd: false
        })
        const result = await reqAddRole(this.state.value1)
        if (result.status === 0) {
            message.success('添加成功')
            const role = result.data
            this.setState(state => ({
                roles: [...state.roles, role],
            }))
        } else {
            message.fail('添加失败')
        }
    }
    updateRole = async () => {
        const role = this.state.role
        const menus = this.state.checkedKeys
        role.menus = menus
        role.auth_name = memoryUtils.user.username
        const result = await reqUpdateRole(role)
        if (result.status === 0) {
            message.success('设置权限成功')
            //this.getRoles()
        }
        this.setState({ isShowAuth: false })
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        const checkedKeys = [selectedKeys[0], ...this.state.checkedKeys]
        console.log('check', checkedKeys)
        this.setState({ checkedKeys })
    };

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        this.setState({ checkedKeys })
    };
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const title = (
            <span>
                <Button
                    type='primary'
                    style={{ 'marginRight': 10 }}
                    onClick={() => {
                        console.log('chick')
                        this.setState({
                            isShowAdd: true
                        })
                    }}>创建角色</Button>
                <Button
                    type='primary'
                    disabled={!this.state.role._id}
                    onClick={() => {
                        this.setState({
                            checkedKeys: this.state.role.menus,
                            isShowAuth: true
                        })
                    }}>设置权限</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={this.state.roles}
                    columns={this.columns}
                    rowSelection={{ type: 'radio', selectedRowKeys: [this.state.role._id] }}
                    onRow={role => {
                        return {
                            onClick: event => {
                                this.setState({ role })
                            }, // 点击行
                        };
                    }}
                >
                </Table>
                <Modal
                    title="添加角色"
                    visible={this.state.isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({
                            isShowAdd: false
                        })
                    }}
                >
                    <Form initialValues={{ roleName: '' }}>
                        <Item name='roleName' rules={[{ required: true, message: '角色名称必须输入' }]} label='角色名称'>
                            <Input placeholder='请输入角色名称' onChange={event => this.handleMaxRestoreUp(event)} />
                        </Item>
                    </Form>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={this.state.isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({
                            isShowAuth: false
                        })
                    }}
                >
                    <Input
                        value={this.state.role.name}
                        onChange={(event) => { this.setState({ value2: event.target.value }) }}
                        disabled
                        addonBefore='角色名称' />
                    <Tree
                        checkable
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        treeData={this.treeData}
                        checkedKeys={this.state.checkedKeys}
                        defaultExpandAll
                    />
                </Modal>
            </Card>
        )
    }
}
