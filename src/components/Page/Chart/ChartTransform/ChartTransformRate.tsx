import React, { Component } from 'react'
import { CDN } from '../../../../constant/cdn'
import Circle from 'react-circle'
import './ChartTransformRate.scss'
class ChartTransformRate extends Component<any> {
  render() {
    const { index, title, count } = this.props
    return (
      <div className="chart-data_content-rate-item" key={index}>
        <img
          src={CDN.IMG_URL + 'shopM/img/arrow_icon.png'}
          className="chart-data_arrow"
        />
        <Circle
          animate={true}
          progress={Number(count)}
          size="50"
          responsive={false}
          lineWidth="20"
          percentSpacing={5}
          bgColor="#c9f5e8"
          roundedStroke={true}
          textColor="#03b8cb"
          progressColor="#00d1cf"
          textStyle={{
            fontSize: '1.2rem',
            fontWeight: 700
          }}
        />
        <div className="chart-data_content-rate-item-info">
          <div className="chart-data_content-rate-info-item">{title}</div>
          <div className="chart-data_content-rate-info-item">转化率</div>
        </div>
      </div>
    )
  }
}

export default ChartTransformRate
