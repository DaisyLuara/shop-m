import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import './FeedbackList.scss'
import { getMyFeedbackList } from '../../../../../api/feedback/feedback'
import InfiniteScroll from 'react-infinite-scroller'
import FeedbackItem from './FeedbackItem/FeedbackItem'
import FeedbackSave from './FeedbackSave/FeedbackSave'
// @ts-ignore 没有ts.d文件
interface State {
  isActive: string
  isActiveIndex: number
  addVisiable: boolean
  list: Array<any>
  isHasMore: boolean
  isLoading: boolean
  currentPage: number
}

class FeedbackList extends Component<any & State> {
  state = {
    isActive: 'is-active-promptly',
    isActiveIndex: 0,
    addVisiable: true,
    currentPage: 1,
    list: [],
    isHasMore: false,
    isLoading: false
  }
  _isMounted = false
  back = () => {
    const { history } = this.props
    history.goBack()
  }
  tabHandle = (type: string) => {
    switch (type) {
      case 'promptly':
        this.setState({
          isActive: 'is-active-promptly',
          isActiveIndex: 0,
          addVisiable: true
        })
        break
      case 'my':
        this.setState({
          isActive: 'is-active-my',
          isActiveIndex: 1,
          addVisiable: false
        })
        break
    }
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  // 加载更多
  loadMore() {
    setTimeout(() => {
      this.myFeedbackList()
    }, 200)
  }

  TabToList = () => {
    if (this._isMounted) {
      this.setState({
        isActive: 'is-active-my',
        isActiveIndex: 1,
        addVisiable: false
      })
    }
  }
  myFeedbackList = async () => {
    const { isHasMore, currentPage, isLoading } = this.state
    if (isLoading || isHasMore) {
      return
    }
    let args = {
      page: currentPage,
      include: 'childrenFeedback'
    }
    if (this._isMounted) {
      this.setState({
        isLoading: true
      })
    }

    try {
      const r = await getMyFeedbackList(args)
      let res: any = r.data
      let pagination: any = r.meta.pagination
      if (this._isMounted) {
        this.setState({
          isLoading: false,
          list: this.state.list.concat(res)
        })
      }
      if (pagination.current_page >= pagination.total_pages) {
        if (this._isMounted) {
          this.setState({
            isHasMore: true
          })
        }
      } else {
        if (this._isMounted) {
          this.setState({
            currentPage: currentPage + 1
          })
        }
      }
    } catch (err) {
      if (this._isMounted) {
        this.setState({
          isLoading: false
        })
      }
    }
  }

  render() {
    const {
      isActive,
      isActiveIndex,
      addVisiable,
      isHasMore,
      isLoading,
      list
    } = this.state
    const { history } = this.props

    const feedBackItem = list.map((item: any, index) => {
      const { title, childrenFeedback, created_at } = item
      let data = childrenFeedback.data
      let length = data.length
      return (
        <FeedbackItem
          key={index}
          index={index}
          title={title}
          created_at={created_at}
          length={length}
          data={data}
          history={history}
        />
      )
    })
    return (
      <div className="feedback-list">
        <div className="feedback-list-tabs">
          <div className="feedback-list-back">
            <Icon
              type="left"
              size="md"
              className="header-wrap_left-icon"
              onClick={this.back}
            />
          </div>
          <div className="feedback-list-tabs-btn">
            <div
              className={
                'feedback-list-tabs-btn-promptly ' +
                (isActiveIndex === 0 ? isActive : '')
              }
              onClick={() => this.tabHandle('promptly')}
            >
              立即反馈
            </div>
            <div
              className={
                'feedback-list-tabs-btn-my ' +
                (isActiveIndex === 1 ? isActive : '')
              }
              onClick={() => this.tabHandle('my')}
            >
              我的反馈
            </div>
          </div>
        </div>
        {addVisiable ? (
          <FeedbackSave
            TabToList={() => {
              this.TabToList()
            }}
          />
        ) : (
          <div className="feedback-list_my-wrap">
            <InfiniteScroll
              pageStart={1}
              loadMore={this.loadMore.bind(this)}
              hasMore={!isHasMore || !isLoading}
              loader={
                !isHasMore ? (
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                ) : (
                  undefined
                )
              }
              useWindow={false}
            >
              {feedBackItem}
            </InfiniteScroll>
          </div>
        )}
      </div>
    )
  }
}

export default FeedbackList
