import React, { Component } from 'react'
import './DeviceItem.scss'
class DeviceItem extends Component<any> {
  getDetial = () => {
    const { history, id } = this.props
    history.push('/call/device/detail/' + id)
  }
  render() {
    const {
      index,
      icon,
      point_name,
      id,
      project_name,
      faceDate,
      screenStatus
    } = this.props
    return (
      <div
        className="device-list_content-item"
        key={index}
        onClick={this.getDetial}
      >
        <div className="device-list_content-item-logo">
          <img src={icon} />
          <div
            className={
              screenStatus === 0
                ? 'device-list_content-item-status close '
                : 'device-list_content-item-status open '
            }
          >
            {screenStatus === 0 ? '已关闭' : '已开启'}
          </div>
        </div>
        <div className="device-list_content-item-info">
          <h4 className="device-list_address">{point_name}</h4>
          <h5 className="device-list_id">{id}</h5>
          <div className="device-list_project-date">
            <div className="device-list_name">{project_name}</div>
            <div className="device-list_date">上次互动:{faceDate}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default DeviceItem
