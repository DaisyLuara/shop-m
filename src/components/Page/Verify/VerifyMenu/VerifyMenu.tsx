import React, { Component } from 'react'
import { CDN } from '../../../../constant/cdn'
import './VerifyMenu.scss'
class VerifyMenu extends Component<any> {
  menuLinkHandle = (url: string) => {
    this.props.history.push(url)
  }
  verifyMenu = () => {
    let data = [
      {
        id: 1,
        img_url: CDN.IMG_URL + 'shopM/img/qrcode_icon.png',
        name: '输码核销',
        url: '/call/verify/code'
      },
      {
        id: 2,
        img_url: CDN.IMG_URL + 'shopM/img/sao_code_icon.png',
        name: '扫码核销',
        url: ''
      },
      {
        id: 3,
        img_url: CDN.IMG_URL + 'shopM/img/record_icon.png',
        name: '核销记录',
        url: '/call/verify/record'
      }
    ]

    let childrenElement: any = []
    data.map((r: any) => {
      childrenElement.push(
        <div
          className="verify-menu_item"
          key={r.id}
          onClick={(e: any) => this.menuLinkHandle(r.url)}
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
