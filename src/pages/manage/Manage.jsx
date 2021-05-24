import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Menu, Input, Table, message, Modal, Form, Upload } from 'antd'
import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
import LinkButton from '../../components/linkButton/LinkButton'
import { reqProducts, reqUpdateStatus, reqSearchProducts } from '../../api/index'

const { Search } = Input;

function Manage(props) {
    const [searchTitle, setSearchTitle] = useState('按名称搜索')
    const [dataSource, setDataSource] = useState([{}])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNUm] = useState(1);
    const [searchType, setSearchType] = useState('productName');
    const [searchName, setSearchName] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    function handleMenuClick(e) {
        if (e.key === '1') {
            setSearchTitle('按名称搜索')
            setSearchType('productName')
        } else {
            setSearchTitle('按描述搜索')
            setSearchType('productDesc')
        }
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const handleCancelimg = () => setPreviewVisible(false)

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewVisible(file.url || file.preview)
        setPreviewImage(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = ({ fileList }) => setFileList({ fileList })
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                按名称搜索
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                按描述搜索
            </Menu.Item>
        </Menu>
    )
    const onSearch = async (value) => {
        console.log(value)
        setSearchName(value)
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '状态',
            width: 100,
            render: (product, pro) => {
                const { status, _id } = product
                return (
                    <span>
                        <Button
                            type='primary'
                            danger={status === 1 ? true : false}
                            onClick={async () => {
                                const newStatus = status === 1 ? 2 : 1
                                const result = await reqUpdateStatus(_id, newStatus)
                                if (result.status === 0) {
                                    message.success('更新商品成功')
                                    getProducts(1)
                                }
                            }}
                        >
                            {status === 1 ? '上架' : '下架'}
                        </Button>
                        <span>{status === 1 ? '已下架' : '已上架'}</span>
                    </span>
                )
            }
        },
        {
            title: '操作',
            render: (product) => {
                return (
                    <span>
                        {/*将product对象使用state传递给目标路由组件*/}
                        <LinkButton onClick={() => props.history.push(
                            {
                                pathname: '/products/update',
                                state: { ...product }
                            }
                        )}>详情(修改)</LinkButton>
                    </span >
                )
            }
        },
    ]
    const getProducts = async () => {
        let result
        if(searchName){
            result = await reqSearchProducts({ pageNum, pageSize: 5, searchName, searchType })
        }else{
            result = await reqProducts(pageNum, 5)
        } 
        const { total, list } = result.data
        setTotal(total)
        setDataSource(list)
    }
    useEffect(() => {
        getProducts()
    })
    const title = (
        <span>添加商品</span>
    )
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    return (
        <div>
            <div className='search'>
                <Dropdown overlay={menu}>
                    <Button>
                        {searchTitle} <DownOutlined />
                    </Button>
                </Dropdown>
                <Search
                    placeholder="关键字"
                    allowClear
                    enterButton="搜索"
                    size="middle"
                    onSearch={onSearch}
                    style={{ width: '300px', marginLeft: '20px', position: 'relative', top: '14px' }}
                />
                <div className='addButton'>
                    <Button type='primary' onClick={showModal}>
                        <PlusOutlined />
                        <span>添加商品</span>
                    </Button>
                </div>
            </div>
            <div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    pagination={{
                        current: pageNum,
                        total: total,
                        defaultPageSize: 5,
                        showQuickJumper: true,
                        onChange: (pageNum) => {
                            console.log('p', pageNum)
                            setPageNUm(pageNum)
                            getProducts(pageNum)
                        }
                    }}
                />

            </div>
            <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    initialValues={{
                        username: '',
                        desc: '',
                        price: '',
                    }}>
                    <Form.Item
                        label="商品名称"
                        name="username"
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
                        label="商品图片"
                        name="images"
                    >
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancelimg}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Manage