export interface StoreState {
  tokenInfo: {
    expires_in?: number
    access_token?: string
    jwt_begin_time?: number
    token_type?: string
  }
  per: any
  loginStatus: boolean
}
