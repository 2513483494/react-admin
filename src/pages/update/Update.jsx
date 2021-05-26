import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { reqAddOrUpdateProduct } from '../../api/index'
import LinkButton from '../../components/linkButton/LinkButton'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';

function Update(props) {
    const { name, desc, price, pCategoryId, categoryId, imgs, detail, _id } = props.location.state
    const onFinish = async (values) => {
        console.log('Success:', values)
        const newProduct = {
            name: values.username,
            desc: values.desc,
            price: values.price,
            imgs,
            detail,
            pCategoryId,
            categoryId,
            _id
        }
        console.log(values.username !== name)
        //发生变化再请求更新,否则返回商品列表
        if (values.username !== name || values.desc !== desc || values.price !== price) {
            const result = await reqAddOrUpdateProduct(newProduct)
            if (result.status === 0) {
                message.success('更新商品信息成功')
            } else {
                message.warn('更新商品信息失败')
            }
        }
        props.history.goBack()
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div style={{ width: 500, height: 500, margin: '10px auto' }}>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    username: name,
                    desc: desc,
                    price: price,
                }}>
                <Form.Item
                    name="initMessage"
                    width='100px'
                >
                    <LinkButton onClick={() => props.history.push('/products/manage')}><ArrowLeftOutlined />返回商品列表</LinkButton>
                    <span style={{ marginLeft: 80, color: 'pink' }}>
                        提示：您可以修改商品信息
                    </span>
                </Form.Item>
                <Form.Item
                    label="商品名称"
                    name="username"
                    width='100px'
                    rules={[{ required: true, message: '请输入商品名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品描述"
                    name="desc"
                    rules={[{ required: true, message: '请输入商品描述!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品价格"
                    name="price"
                    rules={[{ required: true, message: '请输入商品价格!' }]}
                >
                    <Input prefix="￥" suffix="RMB" />
                </Form.Item>
                <Form.Item
                >
                    <Button type='primary' htmlType="submit" style={{ marginLeft: 230 }}>确定</Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default Update
