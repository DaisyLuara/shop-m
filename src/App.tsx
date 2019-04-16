import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Login from '../src/components/Page/Login/Login'
import {
  withRouter,
  RouteComponentProps,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import keys from './actions/ActionTypeKeys'
import { checkIsLogin } from './api/auth/auth'
import Routes from '../src/routes/Routes'

interface AppProps extends RouteComponentProps {
  tokenInfo: {
    expires_in: number
    access_token: string
    jwt_begin_time: number
    token_type: string
  }
  loginStatus: boolean
  isLogin: (payload: boolean) => object
}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props)
  }
  addResizeListener = () => {
    window.addEventListener('resize', () => {
      this.setRem()
    })
  }

  removeResizeListener = () => {
    window.removeEventListener('resize', () => {
      this.setRem()
    })
  }

  setRem = () => {
    let html = document.getElementsByTagName('html')[0]
    let fontSize = (window.innerWidth / 375) * 100
    html.setAttribute('style', 'font-size: ' + fontSize + 'px')
  }

  removeRem = () => {
    let html = document.getElementsByTagName('html')[0]
    html.removeAttribute('style')
  }

  componentDidMount() {
    // 判断是否是登录状态
    const { isLogin, tokenInfo, loginStatus } = this.props
    let isLoginStatus = checkIsLogin(tokenInfo, loginStatus)
    alert(isLoginStatus)
    isLogin(isLoginStatus)
    // 设置页面Rem
    this.setRem()
    this.addResizeListener()
  }

  componentWillUnmount() {
    // 页面卸载的时候删除监听器
    this.removeResizeListener()
    this.removeRem()
  }

  render() {
    const { loginStatus, location } = this.props
    if (!loginStatus) {
      alert(loginStatus)
      let pathname = this.props.location.pathname
      if (pathname !== '/login') {
        alert(pathname)
        return (
          <div className="App">
            <Switch>
              <Redirect from={pathname} to="/login" />
              <Route path="/login" render={props => <Login {...props} />} />
            </Switch>
          </div>
        )
      } else {
        return (
          <div className="App">
            <Switch>
              <Route path="/login" render={props => <Login {...props} />} />
            </Switch>
          </div>
        )
      }
    } else {
      return <Routes location={location} />
    }
  }
}

const mapStateToProps = (state: any) => {
  const { tokenInfo, per, loginStatus, isLogin } = state.auth
  return {
    tokenInfo,
    per,
    loginStatus,
    isLogin
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    isLogin: (payload: boolean) => {
      dispatch({ type: keys.IS_LOGIN, payload: payload })
    }
  }
}

const connectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default withRouter(connectApp)
