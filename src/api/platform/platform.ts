import axios from 'axios'
const AUTHORIZER_API = '/api/wechat/authorizer'

interface requestArgs {
  page: number
  include?: string
  nick_name?: string | null
}
interface responseListArgs {
  data: {}
  meta: {
    pagination: {
      count: number
      current_page: number
      links: null | string
      per_page: number
      total: number
      total_pages: number
    }
  }
}
export const getPlatformList = (
  args: requestArgs
): Promise<responseListArgs> => {
  let params = {
    ...args
  }
  return new Promise(function(resolve, reject) {
    axios
      .get(AUTHORIZER_API, { params: params })
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
