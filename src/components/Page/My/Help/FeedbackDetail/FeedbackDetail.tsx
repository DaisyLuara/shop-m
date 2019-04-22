import React, { Component } from 'react'
import Header from '../../../Header/Header'
import HeaderContent from '../../../Header/HeaderContent'
import './FeedbackDetail.scss'
import { Modal } from 'antd-mobile'
import { getFeedbackDetail } from '../../../../../api/feedback/feedback'
interface State {
  title: string
  content: string
  photos: Array<any>
  childrenFeedback: Array<{
    content: string
    photos: { data: Array<{ url: string }> }
  }>
  visiableModel: boolean
  imgUrl: string
}

class FeedbackDetail extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      title: '',
      content: '',
      photos: [],
      childrenFeedback: [],
      visiableModel: false,
      imgUrl: ''
    }
  }

  _isMounted = false
  FeedbackDetail = async () => {
    const { match } = this.props
    let id = match.params.id
    let args = {
      id: id,
      include: 'photos,childrenFeedback.photos'
    }
    try {
      let res: any = await getFeedbackDetail(args)
      if (this._isMounted) {
        this.setState({
          title: res.title,
          content: res.content,
          photos: res.photos.data.length > 0 ? res.photos.data : [],
          childrenFeedback:
            res.childrenFeedback.data.length > 0
              ? res.childrenFeedback.data
              : []
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  imgItem = (list: Array<any>) => {
    let imgItem: any = []
    list.map((item: any, index) => {
      imgItem.push(
        <div className="feedback-detail_content-image-item" key={index}>
          <img src={item.url} onClick={() => this.openImg(item.url)} />
        </div>
      )
    })
    return imgItem
  }
  componentDidMount() {
    this._isMounted = true
    this.FeedbackDetail()
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  openImg = (url: string) => {
    this.setState({
      imgUrl: url,
      visiableModel: true
    })
  }
  closeImg = () => {
    this.setState({
      visiableModel: false
    })
  }

  render() {
    const { history } = this.props
    const {
      title,
      content,
      photos,
      childrenFeedback,
      visiableModel,
      imgUrl
    } = this.state
    const contentData = childrenFeedback.length > 0 ? childrenFeedback[0] : null
    const contentPhotos = contentData
      ? contentData.photos.data
        ? contentData.photos.data
        : null
      : null
    return (
      <div className="feedback-detail">
        <Header hasBack={true} title={'反馈详情'} history={history} />
        <HeaderContent content={title} />
        <div className="feedback-detail_content">
          <div className="feedback-detail_answer-content">
            <h4 className="feedback-detail_ask-title">反馈内容</h4>
            <p className="feedback-detail_ask-content-file">{content}</p>
            <div className="feedback-detail_ask-content-image">
              {this.imgItem(photos)}
            </div>
          </div>

          <div className="feedback-detail_answer-content">
            <h4 className="feedback-detail_answer-title">回答内容</h4>
            <p className="feedback-detail_answer-content-file">
              {contentData ? contentData.content : ''}
            </p>
            <div className="feedback-detail_answer-content-image">
              {contentPhotos ? this.imgItem(contentPhotos) : ''}
            </div>
          </div>
        </div>

        <Modal visible={visiableModel}>
          <div
            style={{
              marginTop: 20,
              height: 'auto',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              style={{ width: '100%', height: '100%' }}
              src={imgUrl}
              onClick={this.closeImg}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

export default FeedbackDetail
