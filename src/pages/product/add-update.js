import React, { Component } from 'react'
import {
    Card, Form, Input, Cascader, Upload, message, Modal, Button, InputNumber
} from 'antd'
import {
    ArrowLeftOutlined,
    PlusOutlined
} from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategorys, reqCategory } from '../../api'
import RichTextEdit from './rich-text-edit'

const Item = Form.Item
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 8,
    },
};
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class Addupdate extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        options: [],

    };
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    handleChange = ({ file, fileList }) => {
        console.log('handleChange',file.status,file)
        if(file.status==='done'){
            const result = file.response
        }
        this.setState({ fileList })
    }

    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };
    initOptions = (categorys) => {
        const options = categorys.map(c =>
        ({
            value: c._id,
            label: c.name,
            children: [

            ]
        }))
        this.setState({ options })
    }
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            const categorys = result.data
            this.initOptions(categorys)
        }
    }

    componentWillMount() {
        const product = this.props.location.state
        this.isUpdate = !!product
        this.product = this.isUpdate ? product : {}

    }

    async componentDidMount() {
        this.getCategorys('0')
    }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        const { isUpdate, product } = this
        const p = product.product
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.push('/product')}>
                    <ArrowLeftOutlined />
                    <span>{isUpdate ? '修改商品' : '添加商品'}</span>
                </LinkButton>
            </span>
        )
        function onChange(value) {
        }
        const onFinish = (values) => {
        };

        const onFinishFailed = (errorInfo) => {
        };
        const validateMessages = {
            required: '请输入${label} '
        };
        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}>
                    <Item
                        label='商品名称'
                        name='name'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入商品名称' defaultValue={isUpdate ? p.name : ''} />
                    </Item>
                    <Item
                        label='商品描述'
                        name='desc'
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
                        <TextArea defaultValue={isUpdate ? p.desc : ''} placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Item>
                    <Item
                        label='商品价格'
                        name='price'
                        rules={[
                            {
                                required: true,
                            }
                        ]}>
                        <Input defaultValue={isUpdate ? p.price : ''} type='number' prefix="￥" suffix="RMB" />
                    </Item>
                    <Item
                        label='商品分类'
                        rules={[
                            {
                                required: true,
                            }
                        ]}>
                        <Cascader
                            defaultValue={['电器', '冰箱', '海尔冰箱']}
                            options={this.state.options}
                            onChange={onChange}
                        />
                    </Item>
                    <Item label='商品图片'>
                        <Upload
                            action="/manage/img/upload"
                            listType="picture-card"
                            accept='image/*'
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={this.handleCancel}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Item>
                    <Item label='商品详情' labelCol={{span:2}} wrapperCol={{span: 18}}>
                        <RichTextEdit/>
                    </Item>
                    <Item >
                        <Button type='primary' htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
