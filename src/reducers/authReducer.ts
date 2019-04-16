import keys from '../actions/ActionTypeKeys'
import ActionTyps from '../actions/ActionTypes'
import { StoreState } from '../store/StoreState'
const defaultState: StoreState = {
  tokenInfo: {
    expires_in: 0,
    access_token: '',
    jwt_begin_time: 0,
    token_type: ''
  },
  per: {},
  loginStatus: false
}
const authReducer = (state = defaultState, action: ActionTyps) => {
  switch (action.type) {
    case keys.ADD_TOKEN_INFO:
      return {
        ...state,
        tokenInfo: action.payload
      }
    case keys.ADD_PERMISSION:
      return {
        ...state,
        per: action.payload
      }
    case keys.IS_LOGIN:
      return {
        ...state,
        loginStatus: action.payload
      }
    default:
      return state
  }
}

export default authReducer
