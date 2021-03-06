import React, { Component } from 'react'
import {
    Card, Form, Input, Cascader, Upload, Modal, Button
} from 'antd'
import {
    ArrowLeftOutlined,
    PlusOutlined
} from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategorys } from '../../api'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
        value: ''
    };

    onChangee = editorState => this.setState({ editorState });
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
        console.log('handleChange', file.status, file)
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
                    <span>{isUpdate ? '????????????' : '????????????'}</span>
                </LinkButton>
            </span>
        )

        const onFinish = (values) => {
        };

        const onFinishFailed = (errorInfo) => {
        };
        const validateMessages = {
            required: '?????????${label} '
        };
        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}>
                    <Item
                        label='????????????'
                        name='name'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder='?????????????????????' defaultValue={isUpdate ? p.name : ''} />
                    </Item>
                    <Item
                        label='????????????'
                        name='desc'
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
                        <TextArea defaultValue={isUpdate ? p.desc : ''} placeholder="?????????????????????" autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Item>
                    <Item
                        label='????????????'
                        name='price'
                        rules={[
                            {
                                required: true,
                            }
                        ]}>
                        <Input defaultValue={isUpdate ? p.price : ''} type='number' prefix="???" suffix="RMB" />
                    </Item>
                    <Item
                        label='????????????'
                        rules={[
                            {
                                required: true,
                            }
                        ]}>
                        <Cascader
                            defaultValue={['??????', '??????', '????????????']}
                            options={this.state.options}
                        />
                    </Item>
                    <Item label='????????????'>
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
                    <Item label='????????????' labelCol={{ span: 2 }} wrapperCol={{ span: 18 }}>
                        <ReactQuill theme="snow" value={this.value}  />
                    </Item>
                    <Item >
                        <Button type='primary' htmlType="submit">??????</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
