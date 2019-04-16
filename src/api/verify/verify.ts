import axios from 'axios'
const COUPONS_API = '/api/coupons'

interface requestArgs {
  code: string
  order_total?: number
}
interface responseArgs {
  data: {}
}

interface responseListArgs {
  data: {}
  meta: {
    couponUsedNum: number
    couponUnusedNum: number
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

interface requestListArgs {
  status?: number | null
  create_start_date?: string | null
  create_end_date?: string | null
  include: string
  coupon_batch_name?: string | null | undefined
}
export const verifyCoupon = (args: requestArgs): Promise<responseArgs> => {
  return new Promise(function(resolve, reject) {
    let params = {
      ...args
    }
    axios
      .post(COUPONS_API, params)
      .then((res: any) => {
        resolve(res)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export const verifyCouponList = (
  args: requestListArgs
): Promise<responseListArgs> => {
  return new Promise(function(resolve, reject) {
    let params = {
      ...args
    }
    axios
      .get(COUPONS_API, { params: params })
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
