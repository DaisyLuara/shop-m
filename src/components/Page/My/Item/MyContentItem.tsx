import React, { Component } from 'react'
import './MyContentItem.scss'
import { CDN } from '../../../../constant/cdn'
import { Modal } from 'antd-mobile'
import { logout } from '../../../../api/auth/auth'
import { handle401 } from '../../../../api/storeData'
const alert = Modal.alert
class MyContentItem extends Component<any> {
  itemLink = (url: string, type: string) => {
    if (type === 'logout') {
      alert('您确定要退出?', '', [
        {
          text: '取消',
          onPress: () => console.log('cancel'),
          style: {
            color: '#fff',
            background: 'linear-gradient(to right, #007ccd, #00d1cf)',
            borderRight: '1px solid #fff'
          }
        },
        {
          text: '确认',
          onPress: () => {
            logout()
              .then(() => {
                handle401()
              })
              .catch(err => {})
          },
          style: {
            color: '#fff',
            background: 'linear-gradient(to right, #00d1cf, #00f5d1)'
          }
        }
      ])
    } else {
      this.props.history.push(url)
    }
  }
  contentItem = () => {
    let data: any = [
      {
        id: 1,
        img_url: CDN.IMG_URL + 'shopM/img/password_lock_icon.png',
        title: '修改密码',
        url: '/call/password',
        type: ''
      },
      {
        id: 2,
        img_url: CDN.IMG_URL + 'shopM/img/help_icon.png',
        title: '帮助反馈',
        url: '/call/help',
        type: ''
      },
      {
        id: 3,
        img_url: CDN.IMG_URL + 'shopM/img/logout_icon.png',
        title: '退出登录',
        url: '',
        type: 'logout'
      }
    ]
    let children: any = []
    data.map((r: any) => {
      children.push(
        <div className="my-menu-wrap_item" key={r.id}>
          <div className="my-menu-wrap_icon">
            <img src={r.img_url} />
          </div>
          <div className="my-menu-wrap_title">{r.title}</div>
          <div
            className="my-menu-wrap_right"
            onClick={() => this.itemLink(r.url, r.type)}
          >
            <img src={CDN.IMG_URL + 'shopM/img/right_icon.png'} />
          </div>
        </div>
      )
    })
    return children
  }
  render() {
    return <div className="my-menu-wrap">{this.contentItem()}</div>
  }
}
export default MyContentItem
