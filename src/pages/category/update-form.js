import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
更新分类的form组件
 */
class UpdateForm extends Component {
  formRef = React.createRef()
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount () {
    // 将form对象通过setForm()传递父组件
    this.props.setForm(this.props.form)
  }

  render() {
    return (
      <Form initialValues={{ categoryName: 'categoryName' }} ref={this.formRef}>
        <Item name='categoryName' rules={[{ required: true, message: '分类名称必须输入' }]}>
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

export default UpdateForm