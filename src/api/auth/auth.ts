import axios from 'axios'
const LOGIN_API = '/api/authorizations'
const PASSWORD_API = '/api/password/reset'
const LOGOUT_API = '/api/authorizations/current'
const CUSTOMER_API = '/api/customer?include=roles,company.logoMedia'

interface loginForm {
  username: string
  password: string
}
interface responseArgs {
  data: {}
}

interface tokenInfo {
  expires_in: number
  jwt_begin_time: number
}

interface passwordMessage {
  old_password: string
  new_password: string
  confirm_password: string
}

export const Login = (loginForm: loginForm): Promise<responseArgs> => {
  return new Promise(function(resolve, reject) {
    let params = {
      ...loginForm
    }
    axios
      .post(LOGIN_API, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// get user info
export const getUserInfo = (): Promise<responseArgs> => {
  return new Promise(function(resolve, reject) {
    axios
      .get(CUSTOMER_API)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 判断登录状态
export const checkIsLogin = (tokenInfo: tokenInfo, loginStatus: boolean) => {
  let nowDate = new Date().getTime(),
    expires_in = tokenInfo.expires_in,
    jwt_begin_time = tokenInfo.jwt_begin_time,
    differTime = nowDate - jwt_begin_time
  let tokenlatestLifeTime = Math.floor(differTime / (60 * 1000))

  if (tokenlatestLifeTime <= expires_in / 60 && loginStatus) {
    return true
  }
  return false
}

// 修改密码
export const modifyPassword = (
  passwordMessage: passwordMessage
): Promise<responseArgs> => {
  return new Promise(function(resolve, reject) {
    axios
      .put(PASSWORD_API, passwordMessage)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 退出登录
export const logout = () => {
  return new Promise(function(resolve, reject) {
    axios
      .delete(LOGOUT_API)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
