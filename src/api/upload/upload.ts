import axios from 'axios'
const UPLOAD_API = '/api/picture'
const QINNIU_API = '/api/qiniu_oauth'
const MEDIA_UPLOAD_AP = '/api/media_upload'
import baseENV from '../http/server'


interface responseArgs {
  key: string,
  name: string,
  size: number
}


interface responseQiNiuArgs {
  key: string,
  hash: string,
}
export const saveKeyToService = (args: any): Promise<responseArgs> => {
  return new Promise(function (resolve, reject) {
    axios
      .post(MEDIA_UPLOAD_AP, args)
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

// 获得七牛token
export const getQiniuToken = () => {
  return new Promise(function (resolve, reject) {
    axios
      .get(QINNIU_API)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const saveImgToQiniu = (args: any): Promise<responseQiNiuArgs> => {
  axios.defaults.baseURL = ''
  return new Promise(function (resolve, reject) {
    axios
      .post('http://upload.qiniu.com', args)
      .then((res: any) => {
        axios.defaults.baseURL = baseENV.SERVER_URL
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}