import React, { Component } from 'react'
import Header from '../../Header/Header'
import './PlatfromList.scss'
import { wxThridUrl } from '../../../../constant/wxthird'
import { getPlatformList } from '../../../../api/platform/platform'
import InfiniteScroll from 'react-infinite-scroller'
import PlatformItem from './PlatformItem/PlatformItem'
interface State {
  currentPage: number
  list: Array<any>
  nick_name: string | undefined | null
  total: number
  isHasMore: boolean
  isLoading: boolean
}
class PlatfromList extends Component<any & State> {
  state = {
    nick_name: '',
    currentPage: 1,
    list: [],
    total: 0,
    isHasMore: false,
    isLoading: false
  }
  _isMounted = false

  platfromList = async () => {
    const { isHasMore, currentPage, isLoading } = this.state
    if (isLoading || isHasMore) {
      return
    }
    let args = {
      page: currentPage,
      nick_name: this.state.nick_name
    }
    if (this._isMounted) {
      this.setState({
        isLoading: true
      })
    }

    try {
      const r = await getPlatformList(args)
      let res: any = r.data
      let pagination: any = r.meta.pagination
      if (this._isMounted) {
        this.setState({
          isLoading: false,
          list: this.state.list.concat(res),
          total: pagination.total
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
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  setSearchArgs = (name: string) => {
    this.setState({
      nick_name: name,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    this.platfromList()
  }
  authEnter = () => {
    window.location.href = wxThridUrl.url
  }

  // 加载更多
  loadMore() {
    setTimeout(() => {
      this.platfromList()
    }, 200)
  }
  render() {
    const { history } = this.props
    const { nick_name, total, isHasMore, isLoading, list } = this.state

    const PlatItem = list.map((item: any, index) => {
      const { head_img, nick_name, per, state, service_type } = item
      return (
        <PlatformItem
          key={index}
          index={index}
          head_img={head_img}
          state={state}
          per={per}
          nick_name={nick_name}
          type={service_type.display_name}
        />
      )
    })
    return (
      <div className="platfrom-list">
        <Header
          title={'公众平台'}
          hasBack={true}
          history={history}
          hasSearch={true}
          searchArgs={{ nick_name: nick_name, placeholder: '名称' }}
          searchHandle={(name: string) => {
            this.setSearchArgs(name)
          }}
        />
        <div className="platfrom-list_content-header">
          <div
            className="platfrom-list_content-header-btn"
            onClick={this.authEnter}
          >
            授权入口
          </div>
          <div className="platfrom-list_content-header-info">
            授权总数<span className="platfrom-list_num">{total}</span>个
          </div>
        </div>
        <div className="platform-list-content">
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
            {PlatItem}
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}

export default PlatfromList
