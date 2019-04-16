import { store } from '../store/configureStore'
import keys from '../actions/ActionTypeKeys'

export const getToken = () => {
  return store.getState().auth.tokenInfo.access_token
}
export const getPerAndInfo = () => {
  return store.getState().auth.per
}
export const loggedIn =() =>{
  return store.getState().auth.loginStatus
}

export const handle401 = () => {
  store.dispatch({ type: keys.IS_LOGIN, payload: false })
}
