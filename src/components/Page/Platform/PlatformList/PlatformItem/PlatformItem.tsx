import React, { Component } from 'react'
import './PlatformItem.scss'
class PlatformItem extends Component<any> {
  render() {
    const { index, head_img, nick_name, type, per, state } = this.props
    return (
      <div className="platform-list_content-item" key={index}>
        <div className="platform-list_content-item-logo">
          <img src={head_img} />
          <div
            className={
              state === 200
                ? 'platform-list_content-item-status  success'
                : 'platform-list_content-item-status  error'
            }
          >
            {state === 200 ? '正常' : '异常'}
          </div>
        </div>
        <div className="platform-list_content-item-info">
          <h4 className="platform-list_name">{nick_name}</h4>
          <h5 className="platform-list_type">{type}</h5>
          <div className="platform-list_per">
            {per.map((r: any, key: any) => {
              return (
                <span className="platform-list_per-item" key={key}>
                  {r}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
export default PlatformItem
