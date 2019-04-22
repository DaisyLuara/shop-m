import React, { Component } from 'react'
import { CDN } from '../../../../constant/cdn'
import './VerifyMenu.scss'
// @ts-ignore weixin-sdk 还没有ts.d
import wx from 'weixin-js-sdk'
import { wechat, qRCode } from '../../../../api/wechat/wechat'
class VerifyMenu extends Component<any> {
  menuLinkHandle = (url: string, type: string) => {
    if (type === 'scanQR') {
      wechat()
      let that = this
      qRCode({
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res: any) {
          alert(JSON.stringify(res))
          alert(JSON.stringify(res.resultStr))
          // that.verifyForm.code = res.resultStr;
          // that.getCouponStatus(res.resultStr);
        },
        error: function(e:any) {
          alert(e)
          // Toast('扫码失败')
        }
      })
      // wx.scanQRCode({
      //   desc: 'scanQRCode desc',
      //   needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      //   scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      //   success: function(res: any) {
      //     console.log(res)
      //     // that.verifyForm.code = res.resultStr;
      //     // that.getCouponStatus(res.resultStr);
      //   },
      //   error: function() {
      //     Toast('扫码失败')
      //   }
      // })
    } else {
      this.props.history.push(url)
    }
  }
  componentDidMount() {
   
  }
  verifyMenu = () => {
    let data = [
      {
        id: 1,
        img_url: CDN.IMG_URL + 'shopM/img/qrcode_icon.png',
        name: '输码核销',
        url: '/call/verify/code',
        type: ''
      },
      {
        id: 2,
        img_url: CDN.IMG_URL + 'shopM/img/sao_code_icon.png',
        name: '扫码核销',
        url: '',
        type: 'scanQR'
      },
      {
        id: 3,
        img_url: CDN.IMG_URL + 'shopM/img/record_icon.png',
        name: '核销记录',
        url: '/call/verify/record',
        type: ''
      }
    ]

    let childrenElement: any = []
    data.map((r: any) => {
      childrenElement.push(
        <div
          className="verify-menu_item"
          key={r.id}
          onClick={(e: any) => this.menuLinkHandle(r.url, r.type)}
        >
          <img src={r.img_url} />
          <div className="verify-menu_item-name">{r.name}</div>
        </div>
      )
    })
    return childrenElement
  }
  render() {
    return <div className="verify-menu">{this.verifyMenu()}</div>
  }
}

export default VerifyMenu
