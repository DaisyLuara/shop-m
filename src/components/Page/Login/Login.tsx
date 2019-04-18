import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import './Login.scss'
import { CDN } from '../../../constant/cdn'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import keys from '../../../actions/ActionTypeKeys'
import { checkMobile } from '../../../utils/validate'
import { Login, getUserInfo } from '../../../api/auth/auth'

interface formItem {
  password: string
  username: string
}
class LoginContent extends Component<formItem & any> {
  constructor(props: formItem & any) {
    super(props)
  }
  state = {
    hidden: true,
    password: this.props.password,
    username: this.props.username
  }
  bgHeight: any = window.innerHeight + 'px'

  addFocusOutListener = () => {
    let inputPassword = document.getElementsByName('password')[0]
    inputPassword.addEventListener('focusout', () => {
      setTimeout(function() {
        window.scrollTo(0, 0)
      }, 100)
    })
  }

  removeFocusOutListener = () => {
    let inputPassword = document.getElementsByName('password')[0]
    inputPassword.removeEventListener('focusout', () => {
      setTimeout(function() {
        window.scrollTo(0, 0)
      }, 100)
    })
  }

  componentDidMount() {
    this.addFocusOutListener()
  }
  componentWillUnmount() {
    this.removeFocusOutListener()
  }
  passwordHandle = () => {
    this.setState({
      hidden: !this.state.hidden
    })
  }
  LoginHandle = () => {
    let password = this.state.password
    let username = this.state.username
    if (!checkMobile(username)) {
      Toast.info('用户名不正确或不能空', 5)
      return
    }
    if (!password) {
      Toast.info('密码不能空', 5)
      return
    }
    let args = {
      password: password,
      username: username
    }
    this.login(args)
  }
  async login(values: formItem) {
    try {
      let status = false
      await Login(values)
        .then((res: any) => {
          let tokenBeginTime = new Date().getTime()
          let tokenInfo = { ...res.data, jwt_begin_time: tokenBeginTime }
          this.props.saveTokenInfo(tokenInfo)
          Toast.success('登录成功!!!', 3)
          status = true
        })
        .catch((err: any) => {
          Toast.fail(err.response.data.message)
        })
      if (status) {
        await this.getUserInfo()
      }
    } catch (e) {}
  }
  getUserInfo() {
    getUserInfo()
      .then(res => {
        this.props.savePer(res.data)
        this.props.isLogin(true)
        this.props.history.push('/call/home')
      })
      .catch(err => {
        Toast.fail(err.response.data.message)
      })
  }
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <div className="login-wrapper" style={{ height: this.bgHeight }}>
        <img
          src={CDN.IMG_URL + 'shopM/img/circle_top.png?v=' + CDN.version}
          className="login-wrapper_circle-top"
        />
        <img
          src={CDN.IMG_URL + 'shopM/img/circle_bottom.png?v=' + CDN.version}
          className="login-wrapper_circle-bottom"
        />
        <img
          src={CDN.IMG_URL + 'shopM/img/logo_text.png?v=' + CDN.version}
          className="login-wrapper_logo-text"
        />
        <img
          src={CDN.IMG_URL + 'shopM/img/logo_top.png?v=' + CDN.version}
          className="login-wrapper_logo-top"
        />

        <div className="login-wrapper_title-wrapper">
          <h4 style={{ fontSize: '0.18rem', fontWeight: 400 }}>Welcome</h4>
          <h4 style={{ fontSize: '0.2rem', fontWeight: 'bold' }}>
            欢迎来到召唤宝
          </h4>
        </div>

        <div className="login-wrapper_name-password">
          <div className="login-wrapper_user-name">
            <input
              name="username"
              placeholder="用户名"
              maxLength={11}
              onChange={this.handleInputChange}
            />
            <img
              src={CDN.IMG_URL + 'shopM/img/user_icon.png?v=' + CDN.version}
            />
          </div>

          <div className="login-wrapper_password">
            <input
              name="password"
              placeholder="密码"
              type={this.state.hidden ? 'password' : 'text'}
              maxLength={15}
              onChange={this.handleInputChange}
            />
            <img
              src={CDN.IMG_URL + 'shopM/img/lock_icon.png?v=' + CDN.version}
              className="lock"
            />
            <img
              src={
                this.state.hidden
                  ? CDN.IMG_URL +
                    'shopM/img/eye_close_icon.png?v=' +
                    CDN.version
                  : CDN.IMG_URL + 'shopM/img/eye_icon.png?v=' + CDN.version
              }
              className="eye-icon"
              onClick={this.passwordHandle}
            />
          </div>
          <div className="login-wrapper_btn" onClick={this.LoginHandle}>
            登入
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { tokenInfo, loginStatus } = state.auth
  return { tokenInfo, loginStatus }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveTokenInfo: (payload: object) => {
      dispatch({ type: keys.ADD_TOKEN_INFO, payload: payload })
    },
    savePer: (payload: object) => {
      dispatch({ type: keys.ADD_PERMISSION, payload: payload })
    },
    isLogin: (payload: boolean) => {
      dispatch({ type: keys.IS_LOGIN, payload: payload })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContent)
