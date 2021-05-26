import React, { Component } from 'react'
import { Card, Table, Button, Modal, Form, Input } from 'antd'
import LinkButton from '../../components/linkButton/LinkButton'
import {
    PlusOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import './index.less'
import { reqCategorys, reqAddCategory } from '../../api/index'
import store from 'store'
import pathName from '../../config/pathName'

export default class Category extends Component {
    state = {
        dataSource: [],
        parentId: 0,
        parentName: '',
        visible: false,
        categoryName:''
    }
    getCategory = async () => {
        const id = this.state.parentId
        console.log('id', id)
        const result = await reqCategorys(id)
        console.log('r', result)
        this.setState({
            dataSource: result.data
        })
    }
    showSubcat = (category) => {
        console.log('id', category._id)
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => { this.getCategory() })
    }
    showCategory = async () => {
        const result = await reqCategorys(0)
        this.setState({
            dataSource: result.data,
            parentId: 0
        })
    }
    initColumns() {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={this.updateCategory}>修改分类</LinkButton>
                        {this.state.parentId === 0 ? <LinkButton onClick={() => this.showSubcat(category)}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ]
    }
    showModal = () => {
        this.setState({ visible: true })
    }

    handleOk = async () => {
        this.setState({ visible: false })
        const result = await reqAddCategory(this.state.categoryName,0)
        console.log(result)
        if(result.status===0){
            this.getCategory()
        }
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }
    addCategory = () => {
        this.showModal()
    }
    updateCategory = () => {
        this.showModal()
    }
    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleChange = (e) => {
        console.log(e.target.value)
        const categoryName=e.target.value
        this.setState({
            categoryName
        })
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategory()
        store.set('globalTitle',pathName[this.props.location.pathname])
    }

    render() {
        const { dataSource, parentId, parentName, visible } = this.state
        const title = (
            <div>
                <span className='arrow'>
                    {parentId === 0 ? null : <LinkButton onClick={this.showCategory}><ArrowLeftOutlined /></LinkButton>}
                    {parentId === 0 ? <span>一级分类列表</span> : <span>{parentName}</span>}
                </span>
                <Button type='primary' className='addbutton' onClick={this.addCategory}>
                    <PlusOutlined />
                    <span>添加</span>
                </Button>
            </div>
        )
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };

        return (
            <Card title={title}>
                <Table
                    dataSource={dataSource}
                    columns={this.columns}
                    bordered
                    rowKey='_id' 
                />
                <Modal title="添加分类" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
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
                            label="分类名称"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入分类名称!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => this.handleChange(e)} />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>

        )
    }
}
