import React, { Component } from 'react'
import './FeedbackMenu.scss'
import { CDN } from '../../../../../constant/cdn'
import { getMobile } from '../../../../../api/feedback/feedback'
import { Toast } from 'antd-mobile'

class FeedbackMenu extends Component<any> {
  state = {
    phone: ''
  }
  _isMounted = false
  async init() {
    try {
      let res = await getMobile()
      if (this._isMounted) {
        this.setState({
          phone: res.data
        })
      }
    } catch (e) {
      Toast.fail(e.response.data.message)
    }
  }
  componentDidMount() {
    this._isMounted = true
    this.init()
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  goFeedback = () => {
    const { history } = this.props
    history.push('/call/feedback/list')
  }
  render() {
    return (
      <div className="feedback-menu">
        <div className="feedback-menu_item" onClick={this.goFeedback}>
          <img src={CDN.IMG_URL + 'shopM/img/edit_icon.png'} />
          在线反馈
        </div>
        <div className="feedback-menu_line" />
        <a href={'tel:' + this.state.phone} className="feedback-menu_item">
          <img src={CDN.IMG_URL + 'shopM/img/phone_icon.png'} />
          电话客服
        </a>
      </div>
    )
  }
}

export default FeedbackMenu
