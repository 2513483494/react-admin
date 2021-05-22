import React, { Component } from 'react'
import { Card, Table, Button } from 'antd'
import LinkButton from '../../components/linkButton/LinkButton'
import {
    PlusOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import './index.less'
import { reqCategorys } from '../../api/index'

export default class Category extends Component {
    state = {
        dataSource: [],
        parentId: 0,
        parentName: ''
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
                        <LinkButton>修改分类</LinkButton>
                        {this.state.parentId === 0 ? <LinkButton onClick={() => this.showSubcat(category)}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ]
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategory()
    }

    render() {
        const { dataSource, parentId, parentName } = this.state
        const title = (
            <div>
                <span className='arrow'>
                    {parentId === 0 ? null : <LinkButton onClick={this.showCategory}><ArrowLeftOutlined /></LinkButton>}
                    {parentId === 0 ? <span>一级分类列表</span> : <span>{parentName}</span>}
                </span>
                <Button type='primary' className='addbutton'>
                    <PlusOutlined />
                    <span>添加</span>
                </Button>
            </div>
        )


        return (
            <Card title={title}>
                <Table
                    dataSource={dataSource}
                    columns={this.columns}
                    bordered
                    rowKey='_id' />
            </Card>
        )
    }
}
