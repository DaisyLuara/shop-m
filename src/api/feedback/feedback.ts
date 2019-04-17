import axios from 'axios'
const SERVICE_MOBILE_API = '/api/customer/service_mobile'
const FEEDBACK_API = '/api/feedback'

interface responseArgs {
  data: {}
}

interface requestArgs {
  title: string
  content: string
  photo_media_ids?: Array<number>
  video_media_id?: number
}

interface requestListArgs {
  include: string
  page: number
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

export const getMobile = (): Promise<responseArgs> => {
  return new Promise(function(resolve, reject) {
    axios
      .get(SERVICE_MOBILE_API)
      .then((res: any) => {
        resolve(res)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export const saveFeedback = (args: requestArgs): Promise<responseArgs> => {
  let params = {
    ...args
  }
  return new Promise(function(resolve, reject) {
    axios
      .post(FEEDBACK_API, params)
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export const getMyFeedbackList = (
  args: requestListArgs
): Promise<responseListArgs> => {
  let params = {
    ...args
  }
  return new Promise(function(resolve, reject) {
    axios
      .get(FEEDBACK_API, { params: params })
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
