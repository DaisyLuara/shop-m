import keys from '../ActionTypeKeys'
export interface saveToken {
  type: keys.ADD_TOKEN_INFO
  payload: object
}

export interface savePermission {
  type: keys.ADD_PERMISSION
  payload: object
}

export interface isLogin {
  type: keys.IS_LOGIN
  payload: boolean
}
