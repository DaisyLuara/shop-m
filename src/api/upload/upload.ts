import axios from 'axios'
const UPLOAD_API = '/api/picture'

interface responseArgs {
  id: number
}
export const saveImage = (args: any): Promise<responseArgs> => {
  console.log(args)
  // let params = {
  //   ...args
  // }
  console.log(args)
  return new Promise(function(resolve, reject) {
    axios
      .post(UPLOAD_API, args)
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
