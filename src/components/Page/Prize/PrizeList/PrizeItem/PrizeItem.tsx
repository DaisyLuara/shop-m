import React, { Component } from 'react'
import './PrizeItem.scss'
import { CDN } from '../../../../../constant/cdn'
class PrizeItem extends Component<any> {
  render() {
    const {
      index,
      company,
      name,
      description,
      start_date,
      end_date,
      stock,
      count
    } = this.props
    return (
      <div className="prize-list_content-item" key={index}>
        <div className="prize-list_content-item-info">
          <div className="prize-list_content-item-logo">
            <img
              src={
                company.logoMedia
                  ? company.logoMedia.url
                  : CDN.IMG_URL + 'shopM/img/avatar_default.png'
              }
            />
          </div>
          <div className="prize-list_content-item-detail">
            <h4 className="prize-list_content-item-detail-name">{name}</h4>
            <h5 className="prize-list_content-item-detail-description">
              {description}
            </h5>
            <div className="left-circle" />
            <div className="right-circle" />
          </div>
        </div>
        <div className="prize-list_content-item-date">
          <div className="prize-list_content-item-effect-date">
            有效期：{start_date}-{end_date}
          </div>
          <div className="prize-list_content-item-count">
            剩余: {stock}/{count}张
          </div>
        </div>
      </div>
    )
  }
}
export default PrizeItem
