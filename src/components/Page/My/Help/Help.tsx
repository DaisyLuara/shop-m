import React, { Component } from 'react'
import HeaderContent from '../../Header/HeaderContent'
import Header from '../../Header/Header'
import FeedbackMenu from './FeedbackMenu/FeedbackMenu'
import { Accordion, Icon } from 'antd-mobile'
import { ProductData } from './ProductData'

import './Help.scss'
const Panel = Accordion.Panel
class Help extends Component<any> {
  FileRead = (url:string) => {
    this.props.history.push(url)
  }
  AccordionItem = () => {
    let children: any = []
    ProductData.map((r: any) => {
      children.push(
        <Panel
          key={r.id}
          className="product_introduce_item"
          header={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#222',
                fontSize: '0.12rem'
              }}
            >
              <Icon
                type="question-circle"
                style={{ marginRight: '0.2rem', color: '#353535' }}
              />{' '}
              {r.title}
            </div>
          }
        >
          {r.children.map((c: any) => (
            <div
              className="product_introduce_detail-item"
              key={c.id}
              onClick={() => this.FileRead(c.url)}
            >
              <div className="product_introduce_detail-item-title">
                {c.title}
              </div>
              <Icon type="right" className="product_introduce_right" />
            </div>
          ))}
        </Panel>
      )
    })
    return children
  }
  render() {
    const { history } = this.props
    const PanelItem = () => {
      return this.AccordionItem()
    }
    return (
      <div style={{ marginBottom: '0.6rem' }}>
        <Header history={history} hasBack={true} title={'问题反馈'} />
        <HeaderContent content={'电话客服工作时间：周一至周五 08:00 - 18:00'} />
        <div className="product_introduce">
          <Accordion defaultActiveKey="1">{PanelItem()}</Accordion>
        </div>
        <FeedbackMenu history={history} />
      </div>
    )
  }
}

export default Help
