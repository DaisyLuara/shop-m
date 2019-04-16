import React, { Component } from 'react'
import MenuBar from '../Menu/MenuBar/MenuBar'
import Header from '../Header/Header'
import HeaderContent from '../Header/HeaderContent'
import { getPerAndInfo } from '../../../api/storeData'
import { CDN } from '../../../constant/cdn'
import MyContentItem from './Item/MyContentItem'
import './My.scss'
class My extends Component<any> {
  render() {
    const { history } = this.props
    const userInfo = getPerAndInfo()
    const name = userInfo.name
    const logoUrl = userInfo.company.logoMedia
      ? userInfo.company.logoMedia.url
      : CDN.IMG_URL + 'shopM/img/avatar_default.png'
    return (
      <div className="my-wrap">
        <Header title={name} hasBack={true} history={history} />
        <HeaderContent content={''} />
        <div className="my-wrap_avatar">
          <img src={logoUrl} />
        </div>
        <MyContentItem history={history} />
        <MenuBar history={history} />
      </div>
    )
  }
}

export default My
