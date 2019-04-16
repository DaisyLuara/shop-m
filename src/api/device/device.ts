import axios from 'axios'
const DEVICE_API = '/api/device/device'

interface requestArgs {
  page: number
  include: string
  point_name?: string | null
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

interface responseArgs {
  data: {}
}
interface DetialRequestArgs {
  include?: string
  id: number
}
export const getDeviceList = (args: requestArgs): Promise<responseListArgs> => {
  let params = {
    ...args
  }
  return new Promise(function(resolve, reject) {
    axios
      .get(DEVICE_API, { params: params })
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export const getDeviceDetail = (
  args: DetialRequestArgs
): Promise<responseArgs> => {
  let params = {
    ...args
  }
  delete params.id
  return new Promise(function(resolve, reject) {
    axios
      .get(DEVICE_API + '/' + args.id, { params: params })
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
