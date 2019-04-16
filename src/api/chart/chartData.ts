import axios from 'axios'
const DATA_API = '/api/mobile_face_data'
interface paramsData {
  id: number
  end_date?: string
  start_date?: string
}

interface responseArgs {
  data: {}
}

interface argsHeader {
  headers?: any
}

export const getPersonTimes = (args: paramsData): Promise<responseArgs> => {
  return new Promise(function(resolve, reject) {
    let params = {
      ...args
    }
    let REQ_HEADER: argsHeader = {
      headers: {'Accept': 'application/vdn.xingstation.v2+json'},
    }
    axios
      .post(DATA_API, params,REQ_HEADER)
      .then((res: any) => {
        resolve(res)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
