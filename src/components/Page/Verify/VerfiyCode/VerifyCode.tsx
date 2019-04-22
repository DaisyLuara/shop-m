import React, { Component } from 'react'
import Header from '../../Header/Header'
import { InputItem, List, Modal, Toast } from 'antd-mobile'
// @ts-ignore 不忽视 会报错 没有ts.d
import { createForm } from 'rc-form'
import { verifyCoupon } from '../../../../api/verify/verify'
import './VerifyCode.scss'
const alert = Modal.alert

class VerifyCode extends Component<any> {
  state = {
    type: 'money',
  }
  submit = () => {
    this.props.form.validateFields({ force: true }, (error: any) => {
      if (!error) {
        let args = this.props.form.getFieldsValue()
        if (args.code.length === 13) {
          alert('确定要核销吗?', '', [
            {
              text: '取消',
              onPress: () => console.log('cancel'),
              style: {
                background: 'linear-gradient(to right, #007ccd, #00d1cf)',
                color: '#fff'
              }
            },
            {
              text: '确定',
              onPress: () => {
                this.verifyCouponCode(args)
              },
              style: {
                background: 'linear-gradient(to right,  #00d1cf, #00f5d1)',
                color: '#fff'
              }
            }
          ])
        } else {
          Toast.info('请重新输入正确的核销码!')
        }
      } else {
        Toast.fail('优惠券码不能为空!')
      }
    })
  }
  async verifyCouponCode(args: any) {
    try {
      let res = await verifyCoupon(args)
      Toast.success('核销成功!')
      this.props.form.resetFields()
      this.props.history.push('/call/verify/record')
    } catch (e) {
      Toast.fail(e.response.data.message)
    }
  }
  render() {
    const { history } = this.props
    const code = this.props.location.query ? this.props.location.query.code : ''
    const { getFieldProps } = this.props.form
    return (
      <div className="verify-code">
        <Header hasBack={true} title={'输码核销'} history={history} />
        <div className="verify-code_content">
          <List
            className="verify-code_content-item"
            renderHeader={(): any => ''}
          >
            <InputItem
              {...getFieldProps('code', {
                initialValue:code,
                rules: [{ required: true, message: '优惠券码不能为空' }]
              })}
              
              placeholder="请输入优惠券码"
              clear
              maxLength={13}
            />
          </List>
          <List
            className="verify-code_content-item"
            renderHeader={(): any => ''}
          >
            <InputItem
              {...getFieldProps('order_total')}
              maxLength={5}
              type="digit"
              placeholder="请输入订单金额"
              clear
            />
          </List>
          <div className="verify-code_btn" onClick={this.submit}>
            提交核销
          </div>
        </div>
      </div>
    )
  }
}

export default createForm()(VerifyCode)
