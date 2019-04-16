import React, { Component } from 'react'
class DeviceDetailItem extends Component<any> {
  render() {
    const { item, index } = this.props
    return (
      <div className="device-detail_content-item" key={index}>
        <div className="device-detail-content-item-title">{item.title}</div>
        <div className="device-detail-content-item-info">
          <div
            className={
              item.title === '设备状态'
                ? item.info === 0
                  ? 'device-list_content-item-status close'
                  : 'device-list_content-item-status open'
                : ''
            }
          >
            {item.title === '设备状态'
              ? item.info === 0
                ? '已关闭'
                : '已开启'
              : item.info}
          </div>
        </div>
      </div>
    )
  }
}

export default DeviceDetailItem
