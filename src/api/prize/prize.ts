import axios from 'axios'
const COUPON_RULES_API = '/api/coupon/batches'

interface requestArgs {
  page: number
  include?: string
  name?: string | null
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
export const getPrizeList = (args: requestArgs): Promise<responseListArgs> => {
  let params = {
    ...args
  }
  return new Promise(function(resolve, reject) {
    axios
      .get(COUPON_RULES_API, { params: params })
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
