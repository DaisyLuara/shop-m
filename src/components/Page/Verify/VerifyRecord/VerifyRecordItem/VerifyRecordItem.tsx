import React, { Component } from 'react'
import { CDN } from '../../../../../constant/cdn'
import './VerifyRecordItem.scss'
class VerifyRecordItem extends Component<any> {
  render() {
    const {
      index,
      name,
      code,
      couponBatch,
      point,
      end_date,
      start_date,
      use_date,
      customer,
      status
    } = this.props
    return (
      <div className="verify-record_content-item" key={index}>
        <div className="verify-record_content-coupon-info">
          <div className="verify-record_coupon-title-logo">
            <div className="verify-record_title-code">
              <div className="verify-record_title">{name}</div>
              <div className="verify-record_code">{code}</div>
            </div>
            <div className="verify-record_content-item-logo">
              <img
                src={
                  couponBatch.company.logoMedia
                    ? couponBatch.company.logoMedia.url
                    : CDN.IMG_URL + 'shopM/img/avatar_default.png'
                }
              />
            </div>
          </div>

          <div className="verify-record_point-date">
            <div className="verify-record_point-date-item">
              点位名:{point.name}
            </div>
            <div className="verify-record_point-date-item">
              有效期:{start_date} - {end_date}
            </div>
          </div>
        </div>
        <div className="verify-record_content-coupon-people">
          <div className="verify-record_coupon-people">
            <div className="verify-record_coupon-people-item">
              核销时间: {use_date}
            </div>
            <div className="verify-record_coupon-people-item">
              核销人员: {customer ? customer.name : ''}
            </div>
          </div>
          <div className="verify-record_coupon-people-status">
            <span
              className={
                status === 1
                  ? 'verify-record_status coupon-use'
                  : 'verify-record_status coupon-no-use'
              }
            >
              {status === 1
                ? '已使用'
                : status === 0
                ? '未领取'
                : status === 2
                ? '停用'
                : '未使用'}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default VerifyRecordItem
