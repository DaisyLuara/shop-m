import React, { Component } from 'react'
import { CDN } from '../../../../../../constant/cdn'
import './FeedbackItem.scss'
class FeedbackItem extends Component<any> {
  render() {
    const { index, title, created_at, length, data, history } = this.props
    return (
      <div className="feedback-list_my-item" key={index}>
        <div className="feedback-list_my-ask">
          <div className="feedback-list_my-ask-icon">
            <img src={CDN.IMG_URL + 'shopM/img/ask_icon.png'} />
          </div>
          <div className="feedback-list_my-ask-content">
            <div className="feedback-list_my-ask-content-title">{title}</div>
            <h4 className="feedback-list_my-ask-content-date">{created_at}</h4>
          </div>
        </div>
        {length > 0 ? (
          <div className="feedback-list-answer">
            <div className="feedback-list-answer-icon">
              <img src={CDN.IMG_URL + 'shopM/img/answer_icon.png'} />
            </div>
            <div className="feedback-list-answer-content">
              <div className="feedback-list-answer-content-title">
                {data[0].content.length > 15
                  ? data[0].content.substring(0, 15) + '...'
                  : data[0].content}
              </div>
              <h4 className="feedback-list-answer-content-date">
                {data[0].created_at}
              </h4>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default FeedbackItem
