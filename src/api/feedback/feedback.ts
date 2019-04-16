import axios from 'axios'
const SERVICE_MOBILE_API = '/api/customer/service_mobile'

interface responseArgs {
  data: {}
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
