import React, { Component } from 'react'
import { Card, Select, Button, Table, Input, message } from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'

export default class Producthome extends Component {
    state = {
        tatsl: 0,
        products: [],
        searchName: '',
        searchType: 'productName',
    }

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: `¥价格`,
                dataIndex: 'price',
                render: (price) => `¥${price}`
            },
            {
                title: `状态`,
                width: 100,
                render: (product) => {
                    const { status, _id } = product
                    return (
                        <span>
                            <Button
                                type='primary'
                                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: `操作`,
                width: 100,
                render: (product) => {
                    return (
                        <span>
                            {/*将product对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.props.history.push('/product/detail', { product: product })}>详情</LinkButton>
                            <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }
    //获取页数对应的数据
    getProducts = async (pageNum) => {
        this.pageNum=pageNum
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: 3, searchName, searchType })

        } else {
            result = await reqProducts(pageNum, 3)
        }
        if (result.status === 0) {
            const { total, list } = result.data
            console.log(list)
            this.setState({
                total,
                products: list
            })
        }
    }
    updateStatus = async(productId, status) => {
        const result = await reqUpdateStatus(productId,status)
        if(result.status===0){
            message.success('更新成功')
            this.getProducts(this.pageNum)
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { products, searchType, searchName } = this.state
        const { Option } = Select;
        const title = (
            <span>
                <Select defaultValue={searchType} style={{ width: 150 }}
                    onChange={value => this.setState({
                        searchType: value
                    })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({
                        searchName: event.target.value
                    })}>
                </Input>
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    dataSource={products}
                    columns={this.columns}
                    rowKey='_id'
                />
            </Card>
        )
    }
}
