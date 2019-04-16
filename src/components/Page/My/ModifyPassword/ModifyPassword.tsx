import React, { Component } from 'react'
import Header from '../../Header/Header'
import { InputItem, List, Modal, Toast } from 'antd-mobile'
// @ts-ignore 不忽视 会报错 没有ts.d
import { createForm } from 'rc-form'
import { modifyPassword } from '../../../../api/auth/auth'
import { handle401 } from '../../../../api/storeData'
import './ModifyPassword.scss'
const alert = Modal.alert
class ModifyPassword extends Component<any> {
  state = {
    confirmDirty: false
  }
  submit = () => {
    this.props.form.validateFields({ force: true }, (error: any) => {
      if (!error) {
        let args = this.props.form.getFieldsValue()
        modifyPassword(args)
          .then((res: any) => {
            alert('密码修改成功', '请重新登录!', [
              {
                text: '知道了',
                onPress: () => {
                  handle401()
                },
                style: {
                  background:
                    'linear-gradient(to right, #007ccd, #00d1cf, #00f5d1)',
                  color: '#fff'
                }
              }
            ])
          })
          .catch((e: any) => {
            Toast.fail(e.response.data.message)
          })
      }
    })
  }
  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('new_password')) {
      callback('新密码和确认密码不一致!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm_password'], { force: true })
    }
    callback()
  }
  render() {
    const { history } = this.props
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div className="modify-password">
        <Header hasBack={true} title={'修改密码'} history={history} />
        <div className="modify-password_content">
          <List
            className="password-input-list"
            renderHeader={(): any => ''}
            renderFooter={() => getFieldError('old_password')}
          >
            <InputItem
              {...getFieldProps('old_password', {
                rules: [{ required: true, message: '当前密码不能为空' }]
              })}
              placeholder="输入当前密码"
              clear
              maxLength={20}
            />
          </List>
          <List
            className="password-input-list"
            renderHeader={(): any => ''}
            renderFooter={() => getFieldError('new_password')}
          >
            <InputItem
              {...getFieldProps('new_password', {
                rules: [
                  { required: true, message: '新密码不能为空' },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })}
              placeholder="输入新密码"
              type="password"
              clear
              maxLength={20}
            />
          </List>
          <List
            className="password-input-list"
            renderHeader={(): any => ''}
            renderFooter={() => getFieldError('confirm_password')}
          >
            <InputItem
              {...getFieldProps('confirm_password', {
                rules: [
                  { required: true, message: '确认新不能为空' },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })}
              placeholder="确认新密码"
              type="password"
              clear
              maxLength={20}
            />
          </List>
          <div className="modify-password_btn" onClick={this.submit}>
            确认提交
          </div>
        </div>
      </div>
    )
  }
}

export default createForm()(ModifyPassword)
