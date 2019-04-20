import React, { Component } from 'react'
import Header from '../../../Header/Header'
import './Overview.scss'
class Overview extends Component<any> {
  render() {
    const { history } = this.props
    return (
      <div className="overview">
        <Header hasBack={true} history={history} />
        <div className="overview_content">
          <p>
            召唤宝是一个业内领先的为实体商业提供围绕LBS召唤屏的数字化服务集成平台。平台能够向下承接IaaS，向上支撑SaaS的各种需求。
          </p>
        </div>
      </div>
    )
  }
}

export default Overview
