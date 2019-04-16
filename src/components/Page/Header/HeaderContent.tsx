import React, { Component } from 'react'
import './HeaderContent.scss'
class HeaderContent extends Component<any> {
  render() {
    return (
      <div className="header-content">
        <div className="header-content_item">
          {/* 电话客服工作时间：周一至周五 08:00 - 18:00 */}
          {this.props.content}
        </div>
      </div>
    )
  }
}

export default HeaderContent
