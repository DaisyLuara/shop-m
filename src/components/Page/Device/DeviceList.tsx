import React, { Component } from 'react'
import Header from '../Header/Header'
import './DeviceList.scss'
import InfiniteScroll from 'react-infinite-scroller'
import { getDeviceList } from '../../../api/device/device'
import DeviceItem from './DeviceItem/DeviceItem'
interface State {
  currentPage: number
  list: Array<any>
  point_name: string | undefined | null
  total: number
  pageSize: number
  isHasMore: boolean
  isLoading: boolean
}

class DeviceList extends Component<any & State> {
  state = {
    currentPage: 1,
    list: [],
    point_name: null,
    total: 0,
    pageSize: 5,
    isHasMore: false,
    isLoading: false
  }
  _isMounted = false
  deviceList = async () => {
    const { isHasMore, currentPage, isLoading } = this.state
    if (isLoading || isHasMore) {
      return
    }
    let args = {
      include: 'point,project',
      page: currentPage,
      point_name: this.state.point_name
    }
    if (this._isMounted) {
      this.setState({
        isLoading: true
      })
    }

    try {
      const r = await getDeviceList(args)
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
    } catch (e) {
      if (this._isMounted) {
        this.setState({
          isLoading: false
        })
      }
    }
  }
  setSearchArgs = (name: string) => {
    this.setState({
      point_name: name,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    this.deviceList()
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
      this.deviceList()
    }, 200)
  }
  render() {
    const { history } = this.props
    const { isHasMore, list, isLoading, point_name } = this.state
    const DeivceItem = list.map((r: any, index) => {
      const { point, id, project, faceDate, screenStatus } = r
      return (
        <DeviceItem
          history={history}
          key={index}
          icon={project.icon}
          index={index}
          point_name={point.name}
          id={id}
          project_name={project.name}
          faceDate={faceDate}
          screenStatus={screenStatus}
        />
      )
    })
    return (
      <div className="device-list">
        <Header
          hasBack={true}
          title={'设备管理'}
          history={history}
          hasSearch={true}
          searchArgs={{ point_name: point_name, placeholder: '点位名称' }}
          searchHandle={(name: string) => {
            this.setSearchArgs(name)
          }}
        />
        <div className="device-list_content-header">
          <div className="device-list_content-header-info">
            设备总数<span className="device-list_num">{this.state.total}</span>
            台
          </div>
        </div>
        <div className="device-list_content">
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
            {DeivceItem}
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}
export default DeviceList
