import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加分类的form组件
 */
class AddForm extends Component {
  formRef = React.createRef()
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    categorys: PropTypes.array.isRequired, // 一级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {categorys} = this.props

    return (
      <Form initialValues={{ parentId: 'parentId', categoryName: '' }} ref={this.formRef}>
        <Item name='parentId'>
          {
            (
              <Select>
                <Option value='0'>一级分类</Option>
                {
                  categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                }
              </Select>
            )
          }

        </Item>

        <Item name ='categoryName' rules={[{ required: true, message: '分类名称必须输入' }]}>
          {
            (
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddForm