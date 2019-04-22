import axios from 'axios'
// @ts-ignore weixin-sdk 还没有ts.d
import wx from 'weixin-js-sdk';
import baseENV from '../http/server'

// 微信扫一扫
export const qRCode = (scanQrCodeObject:any) => {
  wx.scanQRCode(scanQrCodeObject)
}

export const wechat = ()=>{
  return new Promise((resolve, reject) => {
    let requestUrl:string = baseENV.SERVER_URL + '/api/wx/officialAccount/sign'
    axios
      .get(requestUrl)
      .then(response => {
        // sign返回格式
        let r = response.data
        wx.config({
          debug: false,
          appId: r.appId,
          timestamp: r.timestamp,
          nonceStr: r.nonceStr,
          signature: r.signature,
          jsApiList: ['scanQRCode']
        })
        wx.ready(() => {
          // 配置 wx.config 成功
          resolve({
            wx,
            qRCode
          })
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}




