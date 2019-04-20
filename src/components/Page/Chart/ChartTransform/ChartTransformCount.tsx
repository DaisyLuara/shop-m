import React, { Component } from 'react'
import './ChartTransformCount.scss'
class ChartTransfromCount extends Component<any> {
  render() {
    const { index, count, title } = this.props
    const countPTitle: any = ['围,观', '互,动', '扫,码', '核,销']
    return (
      <div className="chart-data_count-item" key={index}>
        <div className={'chart-data_count-item-title ' + 'item_' + index}>
          <div
            className={
              'chart-data_count-item-title-replace ' + 'item-replace_' + index
            }
          />
          <div className={'item-text_' + index}>
            {countPTitle[index].split(',')[0]}
            <br />
            {countPTitle[index].split(',')[1]}
          </div>
        </div>
        <div className="chart-data_count-item-info">
          <div className="chart-data_count-item-info-title">{title}</div>
          <div className="chart-data_count-item-info-count">{count}</div>
        </div>
      </div>
    )
  }
}

export default ChartTransfromCount
