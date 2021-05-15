import React, { Component } from 'react'
import { Card, List } from 'antd'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategory } from '../../api';

const imgUrl = 'http://localhost:5000/upload/'
const Item = List.Item
export default class Productdetail extends Component {
    state = {
        cName1: '',
        cName2: ''
    }
    async componentDidMount() {
        const { categoryId, pCategoryId } = this.props.location.state.product
        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId)
            const cName1 = result.data.name
            this.setState({ cName1 })
        } else {
            const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({
                cName1,
                cName2
            })

        }
    }
    render() {
        const { name, desc, price, detail, imgs } = this.props.location.state.product
        const { cName1, cName2 } = this.state
        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined
                        style={{
                            color: 'green',
                            'margin-right': 10,
                            'font-size': 20
                        }}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} >
                <List className='product-detail'>
                    <Item>
                        <span className='left'>商品名称:</span>
                        <span className='right'>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格:</span>
                        <span className='right'>{price}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述:</span>
                        <span className='right'>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类:</span>
                        <span className='right'>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品细节:</span>
                        <span className='right'
                            dangerouslySetInnerHTML={{ __html: detail }}
                        ></span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片:</span>
                        <span className='right'>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img}
                                        className='product-img'
                                        src={imgUrl + img}
                                        alt='a'
                                        style={{ width: 100, height: 100 }}
                                    />
                                ))
                            }
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}
